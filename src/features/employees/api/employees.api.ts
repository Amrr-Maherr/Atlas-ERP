import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001",
});

export async function getEmployees() {
  const { data } = await api.get("/employees");
  return data;
}

type GetEmployeeProps = {
  id: string;
};

export async function getEmployee({ id }: GetEmployeeProps) {
  const { data } = await api.get(`/employees/${id}`);
  return data;
}
