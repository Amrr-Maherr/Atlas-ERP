"use client";

import { useQuery } from "@tanstack/react-query";
import { getCustomers, getCustomer } from "../api/customers.api";

export function useCustomers({ page = 1, per_page = 10 } = {}) {
  return useQuery({
    queryKey: ["customers", page, per_page],
    queryFn: () => getCustomers({ page, per_page }),
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
