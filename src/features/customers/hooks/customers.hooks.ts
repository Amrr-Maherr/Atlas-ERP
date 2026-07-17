"use client";

import { useQuery } from "@tanstack/react-query";
import { getCustomers, getCustomer } from "../api/customers.api";

export function useCustomers() {
  return useQuery({
    queryKey: ["customers"],
    queryFn: () => getCustomers(),
  });
}

type UseCustomerProps = {
  id: string;
};

export function useCustomer({ id }: UseCustomerProps) {
  return useQuery({
    queryKey: ["customers", id],
    queryFn: () => getCustomer({ id }),
  });
}
