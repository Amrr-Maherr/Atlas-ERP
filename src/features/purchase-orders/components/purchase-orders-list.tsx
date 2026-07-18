"use client"

import { useState } from "react"
import { PageHeader } from "@/components/shared/page-header";
import { DataTable } from "@/components/shared/data-table";
import { CreateDialog } from "@/components/shared/create-dialog";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { PurchaseOrder } from "../types/purchase-order.types";
import { purchaseOrderColumns, purchaseOrderExportColumns } from "../columns";
import { PurchaseOrderForm } from "./purchase-order-form";

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
  const [open, setOpen] = useState(false);

  return (
    <section className="flex flex-col gap-6">
      <PageHeader
        title="Purchase Orders"
        description="Manage purchase orders and procurement tracking."
        actions={
          <Button onClick={() => setOpen(true)}>
            <PlusIcon />
            Add Purchase Order
          </Button>
        }
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
      <CreateDialog
        open={open}
        onOpenChange={setOpen}
        title="Add Purchase Order"
        description="Create a new purchase order."
      >
        <PurchaseOrderForm />
      </CreateDialog>
    </section>
  );
}
