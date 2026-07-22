import { ViewDetailsButton } from "@/components/shared/view-details-button";
import type { Employee } from "../types/employee.types";
import { DeleteEmployeeButton } from "./delete-employee-button";

type EmployeeRowActionsProps = {
  employee: Employee;
};

export function EmployeeRowActions({ employee }: EmployeeRowActionsProps) {
  return (
    <div className="flex items-center justify-end gap-1">
      <ViewDetailsButton
        href={`/dashboard/employees/${employee.id}`}
        label="View employee details"
      />
      <DeleteEmployeeButton employee={employee} />
    </div>
  );
}
