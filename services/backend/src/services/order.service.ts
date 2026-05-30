import { eq, and } from 'drizzle-orm';
import { orders, orderItems, menuItems } from '../db/schema';
import type { Database } from '../db';
import type { CreateOrderInput, OrderListQueryInput, UpdateOrderStatusInput } from '../validators/order.validator';
import type { OrderResponse } from '../schemas/order.schema';

// ─── Inlined dependencies ─────────────────────────────────────────────────────

const ORDER_TRANSITIONS: Record<string, string[]> = {
  pending:   ['accepted', 'cancelled'],
  accepted:  ['preparing', 'cancelled'],
  preparing: ['ready'],
  ready:     ['completed'],
  completed: [],
  cancelled: [],
};

function nanoid(size = 21): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-';
  let id = '';
  const bytes = crypto.getRandomValues(new Uint8Array(size));
  for (const byte of bytes) id += chars[byte & 63];
  return id;
}

// ─── Typed errors ─────────────────────────────────────────────────────────────

export class OrderNotFoundError extends Error {
  constructor(id: string) {
    super(`Order "${id}" not found`);
    this.name = 'OrderNotFoundError';
  }
}

export class InvalidTransitionError extends Error {
  readonly allowedTransitions: string[];
  constructor(from: string, to: string, allowed: string[]) {
    super(`Cannot transition order from "${from}" to "${to}"`);
    this.name = 'InvalidTransitionError';
    this.allowedTransitions = allowed;
  }
}

export class UnavailableItemError extends Error {
  constructor(name: string) {
    super(`Menu item "${name}" is currently unavailable`);
    this.name = 'UnavailableItemError';
  }
}

export class ItemNotFoundError extends Error {
  constructor(id: string) {
    super(`Menu item "${id}" does not exist`);
    this.name = 'ItemNotFoundError';
  }
}

// ─── Service ──────────────────────────────────────────────────────────────────

export class OrderService {
  constructor(private readonly db: Database) {}

  // ── List ────────────────────────────────────────────────────────────────────
  async list(query: OrderListQueryInput): Promise<{ orders: OrderResponse[]; total: number }> {
    const { status, customerId, limit, offset } = query;

    const conditions = [];
    if (status)     conditions.push(eq(orders.status, status));
    if (customerId) conditions.push(eq(orders.customerId, customerId));

    const rows = await this.db.query.orders.findMany({
      where: conditions.length ? and(...conditions) : undefined,
      orderBy: (t, { desc }) => [desc(t.createdAt)],
      limit,
      offset,
      with: { orderItems: true },
    });

    return {
      orders: rows.map(o => ({ ...o, items: o.orderItems })),
      total: rows.length,
    };
  }

  // ── Get by id ────────────────────────────────────────────────────────────────
  async getById(id: string): Promise<OrderResponse> {
    const row = await this.db.query.orders.findFirst({
      where: eq(orders.id, id),
      with: { orderItems: true },
    });
    if (!row) throw new OrderNotFoundError(id);
    return { ...row, items: row.orderItems };
  }

  // ── Create ───────────────────────────────────────────────────────────────────
  async create(input: CreateOrderInput): Promise<{ id: string; totalCents: number }> {
    const requestedIds = input.items.map(i => i.menuItemId);
    const menuRows = await this.db.query.menuItems.findMany({
      where: (t, { inArray }) => inArray(t.id, requestedIds),
    });

    const itemMap = new Map(menuRows.map(r => [r.id, r]));

    for (const lineItem of input.items) {
      const record = itemMap.get(lineItem.menuItemId);
      if (!record) throw new ItemNotFoundError(lineItem.menuItemId);
      if (!record.available) throw new UnavailableItemError(record.name);
    }

    const totalCents = input.items.reduce((sum, lineItem) => {
      const record = itemMap.get(lineItem.menuItemId)!;
      return sum + record.priceCents * lineItem.quantity;
    }, 0);

    const orderId = nanoid();

    await this.db.insert(orders).values({
      id: orderId,
      customerId: input.customerId ?? null,
      customerName: input.customerName ?? null,
      status: 'pending',
      totalCents,
      notes: input.notes ?? null,
    });

    await this.db.insert(orderItems).values(
      input.items.map(lineItem => {
        const record = itemMap.get(lineItem.menuItemId)!;
        return {
          id: nanoid(),
          orderId,
          menuItemId: lineItem.menuItemId,
          name: record.name,
          priceCents: record.priceCents,
          quantity: lineItem.quantity,
        };
      })
    );

    return { id: orderId, totalCents };
  }

  // ── Transition status ────────────────────────────────────────────────────────
  async transitionStatus(
    id: string,
    input: UpdateOrderStatusInput
  ): Promise<{ ok: true; status: string }> {
    const row = await this.db.query.orders.findFirst({
      where: eq(orders.id, id),
    });
    if (!row) throw new OrderNotFoundError(id);

    const allowed: string[] = ORDER_TRANSITIONS[row.status] ?? [];
    if (!allowed.includes(input.status)) {
      throw new InvalidTransitionError(row.status, input.status, allowed);
    }

    await this.db
      .update(orders)
      .set({ status: input.status, updatedAt: new Date().toISOString() })
      .where(eq(orders.id, id));

    return { ok: true, status: input.status };
  }
}