"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useDeleteCustomer } from "../hooks/customers.hooks";
import { DeleteCustomerDialog } from "./delete-customer-dialog";
import type { Customer } from "../types/customer.types";

type DeleteCustomerButtonProps = {
  customer: Customer;
};

export function DeleteCustomerButton({ customer }: DeleteCustomerButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { isPending, mutate: deleteCustomer } = useDeleteCustomer();

  function handleConfirm() {
    deleteCustomer(
      { id: customer.id },
      {
        onSuccess: () => {
          setIsOpen(false);
          toast.success("Customer deleted", {
            description: `"${customer.name}" was successfully deleted.`,
          });
        },
        onError: () => {
          toast.error("Delete failed", {
            description:
              "Unable to delete this customer. Please try again later.",
          });
        },
      },
    );
  }

  return (
    <DeleteCustomerDialog
      customer={customer}
      onConfirm={handleConfirm}
      isPending={isPending}
      open={isOpen}
      onOpenChange={setIsOpen}
    />
  );
}
