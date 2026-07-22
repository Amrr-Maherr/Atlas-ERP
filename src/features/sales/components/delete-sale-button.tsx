"use client";

import { useState } from "react";
import { toast } from "sonner";
import { DeleteButton } from "@/components/shared/delete-button/delete-button";
import { useDeleteSale } from "../hooks/sales.hooks";

type DeleteSaleButtonProps = {
  sale: { id: string; invoiceNumber: string };
};

export function DeleteSaleButton({ sale }: DeleteSaleButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { isPending, mutate: deleteSale } = useDeleteSale();

  function handleConfirm() {
    deleteSale(
      { id: sale.id },
      {
        onSuccess: () => {
          setIsOpen(false);
          toast.success("Sale deleted", {
            description: `"${sale.invoiceNumber}" was successfully deleted.`,
          });
        },
        onError: () => {
          toast.error("Delete failed", {
            description:
              "Unable to delete this sale. Please try again later.",
          });
        },
      },
    );
  }

  return (
    <DeleteButton
      entityName="Sale"
      entityDisplayName={sale.invoiceNumber}
      description="This action cannot be undone and may affect related inventory and payment records associated with this sale."
      onConfirm={handleConfirm}
      isPending={isPending}
      open={isOpen}
      onOpenChange={setIsOpen}
    />
  );
}
