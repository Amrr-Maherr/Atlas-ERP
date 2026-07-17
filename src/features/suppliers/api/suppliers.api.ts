import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001",
});

export async function getSuppliers() {
  const { data } = await api.get("/suppliers");
  return data;
}

type GetSupplierProps = {
  id: string;
};

export async function getSupplier({ id }: GetSupplierProps) {
  const { data } = await api.get(`/suppliers/${id}`);
  return data;
}
