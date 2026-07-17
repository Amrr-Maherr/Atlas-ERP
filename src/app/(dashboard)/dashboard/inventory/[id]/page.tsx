"use client";

import { useInventoryItem } from "@/features/inventory";
import { InventoryDetails } from "@/features/inventory";
import { useParams } from "next/navigation";

export default function InventoryDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error } = useInventoryItem({ id });

  return (
    <div className="flex flex-col gap-6 p-6">
      <InventoryDetails
        inventoryItemData={data}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
}
