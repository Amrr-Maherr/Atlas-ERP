import { Category } from "../types/category.types";
import { CategoryDetailsHeader } from "./category-details-header";
import { CategoryDetailsCard } from "./category-details-card";
import { CategoryDetailsSkeleton } from "./category-details-skeleton";
import { CategoryDetailsError } from "./category-details-error";

type CategoryDetailsProps = {
  categoryData: Category | undefined;
  isLoading: boolean;
  error: Error | null;
};

export function CategoryDetails({
  categoryData,
  isLoading,
  error,
}: CategoryDetailsProps) {
  return (
    <section className="flex flex-col gap-6">
      <CategoryDetailsHeader />
      <CategoryDetailsSkeleton isLoading={isLoading} />
      <CategoryDetailsError error={error} />
      {!isLoading && !error && categoryData && (
        <CategoryDetailsCard category={categoryData} />
      )}
    </section>
  );
}
