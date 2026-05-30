import { Hono } from "hono";
import { settings } from "../data/settings";

const settingsRoute = new Hono();

settingsRoute.get("/", (c) => {
  return c.json(settings);
});

export default settingsRoute;