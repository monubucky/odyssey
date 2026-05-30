import { Hono } from "hono";
import { orders } from "../data/orders";

const ordersRoute = new Hono();

ordersRoute.get("/", (c) => {
  return c.json(orders);
});

ordersRoute.get("/:id", (c) => {
  const id = c.req.param("id");

  const order = orders.find(
    (o) => o.id === id
  );

  if (!order) {
    return c.json(
      { message: "Order not found" },
      404
    );
  }

  return c.json(order);
});

export default ordersRoute;