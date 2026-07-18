import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001",
});

export async function getPurchaseOrders({ page = 1, per_page = 10 } = {}) {
  const { data } = await api.get(`/purchaseOrders?_page=${page}&_per_page=${per_page}`);
  return { items: data.data, total: data.items };
}

type GetPurchaseOrderProps = {
  id: string;
};

export async function getPurchaseOrder({ id }: GetPurchaseOrderProps) {
  const { data } = await api.get(`/purchaseOrders/${id}`);
  return data;
}
