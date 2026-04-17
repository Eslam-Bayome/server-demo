import { AuthUser } from "../types/response/auth.response";

export const MOCK_USER: AuthUser = {
  id: "usr-001",
  email: "admin@serverwatch.io",
  name: "Admin User",
  avatar_url: undefined,
  created_at: new Date("2024-01-15").toISOString(),
};

export const MOCK_CREDENTIALS = {
  email: "admin@serverwatch.io",
  password: "password123",
};
