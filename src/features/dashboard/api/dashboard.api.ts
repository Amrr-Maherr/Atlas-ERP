import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001",
});

export async function getDashboardCategories() {
  const { data } = await api.get("/categories?_page=1&_per_page=10");
  return data.data;
}

export async function getDashboardCustomers() {
  const { data } = await api.get("/customers?_page=1&_per_page=10");
  return data.data;
}

export async function getDashboardSuppliers() {
  const { data } = await api.get("/suppliers?_page=1&_per_page=10");
  return data.data;
}

export async function getDashboardEmployees() {
  const { data } = await api.get("/employees?_page=1&_per_page=10");
  return data.data;
}

export async function getDashboardProducts() {
  const { data } = await api.get("/products?_page=1&_per_page=10");
  return data.data;
}

export async function getDashboardSales() {
  const { data } = await api.get("/sales?_page=1&_per_page=10");
  return data.data;
}

export async function getDashboardPurchaseOrders() {
  const { data } = await api.get("/purchaseOrders?_page=1&_per_page=10");
  return data.data;
}
