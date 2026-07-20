import { buttonVariants } from "@/components/ui/button";
import { EyeIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Employee } from "../types/employee.types";
import { DeleteEmployeeButton } from "./delete-employee-button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type EmployeeRowActionsProps = {
  employee: Employee;
};

export function EmployeeRowActions({ employee }: EmployeeRowActionsProps) {
  return (
    <div className="flex items-center justify-end gap-1">
      <Link
        href={`/dashboard/employees/${employee.id}`}
        className={cn(buttonVariants({ variant: "ghost", size: "icon-sm" }))}
      >
        <Tooltip>
          <TooltipTrigger>
            <EyeIcon />
          </TooltipTrigger>
          <TooltipContent>
            <p>View employee details</p>
          </TooltipContent>
        </Tooltip>
      </Link>
      <DeleteEmployeeButton employee={employee} />
    </div>
  );
}
