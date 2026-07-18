import { PageHeader } from "@/components/shared/page-header";
import { DataTable } from "@/components/shared/data-table";
import { InventoryItem } from "../types/inventory.types";
import { inventoryColumns, inventoryExportColumns } from "../columns";

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
      <DataTable
        columns={inventoryColumns}
        data={inventoryData}
        isLoading={isLoading}
        error={error}
        page={page}
        per_page={per_page}
        total={total}
        onChangePage={onChangePage}
        exportColumns={inventoryExportColumns}
        exportFilename="inventory"
        emptyTitle="No inventory items"
        emptyDescription="Add products to your inventory to get started."
      />
    </section>
  );
}
