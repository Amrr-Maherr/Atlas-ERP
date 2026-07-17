"use client"

import { PurchaseOrder } from "../types/purchase-order.types";
import { PurchaseOrderDetailsHeader } from "./purchase-order-details-header";
import { PurchaseOrderDetailsCard } from "./purchase-order-details-card";
import { PurchaseOrderDetailsSkeleton } from "./purchase-order-details-skeleton";
import { PurchaseOrderDetailsError } from "./purchase-order-details-error";

type PurchaseOrderDetailsProps = {
  purchaseOrderData: PurchaseOrder | undefined;
  isLoading: boolean;
  error: Error | null;
};

export function PurchaseOrderDetails({
  purchaseOrderData,
  isLoading,
  error,
}: PurchaseOrderDetailsProps) {
  return (
    <section className="flex flex-col gap-6">
      <PurchaseOrderDetailsHeader />
      <PurchaseOrderDetailsSkeleton isLoading={isLoading} />
      <PurchaseOrderDetailsError error={error} />
      {!isLoading && !error && purchaseOrderData && (
        <PurchaseOrderDetailsCard purchaseOrder={purchaseOrderData} />
      )}
    </section>
  );
}
