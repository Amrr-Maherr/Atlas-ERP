import { PageHeader } from "@/components/shared/page-header";
import { Sale } from "../types/sale.types";
import { SalesTable } from "./sales-table";

type SalesListProps = {
  salesData: Sale[];
  isLoading: boolean;
  error: Error | null;
};

export function SalesList({
  salesData,
  isLoading,
  error,
}: SalesListProps) {
  return (
    <section className="flex flex-col gap-6">
      <PageHeader
        title="Sales"
        description="View and manage sales invoices and transactions."
      />
      <SalesTable
        data={salesData}
        isLoading={isLoading}
        error={error}
      />
    </section>
  );
}
