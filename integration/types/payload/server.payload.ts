import { ServerStatus, SortField, SortOrder } from "../response/server.response";

export interface FetchServersPayload {
  page?: number;
  per_page?: number;
  search?: string;
  status?: ServerStatus | "all";
  sort_by?: SortField;
  sort_order?: SortOrder;
  region?: string;
}

export interface FetchServerDetailPayload {
  id: string;
}
