import { PageHeader } from "@/components/shared/page-header";
import { Product } from "../types/product.types";
import { ProductsTable } from "./products-table";

type ProductsListProps = {
  productsData: Product[];
  isLoading: boolean;
  error: Error | null;
};

export function ProductsList({
  productsData,
  isLoading,
  error,
}: ProductsListProps) {
  return (
    <section className="flex flex-col gap-6">
      <PageHeader
        title="Products"
        description="Manage your product inventory and catalog."
      />
      <ProductsTable
        data={productsData}
        isLoading={isLoading}
        error={error}
      />
    </section>
  );
}
