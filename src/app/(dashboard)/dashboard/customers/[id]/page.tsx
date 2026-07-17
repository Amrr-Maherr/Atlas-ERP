"use client";
import { useCustomer } from "@/features/customers";
import { CustomerDetails } from "@/features/customers";
import { useParams } from "next/navigation";

export default function CustomerDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error } = useCustomer({ id });

  return (
    <div className="flex flex-col gap-6 p-6">
      <CustomerDetails
        customerData={data}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
}
