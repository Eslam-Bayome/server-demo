import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ROUTES } from "@/lib/constants";

/** Routes that logged-in users should not be able to visit. */
const AUTH_ROUTES = [ROUTES.login, ROUTES.signup];

/** Routes that require the user to be logged in. */
const PROTECTED_ROUTES = [ROUTES.dashboard];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Read the token cookie set by lib/auth.ts on the client after login/signup.
  const token = request.cookies.get("auth_token")?.value ?? null;
  const isLoggedIn = Boolean(token);

  // ── Rule 1: block dashboard access when not logged in ───────────────────────
  const isProtected = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route),
  );
  if (isProtected && !isLoggedIn) {
    return NextResponse.redirect(new URL(ROUTES.login, request.url));
  }

  // ── Rule 2: send already-logged-in users away from auth pages ───────────────
  const isAuthPage = AUTH_ROUTES.includes(
    pathname as (typeof AUTH_ROUTES)[number],
  );
  if (isAuthPage && isLoggedIn) {
    return NextResponse.redirect(new URL(ROUTES.dashboard, request.url));
  }

  // All good — let the request through.
  return NextResponse.next();
}

export const config = {
  /*
   * Match every route except:
   *   - Next.js internal routes (_next/*)
   *   - Static files (favicon, images, etc.)
   *
   * This keeps the matcher lean and avoids running the proxy on assets.
   */
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
