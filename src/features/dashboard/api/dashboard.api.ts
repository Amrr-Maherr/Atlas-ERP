import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001",
});

export async function getDashboardCategories() {
  const { data } = await api.get("/categories");
  return data;
}

export async function getDashboardCustomers() {
  const { data } = await api.get("/customers");
  return data;
}

export async function getDashboardSuppliers() {
  const { data } = await api.get("/suppliers");
  return data;
}

export async function getDashboardEmployees() {
  const { data } = await api.get("/employees");
  return data;
}

export async function getDashboardProducts() {
  const { data } = await api.get("/products");
  return data;
}

export async function getDashboardSales() {
  const { data } = await api.get("/sales");
  return data;
}

export async function getDashboardPurchaseOrders() {
  const { data } = await api.get("/purchaseOrders");
  return data;
}
