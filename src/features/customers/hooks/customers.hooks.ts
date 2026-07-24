"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCustomers, getCustomer, DeleteCustomer, UpdateCustomer } from "../api/customers.api";
import { Customer } from "../types/customer.types";

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

type UseUpdateCustomerProps = {
  id: string;
  UpdateData: Customer;
};

export function useUpdateCustomer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, UpdateData }: UseUpdateCustomerProps) => UpdateCustomer({ id, UpdateData }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["customers"],
      });
    },
  });
}
