import { InventoryItem } from "../types/inventory.types";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { PencilIcon, Trash2Icon } from "lucide-react";
import { ViewDetailsButton } from "@/components/shared/view-details-button";
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
          <ViewDetailsButton
            href={`/dashboard/inventory/${item.id}`}
            label="View inventory item details"
          />
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
