import { ViewDetailsButton } from "@/components/shared/view-details-button";
import type { Supplier } from "../types/supplier.types";
import { DeleteSupplierButton } from "./delete-supplier-button";

type SupplierRowActionsProps = {
  supplier: Supplier;
};

export function SupplierRowActions({ supplier }: SupplierRowActionsProps) {
  return (
    <div className="flex items-center justify-end gap-1">
      <ViewDetailsButton
        href={`/dashboard/suppliers/${supplier.id}`}
        label="View supplier details"
      />
      <DeleteSupplierButton supplier={supplier} />
    </div>
  );
}
