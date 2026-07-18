"use client";
import { useState } from "react";
import { useCategories } from "@/features/categories";
import { CategoriesList } from "@/features/categories";

export default function CategoriesPage() {
  const [page, setPage] = useState(1);
  const per_page = 10;
  const { data, isLoading, error } = useCategories({ page, per_page });

  return (
    <div className="flex flex-col gap-6 p-6">
      <CategoriesList
        categoriesData={data?.items ?? []}
        isLoading={isLoading}
        error={error}
        page={page}
        per_page={per_page}
        total={data?.total ?? 0}
        onChangePage={setPage}
      />
    </div>
  );
}
