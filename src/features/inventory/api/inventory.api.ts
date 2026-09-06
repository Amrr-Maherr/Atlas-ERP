import api from "../../../lib/api";
import { extractList, extractOne } from "../../../lib/api-response";
import { InventoryItem } from "../types/inventory.types";
import { toBackendSort, type ListQuery } from "../../../lib/list-query";
import {
  mapProduct,
  BackendProduct,
  toBackendProduct,
} from "../../products/api/getProducts";

export function mapInventoryItem(p: BackendProduct): InventoryItem {
  const product = mapProduct(p);
  return product as InventoryItem;
}

export async function getInventory({ page = 1, per_page = 10, search, sort }: ListQuery = {}) {
  const { data } = await api.get("/products", {
    params: { page, limit: per_page, search, sort: toBackendSort(sort) },
  });
  const { items, total } = extractList<BackendProduct>(data, "products");
  return { items: items.map(mapInventoryItem), total };
}

type GetInventoryItemProps = {
  id: string;
};

export async function getInventoryItem({ id }: GetInventoryItemProps) {
  const { data } = await api.get(`/products/${id}`);
  const product = extractOne<BackendProduct>(data, "product");
  return product ? mapInventoryItem(product) : undefined;
}

export async function DeleteInventoryItem({ id }: GetInventoryItemProps) {
  const { data } = await api.delete(`/products/${id}`);
  return data;
}

type CreateInventoryItemProps = {
  CreateData: InventoryItem;
};

export async function CreateInventoryItem({ CreateData }: CreateInventoryItemProps) {
  const { data } = await api.post("/products", toBackendProduct(CreateData));
  const product = extractOne<BackendProduct>(data, "product");
  return product ? mapInventoryItem(product) : undefined;
}

type UseUpdateInventoryItemProps = {
  id: string;
  UpdateData: InventoryItem;
};

export async function UpdateInventoryItem({ id, UpdateData }: UseUpdateInventoryItemProps) {
  const { data } = await api.patch(`/products/${id}`, toBackendProduct(UpdateData));
  const product = extractOne<BackendProduct>(data, "product");
  return product ? mapInventoryItem(product) : undefined;
}