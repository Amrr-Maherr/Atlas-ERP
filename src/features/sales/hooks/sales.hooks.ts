"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getSales, getSale, DeleteSale } from "../api/sales.api";

export function useSales({ page = 1, per_page = 10 } = {}) {
  return useQuery({
    queryKey: ["sales", page, per_page],
    queryFn: () => getSales({ page, per_page }),
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

export function useDeleteSale() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: string }) => DeleteSale({ id }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["sales"],
      });
    },
  });
}
