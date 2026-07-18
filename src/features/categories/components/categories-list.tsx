import { PageHeader } from "@/components/shared/page-header";
import { Category } from "../types/category.types";
import { CategoriesTable } from "./categories-table";

type CategoriesListProps = {
  categoriesData: Category[];
  isLoading: boolean;
  error: Error | null;
  page?: number;
  per_page?: number;
  total?: number;
  onChangePage?: (page: number) => void;
};

export function CategoriesList({
  categoriesData,
  isLoading,
  error,
  page,
  per_page,
  total,
  onChangePage,
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
        page={page}
        per_page={per_page}
        total={total}
        onChangePage={onChangePage}
      />
    </section>
  );
}
