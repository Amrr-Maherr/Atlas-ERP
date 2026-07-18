import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001",
});

export async function getSettings() {
  const { data } = await api.get("/settings");
  return data;
}

type GetSettingProps = {
  id: string;
};

export async function getSetting({ id }: GetSettingProps) {
  const { data } = await api.get(`/settings/${id}`);
  return data;
}
