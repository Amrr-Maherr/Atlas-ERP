import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001",
});

export async function getPurchaseOrders() {
  const { data } = await api.get("/purchaseOrders");
  return data;
}

type GetPurchaseOrderProps = {
  id: string;
};

export async function getPurchaseOrder({ id }: GetPurchaseOrderProps) {
  const { data } = await api.get(`/purchaseOrders/${id}`);
  return data;
}
