"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getSuppliers, getSupplier, DeleteSupplier, UpdateSupplier, CreateSupplier } from "../api/suppliers.api";
import { Supplier } from "../types/supplier.types";
import type { ListQuery } from "../../../lib/list-query";

export function useSuppliers({ page = 1, per_page = 10, search, sort }: ListQuery = {}) {
  return useQuery({
    queryKey: ["suppliers", page, per_page, search, sort],
    queryFn: () => getSuppliers({ page, per_page, search, sort }),
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

export function useDeleteSupplier() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: string }) => DeleteSupplier({ id }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["suppliers"],
      });
    },
  });
}

type UseCreateSupplierProps = {
  CreateData: Supplier;
};

export function useCreateSupplier() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ CreateData }: UseCreateSupplierProps) => CreateSupplier({ CreateData }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["suppliers"],
      });
    },
  });
}

type UseUpdateSupplierProps = {
  id: string;
  UpdateData: Supplier;
};

export function useUpdateSupplier() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, UpdateData }: UseUpdateSupplierProps) => UpdateSupplier({ id, UpdateData }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["suppliers"],
      });
    },
  });
}
