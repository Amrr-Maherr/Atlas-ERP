"use client";

import { useQuery } from "@tanstack/react-query";
import { getSuppliers, getSupplier } from "../api/suppliers.api";

export function useSuppliers() {
  return useQuery({
    queryKey: ["suppliers"],
    queryFn: () => getSuppliers(),
  });
}

type UseSupplierProps = {
  id: string;
};

export function useSupplier({ id }: UseSupplierProps) {
  return useQuery({
    queryKey: ["suppliers", id],
    queryFn: () => getSupplier({ id }),
  });
}
