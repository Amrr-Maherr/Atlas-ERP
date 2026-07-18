"use client"

import { useState } from "react"
import { PageHeader } from "@/components/shared/page-header";
import { DataTable } from "@/components/shared/data-table";
import { CreateDialog } from "@/components/shared/create-dialog";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { Category } from "../types/category.types";
import { categoryColumns, categoryExportColumns } from "../columns";
import { CategoryForm } from "./category-form";

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
  const [open, setOpen] = useState(false);

  return (
    <section className="flex flex-col gap-6">
      <PageHeader
        title="Categories"
        description="Create, edit, and organize product categories."
        actions={
          <Button onClick={() => setOpen(true)}>
            <PlusIcon />
            Add Category
          </Button>
        }
      />
      <DataTable
        columns={categoryColumns}
        data={categoriesData}
        isLoading={isLoading}
        error={error}
        page={page}
        per_page={per_page}
        total={total}
        onChangePage={onChangePage}
        exportColumns={categoryExportColumns}
        exportFilename="categories"
        emptyTitle="No categories yet"
        emptyDescription="Create your first category to get started."
      />
      <CreateDialog
        open={open}
        onOpenChange={setOpen}
        title="Add Category"
        description="Create a new product category."
      >
        <CategoryForm />
      </CreateDialog>
    </section>
  );
}
