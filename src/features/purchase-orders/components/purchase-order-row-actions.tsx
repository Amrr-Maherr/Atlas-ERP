import { ViewDetailsButton } from "@/components/shared/view-details-button";
import type { PurchaseOrder } from "../types/purchase-order.types";
import { DeletePurchaseOrderButton } from "./delete-purchase-order-button";

type PurchaseOrderRowActionsProps = {
  purchaseOrder: PurchaseOrder;
};

export function PurchaseOrderRowActions({
  purchaseOrder,
}: PurchaseOrderRowActionsProps) {
  return (
    <div className="flex items-center justify-end gap-1">
      <ViewDetailsButton
        href={`/dashboard/purchase-orders/${purchaseOrder.id}`}
        label="View purchase order details"
      />
      <DeletePurchaseOrderButton purchaseOrder={purchaseOrder} />
    </div>
  );
}
