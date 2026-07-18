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
import DataPagination from "@/components/shared/pagination/data-pagination";
import { ExportMenu } from "@/components/ui/export-menu";
import type { ExportColumn } from "@/components/lib/export/exportCsv";

const employeeColumns: ExportColumn<Employee>[] = [
  { key: "name", label: "Employee" },
  { key: "email", label: "Email" },
  { key: "department", label: "Department" },
  { key: "position", label: "Position" },
  { key: "phone", label: "Phone" },
  { key: "hireDate", label: "Hire Date" },
  { key: "createdAt", label: "Created" },
  { key: "status", label: "Status" },
]

type EmployeesTableProps = {
  data: Employee[];
  isLoading: boolean;
  error: Error | null;
  page?: number;
  per_page?: number;
  total?: number;
  onChangePage?: (page: number) => void;
};

export function EmployeesTable({
  data,
  isLoading,
  error,
  page = 1,
  per_page = 10,
  total = 0,
  onChangePage,
}: EmployeesTableProps) {
  return (
    <>
      <EmployeesSkeleton isLoading={isLoading} />
      <EmployeesError error={error} />
      <EmployeesEmpty data={data} isLoading={isLoading} error={error} />

      {!isLoading && !error && data.length > 0 && (
        <div className="rounded-lg border">
          <div className="flex items-center justify-end p-2 border-b">
            <ExportMenu data={data} columns={employeeColumns} filename="employees" />
          </div>
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
          <div className="flex justify-end p-4">
            <DataPagination page={page} per_page={per_page} total={total} onChangePage={onChangePage} />
          </div>
        </div>
      )}
    </>
  );
}
