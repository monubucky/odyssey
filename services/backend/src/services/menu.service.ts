import { eq } from 'drizzle-orm';
import { menuCategories, menuItems } from '../db/schema';
import { nanoid } from '../utils';
import type { Database } from '../db';
import type {
  insertMenuItemSchema,
  insertMenuCategorySchema,
} from '../db/validators';
import type { z } from 'zod';

// ─── Typed errors ─────────────────────────────────────────────────────────────

export class MenuItemNotFoundError extends Error {
  constructor(id: string) {
    super(`Menu item "${id}" not found`);
    this.name = 'MenuItemNotFoundError';
  }
}

export class MenuCategoryNotFoundError extends Error {
  constructor(id: string) {
    super(`Menu category "${id}" not found`);
    this.name = 'MenuCategoryNotFoundError';
  }
}

// ─── Input types (from validators) ───────────────────────────────────────────

type InsertMenuItemInput = z.infer<typeof insertMenuItemSchema>;
type InsertMenuCategoryInput = z.infer<typeof insertMenuCategorySchema>;
type PatchMenuItemInput = Partial<InsertMenuItemInput>;

// ─── Response types ───────────────────────────────────────────────────────────

export type MenuItemSummary = {
  id: string;
  name: string;
  description: string | null;
  priceCents: number;
  available: boolean;
  imageUrl: string | null;
};

export type MenuCategoryWithItems = {
  id: string;
  name: string;
  description: string | null;
  sortOrder: number;
  items: MenuItemSummary[];
};

// ─── Service ──────────────────────────────────────────────────────────────────

export class MenuService {
  constructor(private readonly db: Database) {}

  // ── List all categories with their items ─────────────────────────────────────
  async listCategories(): Promise<MenuCategoryWithItems[]> {
    const rows = await this.db.query.menuCategories.findMany({
      orderBy: (t, { asc }) => [asc(t.sortOrder)],
      with: {
        items: {
          orderBy: (t, { asc }) => [asc(t.name)],
        },
      },
    });

    return rows.map(cat => ({
      id: cat.id,
      name: cat.name,
      description: cat.description,
      sortOrder: cat.sortOrder,
      items: cat.items.map(item => ({
        id: item.id,
        name: item.name,
        description: item.description,
        priceCents: item.priceCents,
        available: item.available,
        imageUrl: item.imageUrl,
      })),
    }));
  }

  // ── Create category ───────────────────────────────────────────────────────────
  async createCategory(input: InsertMenuCategoryInput): Promise<{ id: string }> {
    const id = nanoid();
    await this.db.insert(menuCategories).values({ ...input, id });
    return { id };
  }

  // ── Create item ───────────────────────────────────────────────────────────────
  async createItem(input: InsertMenuItemInput): Promise<{ id: string }> {
    // Guard: category must exist before inserting child item
    const category = await this.db.query.menuCategories.findFirst({
      where: eq(menuCategories.id, input.categoryId),
    });
    if (!category) throw new MenuCategoryNotFoundError(input.categoryId);

    const id = nanoid();
    await this.db.insert(menuItems).values({ ...input, id });
    return { id };
  }

  // ── Patch item ────────────────────────────────────────────────────────────────
  async updateItem(id: string, patch: PatchMenuItemInput): Promise<void> {
    // If categoryId is being changed, verify the new category exists
    if (patch.categoryId) {
      const category = await this.db.query.menuCategories.findFirst({
        where: eq(menuCategories.id, patch.categoryId),
      });
      if (!category) throw new MenuCategoryNotFoundError(patch.categoryId);
    }

    const result = await this.db
      .update(menuItems)
      .set({ ...patch, updatedAt: new Date().toISOString() })
      .where(eq(menuItems.id, id))
      .returning({ id: menuItems.id });

    if (!result.length) throw new MenuItemNotFoundError(id);
  }

  // ── Toggle availability shortcut ──────────────────────────────────────────────
  async setAvailability(id: string, available: boolean): Promise<void> {
    await this.updateItem(id, { available });
  }

  // ── Delete item ───────────────────────────────────────────────────────────────
  async deleteItem(id: string): Promise<void> {
    const result = await this.db
      .delete(menuItems)
      .where(eq(menuItems.id, id))
      .returning({ id: menuItems.id });

    if (!result.length) throw new MenuItemNotFoundError(id);
  }
}