import api from "../../../lib/api";
import { extractList, extractOne } from "../../../lib/api-response";
import { toBackendSort, type ListQuery } from "../../../lib/list-query";
import { Supplier } from "../types/supplier.types";

type BackendSupplier = {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  status: string;
  createdAt?: string;
  updatedAt?: string;
};

export function mapSupplier(s: BackendSupplier): Supplier {
  const id = String(s._id);
  const status = s.status ?? "active";
  return {
    id,
    name: s.name,
    email: s.email,
    phone: s.phone ?? "",
    address: "",
    contactPerson: "",
    website: "",
    taxNumber: "",
    notes: "",
    isActive: status !== "inactive",
    createdAt: s.createdAt ?? "",
    updatedAt: s.updatedAt ?? "",
    companyName: s.name,
    balance: 0,
    rating: 0,
    totalOrders: 0,
    lastOrderDate: "",
    paymentTerms: "",
    deliveryDays: 0,
    isVerified: false,
    contactPhone: "",
    contactEmail: "",
    country: "",
    image: "",
    logo: "",
    status,
  };
}

export async function getSuppliers({ page = 1, per_page = 10, search, sort }: ListQuery = {}) {
  const { data } = await api.get("/suppliers", {
    params: { page, limit: per_page, search, sort: toBackendSort(sort) },
  });
  const { items, total } = extractList<BackendSupplier>(data, "suppliers");
  return { items: items.map(mapSupplier), total };
}

type GetSupplierProps = {
  id: string;
};

export async function getSupplier({ id }: GetSupplierProps) {
  const { data } = await api.get(`/suppliers/${id}`);
  const supplier = extractOne<BackendSupplier>(data, "supplier");
  return supplier ? mapSupplier(supplier) : undefined;
}

export async function DeleteSupplier({ id }: GetSupplierProps) {
  const { data } = await api.delete(`/suppliers/${id}`);
  return data;
}

type CreateSupplierProps = {
  CreateData: Partial<Supplier>;
};

export async function CreateSupplier({ CreateData }: CreateSupplierProps) {
  const { data } = await api.post("/suppliers", {
    name: CreateData.name,
    email: CreateData.email,
    phone: CreateData.phone,
    status: CreateData.status,
  });
  const supplier = extractOne<BackendSupplier>(data, "supplier");
  return supplier ? mapSupplier(supplier) : undefined;
}

type UseUpdateSupplierProps = {
  id: string;
  UpdateData: Partial<Supplier>;
};

export async function UpdateSupplier({ id, UpdateData }: UseUpdateSupplierProps) {
  const { data } = await api.patch(`/suppliers/${id}`, {
    name: UpdateData.name,
    email: UpdateData.email,
    phone: UpdateData.phone,
    status: UpdateData.status,
  });
  const supplier = extractOne<BackendSupplier>(data, "supplier");
  return supplier ? mapSupplier(supplier) : undefined;
}