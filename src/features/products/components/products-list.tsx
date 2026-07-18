import { PageHeader } from "@/components/shared/page-header";
import { DataTable } from "@/components/shared/data-table";
import { Product } from "../types/product.types";
import { productColumns, productExportColumns } from "../columns";

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
  return (
    <section className="flex flex-col gap-6">
      <PageHeader
        title="Products"
        description="Manage your product inventory and catalog."
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
    </section>
  );
}
