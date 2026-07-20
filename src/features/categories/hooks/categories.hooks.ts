"use client";

import { QueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { DeleteCategory, getCategories, getCategory } from "../api/categories.api";
const queryClient = new QueryClient()
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
export function useDeleteCategory({ id }: UseCategoryProps) {
  return useMutation({
    mutationFn: () => DeleteCategory({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
  });
}
