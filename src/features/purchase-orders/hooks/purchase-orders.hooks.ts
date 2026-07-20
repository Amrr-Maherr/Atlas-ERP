"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getPurchaseOrders, getPurchaseOrder, DeletePurchaseOrder } from "../api/purchase-orders.api";

export function usePurchaseOrders({ page = 1, per_page = 10 } = {}) {
  return useQuery({
    queryKey: ["purchaseOrders", page, per_page],
    queryFn: () => getPurchaseOrders({ page, per_page }),
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

export function useDeletePurchaseOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: string }) => DeletePurchaseOrder({ id }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["purchaseOrders"],
      });
    },
  });
}
