"use client"

import { useState } from "react"
import { PageHeader } from "@/components/shared/page-header";
import { DataTable } from "@/components/shared/data-table";
import { CreateDialog } from "@/components/shared/create-dialog";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { Sale } from "../types/sale.types";
import { saleColumns, saleExportColumns } from "../columns";
import { SaleForm } from "./sale-form";

type SalesListProps = {
  salesData: Sale[];
  isLoading: boolean;
  error: Error | null;
  page?: number;
  per_page?: number;
  total?: number;
  onChangePage?: (page: number) => void;
};

export function SalesList({
  salesData,
  isLoading,
  error,
  page,
  per_page,
  total,
  onChangePage,
}: SalesListProps) {
  const [open, setOpen] = useState(false);

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
      >
        <SaleForm />
      </CreateDialog>
    </section>
  );
}
