"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useDeleteSale } from "../hooks/sales.hooks";
import { DeleteSaleDialog } from "./delete-sale-dialog";
import type { Sale } from "../types/sale.types";

type DeleteSaleButtonProps = {
  sale: Sale;
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
    <DeleteSaleDialog
      sale={sale}
      onConfirm={handleConfirm}
      isPending={isPending}
      open={isOpen}
      onOpenChange={setIsOpen}
    />
  );
}
