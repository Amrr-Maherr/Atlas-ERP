import { PageHeader } from "@/components/shared/page-header";
import { DataTable } from "@/components/shared/data-table";
import { Customer } from "../types/customer.types";
import { customerColumns, customerExportColumns } from "../columns";

type CustomersListProps = {
  customersData: Customer[];
  isLoading: boolean;
  error: Error | null;
  page?: number;
  per_page?: number;
  total?: number;
  onChangePage?: (page: number) => void;
};

export function CustomersList({
  customersData,
  isLoading,
  error,
  page,
  per_page,
  total,
  onChangePage,
}: CustomersListProps) {
  return (
    <section className="flex flex-col gap-6">
      <PageHeader
        title="Customers"
        description="Manage customer relationships and account details."
      />
      <DataTable
        columns={customerColumns}
        data={customersData}
        isLoading={isLoading}
        error={error}
        page={page}
        per_page={per_page}
        total={total}
        onChangePage={onChangePage}
        exportColumns={customerExportColumns}
        exportFilename="customers"
        emptyTitle="No customers yet"
        emptyDescription="Add your first customer to get started."
      />
    </section>
  );
}
