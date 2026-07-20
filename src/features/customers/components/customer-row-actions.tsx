import { buttonVariants } from "@/components/ui/button";
import { EyeIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Customer } from "../types/customer.types";
import { DeleteCustomerButton } from "./delete-customer-button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type CustomerRowActionsProps = {
  customer: Customer;
};

export function CustomerRowActions({ customer }: CustomerRowActionsProps) {
  return (
    <div className="flex items-center justify-end gap-1">
      <Link
        href={`/dashboard/customers/${customer.id}`}
        className={cn(buttonVariants({ variant: "ghost", size: "icon-sm" }))}
      >
        <Tooltip>
          <TooltipTrigger>
            <EyeIcon />
          </TooltipTrigger>
          <TooltipContent>
            <p>View customer details</p>
          </TooltipContent>
        </Tooltip>
      </Link>
      <DeleteCustomerButton customer={customer} />
    </div>
  );
}
