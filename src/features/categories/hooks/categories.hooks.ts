"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { DeleteCategory, UpdateCategory, getCategories, getCategory } from "../api/categories.api";
import { Category } from "../types/category.types";
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

type UseUpdateCategoryProps = {
  id: string;
  UpdateData: Category
};

export function useUpdateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, UpdateData }: UseUpdateCategoryProps) => UpdateCategory({ id, UpdateData }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
  });
}
