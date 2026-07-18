import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001",
});

export async function getSales({ page = 1, per_page = 10 } = {}) {
  const { data } = await api.get(`/sales?_page=${page}&_per_page=${per_page}`);
  return { items: data.data, total: data.items };
}

type GetSaleProps = {
  id: string;
};

export async function getSale({ id }: GetSaleProps) {
  const { data } = await api.get(`/sales/${id}`);
  return data;
}
