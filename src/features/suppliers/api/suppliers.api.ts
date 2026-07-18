import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001",
});

export async function getSuppliers({ page = 1, per_page = 10 } = {}) {
  const { data } = await api.get(`/suppliers?_page=${page}&_per_page=${per_page}`);
  return { items: data.data, total: data.items };
}

type GetSupplierProps = {
  id: string;
};

export async function getSupplier({ id }: GetSupplierProps) {
  const { data } = await api.get(`/suppliers/${id}`);
  return data;
}
