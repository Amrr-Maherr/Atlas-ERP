import { PurchaseOrder } from "../types/purchase-order.types";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PurchaseOrdersSkeleton } from "./purchase-orders-skeleton";
import { PurchaseOrdersError } from "./purchase-orders-error";
import { PurchaseOrdersEmpty } from "./purchase-orders-empty";
import { PurchaseOrdersTableRow } from "./purchase-orders-table-row";

type PurchaseOrdersTableProps = {
  data: PurchaseOrder[];
  isLoading: boolean;
  error: Error | null;
};

export function PurchaseOrdersTable({
  data,
  isLoading,
  error,
}: PurchaseOrdersTableProps) {
  return (
    <>
      <PurchaseOrdersSkeleton isLoading={isLoading} />
      <PurchaseOrdersError error={error} />
      <PurchaseOrdersEmpty data={data} isLoading={isLoading} error={error} />

      {!isLoading && !error && data.length > 0 && (
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>PO Number</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Order Date</TableHead>
                <TableHead>Expected</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-end">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((po) => (
                <PurchaseOrdersTableRow key={po.id} purchaseOrder={po} />
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </>
  );
}
