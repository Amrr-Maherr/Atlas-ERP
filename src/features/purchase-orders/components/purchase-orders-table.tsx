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
import DataPagination from "@/components/shared/pagination/data-pagination";
import { ExportMenu } from "@/components/ui/export-menu";
import type { ExportColumn } from "@/components/lib/export/exportCsv";

const poColumns: ExportColumn<PurchaseOrder>[] = [
  { key: "poNumber", label: "PO Number" },
  { key: "items", label: "Items" },
  { key: "total", label: "Total" },
  { key: "paymentMethod", label: "Payment" },
  { key: "orderDate", label: "Order Date" },
  { key: "expectedDate", label: "Expected" },
  { key: "orderStatus", label: "Status" },
]

type PurchaseOrdersTableProps = {
  data: PurchaseOrder[];
  isLoading: boolean;
  error: Error | null;
  page?: number;
  per_page?: number;
  total?: number;
  onChangePage?: (page: number) => void;
};

export function PurchaseOrdersTable({
  data,
  isLoading,
  error,
  page = 1,
  per_page = 10,
  total = 0,
  onChangePage,
}: PurchaseOrdersTableProps) {
  return (
    <>
      <PurchaseOrdersSkeleton isLoading={isLoading} />
      <PurchaseOrdersError error={error} />
      <PurchaseOrdersEmpty data={data} isLoading={isLoading} error={error} />

      {!isLoading && !error && data.length > 0 && (
        <div className="rounded-lg border">
          <div className="flex items-center justify-end p-2 border-b">
            <ExportMenu data={data} columns={poColumns} filename="purchase-orders" />
          </div>
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
          <div className="flex justify-end p-4">
            <DataPagination page={page} per_page={per_page} total={total} onChangePage={onChangePage} />
          </div>
        </div>
      )}
    </>
  );
}
