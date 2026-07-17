"use client";
import { useSupplier } from "@/features/suppliers";
import { SupplierDetails } from "@/features/suppliers";
import { useParams } from "next/navigation";

export default function SupplierDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error } = useSupplier({ id });

  return (
    <div className="flex flex-col gap-6 p-6">
      <SupplierDetails
        supplierData={data}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
}
