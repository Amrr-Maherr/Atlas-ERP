"use client";
import { useSuppliers } from "@/features/suppliers";
import { SuppliersList } from "@/features/suppliers";

export default function SuppliersPage() {
  const { data, isLoading, error } = useSuppliers();

  return (
    <div className="flex flex-col gap-6 p-6">
      <SuppliersList
        suppliersData={data ?? []}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
}
