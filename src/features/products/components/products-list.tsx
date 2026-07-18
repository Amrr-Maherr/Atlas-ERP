"use client"

import { useState } from "react"
import { PageHeader } from "@/components/shared/page-header";
import { DataTable } from "@/components/shared/data-table";
import { CreateDialog } from "@/components/shared/create-dialog";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { Product } from "../types/product.types";
import { productColumns, productExportColumns } from "../columns";
import { ProductForm } from "./product-form";

type ProductsListProps = {
  productsData: Product[];
  isLoading: boolean;
  error: Error | null;
  page?: number;
  per_page?: number;
  total?: number;
  onChangePage?: (page: number) => void;
};

export function ProductsList({
  productsData,
  isLoading,
  error,
  page,
  per_page,
  total,
  onChangePage,
}: ProductsListProps) {
  const [open, setOpen] = useState(false);

  return (
    <section className="flex flex-col gap-6">
      <PageHeader
        title="Products"
        description="Manage your product inventory and catalog."
        actions={
          <Button onClick={() => setOpen(true)}>
            <PlusIcon />
            Add Product
          </Button>
        }
      />
      <DataTable
        columns={productColumns}
        data={productsData}
        isLoading={isLoading}
        error={error}
        page={page}
        per_page={per_page}
        total={total}
        onChangePage={onChangePage}
        exportColumns={productExportColumns}
        exportFilename="products"
        emptyTitle="No products yet"
        emptyDescription="Add your first product to get started."
      />
      <CreateDialog
        open={open}
        onOpenChange={setOpen}
        title="Add Product"
        description="Create a new product in your catalog."
      >
        <ProductForm />
      </CreateDialog>
    </section>
  );
}
