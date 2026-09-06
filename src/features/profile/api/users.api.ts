import api from "../../../lib/api";
import { extractOne, mapId } from "../../../lib/api-response";
import { UserProfile } from "../types/profile.types";

type BackendUser = {
  _id: string;
  name: string;
  email: string;
  role: string;
  createdAt?: string;
  updatedAt?: string;
};

export function mapUser(u: BackendUser): UserProfile {
  const id = String(u._id);
  const [firstName, ...rest] = u.name.split(" ").filter(Boolean);
  return {
    id,
    name: u.name,
    email: u.email,
    role: u.role ?? "user",
    isActive: true,
    firstName: firstName ?? "",
    lastName: rest.join(" "),
    avatar: "",
    phone: "",
    department: "",
    position: "",
    permissions: [],
    lastLogin: u.createdAt ?? "",
    createdAt: u.createdAt ?? "",
    updatedAt: u.updatedAt ?? "",
  };
}

type GetUserProps = {
  id: string;
};

export async function getUser({ id }: GetUserProps) {
  const { data } = await api.get(`/users/${id}`);
  const user = extractOne<BackendUser>(data, "user");
  return user ? mapUser(user) : undefined;
}