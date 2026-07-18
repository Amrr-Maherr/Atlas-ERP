"use client";
import { useState } from "react";
import { useEmployees } from "@/features/employees";
import { EmployeesList } from "@/features/employees";

export default function EmployeesPage() {
  const [page, setPage] = useState(1);
  const per_page = 10;
  const { data, isLoading, error } = useEmployees({ page, per_page });

  return (
    <div className="flex flex-col gap-6 p-6">
      <EmployeesList
        employeesData={data?.items ?? []}
        isLoading={isLoading}
        error={error}
        page={page}
        per_page={per_page}
        total={data?.total ?? 0}
        onChangePage={setPage}
      />
    </div>
  );
}
