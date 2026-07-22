import { ViewDetailsButton } from "@/components/shared/view-details-button";
import type { Product } from "../types/product.types";
import { DeleteProductButton } from "./delete-product-button";

type ProductRowActionsProps = {
  product: Product;
};

export function ProductRowActions({ product }: ProductRowActionsProps) {
  return (
    <div className="flex items-center justify-end gap-1">
      <ViewDetailsButton
        href={`/dashboard/products/${product.id}`}
        label="View product details"
      />
      <DeleteProductButton product={product} />
    </div>
  );
}
