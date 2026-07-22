"use client";

import { useState } from "react";
import { toast } from "sonner";
import { DeleteButton } from "@/components/shared/delete-button/delete-button";
import { useDeletePurchaseOrder } from "../hooks/purchase-orders.hooks";

type DeletePurchaseOrderButtonProps = {
  purchaseOrder: { id: string; poNumber: string };
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
    <DeleteButton
      entityName="Purchase order"
      entityDisplayName={purchaseOrder.poNumber}
      description="This action cannot be undone and may affect related inventory updates associated with this purchase order."
      onConfirm={handleConfirm}
      isPending={isPending}
      open={isOpen}
      onOpenChange={setIsOpen}
    />
  );
}
