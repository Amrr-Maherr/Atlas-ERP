"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useDeletePurchaseOrder } from "../hooks/purchase-orders.hooks";
import { DeletePurchaseOrderDialog } from "./delete-purchase-order-dialog";
import type { PurchaseOrder } from "../types/purchase-order.types";

type DeletePurchaseOrderButtonProps = {
  purchaseOrder: PurchaseOrder;
};

export function DeletePurchaseOrderButton({
  purchaseOrder,
}: DeletePurchaseOrderButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { isPending, mutate: deletePurchaseOrder } =
    useDeletePurchaseOrder();

  function handleConfirm() {
    deletePurchaseOrder(
      { id: purchaseOrder.id },
      {
        onSuccess: () => {
          setIsOpen(false);
          toast.success("Purchase order deleted", {
            description: `"${purchaseOrder.poNumber}" was successfully deleted.`,
          });
        },
        onError: () => {
          toast.error("Delete failed", {
            description:
              "Unable to delete this purchase order. Please try again later.",
          });
        },
      },
    );
  }

  return (
    <DeletePurchaseOrderDialog
      purchaseOrder={purchaseOrder}
      onConfirm={handleConfirm}
      isPending={isPending}
      open={isOpen}
      onOpenChange={setIsOpen}
    />
  );
}
