import { Sale } from "../types/sale.types";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { formatDate } from "@/components/utils/format-date";
import { EyeIcon, PencilIcon, Trash2Icon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { SaleStatusBadge } from "./sale-status-badge";

type SalesTableRowProps = {
  sale: Sale;
};

export function SalesTableRow({ sale }: SalesTableRowProps) {
  return (
    <TableRow>
      <TableCell>
        <code className="text-xs bg-muted px-1.5 py-0.5 rounded">
          {sale.invoiceNumber}
        </code>
      </TableCell>
      <TableCell className="max-w-[200px] truncate text-muted-foreground">
        {sale.customerName}
      </TableCell>
      <TableCell className="text-muted-foreground">
        {sale.employeeName}
      </TableCell>
      <TableCell>
        <Badge variant="secondary">{sale.items}</Badge>
      </TableCell>
      <TableCell>
        <span className="text-sm font-medium tabular-nums">
          ${sale.total.toLocaleString()}
        </span>
      </TableCell>
      <TableCell>
        <Badge variant="outline" className="text-xs">
          {sale.paymentStatus}
        </Badge>
      </TableCell>
      <TableCell>
        <SaleStatusBadge status={sale.orderStatus} />
      </TableCell>
      <TableCell className="text-muted-foreground">
        {formatDate(sale.createdAt)}
      </TableCell>
      <TableCell className="text-end">
        <div className="flex items-center justify-end gap-1">
          <Link
            href={`/dashboard/sales/${sale.id}`}
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
