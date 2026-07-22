"use client";

import { useState } from "react";
import { toast } from "sonner";
import { DeleteButton } from "@/components/shared/delete-button/delete-button";
import { useDeleteCustomer } from "../hooks/customers.hooks";

type DeleteCustomerButtonProps = {
  customer: { id: string; name: string };
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
    <DeleteButton
      entityName="Customer"
      entityDisplayName={customer.name}
      description="This action cannot be undone and may affect related orders and sales associated with this customer."
      onConfirm={handleConfirm}
      isPending={isPending}
      open={isOpen}
      onOpenChange={setIsOpen}
    />
  );
}
