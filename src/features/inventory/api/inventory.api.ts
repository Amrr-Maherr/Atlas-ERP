import api from "../../../lib/api";

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
