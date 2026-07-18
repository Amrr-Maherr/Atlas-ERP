"use client"

import { useState } from "react"
import { PageHeader } from "@/components/shared/page-header";
import { DataTable } from "@/components/shared/data-table";
import { CreateDialog } from "@/components/shared/create-dialog";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { Customer } from "../types/customer.types";
import { customerColumns, customerExportColumns } from "../columns";
import { CustomerForm } from "./customer-form";

type CustomersListProps = {
  customersData: Customer[];
  isLoading: boolean;
  error: Error | null;
  page?: number;
  per_page?: number;
  total?: number;
  onChangePage?: (page: number) => void;
};

export function CustomersList({
  customersData,
  isLoading,
  error,
  page,
  per_page,
  total,
  onChangePage,
}: CustomersListProps) {
  const [open, setOpen] = useState(false);

  return (
    <section className="flex flex-col gap-6">
      <PageHeader
        title="Customers"
        description="Manage customer relationships and account details."
        actions={
          <Button onClick={() => setOpen(true)}>
            <PlusIcon />
            Add Customer
          </Button>
        }
      />
      <DataTable
        columns={customerColumns}
        data={customersData}
        isLoading={isLoading}
        error={error}
        page={page}
        per_page={per_page}
        total={total}
        onChangePage={onChangePage}
        exportColumns={customerExportColumns}
        exportFilename="customers"
        emptyTitle="No customers yet"
        emptyDescription="Add your first customer to get started."
      />
      <CreateDialog
        open={open}
        onOpenChange={setOpen}
        title="Add Customer"
        description="Create a new customer account."
      >
        <CustomerForm />
      </CreateDialog>
    </section>
  );
}
