"use client";
import { useCustomers } from "@/features/customers";
import { CustomersList } from "@/features/customers";

export default function CustomersPage() {
  const { data, isLoading, error } = useCustomers();

  return (
    <div className="flex flex-col gap-6 p-6">
      <CustomersList
        customersData={data ?? []}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
}
