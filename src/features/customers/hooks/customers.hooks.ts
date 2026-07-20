"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCustomers, getCustomer, DeleteCustomer } from "../api/customers.api";

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

export function useDeleteCustomer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: string }) => DeleteCustomer({ id }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["customers"],
      });
    },
  });
}
