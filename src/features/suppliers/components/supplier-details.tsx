"use client"

import { useState } from "react"
import { Supplier } from "../types/supplier.types";
import { SupplierDetailsHeader } from "./supplier-details-header";
import { SupplierDetailsCard } from "./supplier-details-card";
import { SupplierDetailsSkeleton } from "./supplier-details-skeleton";
import { SupplierDetailsError } from "./supplier-details-error";
import { SupplierEditDialog } from "./supplier-edit-dialog";

type SupplierDetailsProps = {
  supplierData: Supplier | undefined;
  isLoading: boolean;
  error: Error | null;
};

export function SupplierDetails({
  supplierData,
  isLoading,
  error,
}: SupplierDetailsProps) {
  const [editOpen, setEditOpen] = useState(false);

  return (
    <section className="flex flex-col gap-6">
      <SupplierDetailsHeader onEdit={() => setEditOpen(true)} />
      <SupplierDetailsSkeleton isLoading={isLoading} />
      <SupplierDetailsError error={error} />
      {!isLoading && !error && supplierData && (
        <>
          <SupplierDetailsCard supplier={supplierData} />
          <SupplierEditDialog
            supplier={supplierData}
            open={editOpen}
            onOpenChange={setEditOpen}
          />
        </>
      )}
    </section>
  );
}
