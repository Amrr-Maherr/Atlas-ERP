import { Product } from "../types/product.types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ProductsSkeleton } from "./products-skeleton";
import { ProductsError } from "./products-error";
import { ProductsEmpty } from "./products-empty";
import { ProductsTableRow } from "./products-table-row";

type ProductsTableProps = {
  data: Product[];
  isLoading: boolean;
  error: Error | null;
};

export function ProductsTable({
  data,
  isLoading,
  error,
}: ProductsTableProps) {
  return (
    <>
      <ProductsSkeleton isLoading={isLoading} />
      <ProductsError error={error} />
      <ProductsEmpty data={data} isLoading={isLoading} error={error} />

      {!isLoading && !error && data.length > 0 && (
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-end">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((product) => (
                <ProductsTableRow key={product.id} product={product} />
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </>
  );
}
