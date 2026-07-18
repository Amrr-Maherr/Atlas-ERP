import { InventoryItem } from "../types/inventory.types";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { InventorySkeleton } from "./inventory-skeleton";
import { InventoryError } from "./inventory-error";
import { InventoryEmpty } from "./inventory-empty";
import { InventoryTableRow } from "./inventory-table-row";
import DataPagination from "@/components/shared/pagination/data-pagination";

type InventoryTableProps = {
  data: InventoryItem[];
  isLoading: boolean;
  error: Error | null;
  page?: number;
  per_page?: number;
  total?: number;
  onChangePage?: (page: number) => void;
};

export function InventoryTable({
  data,
  isLoading,
  error,
  page = 1,
  per_page = 10,
  total = 0,
  onChangePage,
}: InventoryTableProps) {
  return (
    <>
      <InventorySkeleton isLoading={isLoading} />
      <InventoryError error={error} />
      <InventoryEmpty data={data} isLoading={isLoading} error={error} />

      {!isLoading && !error && data.length > 0 && (
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Min Stock</TableHead>
                <TableHead>Reorder Level</TableHead>
                <TableHead>Cost Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-end">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item) => (
                <InventoryTableRow key={item.id} item={item} />
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
