import axios from "axios";
import { InventoryItem } from "../types/inventory.types";

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

export async function DeleteInventoryItem({ id }: GetInventoryItemProps) {
  const { data } = await api.delete(`/products/${id}`);
  return data;
}

type UseUpdateInventoryItemProps = {
  id: string;
  UpdateData: InventoryItem;
};

export async function UpdateInventoryItem({ id, UpdateData }: UseUpdateInventoryItemProps) {
  const { data } = await api.patch(`/products/${id}`, UpdateData);
  return data;
}
