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
import DataPagination from "@/components/shared/pagination/data-pagination";

type ProductsTableProps = {
  data: Product[];
  isLoading: boolean;
  error: Error | null;
  page?: number;
  per_page?: number;
  total?: number;
  onChangePage?: (page: number) => void;
};

export function ProductsTable({
  data,
  isLoading,
  error,
  page = 1,
  per_page = 10,
  total = 0,
  onChangePage,
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
          <div className="flex justify-end p-4">
            <DataPagination
              page={page}
              per_page={per_page}
              total={total}
              onChangePage={onChangePage}
            />
          </div>
        </div>
      )}
    </>
  );
}
