"use client"

import { useState } from "react"
import { Category } from "../types/category.types";
import { CategoryDetailsHeader } from "./category-details-header";
import { CategoryDetailsCard } from "./category-details-card";
import { CategoryDetailsSkeleton } from "./category-details-skeleton";
import { CategoryDetailsError } from "./category-details-error";
import { CategoryEditDialog } from "./category-edit-dialog";

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
  const [editOpen, setEditOpen] = useState(false);

  return (
    <section className="flex flex-col gap-6">
      <CategoryDetailsHeader onEdit={() => setEditOpen(true)} />
      <CategoryDetailsSkeleton isLoading={isLoading} />
      <CategoryDetailsError error={error} />
      {!isLoading && !error && categoryData && (
        <>
          <CategoryDetailsCard category={categoryData} />
          <CategoryEditDialog
            category={categoryData}
            open={editOpen}
            onOpenChange={setEditOpen}
          />
        </>
      )}
    </section>
  );
}
