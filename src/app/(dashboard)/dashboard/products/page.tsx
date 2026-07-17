"use client";
import { useProducts } from "@/features/products";
import { ProductsList } from "@/features/products";

export default function ProductsPage() {
  const { data, isLoading, error } = useProducts();

  return (
    <div className="flex flex-col gap-6 p-6">
      <ProductsList
        productsData={data ?? []}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
}
