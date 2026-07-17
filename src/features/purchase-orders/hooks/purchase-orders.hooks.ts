"use client";

import { useQuery } from "@tanstack/react-query";
import { getPurchaseOrders, getPurchaseOrder } from "../api/purchase-orders.api";

export function usePurchaseOrders() {
  return useQuery({
    queryKey: ["purchaseOrders"],
    queryFn: () => getPurchaseOrders(),
  });
}

type UsePurchaseOrderProps = {
  id: string;
};

export function usePurchaseOrder({ id }: UsePurchaseOrderProps) {
  return useQuery({
    queryKey: ["purchaseOrders", id],
    queryFn: () => getPurchaseOrder({ id }),
  });
}
