"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getSuppliers, getSupplier, DeleteSupplier } from "../api/suppliers.api";

export function useSuppliers({ page = 1, per_page = 10 } = {}) {
  return useQuery({
    queryKey: ["suppliers", page, per_page],
    queryFn: () => getSuppliers({ page, per_page }),
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
