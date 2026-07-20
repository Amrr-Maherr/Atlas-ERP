import { buttonVariants } from "@/components/ui/button";
import { EyeIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { InventoryItem } from "../types/inventory.types";
import { DeleteInventoryItemButton } from "./delete-inventory-item-button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type InventoryItemRowActionsProps = {
  inventoryItem: InventoryItem;
};

export function InventoryItemRowActions({
  inventoryItem,
}: InventoryItemRowActionsProps) {
  return (
    <div className="flex items-center justify-end gap-1">
      <Link
        href={`/dashboard/inventory/${inventoryItem.id}`}
        className={cn(buttonVariants({ variant: "ghost", size: "icon-sm" }))}
      >
        <Tooltip>
          <TooltipTrigger>
            <EyeIcon />
          </TooltipTrigger>
          <TooltipContent>
            <p>View inventory item details</p>
          </TooltipContent>
        </Tooltip>
      </Link>
      <DeleteInventoryItemButton inventoryItem={inventoryItem} />
    </div>
  );
}
