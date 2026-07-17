"use client";
import { useEmployees } from "@/features/employees";
import { EmployeesList } from "@/features/employees";

export default function EmployeesPage() {
  const { data, isLoading, error } = useEmployees();

  return (
    <div className="flex flex-col gap-6 p-6">
      <EmployeesList
        employeesData={data ?? []}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
}
