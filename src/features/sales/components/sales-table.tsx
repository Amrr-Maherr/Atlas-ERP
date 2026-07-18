import { Sale } from "../types/sale.types";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SalesSkeleton } from "./sales-skeleton";
import { SalesError } from "./sales-error";
import { SalesEmpty } from "./sales-empty";
import { SalesTableRow } from "./sales-table-row";
import DataPagination from "@/components/shared/pagination/data-pagination";
import { ExportMenu } from "@/components/ui/export-menu";
import type { ExportColumn } from "@/components/lib/export/exportCsv";

const saleColumns: ExportColumn<Sale>[] = [
  { key: "invoiceNumber", label: "Invoice" },
  { key: "customerName", label: "Customer" },
  { key: "employeeName", label: "Employee" },
  { key: "items", label: "Items" },
  { key: "total", label: "Total" },
  { key: "paymentMethod", label: "Payment" },
  { key: "orderStatus", label: "Status" },
  { key: "createdAt", label: "Created" },
]

type SalesTableProps = {
  data: Sale[];
  isLoading: boolean;
  error: Error | null;
  page?: number;
  per_page?: number;
  total?: number;
  onChangePage?: (page: number) => void;
};

export function SalesTable({
  data,
  isLoading,
  error,
  page = 1,
  per_page = 10,
  total = 0,
  onChangePage,
}: SalesTableProps) {
  return (
    <>
      <SalesSkeleton isLoading={isLoading} />
      <SalesError error={error} />
      <SalesEmpty data={data} isLoading={isLoading} error={error} />

      {!isLoading && !error && data.length > 0 && (
        <div className="rounded-lg border">
          <div className="flex items-center justify-end p-2 border-b">
            <ExportMenu data={data} columns={saleColumns} filename="sales" />
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Employee</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-end">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((sale) => (
                <SalesTableRow key={sale.id} sale={sale} />
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
