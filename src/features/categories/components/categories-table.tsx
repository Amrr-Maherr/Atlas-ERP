import { Category } from "../types/category.types";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CategoriesSkeleton } from "./categories-skeleton";
import { CategoriesError } from "./categories-error";
import { CategoriesEmpty } from "./categories-empty";
import { CategoriesTableRow } from "./categories-table-row";
import DataPagination from "@/components/shared/pagination/data-pagination";
import { ExportMenu } from "@/components/ui/export-menu";
import type { ExportColumn } from "@/components/lib/export/exportCsv";

const categoryColumns: ExportColumn<Category>[] = [
  { key: "name", label: "Category" },
  { key: "description", label: "Description" },
  { key: "slug", label: "Slug" },
  { key: "productCount", label: "Products" },
  { key: "displayOrder", label: "Order" },
  { key: "createdAt", label: "Created" },
  { key: "status", label: "Status" },
]

type CategoriesTableProps = {
  data: Category[];
  isLoading: boolean;
  error: Error | null;
  page?: number;
  per_page?: number;
  total?: number;
  onChangePage?: (page: number) => void;
};

export function CategoriesTable({
  data,
  isLoading,
  error,
  page = 1,
  per_page = 10,
  total = 0,
  onChangePage,
}: CategoriesTableProps) {
  return (
    <>
      <CategoriesSkeleton isLoading={isLoading} />
      <CategoriesError error={error} />
      <CategoriesEmpty data={data} isLoading={isLoading} error={error} />

      {!isLoading && !error && data.length > 0 && (
        <div className="rounded-lg border">
          <div className="flex items-center justify-end p-2 border-b">
            <ExportMenu data={data} columns={categoryColumns} filename="categories" />
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Products</TableHead>
                <TableHead>Order</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-end">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((category) => (
                <CategoriesTableRow key={category.id} category={category} />
              ))}
            </TableBody>
          </Table>
          <div className="flex justify-end p-4">
            <DataPagination page={page} per_page={per_page} total={total} onChangePage={onChangePage} />
          </div>
        </div>
      )}
    </>
  );
}
