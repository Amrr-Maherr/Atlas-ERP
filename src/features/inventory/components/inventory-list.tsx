import { PageHeader } from "@/components/shared/page-header";
import { InventoryItem } from "../types/inventory.types";
import { InventoryTable } from "./inventory-table";

type InventoryListProps = {
  inventoryData: InventoryItem[];
  isLoading: boolean;
  error: Error | null;
};

export function InventoryList({
  inventoryData,
  isLoading,
  error,
}: InventoryListProps) {
  return (
    <section className="flex flex-col gap-6">
      <PageHeader
        title="Inventory"
        description="Track stock levels, reorder points, and warehouse locations."
      />
      <InventoryTable
        data={inventoryData}
        isLoading={isLoading}
        error={error}
      />
    </section>
  );
}
