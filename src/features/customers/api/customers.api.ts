import api from "../../../lib/api";
import { Customer } from "../types/customer.types";

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

type UseUpdateCustomerProps = {
  id: string;
  UpdateData: Customer;
};

export async function UpdateCustomer({ id, UpdateData }: UseUpdateCustomerProps) {
  const { data } = await api.patch(`/customers/${id}`, UpdateData);
  return data;
}
