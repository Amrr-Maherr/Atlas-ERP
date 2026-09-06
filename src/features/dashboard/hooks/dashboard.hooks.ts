"use client";

import { useQuery } from "@tanstack/react-query";
import {
  getDashboardCustomers,
  getDashboardProducts,
  getDashboardSales,
} from "../api/dashboard.api";

export function useDashboardCustomers() {
  return useQuery({
    queryKey: ["dashboard-customers"],
    queryFn: () => getDashboardCustomers(),
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

