"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getInventory, getInventoryItem, DeleteInventoryItem, UpdateInventoryItem, CreateInventoryItem } from "../api/inventory.api";
import { InventoryItem } from "../types/inventory.types";
import type { ListQuery } from "../../../lib/list-query";

export function useInventory({ page = 1, per_page = 10, search, sort }: ListQuery = {}) {
  return useQuery({
    queryKey: ["inventory", page, per_page, search, sort],
    queryFn: () => getInventory({ page, per_page, search, sort }),
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

type UseCreateInventoryItemProps = {
  CreateData: InventoryItem;
};

export function useCreateInventoryItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ CreateData }: UseCreateInventoryItemProps) => CreateInventoryItem({ CreateData }),

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
