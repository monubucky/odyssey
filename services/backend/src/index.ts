import { Hono } from "hono";
import { cors } from "hono/cors";

import ordersRoute from "./routes/order";
import customersRoute from "./routes/customers";
import menuRoute from "./routes/menu";
import settingsRoute from "./routes/settings";

const app = new Hono();

app.use(
  "*",
  cors({
    origin: "*",
  })
);

app.get("/", (c) => {
  return c.json({
    message: "Odyssey Backend Running",
  });
});

app.route("/orders", ordersRoute);
app.route("/customers", customersRoute);
app.route("/menu", menuRoute);
app.route("/settings", settingsRoute);

export default app;