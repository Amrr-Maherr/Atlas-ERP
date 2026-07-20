import { buttonVariants } from "@/components/ui/button";
import { EyeIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Product } from "../types/product.types";
import { DeleteProductButton } from "./delete-product-button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type ProductRowActionsProps = {
  product: Product;
};

export function ProductRowActions({ product }: ProductRowActionsProps) {
  return (
    <div className="flex items-center justify-end gap-1">
      <Link
        href={`/dashboard/products/${product.id}`}
        className={cn(buttonVariants({ variant: "ghost", size: "icon-sm" }))}
      >
        <Tooltip>
          <TooltipTrigger>
            <EyeIcon />
          </TooltipTrigger>
          <TooltipContent>
            <p>View product details</p>
          </TooltipContent>
        </Tooltip>
      </Link>
      <DeleteProductButton product={product} />
    </div>
  );
}
