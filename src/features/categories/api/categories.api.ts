import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001",
});

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
