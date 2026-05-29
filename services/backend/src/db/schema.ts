import { pgTable, uuid, varchar, numeric } from 'drizzle-orm/pg-core'

export const menuItems = pgTable('menu_items', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  price: numeric('price').notNull()
})