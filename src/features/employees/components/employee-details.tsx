"use client"

import { useState } from "react"
import { Employee } from "../types/employee.types";
import { EmployeeDetailsHeader } from "./employee-details-header";
import { EmployeeDetailsCard } from "./employee-details-card";
import { EmployeeDetailsSkeleton } from "./employee-details-skeleton";
import { EmployeeDetailsError } from "./employee-details-error";
import { EmployeeEditDialog } from "./employee-edit-dialog";

type EmployeeDetailsProps = {
  employeeData: Employee | undefined;
  isLoading: boolean;
  error: Error | null;
};

export function EmployeeDetails({
  employeeData,
  isLoading,
  error,
}: EmployeeDetailsProps) {
  const [editOpen, setEditOpen] = useState(false);

  return (
    <section className="flex flex-col gap-6">
      <EmployeeDetailsHeader onEdit={() => setEditOpen(true)} />
      <EmployeeDetailsSkeleton isLoading={isLoading} />
      <EmployeeDetailsError error={error} />
      {!isLoading && !error && employeeData && (
        <>
          <EmployeeDetailsCard employee={employeeData} />
          <EmployeeEditDialog
            employee={employeeData}
            open={editOpen}
            onOpenChange={setEditOpen}
          />
        </>
      )}
    </section>
  );
}
