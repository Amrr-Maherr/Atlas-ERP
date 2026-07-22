"use client";

import { useState } from "react";
import { toast } from "sonner";
import { DeleteButton } from "@/components/shared/delete-button/delete-button";
import { useDeleteSupplier } from "../hooks/suppliers.hooks";

type DeleteSupplierButtonProps = {
  supplier: { id: string; companyName: string };
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
    <DeleteButton
      entityName="Supplier"
      entityDisplayName={supplier.companyName}
      description="This action cannot be undone and may affect related products and purchase orders associated with this supplier."
      onConfirm={handleConfirm}
      isPending={isPending}
      open={isOpen}
      onOpenChange={setIsOpen}
    />
  );
}
