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

type InventoryTableProps = {
  data: InventoryItem[];
  isLoading: boolean;
  error: Error | null;
};

export function InventoryTable({
  data,
  isLoading,
  error,
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
        </div>
      )}
    </>
  );
}
