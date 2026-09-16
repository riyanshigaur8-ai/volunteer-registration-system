export type UserRole =
  | "VOLUNTEER"
  | "ORG_ADMIN"
  | "PLATFORM_ADMIN";

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  status: string;
  total_hours?: number;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}