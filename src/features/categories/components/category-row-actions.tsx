import { buttonVariants } from "@/components/ui/button";
import { EyeIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Category } from "../types/category.types";
import { DeleteCategoryButton } from "./delete-category-button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
type CategoryRowActionsProps = {
  category: Category;
};

export function CategoryRowActions({ category }: CategoryRowActionsProps) {
  return (
    <div className="flex items-center justify-end gap-1">
      <Link
        href={`/dashboard/categories/${category.id}`}
        className={cn(buttonVariants({ variant: "ghost", size: "icon-sm" }))}
      >
        <Tooltip>
          <TooltipTrigger>
            <EyeIcon />
          </TooltipTrigger>
          <TooltipContent>
            <p>View category details</p>
          </TooltipContent>
        </Tooltip>
      </Link>
      <DeleteCategoryButton category={category} />
    </div>
  );
}
