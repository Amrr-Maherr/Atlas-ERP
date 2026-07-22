import { ViewDetailsButton } from "@/components/shared/view-details-button";
import type { Customer } from "../types/customer.types";
import { DeleteCustomerButton } from "./delete-customer-button";

type CustomerRowActionsProps = {
  customer: Customer;
};

export function CustomerRowActions({ customer }: CustomerRowActionsProps) {
  return (
    <div className="flex items-center justify-end gap-1">
      <ViewDetailsButton
        href={`/dashboard/customers/${customer.id}`}
        label="View customer details"
      />
      <DeleteCustomerButton customer={customer} />
    </div>
  );
}
