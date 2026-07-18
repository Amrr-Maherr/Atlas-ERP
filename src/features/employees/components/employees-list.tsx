import { PageHeader } from "@/components/shared/page-header";
import { Employee } from "../types/employee.types";
import { EmployeesTable } from "./employees-table";

type EmployeesListProps = {
  employeesData: Employee[];
  isLoading: boolean;
  error: Error | null;
  page?: number;
  per_page?: number;
  total?: number;
  onChangePage?: (page: number) => void;
};

export function EmployeesList({
  employeesData,
  isLoading,
  error,
  page,
  per_page,
  total,
  onChangePage,
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
        page={page}
        per_page={per_page}
        total={total}
        onChangePage={onChangePage}
      />
    </section>
  );
}
