import api from "../../../lib/api";

export async function getCustomers({ page = 1, per_page = 10 } = {}) {
  const { data } = await api.get(`/customers?_page=${page}&_per_page=${per_page}`);
  return { items: data.data, total: data.items };
}

type GetCustomerProps = {
  id: string;
};

export async function getCustomer({ id }: GetCustomerProps) {
  const { data } = await api.get(`/customers/${id}`);
  return data;
}

export async function DeleteCustomer({ id }: GetCustomerProps) {
  const { data } = await api.delete(`/customers/${id}`);
  return data;
}
