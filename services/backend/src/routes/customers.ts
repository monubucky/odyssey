import { Hono } from "hono";
import {
  customers,
  orders,
} from "../data/store";

const app = new Hono();

app.get("/", (c) => {
  const result = customers.map(
    (customer) => {
      const customerOrders =
        orders.filter(
          (o) =>
            o.customerId === customer.id
        );

      return {
        ...customer,
        orderCount:
          customerOrders.length,
        spend:
          customerOrders.reduce(
            (sum, order) =>
              sum + order.total,
            0
          ),
        recentOrders:
          customerOrders.slice(-5),
      };
    }
  );

  return c.json(result);
});

export default app;