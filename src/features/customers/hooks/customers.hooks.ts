"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCustomers, getCustomer, DeleteCustomer, UpdateCustomer, CreateCustomer } from "../api/customers.api";
import { Customer } from "../types/customer.types";
import type { ListQuery } from "../../../lib/list-query";

export function useCustomers({ page = 1, per_page = 10, search, sort }: ListQuery = {}) {
  return useQuery({
    queryKey: ["customers", page, per_page, search, sort],
    queryFn: () => getCustomers({ page, per_page, search, sort }),
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

type UseCreateCustomerProps = {
  CreateData: Customer;
};

export function useCreateCustomer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ CreateData }: UseCreateCustomerProps) => CreateCustomer({ CreateData }),

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
