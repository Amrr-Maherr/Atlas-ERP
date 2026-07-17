import { PageHeader } from "@/components/shared/page-header";
import { Employee } from "../types/employee.types";
import { EmployeesTable } from "./employees-table";

type EmployeesListProps = {
  employeesData: Employee[];
  isLoading: boolean;
  error: Error | null;
};

export function EmployeesList({
  employeesData,
  isLoading,
  error,
}: EmployeesListProps) {
  return (
    <section className="flex flex-col gap-6">
      <PageHeader
        title="Employees"
        description="Manage employee records and organizational details."
      />
      <EmployeesTable
        data={employeesData}
        isLoading={isLoading}
        error={error}
      />
    </section>
  );
}
