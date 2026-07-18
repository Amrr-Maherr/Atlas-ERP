"use client";

import { useQuery } from "@tanstack/react-query";
import {
  getDashboardCategories,
  getDashboardCustomers,
  getDashboardSuppliers,
  getDashboardEmployees,
  getDashboardProducts,
  getDashboardSales,
  getDashboardPurchaseOrders,
} from "../api/dashboard.api";

export function useDashboardCategories() {
  return useQuery({
    queryKey: ["dashboard-categories"],
    queryFn: () => getDashboardCategories(),
  });
}

export function useDashboardCustomers() {
  return useQuery({
    queryKey: ["dashboard-customers"],
    queryFn: () => getDashboardCustomers(),
  });
}

export function useDashboardSuppliers() {
  return useQuery({
    queryKey: ["dashboard-suppliers"],
    queryFn: () => getDashboardSuppliers(),
  });
}

export function useDashboardEmployees() {
  return useQuery({
    queryKey: ["dashboard-employees"],
    queryFn: () => getDashboardEmployees(),
  });
}

export function useDashboardProducts() {
  return useQuery({
    queryKey: ["dashboard-products"],
    queryFn: () => getDashboardProducts(),
  });
}

export function useDashboardSales() {
  return useQuery({
    queryKey: ["dashboard-sales"],
    queryFn: () => getDashboardSales(),
  });
}

export function useDashboardPurchaseOrders() {
  return useQuery({
    queryKey: ["dashboard-purchase-orders"],
    queryFn: () => getDashboardPurchaseOrders(),
  });
}
