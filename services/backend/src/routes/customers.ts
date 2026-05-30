import { Hono } from "hono";
import { customers } from "../data/customers";

const customersRoute = new Hono();

customersRoute.get("/", (c) => {
  return c.json(customers);
});

export default customersRoute;