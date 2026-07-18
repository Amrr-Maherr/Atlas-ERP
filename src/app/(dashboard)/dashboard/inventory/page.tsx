"use client";
import { useState } from "react";
import { useInventory } from "@/features/inventory";
import { InventoryList } from "@/features/inventory";

export default function InventoryPage() {
  const [page, setPage] = useState(1);
  const per_page = 10;
  const { data, isLoading, error } = useInventory({ page, per_page });

  return (
    <div className="flex flex-col gap-6 p-6">
      <InventoryList
        inventoryData={data?.items ?? []}
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
