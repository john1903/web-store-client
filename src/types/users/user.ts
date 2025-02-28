import { Role } from "@/types/roles/role";

export interface User {
  id: number;
  role: Role;
  email: string;
  password: string;
  phoneNumber: string;
}

export interface UserRequest {
  roleId?: number;
  email: string;
  password: string;
  phoneNumber: string;
}
