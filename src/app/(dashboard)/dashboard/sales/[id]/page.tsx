"use client";
import { useSale } from "@/features/sales";
import { SaleDetails } from "@/features/sales";
import { useParams } from "next/navigation";

export default function SaleDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error } = useSale({ id });

  return (
    <div className="flex flex-col gap-6 p-6">
      <SaleDetails
        saleData={data}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
}
