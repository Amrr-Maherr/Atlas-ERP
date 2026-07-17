import { PurchaseOrder } from "../types/purchase-order.types";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { formatDate } from "@/components/utils/format-date";
import { EyeIcon, PencilIcon, Trash2Icon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { PurchaseOrderStatusBadge } from "./purchase-order-status-badge";

type PurchaseOrdersTableRowProps = {
  purchaseOrder: PurchaseOrder;
};

export function PurchaseOrdersTableRow({ purchaseOrder }: PurchaseOrdersTableRowProps) {
  return (
    <TableRow>
      <TableCell>
        <code className="text-xs bg-muted px-1.5 py-0.5 rounded">
          {purchaseOrder.poNumber}
        </code>
      </TableCell>
      <TableCell>
        <Badge variant="secondary">{purchaseOrder.items.length}</Badge>
      </TableCell>
      <TableCell>
        <span className="text-sm font-medium tabular-nums">
          ${purchaseOrder.total.toLocaleString()}
        </span>
      </TableCell>
      <TableCell>
        <Badge variant="outline" className="text-xs">
          {purchaseOrder.paymentStatus}
        </Badge>
      </TableCell>
      <TableCell className="text-muted-foreground">
        {formatDate(purchaseOrder.orderDate)}
      </TableCell>
      <TableCell className="text-muted-foreground">
        {formatDate(purchaseOrder.expectedDate)}
      </TableCell>
      <TableCell>
        <PurchaseOrderStatusBadge status={purchaseOrder.orderStatus} />
      </TableCell>
      <TableCell className="text-end">
        <div className="flex items-center justify-end gap-1">
          <Link
            href={`/dashboard/purchase-orders/${purchaseOrder.id}`}
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
