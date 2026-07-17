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

type CustomersTableProps = {
  data: Customer[];
  isLoading: boolean;
  error: Error | null;
};

export function CustomersTable({
  data,
  isLoading,
  error,
}: CustomersTableProps) {
  return (
    <>
      <CustomersSkeleton isLoading={isLoading} />
      <CustomersError error={error} />
      <CustomersEmpty data={data} isLoading={isLoading} error={error} />

      {!isLoading && !error && data.length > 0 && (
        <div className="rounded-lg border">
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
        </div>
      )}
    </>
  );
}
