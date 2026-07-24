import axios from "axios";
import { Customer } from "../types/customer.types";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001",
});

export async function getCustomers() {
  const { data } = await api.get("/customers");
  return data;
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
