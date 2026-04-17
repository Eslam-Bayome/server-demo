"use client";

import { useMemo } from "react";
import FilterBar from "@/components/ui/dashboard/FilterBar/FilterBar";
import ServerList from "@/components/ui/dashboard/ServerList/ServerList";
import Typography from "@/components/common/atoms/Typography/Typography";
import { Server } from "@/integration/types/response/server.response";
import { useDashboardFilters } from "@/hooks/useDashboardFilters";
import { filterServers, sortServers } from "@/helpers";

interface DashboardPageProps {
  initialServers: Server[];
}

export function DashboardPage({ initialServers }: DashboardPageProps) {
  const { search, setSearch, status, setStatus, view, setView, sortConfig, handleSort } =
    useDashboardFilters();

  const servers = useMemo(
    () => sortServers(filterServers(initialServers, search, status), sortConfig),
    [initialServers, search, status, sortConfig]
  );

  return (
    <div className="flex flex-col gap-4">
      <FilterBar
        search={search}
        onSearchChange={setSearch}
        selectedStatus={status}
        onStatusChange={setStatus}
        viewMode={view}
        onViewModeChange={setView}
      />

      <Typography variant="caption" color="muted">
        Showing {servers.length} of {initialServers.length} servers
      </Typography>

      <ServerList
        servers={servers}
        viewMode={view}
        sortConfig={sortConfig}
        onSort={handleSort}
      />
    </div>
  );
}
