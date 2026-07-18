import { Customer } from "../types/customer.types";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CustomersSkeleton } from "./customers-skeleton";
import { CustomersError } from "./customers-error";
import { CustomersEmpty } from "./customers-empty";
import { CustomersTableRow } from "./customers-table-row";
import DataPagination from "@/components/shared/pagination/data-pagination";
import { ExportMenu } from "@/components/ui/export-menu";
import type { ExportColumn } from "@/components/lib/export/exportCsv";

const customerColumns: ExportColumn<Customer>[] = [
  { key: "name", label: "Customer" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone" },
  { key: "city", label: "City" },
  { key: "totalOrders", label: "Orders" },
  { key: "totalSpent", label: "Total Spent" },
  { key: "createdAt", label: "Created" },
  { key: "status", label: "Status" },
]

type CustomersTableProps = {
  data: Customer[];
  isLoading: boolean;
  error: Error | null;
  page?: number;
  per_page?: number;
  total?: number;
  onChangePage?: (page: number) => void;
};

export function CustomersTable({
  data,
  isLoading,
  error,
  page = 1,
  per_page = 10,
  total = 0,
  onChangePage,
}: CustomersTableProps) {
  return (
    <>
      <CustomersSkeleton isLoading={isLoading} />
      <CustomersError error={error} />
      <CustomersEmpty data={data} isLoading={isLoading} error={error} />

      {!isLoading && !error && data.length > 0 && (
        <div className="rounded-lg border">
          <div className="flex items-center justify-end p-2 border-b">
            <ExportMenu data={data} columns={customerColumns} filename="customers" />
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>City</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead>Total Spent</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-end">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((customer) => (
                <CustomersTableRow key={customer.id} customer={customer} />
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
