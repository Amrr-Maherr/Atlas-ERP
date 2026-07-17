import { Category } from "../types/category.types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CategoriesSkeleton } from "./categories-skeleton";
import { CategoriesError } from "./categories-error";
import { CategoriesEmpty } from "./categories-empty";
import { CategoriesTableRow } from "./categories-table-row";

type CategoriesTableProps = {
  data: Category[];
  isLoading: boolean;
  error: Error | null;
};

export function CategoriesTable({
  data,
  isLoading,
  error,
}: CategoriesTableProps) {
  return (
    <>
      <CategoriesSkeleton isLoading={isLoading} />
      <CategoriesError error={error} />
      <CategoriesEmpty data={data} isLoading={isLoading} error={error} />

      {!isLoading && !error && data.length > 0 && (
        <div className="rounded-lg border">
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
        </div>
      )}
    </>
  );
}
