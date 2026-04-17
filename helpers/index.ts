import {
  Server,
  ServerStatus,
  SortConfig,
} from "@/integration/types/response/server.response";

export function filterServers(
  servers: Server[],
  search: string,
  status: ServerStatus | "all",
): Server[] {
  let result = servers;

  if (search) {
    const q = search.toLowerCase();
    result = result.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.ip_address.includes(q) ||
        s.region.toLowerCase().includes(q),
    );
  }

  if (status !== "all") {
    result = result.filter((s) => s.status === status);
  }

  return result;
}

export function sortServers(
  servers: Server[],
  sortConfig?: SortConfig,
): Server[] {
  if (!sortConfig) return servers;

  return [...servers].sort((a, b) => {
    const aVal = a[sortConfig.field];
    const bVal = b[sortConfig.field];
    const cmp =
      typeof aVal === "string"
        ? aVal.localeCompare(bVal as string)
        : (aVal as number) - (bVal as number);
    return sortConfig.order === "asc" ? cmp : -cmp;
  });
}
