"use client";
import { useState } from "react";
import { useCustomers } from "@/features/customers";
import { CustomersList } from "@/features/customers";

export default function CustomersPage() {
  const [page, setPage] = useState(1);
  const per_page = 10;
  const { data, isLoading, error } = useCustomers({ page, per_page });

  return (
    <div className="flex flex-col gap-6 p-6">
      <CustomersList
        customersData={data?.items ?? []}
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
