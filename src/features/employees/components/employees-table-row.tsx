import { Employee } from "../types/employee.types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { formatDate } from "@/components/utils/format-date";
import { UserIcon, PencilIcon, Trash2Icon } from "lucide-react";
import Image from "next/image";
import { ViewDetailsButton } from "@/components/shared/view-details-button";
import { EmployeeStatusBadge } from "./employee-status-badge";

type EmployeesTableRowProps = {
  employee: Employee;
};

export function EmployeesTableRow({ employee }: EmployeesTableRowProps) {
  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center gap-3">
          <div className="relative flex size-10 shrink-0 items-center justify-center rounded-md bg-muted overflow-hidden">
            {employee.avatar ? (
              <Image
                src={employee.avatar}
                alt={employee.name}
                fill
                sizes="40px"
                className="object-cover"
              />
            ) : (
              <UserIcon className="size-4 text-muted-foreground" />
            )}
          </div>
          <span className="font-medium">{employee.name}</span>
        </div>
      </TableCell>
      <TableCell className="max-w-[200px] truncate text-muted-foreground">
        {employee.email}
      </TableCell>
      <TableCell>
        <Badge variant="secondary">{employee.department}</Badge>
      </TableCell>
      <TableCell className="text-muted-foreground">
        {employee.position}
      </TableCell>
      <TableCell className="text-muted-foreground">
        {employee.phone}
      </TableCell>
      <TableCell className="text-muted-foreground">
        {formatDate(employee.hireDate)}
      </TableCell>
      <TableCell className="text-muted-foreground">
        {formatDate(employee.createdAt)}
      </TableCell>
      <TableCell>
        <EmployeeStatusBadge status={employee.status} />
      </TableCell>
      <TableCell className="text-end">
        <div className="flex items-center justify-end gap-1">
          <ViewDetailsButton
            href={`/dashboard/employees/${employee.id}`}
            label="View employee details"
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
