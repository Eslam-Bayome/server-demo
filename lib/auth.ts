/**
 * Auth utilities — single source of truth for session management.
 *
 * Storage strategy (two-layer):
 *   1. localStorage  – persists across page reloads, readable by client code.
 *   2. Cookie        – sent with every request, readable by proxy.ts (server).
 *
 * This lets proxy.ts protect routes before the page renders, while client
 * components can still read the full user object from localStorage.
 */

import { AuthUser, LoginResponse, SignupResponse } from "@/integration/types/response/auth.response";

// ─── Storage keys ────────────────────────────────────────────────────────────

const TOKEN_KEY = "auth_token";
const USER_KEY = "auth_user";
/** Cookie name used by proxy.ts to guard dashboard routes server-side. */
const COOKIE_NAME = "auth_token";

// ─── Save / clear ────────────────────────────────────────────────────────────

/**
 * Persist a successful auth response (login or signup).
 * Writes to localStorage and sets a cookie so proxy.ts can redirect properly.
 */
export function saveSession(response: LoginResponse | SignupResponse): void {
  localStorage.setItem(TOKEN_KEY, response.access_token);
  localStorage.setItem(USER_KEY, JSON.stringify(response.user));

  // Cookie expires when the token does (proxy.ts reads this cookie).
  const expires = new Date(response.expires_at).toUTCString();
  document.cookie = `${COOKIE_NAME}=${response.access_token}; path=/; expires=${expires}; SameSite=Lax`;
}

/**
 * Remove the session from localStorage and expire the cookie.
 * Call this on logout.
 */
export function clearSession(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);

  // Expire the cookie immediately.
  document.cookie = `${COOKIE_NAME}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax`;
}

// ─── Read ─────────────────────────────────────────────────────────────────────

/** Returns the raw access token, or null if the user is not logged in. */
export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

/** Returns the cached user object, or null if the user is not logged in. */
export function getUser(): AuthUser | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

/** Returns true if a token exists in localStorage. */
export function isAuthenticated(): boolean {
  return getToken() !== null;
}
