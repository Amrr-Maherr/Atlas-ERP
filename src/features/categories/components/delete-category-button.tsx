"use client";

import { toast } from "sonner";
import { useDeleteCategory } from "../hooks/categories.hooks";
import { DeleteCategoryDialog } from "./delete-category-dialog";
import type { Category } from "../types/category.types";

type DeleteCategoryButtonProps = {
  category: Category;
};

export function DeleteCategoryButton({ category }: DeleteCategoryButtonProps) {
  const { isPending, mutate: deleteCategory } = useDeleteCategory();

  function handleConfirm() {
    deleteCategory(
      { id: category.id },
      {
        onSuccess: () => {
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
    <DeleteCategoryDialog
      category={category}
      onConfirm={handleConfirm}
      isPending={isPending}
    />
  );
}
