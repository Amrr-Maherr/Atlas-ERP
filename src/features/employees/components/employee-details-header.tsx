import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowLeftIcon, PencilIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type EmployeeDetailsHeaderProps = {
  onEdit: () => void;
};

export function EmployeeDetailsHeader({ onEdit }: EmployeeDetailsHeaderProps) {
  return (
    <div className="flex items-center gap-4">
      <Link href="/dashboard/employees" className={cn(buttonVariants({ variant: "ghost", size: "icon-sm" }))}>
        <ArrowLeftIcon />
      </Link>
      <div className="flex-1">
        <h3 className="text-2xl font-semibold">Employee Details</h3>
      </div>
      <Button variant="outline" size="sm" onClick={onEdit}>
        <PencilIcon className="size-4" />
        Edit
      </Button>
    </div>
  );
}
