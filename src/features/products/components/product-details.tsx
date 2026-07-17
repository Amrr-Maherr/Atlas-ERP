"use client"

import { useState } from "react"
import { Product } from "../types/product.types";
import { ProductDetailsHeader } from "./product-details-header";
import { ProductDetailsCard } from "./product-details-card";
import { ProductDetailsSkeleton } from "./product-details-skeleton";
import { ProductDetailsError } from "./product-details-error";
import { ProductEditDialog } from "./product-edit-dialog";

type ProductDetailsProps = {
  productData: Product | undefined;
  isLoading: boolean;
  error: Error | null;
};

export function ProductDetails({
  productData,
  isLoading,
  error,
}: ProductDetailsProps) {
  const [editOpen, setEditOpen] = useState(false);

  return (
    <section className="flex flex-col gap-6">
      <ProductDetailsHeader onEdit={() => setEditOpen(true)} />
      <ProductDetailsSkeleton isLoading={isLoading} />
      <ProductDetailsError error={error} />
      {!isLoading && !error && productData && (
        <>
          <ProductDetailsCard product={productData} />
          <ProductEditDialog
            product={productData}
            open={editOpen}
            onOpenChange={setEditOpen}
          />
        </>
      )}
    </section>
  );
}
