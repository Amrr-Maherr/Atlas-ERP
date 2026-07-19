import api from "../../../lib/api";

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
