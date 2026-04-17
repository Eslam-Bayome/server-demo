"use client";

import { useRouter } from "next/navigation";
import ServerCard from "@/components/common/organisms/ServerCard/ServerCard";
import ServerTable from "@/components/common/organisms/ServerTable/ServerTable";
import { Server, SortField, SortOrder } from "@/integration/types/response/server.response";
import { ViewMode } from "../FilterBar/FilterBar";
import { SortConfig } from "@/components/common/organisms/ServerTable/ServerTable";
import Typography from "@/components/common/atoms/Typography/Typography";
import { ServerOff } from "lucide-react";

interface ServerListProps {
  servers: Server[];
  viewMode: ViewMode;
  sortConfig?: SortConfig;
  onSort?: (field: SortField) => void;
}

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-white py-16 text-center">
    <ServerOff size={40} className="mb-3 text-gray-300" />
    <Typography variant="h4" color="muted">
      No servers found
    </Typography>
    <Typography variant="body2" color="muted" className="mt-1">
      Try adjusting your search or filter.
    </Typography>
  </div>
);

const ServerList = ({ servers, viewMode, sortConfig, onSort }: ServerListProps) => {
  const router = useRouter();

  const handleServerClick = (server: Server) => {
    router.push(`/dashboard/${server.id}`);
  };

  if (servers.length === 0) return <EmptyState />;

  if (viewMode === "table") {
    return (
      <ServerTable
        servers={servers}
        sortConfig={sortConfig}
        onSort={onSort}
        onRowClick={handleServerClick}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {servers.map((server) => (
        <ServerCard key={server.id} server={server} onClick={handleServerClick} />
      ))}
    </div>
  );
};

export default ServerList;
export type { ServerListProps };
