"use client";

import { useState } from "react";
import { toast } from "sonner";
import { PageHeader } from "@/components/shared/page-header";
import { DataTable } from "@/components/shared/data-table";
import { CreateDialog } from "@/components/shared/create-dialog";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { Sale } from "../types/sale.types";
import { saleColumns, saleExportColumns } from "../columns";
import { SaleForm } from "./sale-form";
import { useCreateSale } from "../hooks/sales.hooks";

type SalesListProps = {
  salesData: Sale[];
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

export function SalesList({
  salesData,
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
}: SalesListProps) {
  const [open, setOpen] = useState(false);
  const { isPending, mutate: createSale } = useCreateSale();

  function handleSave() {
    createSale(
      { CreateData: {} as Sale },
      {
        onSuccess: () => {
          setOpen(false);
          toast.success("Sale created", {
            description: "New sale was successfully created.",
          });
        },
        onError: () => {
          toast.error("Create failed", {
            description: "Unable to create this sale. Please try again later.",
          });
        },
      },
    );
  }

  return (
    <section className="flex flex-col gap-6">
      <PageHeader
        title="Sales"
        description="View and manage sales invoices and transactions."
        actions={
          <Button onClick={() => setOpen(true)}>
            <PlusIcon />
            Add Sale
          </Button>
        }
      />
      <DataTable
        columns={saleColumns}
        data={salesData}
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
        exportColumns={saleExportColumns}
        exportFilename="sales"
        emptyTitle="No sales yet"
        emptyDescription="Your sales will appear here."
      />
      <CreateDialog
        open={open}
        onOpenChange={setOpen}
        title="Add Sale"
        description="Create a new sale transaction."
        onSave={handleSave}
        saveLabel={isPending ? "Creating..." : "Save"}
      >
        <SaleForm />
      </CreateDialog>
    </section>
  );
}
