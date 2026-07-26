import api from "../../../lib/api";
import { PurchaseOrder } from "../types/purchase-order.types";

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

type CreatePurchaseOrderProps = {
  CreateData: PurchaseOrder;
};

export async function CreatePurchaseOrder({ CreateData }: CreatePurchaseOrderProps) {
  const { data } = await api.post(`/purchaseOrders`, CreateData);
  return data;
}

type UseUpdatePurchaseOrderProps = {
  id: string;
  UpdateData: PurchaseOrder;
};

export async function UpdatePurchaseOrder({ id, UpdateData }: UseUpdatePurchaseOrderProps) {
  const { data } = await api.patch(`/purchaseOrders/${id}`, UpdateData);
  return data;
}
