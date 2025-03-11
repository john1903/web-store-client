import { Role } from "@/types/roles/role";

export interface User {
  id: number;
  role: Role;
  email: string;
  phoneNumber: string;
}

export interface CreateUserRequest {
  roleId?: number;
  email: string;
  password: string;
  phoneNumber: string;
}

export interface UpdateUserRequest {
  roleId?: number;
  email?: string;
  phoneNumber?: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}
