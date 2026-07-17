"use client";

import { useQuery } from "@tanstack/react-query";
import { getInventory, getInventoryItem } from "../api/inventory.api";

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
