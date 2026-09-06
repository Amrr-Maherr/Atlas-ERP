"use client";

import { useState } from "react";
import { toast } from "sonner";
import { PageHeader } from "@/components/shared/page-header";
import { DataTable } from "@/components/shared/data-table";
import { CreateDialog } from "@/components/shared/create-dialog";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { Product } from "../types/product.types";
import { productColumns, productExportColumns } from "../columns";
import { ProductForm } from "./product-form";
import useCreateProduct from "../hooks/useCreateProduct";

type ProductsListProps = {
  productsData: Product[];
  isLoading: boolean;
  error: Error | null;
  page?: number;
  per_page?: number;
  total?: number;
  onChangePage?: (page: number) => void;
  search?: string;
  sort?: string;
  onSearch?: (search: string) => void;
  onSort?: (sort: string) => void;
};

export function ProductsList({
  productsData,
  isLoading,
  error,
  page,
  per_page,
  total,
  onChangePage,
  search,
  sort,
  onSearch,
  onSort,
}: ProductsListProps) {
  const [open, setOpen] = useState(false);
  const { isPending, mutate: createProduct } = useCreateProduct();

  function handleSave() {
    createProduct(
      { CreateData: {} as Product },
      {
        onSuccess: () => {
          setOpen(false);
          toast.success("Product created", {
            description: "New product was successfully created.",
          });
        },
        onError: () => {
          toast.error("Create failed", {
            description:
              "Unable to create this product. Please try again later.",
          });
        },
      },
    );
  }

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
        search={search}
        sort={sort}
        onSearch={onSearch}
        onSort={onSort}
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
        onSave={handleSave}
        saveLabel={isPending ? "Creating..." : "Save"}
      >
        <ProductForm />
      </CreateDialog>
    </section>
  );
}
