"use client";
import { useState } from "react";
import { useProducts } from "@/features/products";
import { ProductsList } from "@/features/products";

export default function ProductsPage() {
  const [page, setPage] = useState(1);
  const per_page = 10;
  const { data, isLoading, error } = useProducts({ page, per_page });

  return (
    <div className="flex flex-col gap-6 p-6">
      <ProductsList
        productsData={data?.items ?? []}
        isLoading={isLoading}
        error={error}
        page={page}
        per_page={per_page}
        total={data?.total ?? 0}
        onChangePage={setPage}
      />
    </div>
  );
}
