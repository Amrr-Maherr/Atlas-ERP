import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001",
});

export async function getInventory() {
  const { data } = await api.get("/products");
  return data;
}

type GetInventoryItemProps = {
  id: string;
};

export async function getInventoryItem({ id }: GetInventoryItemProps) {
  const { data } = await api.get(`/products/${id}`);
  return data;
}
