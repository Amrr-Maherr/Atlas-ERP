"use client";

import { usePurchaseOrder } from "@/features/purchase-orders";
import { PurchaseOrderDetails } from "@/features/purchase-orders";
import { useParams } from "next/navigation";

export default function PurchaseOrderDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error } = usePurchaseOrder({ id });

  return (
    <div className="flex flex-col gap-6 p-6">
      <PurchaseOrderDetails
        purchaseOrderData={data}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
}
