"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useDeleteEmployee } from "../hooks/employees.hooks";
import { DeleteEmployeeDialog } from "./delete-employee-dialog";
import type { Employee } from "../types/employee.types";

type DeleteEmployeeButtonProps = {
  employee: Employee;
};

export function DeleteEmployeeButton({ employee }: DeleteEmployeeButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { isPending, mutate: deleteEmployee } = useDeleteEmployee();

  function handleConfirm() {
    deleteEmployee(
      { id: employee.id },
      {
        onSuccess: () => {
          setIsOpen(false);
          toast.success("Employee deleted", {
            description: `"${employee.name}" was successfully deleted.`,
          });
        },
        onError: () => {
          toast.error("Delete failed", {
            description:
              "Unable to delete this employee. Please try again later.",
          });
        },
      },
    );
  }

  return (
    <DeleteEmployeeDialog
      employee={employee}
      onConfirm={handleConfirm}
      isPending={isPending}
      open={isOpen}
      onOpenChange={setIsOpen}
    />
  );
}
