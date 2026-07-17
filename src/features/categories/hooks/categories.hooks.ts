"use client";

import { useQuery } from "@tanstack/react-query";
import { getCategories, getCategory } from "../api/categories.api";

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
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
