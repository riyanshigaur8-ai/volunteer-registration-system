export type UserRole =
  | "VOLUNTEER"
  | "ORG_ADMIN"
  | "PLATFORM_ADMIN";

export interface OrganizationMembership {
  id: number;
  name: string;
  slug: string;
  role: "ORG_ADMIN";
  status: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  status: string;
  total_hours?: number;
  organizations: OrganizationMembership[];
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}