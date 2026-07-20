import api from "../../../lib/api";

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
