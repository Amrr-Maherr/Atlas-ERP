"use client";

import { useState } from "react";
import { toast } from "sonner";
import useDeleteProduct from "../hooks/useDeleteProduct";
import { DeleteProductDialog } from "./delete-product-dialog";
import type { Product } from "../types/product.types";

type DeleteProductButtonProps = {
  product: Product;
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
    <DeleteProductDialog
      product={product}
      onConfirm={handleConfirm}
      isPending={isPending}
      open={isOpen}
      onOpenChange={setIsOpen}
    />
  );
}
