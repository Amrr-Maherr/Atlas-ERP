import api from "../../../lib/api";
import { Supplier } from "../types/supplier.types";

export async function getSuppliers({ page = 1, per_page = 10 } = {}) {
  const { data } = await api.get(`/suppliers?_page=${page}&_per_page=${per_page}`);
  return { items: data.data, total: data.items };
}

type GetSupplierProps = {
  id: string;
};

export async function getSupplier({ id }: GetSupplierProps) {
  const { data } = await api.get(`/suppliers/${id}`);
  return data;
}

export async function DeleteSupplier({ id }: GetSupplierProps) {
  const { data } = await api.delete(`/suppliers/${id}`);
  return data;
}

type CreateSupplierProps = {
  CreateData: Supplier;
};

export async function CreateSupplier({ CreateData }: CreateSupplierProps) {
  const { data } = await api.post(`/suppliers`, CreateData);
  return data;
}

type UseUpdateSupplierProps = {
  id: string;
  UpdateData: Supplier;
};

export async function UpdateSupplier({ id, UpdateData }: UseUpdateSupplierProps) {
  const { data } = await api.patch(`/suppliers/${id}`, UpdateData);
  return data;
}
