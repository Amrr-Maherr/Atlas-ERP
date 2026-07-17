"use client"

import { InventoryItem } from "../types/inventory.types";
import { InventoryDetailsHeader } from "./inventory-details-header";
import { InventoryDetailsCard } from "./inventory-details-card";
import { InventoryDetailsSkeleton } from "./inventory-details-skeleton";
import { InventoryDetailsError } from "./inventory-details-error";

type InventoryDetailsProps = {
  inventoryItemData: InventoryItem | undefined;
  isLoading: boolean;
  error: Error | null;
};

export function InventoryDetails({
  inventoryItemData,
  isLoading,
  error,
}: InventoryDetailsProps) {
  return (
    <section className="flex flex-col gap-6">
      <InventoryDetailsHeader />
      <InventoryDetailsSkeleton isLoading={isLoading} />
      <InventoryDetailsError error={error} />
      {!isLoading && !error && inventoryItemData && (
        <InventoryDetailsCard item={inventoryItemData} />
      )}
    </section>
  );
}
