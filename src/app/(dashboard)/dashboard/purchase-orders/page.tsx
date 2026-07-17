"use client";

import { usePurchaseOrders } from "@/features/purchase-orders";
import { PurchaseOrdersList } from "@/features/purchase-orders";

export default function PurchaseOrdersPage() {
  const { data, isLoading, error } = usePurchaseOrders();

  return (
    <div className="flex flex-col gap-6 p-6">
      <PurchaseOrdersList
        purchaseOrdersData={data ?? []}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
}
