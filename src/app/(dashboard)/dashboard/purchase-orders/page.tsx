"use client";
import { useState } from "react";
import { usePurchaseOrders } from "@/features/purchase-orders";
import { PurchaseOrdersList } from "@/features/purchase-orders";

export default function PurchaseOrdersPage() {
  const [page, setPage] = useState(1);
  const per_page = 10;
  const { data, isLoading, error } = usePurchaseOrders({ page, per_page });

  return (
    <div className="flex flex-col gap-6 p-6">
      <PurchaseOrdersList
        purchaseOrdersData={data?.items ?? []}
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
