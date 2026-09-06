"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getPurchaseOrders, getPurchaseOrder, DeletePurchaseOrder, UpdatePurchaseOrder, CreatePurchaseOrder } from "../api/purchase-orders.api";
import { PurchaseOrder } from "../types/purchase-order.types";
import type { ListQuery } from "../../../lib/list-query";

export function usePurchaseOrders({ page = 1, per_page = 10, search, sort }: ListQuery = {}) {
  return useQuery({
    queryKey: ["purchaseOrders", page, per_page, search, sort],
    queryFn: () => getPurchaseOrders({ page, per_page, search, sort }),
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

type UseCreatePurchaseOrderProps = {
  CreateData: PurchaseOrder;
};

export function useCreatePurchaseOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ CreateData }: UseCreatePurchaseOrderProps) => CreatePurchaseOrder({ CreateData }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["purchaseOrders"],
      });
    },
  });
}

type UseUpdatePurchaseOrderProps = {
  id: string;
  UpdateData: PurchaseOrder;
};

export function useUpdatePurchaseOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, UpdateData }: UseUpdatePurchaseOrderProps) => UpdatePurchaseOrder({ id, UpdateData }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["purchaseOrders"],
      });
    },
  });
}
