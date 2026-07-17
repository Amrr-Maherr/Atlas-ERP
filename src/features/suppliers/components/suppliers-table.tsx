import { Supplier } from "../types/supplier.types";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SuppliersSkeleton } from "./suppliers-skeleton";
import { SuppliersError } from "./suppliers-error";
import { SuppliersEmpty } from "./suppliers-empty";
import { SuppliersTableRow } from "./suppliers-table-row";

type SuppliersTableProps = {
  data: Supplier[];
  isLoading: boolean;
  error: Error | null;
};

export function SuppliersTable({
  data,
  isLoading,
  error,
}: SuppliersTableProps) {
  return (
    <>
      <SuppliersSkeleton isLoading={isLoading} />
      <SuppliersError error={error} />
      <SuppliersEmpty data={data} isLoading={isLoading} error={error} />

      {!isLoading && !error && data.length > 0 && (
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Supplier</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Country</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead>Balance</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-end">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((supplier) => (
                <SuppliersTableRow key={supplier.id} supplier={supplier} />
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </>
  );
}
