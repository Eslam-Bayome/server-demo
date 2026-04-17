import { MOCK_SERVERS } from "../mock_data/servers.mock";
import {
  ServersListResponse,
  ServerDetailResponse,
} from "../types/response/server.response";
import { FetchServersPayload, FetchServerDetailPayload } from "../types/payload/server.payload";
import { filterServers, sortServers } from "@/helpers";

const simulateDelay = (ms = 600) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const getServers = async (
  params: FetchServersPayload = {}
): Promise<ServersListResponse> => {
  await simulateDelay();

  const { search = "", status = "all", sort_by, sort_order = "asc", page = 1, per_page = 20 } = params;

  const filtered = sortServers(
    filterServers(MOCK_SERVERS, search, status),
    sort_by ? { field: sort_by, order: sort_order } : undefined
  );

  const start = (page - 1) * per_page;

  return {
    data: filtered.slice(start, start + per_page),
    total: filtered.length,
    page,
    per_page,
  };
};

export const getServerById = async (
  params: FetchServerDetailPayload
): Promise<ServerDetailResponse> => {
  await simulateDelay(400);
  const server = MOCK_SERVERS.find((s) => s.id === params.id);
  if (!server) throw new Error(`Server with id "${params.id}" not found.`);
  return { data: server };
};
