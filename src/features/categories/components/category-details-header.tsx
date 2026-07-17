import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowLeftIcon, PencilIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type CategoryDetailsHeaderProps = {
  onEdit: () => void;
};

export function CategoryDetailsHeader({ onEdit }: CategoryDetailsHeaderProps) {
  return (
    <div className="flex items-center gap-4">
      <Link href="/categories" className={cn(buttonVariants({ variant: "ghost", size: "icon-sm" }))}>
        <ArrowLeftIcon />
      </Link>
      <div className="flex-1">
        <h3 className="text-2xl font-semibold">Category Details</h3>
      </div>
      <Button variant="outline" size="sm" onClick={onEdit}>
        <PencilIcon className="size-4" />
        Edit
      </Button>
    </div>
  );
}
