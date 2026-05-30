import { Hono } from "hono";
import { settings } from "../data/store";

const app = new Hono();

app.get("/", (c) =>
  c.json(settings)
);

app.put("/", async (c) => {
  const body = await c.req.json();

  Object.assign(
    settings,
    body
  );

  return c.json(settings);
});

export default app;