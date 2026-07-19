import api from "../../../lib/api";

type GetUserProps = {
  id: string;
};

export async function getUser({ id }: GetUserProps) {
  const { data } = await api.get(`/users/${id}`);
  return data;
}
