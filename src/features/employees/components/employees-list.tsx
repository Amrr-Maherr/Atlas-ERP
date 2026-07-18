"use client"

import { useState } from "react"
import { PageHeader } from "@/components/shared/page-header";
import { DataTable } from "@/components/shared/data-table";
import { CreateDialog } from "@/components/shared/create-dialog";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { Employee } from "../types/employee.types";
import { employeeColumns, employeeExportColumns } from "../columns";
import { EmployeeForm } from "./employee-form";

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
  const [open, setOpen] = useState(false);

  return (
    <section className="flex flex-col gap-6">
      <PageHeader
        title="Employees"
        description="Manage employee records and organizational details."
        actions={
          <Button onClick={() => setOpen(true)}>
            <PlusIcon />
            Add Employee
          </Button>
        }
      />
      <DataTable
        columns={employeeColumns}
        data={employeesData}
        isLoading={isLoading}
        error={error}
        page={page}
        per_page={per_page}
        total={total}
        onChangePage={onChangePage}
        exportColumns={employeeExportColumns}
        exportFilename="employees"
        emptyTitle="No employees yet"
        emptyDescription="Add your first employee to get started."
      />
      <CreateDialog
        open={open}
        onOpenChange={setOpen}
        title="Add Employee"
        description="Create a new employee record."
      >
        <EmployeeForm />
      </CreateDialog>
    </section>
  );
}
