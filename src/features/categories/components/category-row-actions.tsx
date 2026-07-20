import { Button, buttonVariants } from "@/components/ui/button";
import { EyeIcon, PencilIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Category } from "../types/category.types";
import { DeleteCategoryButton } from "./delete-category-button";

type CategoryRowActionsProps = {
  category: Category;
};

export function CategoryRowActions({ category }: CategoryRowActionsProps) {
  return (
    <div className="flex items-center justify-end gap-1">
      <Link
        href={`/dashboard/categories/${category.id}`}
        className={cn(
          buttonVariants({ variant: "ghost", size: "icon-sm" }),
        )}
      >
        <EyeIcon />
      </Link>
      <Button variant="ghost" size="icon-sm">
        <PencilIcon />
      </Button>
      <DeleteCategoryButton category={category} />
    </div>
  );
}
