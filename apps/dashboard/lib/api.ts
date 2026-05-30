const API_URL = "http://localhost:8787";

export async function getOrders() {
  const res = await fetch(`${API_URL}/orders`);
  return res.json();
}

export async function getCustomers() {
  const res = await fetch(`${API_URL}/customers`);
  return res.json();
}

export async function getMenu() {
  const res = await fetch(`${API_URL}/menu`);
  return res.json();
}