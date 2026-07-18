import { PageHeader } from "@/components/shared/page-header";
import { Sale } from "../types/sale.types";
import { SalesTable } from "./sales-table";

type SalesListProps = {
  salesData: Sale[];
  isLoading: boolean;
  error: Error | null;
  page?: number;
  per_page?: number;
  total?: number;
  onChangePage?: (page: number) => void;
};

export function SalesList({
  salesData,
  isLoading,
  error,
  page,
  per_page,
  total,
  onChangePage,
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
        page={page}
        per_page={per_page}
        total={total}
        onChangePage={onChangePage}
      />
    </section>
  );
}
