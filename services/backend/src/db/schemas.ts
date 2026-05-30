import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { menuItems, orders } from './schema'

export const insertMenuItemSchema = createInsertSchema(menuItems)
export const selectMenuItemSchema = createSelectSchema(menuItems)

export const insertOrderSchema = createInsertSchema(orders)
export const selectOrderSchema = createSelectSchema(orders)