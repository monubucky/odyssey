import {
  Customer,
  MenuCategory,
  MenuItem,
  Order,
} from "../types";

export const categories: MenuCategory[] = [
  {
    id: "cat-1",
    name: "Burgers",
  },
  {
    id: "cat-2",
    name: "Pizzas",
  },
];

export const menuItems: MenuItem[] = [
  {
    id: "item-1",
    categoryId: "cat-1",
    name: "Classic Burger",
    price: 12.99,
    available: true,
  },
  {
    id: "item-2",
    categoryId: "cat-2",
    name: "Pepperoni Pizza",
    price: 18.5,
    available: true,
  },
];

export const customers: Customer[] = [
  {
    id: "cust-1",
    name: "John Doe",
    email: "john@test.com",
  },
];

export const orders: Order[] = [];

export const settings = {
  prepTime: 20,
  autoAccept: false,
  acceptingOrders: true,
};