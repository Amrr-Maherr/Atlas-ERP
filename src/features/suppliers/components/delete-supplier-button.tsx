"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useDeleteSupplier } from "../hooks/suppliers.hooks";
import { DeleteSupplierDialog } from "./delete-supplier-dialog";
import type { Supplier } from "../types/supplier.types";

type DeleteSupplierButtonProps = {
  supplier: Supplier;
};

export function DeleteSupplierButton({ supplier }: DeleteSupplierButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { isPending, mutate: deleteSupplier } = useDeleteSupplier();

  function handleConfirm() {
    deleteSupplier(
      { id: supplier.id },
      {
        onSuccess: () => {
          setIsOpen(false);
          toast.success("Supplier deleted", {
            description: `"${supplier.companyName}" was successfully deleted.`,
          });
        },
        onError: () => {
          toast.error("Delete failed", {
            description:
              "Unable to delete this supplier. Please try again later.",
          });
        },
      },
    );
  }

  return (
    <DeleteSupplierDialog
      supplier={supplier}
      onConfirm={handleConfirm}
      isPending={isPending}
      open={isOpen}
      onOpenChange={setIsOpen}
    />
  );
}
