import api from "../../../lib/api";
import { Category } from "../types/category.types";

export async function getCategories({ page = 1, per_page = 10 } = {}) {
  const { data } = await api.get(`/categories?_page=${page}&_per_page=${per_page}`);
  return { items: data.data, total: data.items };
}

type GetCategoryProps = {
  id: string;
};

export async function getCategory({ id }: GetCategoryProps) {
  const { data } = await api.get(`/categories/${id}`);
  return data;
}
export async function DeleteCategory({ id }: GetCategoryProps) {
  const { data } = await api.delete(`/categories/${id}`);
  return data;
}

type UseUpdateCategoryProps = {
  id: string;
  UpdateData: Category
};


export async function UpdateCategory({ id, UpdateData }: UseUpdateCategoryProps) {
  const { data } = await api.patch(`/categories/${id}`, UpdateData);
  return data;
}
