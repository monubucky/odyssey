import { Hono } from "hono";
import { menuItems } from "../data/menu";

const menuRoute = new Hono();

menuRoute.get("/", (c) => {
  return c.json(menuItems);
});

export default menuRoute;