import api from "../../../lib/api";

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

export async function DeletePurchaseOrder({ id }: GetPurchaseOrderProps) {
  const { data } = await api.delete(`/purchaseOrders/${id}`);
  return data;
}
