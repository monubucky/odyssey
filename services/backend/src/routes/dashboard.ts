import { Hono } from "hono";
import { orders, menuItems } from "../data/store";

const app = new Hono();

app.get("/", (c) => {
  const revenue = orders.reduce(
    (sum, order) => sum + order.total,
    0
  );

  const pendingOrders = orders.filter(
    (o) => o.status === "pending"
  ).length;

  const itemCounts = new Map<string, number>();

  orders.forEach((order) => {
    order.items.forEach((item) => {
      itemCounts.set(
        item.menuItemId,
        (itemCounts.get(item.menuItemId) || 0) +
          item.quantity
      );
    });
  });

  const popularItems = [...itemCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([id, count]) => ({
      item:
        menuItems.find((m) => m.id === id)
          ?.name ?? id,
      sold: count,
    }));

  return c.json({
    totalOrders: orders.length,
    revenue,
    pendingOrders,
    popularItems,
  });
});

export default app;