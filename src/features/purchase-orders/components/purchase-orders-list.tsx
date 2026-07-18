import { PageHeader } from "@/components/shared/page-header";
import { DataTable } from "@/components/shared/data-table";
import { PurchaseOrder } from "../types/purchase-order.types";
import { purchaseOrderColumns, purchaseOrderExportColumns } from "../columns";

type PurchaseOrdersListProps = {
  purchaseOrdersData: PurchaseOrder[];
  isLoading: boolean;
  error: Error | null;
  page?: number;
  per_page?: number;
  total?: number;
  onChangePage?: (page: number) => void;
};

export function PurchaseOrdersList({
  purchaseOrdersData,
  isLoading,
  error,
  page,
  per_page,
  total,
  onChangePage,
}: PurchaseOrdersListProps) {
  return (
    <section className="flex flex-col gap-6">
      <PageHeader
        title="Purchase Orders"
        description="Manage purchase orders and procurement tracking."
      />
      <DataTable
        columns={purchaseOrderColumns}
        data={purchaseOrdersData}
        isLoading={isLoading}
        error={error}
        page={page}
        per_page={per_page}
        total={total}
        onChangePage={onChangePage}
        exportColumns={purchaseOrderExportColumns}
        exportFilename="purchase-orders"
        emptyTitle="No purchase orders yet"
        emptyDescription="Create your first purchase order to get started."
      />
    </section>
  );
}
