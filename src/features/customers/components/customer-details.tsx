"use client"

import { useState } from "react"
import { Customer } from "../types/customer.types";
import { CustomerDetailsHeader } from "./customer-details-header";
import { CustomerDetailsCard } from "./customer-details-card";
import { CustomerDetailsSkeleton } from "./customer-details-skeleton";
import { CustomerDetailsError } from "./customer-details-error";
import { CustomerEditDialog } from "./customer-edit-dialog";

type CustomerDetailsProps = {
  customerData: Customer | undefined;
  isLoading: boolean;
  error: Error | null;
};

export function CustomerDetails({
  customerData,
  isLoading,
  error,
}: CustomerDetailsProps) {
  const [editOpen, setEditOpen] = useState(false);

  return (
    <section className="flex flex-col gap-6">
      <CustomerDetailsHeader onEdit={() => setEditOpen(true)} />
      <CustomerDetailsSkeleton isLoading={isLoading} />
      <CustomerDetailsError error={error} />
      {!isLoading && !error && customerData && (
        <>
          <CustomerDetailsCard customer={customerData} />
          <CustomerEditDialog
            customer={customerData}
            open={editOpen}
            onOpenChange={setEditOpen}
          />
        </>
      )}
    </section>
  );
}
