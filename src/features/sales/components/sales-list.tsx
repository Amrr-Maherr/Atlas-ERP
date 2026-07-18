import { PageHeader } from "@/components/shared/page-header";
import { DataTable } from "@/components/shared/data-table";
import { Sale } from "../types/sale.types";
import { saleColumns, saleExportColumns } from "../columns";

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
      <DataTable
        columns={saleColumns}
        data={salesData}
        isLoading={isLoading}
        error={error}
        page={page}
        per_page={per_page}
        total={total}
        onChangePage={onChangePage}
        exportColumns={saleExportColumns}
        exportFilename="sales"
        emptyTitle="No sales yet"
        emptyDescription="Your sales will appear here."
      />
    </section>
  );
}
