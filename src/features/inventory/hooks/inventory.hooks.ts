"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getInventory, getInventoryItem, DeleteInventoryItem } from "../api/inventory.api";

export function useInventory({ page = 1, per_page = 10 } = {}) {
  return useQuery({
    queryKey: ["inventory", page, per_page],
    queryFn: () => getInventory({ page, per_page }),
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
