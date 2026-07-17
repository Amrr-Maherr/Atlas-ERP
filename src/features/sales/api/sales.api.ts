import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001",
});

export async function getSales() {
  const { data } = await api.get("/sales");
  return data;
}

type GetSaleProps = {
  id: string;
};

export async function getSale({ id }: GetSaleProps) {
  const { data } = await api.get(`/sales/${id}`);
  return data;
}
