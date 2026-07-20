import api from "../../../lib/api";

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

export async function DeleteEmployee({ id }: GetEmployeeProps) {
  const { data } = await api.delete(`/employees/${id}`);
  return data;
}
