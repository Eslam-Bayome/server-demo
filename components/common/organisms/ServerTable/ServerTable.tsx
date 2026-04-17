"use client";

import { ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react";
import StatusBadge from "../../molecules/StatusBadge/StatusBadge";
import { Server, SortField, SortConfig } from "@/integration/types/response/server.response";
import { clsx } from "clsx";

interface ServerTableProps {
  servers: Server[];
  sortConfig?: SortConfig;
  onSort?: (field: SortField) => void;
  onRowClick?: (server: Server) => void;
}

const columns: { key: SortField; label: string; sortable: boolean }[] = [
  { key: "name", label: "Name", sortable: true },
  { key: "status", label: "Status", sortable: true },
  { key: "ip_address", label: "IP Address", sortable: false },
  { key: "response_time_ms", label: "Response Time", sortable: true },
  { key: "uptime_percentage", label: "Uptime", sortable: true },
];

const SortIcon = ({ field, sortConfig }: { field: SortField; sortConfig?: SortConfig }) => {
  if (!sortConfig || sortConfig.field !== field) {
    return <ChevronsUpDown size={13} className="text-gray-400" />;
  }
  return sortConfig.order === "asc" ? (
    <ChevronUp size={13} className="text-blue-600" />
  ) : (
    <ChevronDown size={13} className="text-blue-600" />
  );
};

const ServerTable = ({
  servers,
  sortConfig,
  onSort,
  onRowClick,
}: ServerTableProps) => {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  scope="col"
                  className={clsx(
                    "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600",
                    col.sortable &&
                      "cursor-pointer select-none hover:text-gray-900"
                  )}
                  onClick={() => col.sortable && onSort?.(col.key)}
                >
                  <span className="flex items-center gap-1">
                    {col.label}
                    {col.sortable && (
                      <SortIcon field={col.key} sortConfig={sortConfig} />
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 bg-white">
            {servers.map((server) => (
              <tr
                key={server.id}
                onClick={() => onRowClick?.(server)}
                className={clsx(
                  "transition-colors",
                  onRowClick &&
                    "cursor-pointer hover:bg-blue-50 focus:outline-none focus:ring-inset focus:ring-2 focus:ring-blue-400"
                )}
              >
                <td className="px-4 py-3 text-sm font-medium text-gray-900">
                  {server.name}
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={server.status} />
                </td>
                <td className="px-4 py-3 font-mono text-sm text-gray-600">
                  {server.ip_address}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {server.response_time_ms} ms
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {server.uptime_percentage}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {servers.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-gray-400">
          <p className="text-sm">No servers found</p>
        </div>
      )}
    </div>
  );
};

export default ServerTable;
export type { ServerTableProps };
export type { SortConfig } from "@/integration/types/response/server.response";
