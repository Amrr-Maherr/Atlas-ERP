import { PageHeader } from "@/components/shared/page-header";
import { PurchaseOrder } from "../types/purchase-order.types";
import { PurchaseOrdersTable } from "./purchase-orders-table";

type PurchaseOrdersListProps = {
  purchaseOrdersData: PurchaseOrder[];
  isLoading: boolean;
  error: Error | null;
};

export function PurchaseOrdersList({
  purchaseOrdersData,
  isLoading,
  error,
}: PurchaseOrdersListProps) {
  return (
    <section className="flex flex-col gap-6">
      <PageHeader
        title="Purchase Orders"
        description="Manage purchase orders and procurement tracking."
      />
      <PurchaseOrdersTable
        data={purchaseOrdersData}
        isLoading={isLoading}
        error={error}
      />
    </section>
  );
}
