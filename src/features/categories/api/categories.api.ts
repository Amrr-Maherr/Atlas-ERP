import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001",
});

export async function getCategories() {
  const { data } = await api.get("/categories");
  return data;
}

type GetCategoryProps = {
  id: string;
};

export async function getCategory({ id }: GetCategoryProps) {
  const { data } = await api.get(`/categories/${id}`);
  return data;
}
