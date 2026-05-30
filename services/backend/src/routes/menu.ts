import { Hono } from "hono";
import {
  categories,
  menuItems,
} from "../data/store";

const app = new Hono();

app.get("/", (c) => {
  return c.json({
    categories,
    items: menuItems,
  });
});

app.get("/categories", (c) =>
  c.json(categories)
);

app.get("/items", (c) =>
  c.json(menuItems)
);

app.post("/items", async (c) => {
  const body = await c.req.json();

  const item = {
    id: crypto.randomUUID(),
    ...body,
  };

  menuItems.push(item);

  return c.json(item, 201);
});

app.put("/items/:id", async (c) => {
  const id = c.req.param("id");

  const body = await c.req.json();

  const item = menuItems.find(
    (i) => i.id === id
  );

  if (!item) {
    return c.json(
      { error: "Not found" },
      404
    );
  }

  Object.assign(item, body);

  return c.json(item);
});

export default app;