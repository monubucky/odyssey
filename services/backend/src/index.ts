import { Hono } from "hono";
import { cors } from "hono/cors";

import orders from "./routes/orders";
import customers from "./routes/customers";
import menu from "./routes/menu";
import settings from "./routes/settings";
import dashboard from "./routes/dashboard";

const app = new Hono();

app.use(
  "*",
  cors({
    origin: "*",
  })
);

app.route(
  "/dashboard",
  dashboard
);

app.route("/orders", orders);

app.route(
  "/customers",
  customers
);

app.route("/menu", menu);

app.route(
  "/settings",
  settings
);

app.get("/", (c) =>
  c.json({
    message:
      "Odyssey Backend Running",
  })
);

export default app;