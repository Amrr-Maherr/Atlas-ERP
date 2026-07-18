import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001",
});

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
