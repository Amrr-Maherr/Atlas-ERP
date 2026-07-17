import { Employee } from "../types/employee.types";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EmployeesSkeleton } from "./employees-skeleton";
import { EmployeesError } from "./employees-error";
import { EmployeesEmpty } from "./employees-empty";
import { EmployeesTableRow } from "./employees-table-row";

type EmployeesTableProps = {
  data: Employee[];
  isLoading: boolean;
  error: Error | null;
};

export function EmployeesTable({
  data,
  isLoading,
  error,
}: EmployeesTableProps) {
  return (
    <>
      <EmployeesSkeleton isLoading={isLoading} />
      <EmployeesError error={error} />
      <EmployeesEmpty data={data} isLoading={isLoading} error={error} />

      {!isLoading && !error && data.length > 0 && (
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Hire Date</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-end">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((employee) => (
                <EmployeesTableRow key={employee.id} employee={employee} />
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </>
  );
}
