import { z } from 'zod';

// ─── Line item inside a create-order request ──────────────────────────────────

export const orderLineItemSchema = z.object({
  menuItemId: z.string().min(1, 'menuItemId is required'),
  quantity: z
    .number({ invalid_type_error: 'quantity must be a number' })
    .int('quantity must be a whole number')
    .positive('quantity must be at least 1')
    .max(99, 'quantity cannot exceed 99'),
});

// ─── Create order ─────────────────────────────────────────────────────────────

export const createOrderValidator = z
  .object({
    customerId: z.string().optional(),
    customerName: z
      .string()
      .min(1, 'customerName cannot be empty')
      .max(100, 'customerName too long')
      .optional(),
    items: z
      .array(orderLineItemSchema)
      .min(1, 'Order must contain at least one item'),
    notes: z.string().max(500, 'Notes too long').optional(),
  })
  .refine(
    data => data.customerId != null || data.customerName != null,
    {
      message: 'Either customerId or customerName must be provided',
      path: ['customerName'],
    }
  );

// ─── Update order status ──────────────────────────────────────────────────────
// "pending" is intentionally excluded — it is the initial state only, never a
// valid transition target. The state machine in the service enforces this too,
// but we keep the validator tight so invalid values are caught at the boundary.

export const updateOrderStatusValidator = z.object({
  status: z.enum(
    ['accepted', 'preparing', 'ready', 'completed', 'cancelled'],
    { errorMap: () => ({ message: 'Invalid target status' }) }
  ),
});

// ─── List query params ────────────────────────────────────────────────────────

export const orderListQueryValidator = z.object({
  status: z
    .enum(['pending', 'accepted', 'preparing', 'ready', 'completed', 'cancelled'])
    .optional(),
  customerId: z.string().optional(),
  limit: z
    .string()
    .optional()
    .transform(v => (v ? Math.min(parseInt(v, 10), 200) : 50))
    .pipe(z.number().int().positive()),
  offset: z
    .string()
    .optional()
    .transform(v => (v ? parseInt(v, 10) : 0))
    .pipe(z.number().int().min(0)),
});

// ─── Inferred types ───────────────────────────────────────────────────────────

export type CreateOrderInput = z.infer<typeof createOrderValidator>;
export type UpdateOrderStatusInput = z.infer<typeof updateOrderStatusValidator>;
export type OrderListQueryInput = z.infer<typeof orderListQueryValidator>;