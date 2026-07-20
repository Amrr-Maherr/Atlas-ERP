import { buttonVariants } from "@/components/ui/button";
import { EyeIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { PurchaseOrder } from "../types/purchase-order.types";
import { DeletePurchaseOrderButton } from "./delete-purchase-order-button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type PurchaseOrderRowActionsProps = {
  purchaseOrder: PurchaseOrder;
};

export function PurchaseOrderRowActions({
  purchaseOrder,
}: PurchaseOrderRowActionsProps) {
  return (
    <div className="flex items-center justify-end gap-1">
      <Link
        href={`/dashboard/purchase-orders/${purchaseOrder.id}`}
        className={cn(buttonVariants({ variant: "ghost", size: "icon-sm" }))}
      >
        <Tooltip>
          <TooltipTrigger>
            <EyeIcon />
          </TooltipTrigger>
          <TooltipContent>
            <p>View purchase order details</p>
          </TooltipContent>
        </Tooltip>
      </Link>
      <DeletePurchaseOrderButton purchaseOrder={purchaseOrder} />
    </div>
  );
}
