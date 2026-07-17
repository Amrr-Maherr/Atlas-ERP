"use client";

import { useQuery } from "@tanstack/react-query";
import { getSales, getSale } from "../api/sales.api";

export function useSales() {
  return useQuery({
    queryKey: ["sales"],
    queryFn: () => getSales(),
  });
}

type UseSaleProps = {
  id: string;
};

export function useSale({ id }: UseSaleProps) {
  return useQuery({
    queryKey: ["sales", id],
    queryFn: () => getSale({ id }),
  });
}
