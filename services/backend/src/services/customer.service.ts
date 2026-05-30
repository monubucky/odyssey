import { eq } from 'drizzle-orm';
import { customers } from '../db/schema';
import { nanoid } from '../utils';
import type { Database } from '../db';
import type { InsertCustomer } from '../db/validators';

// ─── Typed errors ─────────────────────────────────────────────────────────────

export class CustomerNotFoundError extends Error {
  constructor(id: string) {
    super(`Customer "${id}" not found`);
    this.name = 'CustomerNotFoundError';
  }
}

export class DuplicateEmailError extends Error {
  constructor(email: string) {
    super(`A customer with email "${email}" already exists`);
    this.name = 'DuplicateEmailError';
  }
}

// ─── Shared response type ─────────────────────────────────────────────────────

export type CustomerSummary = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  createdAt: string;
  orderCount: number;
  totalSpentCents: number;
  lastOrderAt: string | null;
};

export type CustomerDetail = CustomerSummary & {
  orders: Array<{
    id: string;
    status: string;
    totalCents: number;
    createdAt: string;
  }>;
};

// ─── Service ──────────────────────────────────────────────────────────────────

export class CustomerService {
  constructor(private readonly db: Database) {}

  // ── List with computed spend stats ───────────────────────────────────────────
  async list(): Promise<CustomerSummary[]> {
    const rows = await this.db.query.customers.findMany({
      orderBy: (t, { asc }) => [asc(t.name)],
      with: { orders: true },
    });

    return rows.map(row => this.#toSummary(row));
  }

  // ── Get one with full order history ──────────────────────────────────────────
  async getById(id: string): Promise<CustomerDetail> {
    const row = await this.db.query.customers.findFirst({
      where: eq(customers.id, id),
      with: {
        orders: {
          orderBy: (t, { desc }) => [desc(t.createdAt)],
        },
      },
    });
    if (!row) throw new CustomerNotFoundError(id);

    return {
      ...this.#toSummary(row),
      orders: row.orders.map(o => ({
        id: o.id,
        status: o.status,
        totalCents: o.totalCents,
        createdAt: o.createdAt,
      })),
    };
  }

  // ── Create ───────────────────────────────────────────────────────────────────
  async create(input: InsertCustomer): Promise<{ id: string }> {
    const id = nanoid();
    try {
      await this.db.insert(customers).values({ ...input, id });
      return { id };
    } catch {
      // D1 / SQLite UNIQUE constraint violation on email
      throw new DuplicateEmailError(input.email);
    }
  }

  // ── Private helpers ───────────────────────────────────────────────────────────
  #toSummary(row: {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    createdAt: string;
    orders: Array<{ status: string; totalCents: number; createdAt: string }>;
  }): CustomerSummary {
    const activeOrders = row.orders.filter(o => o.status !== 'cancelled');

    const totalSpentCents = activeOrders.reduce(
      (sum, o) => sum + o.totalCents,
      0
    );

    const lastOrderAt =
      row.orders
        .slice()
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )[0]?.createdAt ?? null;

    return {
      id: row.id,
      name: row.name,
      email: row.email,
      phone: row.phone,
      createdAt: row.createdAt,
      orderCount: activeOrders.length,
      totalSpentCents,
      lastOrderAt,
    };
  }
}