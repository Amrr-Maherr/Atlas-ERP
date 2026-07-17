import { Customer } from "../types/customer.types";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { formatDate } from "@/components/utils/format-date";
import { UserIcon, EyeIcon, PencilIcon, Trash2Icon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { CustomerStatusBadge } from "./customer-status-badge";

type CustomersTableRowProps = {
  customer: Customer;
};

export function CustomersTableRow({ customer }: CustomersTableRowProps) {
  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center gap-3">
          <div className="relative flex size-10 shrink-0 items-center justify-center rounded-md bg-muted overflow-hidden">
            {customer.avatar ? (
              <Image
                src={customer.avatar}
                alt={customer.name}
                fill
                sizes="40px"
                className="object-cover"
              />
            ) : (
              <UserIcon className="size-4 text-muted-foreground" />
            )}
          </div>
          <span className="font-medium">{customer.name}</span>
        </div>
      </TableCell>
      <TableCell className="max-w-[200px] truncate text-muted-foreground">
        {customer.email}
      </TableCell>
      <TableCell className="text-muted-foreground">
        {customer.phone}
      </TableCell>
      <TableCell className="text-muted-foreground">
        {customer.city}
      </TableCell>
      <TableCell>
        <Badge variant="secondary">{customer.totalOrders}</Badge>
      </TableCell>
      <TableCell>
        <span className="text-sm tabular-nums">
          ${customer.totalSpent.toLocaleString()}
        </span>
      </TableCell>
      <TableCell className="text-muted-foreground">
        {formatDate(customer.createdAt)}
      </TableCell>
      <TableCell>
        <CustomerStatusBadge status={customer.status} />
      </TableCell>
      <TableCell className="text-end">
        <div className="flex items-center justify-end gap-1">
          <Link
            href={`/dashboard/customers/${customer.id}`}
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
