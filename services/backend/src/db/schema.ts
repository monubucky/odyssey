import {
  pgTable,
  uuid,
  varchar,
  boolean,
  integer,
  numeric,
  timestamp,
  text,
} from 'drizzle-orm/pg-core'

export const menuCategories = pgTable('menu_categories', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  sortOrder: integer('sort_order').default(0),
})

export const menuItems = pgTable('menu_items', {
  id: uuid('id').defaultRandom().primaryKey(),
  categoryId: uuid('category_id').references(() => menuCategories.id),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  price: numeric('price').notNull(),
  isAvailable: boolean('is_available').default(true),
})

export const customers = pgTable('customers', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }),
  phone: varchar('phone', { length: 50 }),
})

export const orders = pgTable('orders', {
  id: uuid('id').defaultRandom().primaryKey(),
  customerId: uuid('customer_id').references(() => customers.id),
  status: varchar('status', { length: 50 }).notNull(),
  subtotal: numeric('subtotal').notNull(),
  tax: numeric('tax').notNull(),
  total: numeric('total').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
})

export const orderItems = pgTable('order_items', {
  id: uuid('id').defaultRandom().primaryKey(),
  orderId: uuid('order_id').references(() => orders.id),
  menuItemId: uuid('menu_item_id').references(() => menuItems.id),
  quantity: integer('quantity').notNull(),
  price: numeric('price').notNull(),
})

export const businessSettings = pgTable('business_settings', {
  id: uuid('id').defaultRandom().primaryKey(),
  prepTime: integer('prep_time').default(15),
  autoAccept: boolean('auto_accept').default(false),
  acceptingOrders: boolean('accepting_orders').default(true),
})