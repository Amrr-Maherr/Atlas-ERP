"use client";

import { useState } from "react";
import { toast } from "sonner";
import { DeleteButton } from "@/components/shared/delete-button/delete-button";
import useDeleteProduct from "../hooks/useDeleteProduct";

type DeleteProductButtonProps = {
  product: { id: string; name: string };
};

export function DeleteProductButton({ product }: DeleteProductButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { isPending, mutate: deleteProduct } = useDeleteProduct();

  function handleConfirm() {
    deleteProduct(
      { id: product.id },
      {
        onSuccess: () => {
          setIsOpen(false);
          toast.success("Product deleted", {
            description: `"${product.name}" was successfully deleted.`,
          });
        },
        onError: () => {
          toast.error("Delete failed", {
            description:
              "Unable to delete this product. Please try again later.",
          });
        },
      },
    );
  }

  return (
    <DeleteButton
      entityName="Product"
      entityDisplayName={product.name}
      description="This action cannot be undone and may affect related inventory and sale records."
      onConfirm={handleConfirm}
      isPending={isPending}
      open={isOpen}
      onOpenChange={setIsOpen}
    />
  );
}
