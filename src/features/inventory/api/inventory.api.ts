import api from "../../../lib/api";
import { InventoryItem } from "../types/inventory.types";

export async function getInventory({ page = 1, per_page = 10 } = {}) {
  const { data } = await api.get(`/products?_page=${page}&_per_page=${per_page}`);
  return { items: data.data, total: data.items };
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

type CreateInventoryItemProps = {
  CreateData: InventoryItem;
};

export async function CreateInventoryItem({ CreateData }: CreateInventoryItemProps) {
  const { data } = await api.post(`/products`, CreateData);
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
