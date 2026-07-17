"use client";
import { useCategories } from "@/features/categories";
import { CategoriesList } from "@/features/categories";

export default function CategoriesPage() {
  const { data, isLoading, error } = useCategories();

  return (
    <div className="flex flex-col gap-6 p-6">
      <CategoriesList
        categoriesData={data ?? []}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
}
