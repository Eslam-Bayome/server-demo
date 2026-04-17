export interface AuthUser {
  id: string;
  email: string;
  name: string;
  avatar_url?: string;
  created_at: string;
}

export interface LoginResponse {
  user: AuthUser;
  access_token: string;
  expires_at: string;
}

export interface SignupResponse {
  user: AuthUser;
  access_token: string;
  expires_at: string;
}

export interface AuthError {
  code: string;
  message: string;
}
