import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001",
});

type GetUserProps = {
  id: string;
};

export async function getUser({ id }: GetUserProps) {
  const { data } = await api.get(`/users/${id}`);
  return data;
}
