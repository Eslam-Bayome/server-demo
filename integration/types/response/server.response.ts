export type ServerStatus = "up" | "down" | "degraded";

export type SortField =
  | "name"
  | "status"
  | "ip_address"
  | "response_time_ms"
  | "uptime_percentage";

export type SortOrder = "asc" | "desc";

export interface SortConfig {
  field: SortField;
  order: SortOrder;
}

export interface Server {
  id: string;
  name: string;
  ip_address: string;
  status: ServerStatus;
  response_time_ms: number;
  uptime_percentage: number;
  region: string;
  last_checked: string;
  tags?: string[];
  description?: string;
}

export interface ServersListResponse {
  data: Server[];
  total: number;
  page: number;
  per_page: number;
}

export interface ServerDetailResponse {
  data: Server;
}
