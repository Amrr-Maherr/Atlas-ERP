import api from "../../../lib/api";
import { extractList, extractOne, mapId } from "../../../lib/api-response";
import { toBackendSort, type ListQuery } from "../../../lib/list-query";
import { Customer } from "../types/customer.types";

type BackendCustomer = {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  status: string;
  createdAt?: string;
  updatedAt?: string;
};

export function mapCustomer(c: BackendCustomer): Customer {
  const id = String(c._id);
  const status = c.status ?? "active";
  return {
    id,
    name: c.name,
    email: c.email,
    phone: c.phone ?? "",
    city: "",
    address: "",
    loyaltyPoints: 0,
    totalSpent: 0,
    notes: "",
    isActive: status !== "inactive",
    createdAt: c.createdAt ?? "",
    updatedAt: c.updatedAt ?? "",
    firstName: "",
    lastName: "",
    gender: null,
    birthDate: null,
    companyName: "",
    taxNumber: "",
    creditLimit: 0,
    paymentTerms: "",
    preferredContact: "",
    vipStatus: "",
    totalOrders: 0,
    lastOrderDate: "",
    country: "",
    postalCode: "",
    avatar: "",
    customerSince: c.createdAt ?? "",
    status,
    preferredPaymentMethod: "",
    averageOrderValue: 0,
  };
}

export async function getCustomers({ page = 1, per_page = 10, search, sort }: ListQuery = {}) {
  const { data } = await api.get("/customers", {
    params: { page, limit: per_page, search, sort: toBackendSort(sort) },
  });
  const { items, total } = extractList<BackendCustomer>(data, "customers");
  return { items: items.map(mapCustomer), total };
}

type GetCustomerProps = {
  id: string;
};

export async function getCustomer({ id }: GetCustomerProps) {
  const { data } = await api.get(`/customers/${id}`);
  const customer = extractOne<BackendCustomer>(data, "customer");
  return customer ? mapCustomer(customer) : undefined;
}

export async function DeleteCustomer({ id }: GetCustomerProps) {
  const { data } = await api.delete(`/customers/${id}`);
  return data;
}

type CreateCustomerProps = {
  CreateData: Partial<Customer>;
};

export async function CreateCustomer({ CreateData }: CreateCustomerProps) {
  const { data } = await api.post("/customers", {
    name: CreateData.name,
    email: CreateData.email,
    phone: CreateData.phone,
    status: CreateData.status,
  });
  const customer = extractOne<BackendCustomer>(data, "customer");
  return customer ? mapCustomer(customer) : undefined;
}

type UseUpdateCustomerProps = {
  id: string;
  UpdateData: Partial<Customer>;
};

export async function UpdateCustomer({ id, UpdateData }: UseUpdateCustomerProps) {
  const { data } = await api.patch(`/customers/${id}`, {
    name: UpdateData.name,
    email: UpdateData.email,
    phone: UpdateData.phone,
    status: UpdateData.status,
  });
  const customer = extractOne<BackendCustomer>(data, "customer");
  return customer ? mapCustomer(customer) : undefined;
}