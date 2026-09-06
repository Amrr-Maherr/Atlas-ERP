"use client";

import { useState } from "react";
import { toast } from "sonner";
import { PageHeader } from "@/components/shared/page-header";
import { DataTable } from "@/components/shared/data-table";
import { CreateDialog } from "@/components/shared/create-dialog";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { PurchaseOrder } from "../types/purchase-order.types";
import { purchaseOrderColumns, purchaseOrderExportColumns } from "../columns";
import { PurchaseOrderForm } from "./purchase-order-form";
import { useCreatePurchaseOrder } from "../hooks/purchase-orders.hooks";

type PurchaseOrdersListProps = {
  purchaseOrdersData: PurchaseOrder[];
  isLoading: boolean;
  error: Error | null;
  page?: number;
  per_page?: number;
  total?: number;
  onChangePage?: (page: number) => void;
  search?: string;
  sort?: string;
  onSearch?: (search: string) => void;
  onSort?: (sort: string) => void;
};

export function PurchaseOrdersList({
  purchaseOrdersData,
  isLoading,
  error,
  page,
  per_page,
  total,
  onChangePage,
  search,
  sort,
  onSearch,
  onSort,
}: PurchaseOrdersListProps) {
  const [open, setOpen] = useState(false);
  const { isPending, mutate: createPurchaseOrder } = useCreatePurchaseOrder();

  function handleSave() {
    createPurchaseOrder(
      { CreateData: {} as PurchaseOrder },
      {
        onSuccess: () => {
          setOpen(false);
          toast.success("Purchase order created", {
            description: "New purchase order was successfully created.",
          });
        },
        onError: () => {
          toast.error("Create failed", {
            description:
              "Unable to create this purchase order. Please try again later.",
          });
        },
      },
    );
  }

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
        search={search}
        sort={sort}
        onSearch={onSearch}
        onSort={onSort}
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
        onSave={handleSave}
        saveLabel={isPending ? "Creating..." : "Save"}
      >
        <PurchaseOrderForm />
      </CreateDialog>
    </section>
  );
}
