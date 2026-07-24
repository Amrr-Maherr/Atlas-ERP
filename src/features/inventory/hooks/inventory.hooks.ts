"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getInventory, getInventoryItem, DeleteInventoryItem, UpdateInventoryItem } from "../api/inventory.api";
import { InventoryItem } from "../types/inventory.types";

export function useInventory() {
  return useQuery({
    queryKey: ["inventory"],
    queryFn: () => getInventory(),
  });
}

type UseInventoryItemProps = {
  id: string;
};

export function useInventoryItem({ id }: UseInventoryItemProps) {
  return useQuery({
    queryKey: ["inventory", id],
    queryFn: () => getInventoryItem({ id }),
  });
}

export function useDeleteInventoryItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: string }) => DeleteInventoryItem({ id }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["inventory"],
      });
    },
  });
}

type UseUpdateInventoryItemProps = {
  id: string;
  UpdateData: InventoryItem;
};

export function useUpdateInventoryItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, UpdateData }: UseUpdateInventoryItemProps) => UpdateInventoryItem({ id, UpdateData }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["inventory"],
      });
    },
  });
}
