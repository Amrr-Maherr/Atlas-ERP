"use client";

import { useInventory } from "@/features/inventory";
import { InventoryList } from "@/features/inventory";

export default function InventoryPage() {
  const { data, isLoading, error } = useInventory();

  return (
    <div className="flex flex-col gap-6 p-6">
      <InventoryList
        inventoryData={data ?? []}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
}
