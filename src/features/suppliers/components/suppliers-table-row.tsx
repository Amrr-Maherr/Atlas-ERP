import { Supplier } from "../types/supplier.types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { formatDate } from "@/components/utils/format-date";
import { BuildingIcon, PencilIcon, Trash2Icon } from "lucide-react";
import Image from "next/image";
import { ViewDetailsButton } from "@/components/shared/view-details-button";
import { SupplierStatusBadge } from "./supplier-status-badge";

type SuppliersTableRowProps = {
  supplier: Supplier;
};

export function SuppliersTableRow({ supplier }: SuppliersTableRowProps) {
  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center gap-3">
          <div className="relative flex size-10 shrink-0 items-center justify-center rounded-md bg-muted overflow-hidden">
            {supplier.logo ? (
              <Image
                src={supplier.logo}
                alt={supplier.companyName}
                fill
                sizes="40px"
                className="object-cover"
              />
            ) : (
              <BuildingIcon className="size-4 text-muted-foreground" />
            )}
          </div>
          <span className="font-medium">{supplier.companyName}</span>
        </div>
      </TableCell>
      <TableCell className="max-w-[200px] truncate text-muted-foreground">
        {supplier.contactPerson}
      </TableCell>
      <TableCell className="text-muted-foreground">
        {supplier.phone}
      </TableCell>
      <TableCell className="text-muted-foreground">
        {supplier.country}
      </TableCell>
      <TableCell>
        <Badge variant="secondary">{supplier.totalOrders}</Badge>
      </TableCell>
      <TableCell>
        <span className="text-sm tabular-nums">
          ${supplier.balance.toLocaleString()}
        </span>
      </TableCell>
      <TableCell className="text-muted-foreground">
        {formatDate(supplier.createdAt)}
      </TableCell>
      <TableCell>
        <SupplierStatusBadge status={supplier.status} />
      </TableCell>
      <TableCell className="text-end">
        <div className="flex items-center justify-end gap-1">
          <ViewDetailsButton
            href={`/dashboard/suppliers/${supplier.id}`}
            label="View supplier details"
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
