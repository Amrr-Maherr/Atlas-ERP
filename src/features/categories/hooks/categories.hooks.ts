"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { DeleteCategory, getCategories, getCategory } from "../api/categories.api";
export function useCategories({ page = 1, per_page = 10 } = {}) {
  return useQuery({
    queryKey: ["categories", page, per_page],
    queryFn: () => getCategories({ page, per_page }),
  });
}

type UseCategoryProps = {
  id: string;
};
export function useCategory({ id }: UseCategoryProps) {
  return useQuery({
    queryKey: ["categories", id],
    queryFn: () => getCategory({ id }),
  });
}
// hook for delete category
export function useDeleteCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: string }) => DeleteCategory({ id }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
  });
}
