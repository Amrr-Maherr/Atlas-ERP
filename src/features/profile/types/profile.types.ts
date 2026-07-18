export type UserProfile = {
  id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  firstName: string;
  lastName: string;
  avatar: string;
  phone: string;
  department: string;
  position: string;
  permissions: string[];
  lastLogin: string;
  createdAt: string;
  updatedAt: string;
};

export type StoredUser = {
  id: string;
  name: string;
  email: string;
  role: string;
};
