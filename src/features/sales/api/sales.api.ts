import api from "../../../lib/api";
import { Sale } from "../types/sale.types";

export async function getSales({ page = 1, per_page = 10 } = {}) {
  const { data } = await api.get(`/sales?_page=${page}&_per_page=${per_page}`);
  return { items: data.data, total: data.items };
}

type GetSaleProps = {
  id: string;
};

export async function getSale({ id }: GetSaleProps) {
  const { data } = await api.get(`/sales/${id}`);
  return data;
}

export async function DeleteSale({ id }: GetSaleProps) {
  const { data } = await api.delete(`/sales/${id}`);
  return data;
}

type CreateSaleProps = {
  CreateData: Sale;
};

export async function CreateSale({ CreateData }: CreateSaleProps) {
  const { data } = await api.post(`/sales`, CreateData);
  return data;
}

type UseUpdateSaleProps = {
  id: string;
  UpdateData: Sale;
};

export async function UpdateSale({ id, UpdateData }: UseUpdateSaleProps) {
  const { data } = await api.patch(`/sales/${id}`, UpdateData);
  return data;
}
