export const APP_NAME = "ServerWatch";
export const APP_DESCRIPTION =
  "Real-time server status dashboard for your infrastructure.";

export const ROUTES = {
  home: "/",
  login: "/login",
  signup: "/signup",
  dashboard: "/dashboard",
  serverDetail: (id: string) => `/dashboard/${id}`,
} as const;

export const SERVER_STATUS_LABELS = {
  up: "Up",
  down: "Down",
  degraded: "Degraded",
} as const;

export const MOCK_DELAY_MS = {
  fast: 300,
  normal: 600,
  slow: 1200,
} as const;

export const PAGINATION_DEFAULTS = {
  page: 1,
  per_page: 20,
} as const;
