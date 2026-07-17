import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowLeftIcon, PencilIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type SupplierDetailsHeaderProps = {
  onEdit: () => void;
};

export function SupplierDetailsHeader({ onEdit }: SupplierDetailsHeaderProps) {
  return (
    <div className="flex items-center gap-4">
      <Link href="/dashboard/suppliers" className={cn(buttonVariants({ variant: "ghost", size: "icon-sm" }))}>
        <ArrowLeftIcon />
      </Link>
      <div className="flex-1">
        <h3 className="text-2xl font-semibold">Supplier Details</h3>
      </div>
      <Button variant="outline" size="sm" onClick={onEdit}>
        <PencilIcon className="size-4" />
        Edit
      </Button>
    </div>
  );
}
