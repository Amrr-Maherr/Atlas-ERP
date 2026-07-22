"use client";

import { useState } from "react";
import { toast } from "sonner";
import { DeleteButton } from "@/components/shared/delete-button/delete-button";
import { useDeleteEmployee } from "../hooks/employees.hooks";

type DeleteEmployeeButtonProps = {
  employee: { id: string; name: string };
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
    <DeleteButton
      entityName="Employee"
      entityDisplayName={employee.name}
      description="This action cannot be undone and may affect related sales and activity records associated with this employee."
      onConfirm={handleConfirm}
      isPending={isPending}
      open={isOpen}
      onOpenChange={setIsOpen}
    />
  );
}
