"use client"

import { Sale } from "../types/sale.types";
import { SaleDetailsHeader } from "./sale-details-header";
import { SaleDetailsCard } from "./sale-details-card";
import { SaleDetailsSkeleton } from "./sale-details-skeleton";
import { SaleDetailsError } from "./sale-details-error";

type SaleDetailsProps = {
  saleData: Sale | undefined;
  isLoading: boolean;
  error: Error | null;
};

export function SaleDetails({
  saleData,
  isLoading,
  error,
}: SaleDetailsProps) {
  return (
    <section className="flex flex-col gap-6">
      <SaleDetailsHeader />
      <SaleDetailsSkeleton isLoading={isLoading} />
      <SaleDetailsError error={error} />
      {!isLoading && !error && saleData && (
        <SaleDetailsCard sale={saleData} />
      )}
    </section>
  );
}
