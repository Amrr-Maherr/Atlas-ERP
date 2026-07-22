import { ViewDetailsButton } from "@/components/shared/view-details-button";
import type { Category } from "../types/category.types";
import { DeleteCategoryButton } from "./delete-category-button";

type CategoryRowActionsProps = {
  category: Category;
};

export function CategoryRowActions({ category }: CategoryRowActionsProps) {
  return (
    <div className="flex items-center justify-end gap-1">
      <ViewDetailsButton
        href={`/dashboard/categories/${category.id}`}
        label="View category details"
      />
      <DeleteCategoryButton category={category} />
    </div>
  );
}
