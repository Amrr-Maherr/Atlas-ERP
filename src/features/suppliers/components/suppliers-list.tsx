"use client"

import { useState } from "react"
import { toast } from "sonner"
import { PageHeader } from "@/components/shared/page-header";
import { DataTable } from "@/components/shared/data-table";
import { CreateDialog } from "@/components/shared/create-dialog";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { Supplier } from "../types/supplier.types";
import { supplierColumns, supplierExportColumns } from "../columns";
import { SupplierForm } from "./supplier-form";
import { useCreateSupplier } from "../hooks/suppliers.hooks";

type SuppliersListProps = {
  suppliersData: Supplier[];
  isLoading: boolean;
  error: Error | null;
  page?: number;
  per_page?: number;
  total?: number;
  onChangePage?: (page: number) => void;
};

export function SuppliersList({
  suppliersData,
  isLoading,
  error,
  page,
  per_page,
  total,
  onChangePage,
}: SuppliersListProps) {
  const [open, setOpen] = useState(false);
  const { isPending, mutate: createSupplier } = useCreateSupplier();

  function handleSave() {
    createSupplier(
      { CreateData: {} as Supplier },
      {
        onSuccess: () => {
          setOpen(false);
          toast.success("Supplier created", {
            description: "New supplier was successfully created.",
          });
        },
        onError: () => {
          toast.error("Create failed", {
            description: "Unable to create this supplier. Please try again later.",
          });
        },
      },
    );
  }

  return (
    <section className="flex flex-col gap-6">
      <PageHeader
        title="Suppliers"
        description="Manage supplier relationships and procurement details."
        actions={
          <Button onClick={() => setOpen(true)}>
            <PlusIcon />
            Add Supplier
          </Button>
        }
      />
      <DataTable
        columns={supplierColumns}
        data={suppliersData}
        isLoading={isLoading}
        error={error}
        page={page}
        per_page={per_page}
        total={total}
        onChangePage={onChangePage}
        exportColumns={supplierExportColumns}
        exportFilename="suppliers"
        emptyTitle="No suppliers yet"
        emptyDescription="Add your first supplier to get started."
      />
      <CreateDialog
        open={open}
        onOpenChange={setOpen}
        title="Add Supplier"
        description="Create a new supplier record."
        onSave={handleSave}
        saveLabel={isPending ? "Creating..." : "Save"}
      >
        <SupplierForm />
      </CreateDialog>
    </section>
  );
}
