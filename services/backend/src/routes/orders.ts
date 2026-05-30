import { Hono } from "hono";
import {
  customers,
  menuItems,
  orders,
} from "../data/store";

const app = new Hono();

const transitions = {
  pending: ["accepted", "cancelled"],
  accepted: ["preparing"],
  preparing: ["ready"],
  ready: ["completed"],
  completed: [],
  cancelled: [],
};

app.get("/", (c) => {
  const status =
    c.req.query("status");

  if (!status) {
    return c.json(orders);
  }

  return c.json(
    orders.filter(
      (o) => o.status === status
    )
  );
});

app.get("/:id", (c) => {
  const order = orders.find(
    (o) => o.id === c.req.param("id")
  );

  if (!order) {
    return c.json(
      { error: "Not found" },
      404
    );
  }

  return c.json(order);
});

app.post("/", async (c) => {
  const body = await c.req.json();

  const customer =
    customers.find(
      (cst) =>
        cst.id === body.customerId
    );

  if (!customer) {
    return c.json(
      {
        error: "Customer not found",
      },
      400
    );
  }

  let total = 0;

  const items = body.items.map(
    (item: any) => {
      const menuItem =
        menuItems.find(
          (m) =>
            m.id === item.menuItemId
        );

      if (
        !menuItem ||
        !menuItem.available
      ) {
        throw new Error(
          "Unavailable menu item"
        );
      }

      total +=
        menuItem.price *
        item.quantity;

      return {
        menuItemId: menuItem.id,
        quantity: item.quantity,
        price: menuItem.price,
      };
    }
  );

  const order = {
    id: crypto.randomUUID(),
    customerId:
      body.customerId,
    status: "pending",
    total,
    createdAt:
      new Date().toISOString(),
    items,
  };

  orders.push(order);

  return c.json(order, 201);
});

app.patch(
  "/:id/status",
  async (c) => {
    const order = orders.find(
      (o) =>
        o.id === c.req.param("id")
    );

    if (!order) {
      return c.json(
        { error: "Not found" },
        404
      );
    }

    const body =
      await c.req.json();

    const allowed =
      transitions[
        order.status as keyof typeof transitions
      ];

    if (
      !allowed.includes(
        body.status
      )
    ) {
      return c.json(
        {
          error:
            "Invalid status transition",
        },
        400
      );
    }

    order.status =
      body.status;

    return c.json(order);
  }
);

export default app;