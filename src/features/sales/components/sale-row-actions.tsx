import { ViewDetailsButton } from "@/components/shared/view-details-button";
import type { Sale } from "../types/sale.types";
import { DeleteSaleButton } from "./delete-sale-button";

type SaleRowActionsProps = {
  sale: Sale;
};

export function SaleRowActions({ sale }: SaleRowActionsProps) {
  return (
    <div className="flex items-center justify-end gap-1">
      <ViewDetailsButton
        href={`/dashboard/sales/${sale.id}`}
        label="View sale details"
      />
      <DeleteSaleButton sale={sale} />
    </div>
  );
}
