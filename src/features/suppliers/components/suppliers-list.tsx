import { PageHeader } from "@/components/shared/page-header";
import { Supplier } from "../types/supplier.types";
import { SuppliersTable } from "./suppliers-table";

type SuppliersListProps = {
  suppliersData: Supplier[];
  isLoading: boolean;
  error: Error | null;
  page?: number;
  per_page?: number;
  total?: number;
  onChangePage?: (page: number) => void;
};

export function SuppliersList({
  suppliersData,
  isLoading,
  error,
  page,
  per_page,
  total,
  onChangePage,
}: SuppliersListProps) {
  return (
    <section className="flex flex-col gap-6">
      <PageHeader
        title="Suppliers"
        description="Manage supplier relationships and procurement details."
      />
      <SuppliersTable
        data={suppliersData}
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
