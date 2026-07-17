"use client";
import { useSales } from "@/features/sales";
import { SalesList } from "@/features/sales";

export default function SalesPage() {
  const { data, isLoading, error } = useSales();

  return (
    <div className="flex flex-col gap-6 p-6">
      <SalesList
        salesData={data ?? []}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
}
