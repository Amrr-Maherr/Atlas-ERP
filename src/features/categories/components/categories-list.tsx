import { PageHeader } from "@/components/shared/page-header";
import { Category } from "../types/category.types";
import { CategoriesTable } from "./categories-table";

type CategoriesListProps = {
  categoriesData: Category[];
  isLoading: boolean;
  error: Error | null;
};

export function CategoriesList({
  categoriesData,
  isLoading,
  error,
}: CategoriesListProps) {
  return (
    <section className="flex flex-col gap-6">
      <PageHeader
        title="Categories"
        description="Create, edit, and organize product categories."
      />
      <CategoriesTable
        data={categoriesData}
        isLoading={isLoading}
        error={error}
      />
    </section>
  );
}
