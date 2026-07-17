import { PageHeader } from "@/components/shared/page-header";
import { Supplier } from "../types/supplier.types";
import { SuppliersTable } from "./suppliers-table";

type SuppliersListProps = {
  suppliersData: Supplier[];
  isLoading: boolean;
  error: Error | null;
};

export function SuppliersList({
  suppliersData,
  isLoading,
  error,
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
      />
    </section>
  );
}
