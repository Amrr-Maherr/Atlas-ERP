import { PageHeader } from "@/components/shared/page-header";
import { InventoryItem } from "../types/inventory.types";
import { InventoryTable } from "./inventory-table";

type InventoryListProps = {
  inventoryData: InventoryItem[];
  isLoading: boolean;
  error: Error | null;
  page?: number;
  per_page?: number;
  total?: number;
  onChangePage?: (page: number) => void;
};

export function InventoryList({
  inventoryData,
  isLoading,
  error,
  page,
  per_page,
  total,
  onChangePage,
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
        page={page}
        per_page={per_page}
        total={total}
        onChangePage={onChangePage}
      />
    </section>
  );
}
