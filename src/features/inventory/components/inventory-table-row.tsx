import { InventoryItem } from "../types/inventory.types";
import { Button, buttonVariants } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { EyeIcon, PencilIcon, Trash2Icon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { InventoryStatusBadge } from "./inventory-status-badge";

type InventoryTableRowProps = {
  item: InventoryItem;
};

export function InventoryTableRow({ item }: InventoryTableRowProps) {
  return (
    <TableRow>
      <TableCell>
        <span className="text-sm font-medium">{item.name}</span>
      </TableCell>
      <TableCell>
        <code className="text-xs bg-muted px-1.5 py-0.5 rounded">
          {item.sku}
        </code>
      </TableCell>
      <TableCell>
        <span className="text-sm tabular-nums">{item.stock}</span>
      </TableCell>
      <TableCell>
        <span className="text-sm tabular-nums text-muted-foreground">
          {item.minStock}
        </span>
      </TableCell>
      <TableCell>
        <span className="text-sm tabular-nums text-muted-foreground">
          {item.reorderLevel}
        </span>
      </TableCell>
      <TableCell>
        <span className="text-sm tabular-nums">
          ${item.costPrice.toLocaleString()}
        </span>
      </TableCell>
      <TableCell>
        <InventoryStatusBadge status={item.stock <= item.minStock ? "low" : "in-stock"} />
      </TableCell>
      <TableCell className="text-end">
        <div className="flex items-center justify-end gap-1">
          <Link
            href={`/dashboard/inventory/${item.id}`}
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon-sm" }),
            )}
          >
            <EyeIcon />
          </Link>
          <Button variant="ghost" size="icon-sm">
            <PencilIcon />
          </Button>
          <Button variant="destructive" size="icon-sm">
            <Trash2Icon />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}
