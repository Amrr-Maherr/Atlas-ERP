import { buttonVariants } from "@/components/ui/button";
import { EyeIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Sale } from "../types/sale.types";
import { DeleteSaleButton } from "./delete-sale-button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type SaleRowActionsProps = {
  sale: Sale;
};

export function SaleRowActions({ sale }: SaleRowActionsProps) {
  return (
    <div className="flex items-center justify-end gap-1">
      <Link
        href={`/dashboard/sales/${sale.id}`}
        className={cn(buttonVariants({ variant: "ghost", size: "icon-sm" }))}
      >
        <Tooltip>
          <TooltipTrigger>
            <EyeIcon />
          </TooltipTrigger>
          <TooltipContent>
            <p>View sale details</p>
          </TooltipContent>
        </Tooltip>
      </Link>
      <DeleteSaleButton sale={sale} />
    </div>
  );
}
