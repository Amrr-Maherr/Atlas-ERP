"use client";
import { useState } from "react";
import { useSuppliers } from "@/features/suppliers";
import { SuppliersList } from "@/features/suppliers";

export default function SuppliersPage() {
  const [page, setPage] = useState(1);
  const per_page = 10;
  const { data, isLoading, error } = useSuppliers({ page, per_page });

  return (
    <div className="flex flex-col gap-6 p-6">
      <SuppliersList
        suppliersData={data?.items ?? []}
        isLoading={isLoading}
        error={error}
        page={page}
        per_page={per_page}
        total={data?.total ?? 0}
        onChangePage={setPage}
      />
    </div>
  );
}
