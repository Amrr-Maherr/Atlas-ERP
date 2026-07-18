import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001",
});

export async function getEmployees({ page = 1, per_page = 10 } = {}) {
  const { data } = await api.get(`/employees?_page=${page}&_per_page=${per_page}`);
  return { items: data.data, total: data.items };
}

type GetEmployeeProps = {
  id: string;
};

export async function getEmployee({ id }: GetEmployeeProps) {
  const { data } = await api.get(`/employees/${id}`);
  return data;
}
