import { buttonVariants } from "@/components/ui/button";
import { EyeIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Supplier } from "../types/supplier.types";
import { DeleteSupplierButton } from "./delete-supplier-button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type SupplierRowActionsProps = {
  supplier: Supplier;
};

export function SupplierRowActions({ supplier }: SupplierRowActionsProps) {
  return (
    <div className="flex items-center justify-end gap-1">
      <Link
        href={`/dashboard/suppliers/${supplier.id}`}
        className={cn(buttonVariants({ variant: "ghost", size: "icon-sm" }))}
      >
        <Tooltip>
          <TooltipTrigger>
            <EyeIcon />
          </TooltipTrigger>
          <TooltipContent>
            <p>View supplier details</p>
          </TooltipContent>
        </Tooltip>
      </Link>
      <DeleteSupplierButton supplier={supplier} />
    </div>
  );
}
