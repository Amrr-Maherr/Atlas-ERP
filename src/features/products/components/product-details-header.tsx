import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowLeftIcon, PencilIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type ProductDetailsHeaderProps = {
  onEdit: () => void;
};

export function ProductDetailsHeader({ onEdit }: ProductDetailsHeaderProps) {
  return (
    <div className="flex items-center gap-4">
      <Link href="/products" className={cn(buttonVariants({ variant: "ghost", size: "icon-sm" }))}>
        <ArrowLeftIcon />
      </Link>
      <div className="flex-1">
        <h3 className="text-2xl font-semibold">Product Details</h3>
      </div>
      <Button variant="outline" size="sm" onClick={onEdit}>
        <PencilIcon className="size-4" />
        Edit
      </Button>
    </div>
  );
}
