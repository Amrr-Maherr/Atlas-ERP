import api from "../../../lib/api";
import { extractList, mapId } from "../../../lib/api-response";
import {
  DashboardCategory,
  DashboardCustomer,
  DashboardProduct,
  DashboardSale,
} from "../types/dashboard.types";
import type { BackendOrder } from "../../sales/api/sales.api";

type BackendListCustomer = {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  status: string;
  createdAt?: string;
};

type BackendProduct = {
  _id: string;
  name: string;
  sku: string;
  category?: string;
  price: number;
  costPrice?: number;
  stock?: number;
  minStock?: number;
  reorderLevel?: number;
  status: string;
  brand?: string;
};

export async function getDashboardCustomers(): Promise<DashboardCustomer[]> {
  const { data } = await api.get("/customers", { params: { page: 1, limit: 10 } });
  const { items } = extractList<BackendListCustomer>(data, "customers");
  return items.map((c) => ({
    id: mapId(c).id,
    name: c.name,
    email: c.email,
    city: "",
    totalSpent: 0,
    totalOrders: 0,
    vipStatus: "",
    status: c.status ?? "active",
    createdAt: c.createdAt ?? "",
    lastOrderDate: null,
    customerSince: c.createdAt ?? "",
  }));
}

export async function getDashboardProducts(): Promise<DashboardProduct[]> {
  const { data } = await api.get("/products", { params: { page: 1, limit: 10 } });
  const { items } = extractList<BackendProduct>(data, "products");
  return items.map((p) => ({
    id: mapId(p).id,
    name: p.name,
    sku: p.sku,
    categoryId: p.category ?? "",
    supplierId: "",
    price: p.price,
    costPrice: p.costPrice ?? 0,
    stock: p.stock ?? 0,
    minStock: p.minStock ?? 0,
    reorderLevel: p.reorderLevel ?? 0,
    status: p.status ?? "active",
    brand: p.brand ?? "",
  }));
}

export async function getDashboardSales(): Promise<DashboardSale[]> {
  const { data } = await api.get("/orders", {
    params: { page: 1, limit: 10, type: "sale" },
  });
  const { items } = extractList<BackendOrder>(data, "orders");
  return items.map((o) => ({
    id: mapId(o).id,
    invoiceNumber: o.orderNumber,
    customerId: "",
    customerName: "",
    employeeName: "",
    total: o.totalAmount,
    paidAmount: 0,
    paymentMethod: "",
    paymentStatus: o.paymentStatus ?? "unpaid",
    invoiceStatus: o.status ?? "completed",
    orderStatus: o.status ?? "completed",
    createdAt: o.createdAt ?? "",
    saleDate: o.orderDate ?? o.createdAt ?? "",
    items: (o.items ?? []).map((item) => ({
      productId: "",
      productName: "",
      quantity: item.quantity,
    })),
  }));
}
