import { z } from 'zod';
import { createSelectSchema } from 'drizzle-zod';
import { orders, orderItems } from '../db/schema';

// ─── Base row shapes (derived from Drizzle — single source of truth) ──────────

export const orderRowSchema = createSelectSchema(orders);
export const orderItemRowSchema = createSelectSchema(orderItems);

export type OrderRow = z.infer<typeof orderRowSchema>;
export type OrderItemRow = z.infer<typeof orderItemRowSchema>;

// ─── Composed response shapes (what the API actually returns) ─────────────────

export const orderItemResponseSchema = z.object({
  id: z.string(),
  menuItemId: z.string(),
  name: z.string(),
  priceCents: z.number().int(),
  quantity: z.number().int(),
});

export const orderResponseSchema = z.object({
  id: z.string(),
  customerId: z.string().nullable(),
  customerName: z.string().nullable(),
  status: z.enum(['pending', 'accepted', 'preparing', 'ready', 'completed', 'cancelled']),
  totalCents: z.number().int(),
  notes: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
  items: z.array(orderItemResponseSchema).optional(),
});

export const orderListResponseSchema = z.object({
  orders: z.array(orderResponseSchema),
  total: z.number().int(),
});

export const createOrderResponseSchema = z.object({
  id: z.string(),
  totalCents: z.number().int(),
});

export const updateStatusResponseSchema = z.object({
  ok: z.literal(true),
  status: z.enum(['pending', 'accepted', 'preparing', 'ready', 'completed', 'cancelled']),
});

// ─── Query filter shape ───────────────────────────────────────────────────────

export const orderListQuerySchema = z.object({
  status: z
    .enum(['pending', 'accepted', 'preparing', 'ready', 'completed', 'cancelled'])
    .optional(),
  customerId: z.string().optional(),
  limit: z
    .string()
    .optional()
    .transform(v => (v ? parseInt(v, 10) : 50)),
  offset: z
    .string()
    .optional()
    .transform(v => (v ? parseInt(v, 10) : 0)),
});

export type OrderListQuery = z.infer<typeof orderListQuerySchema>;
export type OrderResponse = z.infer<typeof orderResponseSchema>;
export type OrderItemResponse = z.infer<typeof orderItemResponseSchema>;
export type CreateOrderResponse = z.infer<typeof createOrderResponseSchema>;