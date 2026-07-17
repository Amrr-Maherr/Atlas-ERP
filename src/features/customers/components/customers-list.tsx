import { PageHeader } from "@/components/shared/page-header";
import { Customer } from "../types/customer.types";
import { CustomersTable } from "./customers-table";

type CustomersListProps = {
  customersData: Customer[];
  isLoading: boolean;
  error: Error | null;
};

export function CustomersList({
  customersData,
  isLoading,
  error,
}: CustomersListProps) {
  return (
    <section className="flex flex-col gap-6">
      <PageHeader
        title="Customers"
        description="Manage customer relationships and account details."
      />
      <CustomersTable
        data={customersData}
        isLoading={isLoading}
        error={error}
      />
    </section>
  );
}
