"use client";

import { useState } from "react";
import { toast } from "sonner";
import { DeleteButton } from "@/components/shared/delete-button/delete-button";
import { useDeleteCategory } from "../hooks/categories.hooks";

type DeleteCategoryButtonProps = {
  category: { id: string; name: string };
};

export function DeleteCategoryButton({ category }: DeleteCategoryButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { isPending, mutate: deleteCategory } = useDeleteCategory();

  function handleConfirm() {
    deleteCategory(
      { id: category.id },
      {
        onSuccess: () => {
          setIsOpen(false);
          toast.success("Category deleted", {
            description: `"${category.name}" was successfully deleted.`,
          });
        },
        onError: () => {
          toast.error("Delete failed", {
            description:
              "Unable to delete this category. Please try again later.",
          });
        },
      },
    );
  }

  return (
    <DeleteButton
      entityName="Category"
      entityDisplayName={category.name}
      description="This action cannot be undone and may affect related products associated with this category."
      onConfirm={handleConfirm}
      isPending={isPending}
      open={isOpen}
      onOpenChange={setIsOpen}
    />
  );
}
