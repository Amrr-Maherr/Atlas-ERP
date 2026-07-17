"use client";
import { useProduct } from "@/features/products";
import { ProductDetails } from "@/features/products";
import { useParams } from "next/navigation";

export default function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error } = useProduct({ id });

  return (
    <div className="flex flex-col gap-6 p-6">
      <ProductDetails
        productData={data}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
}
