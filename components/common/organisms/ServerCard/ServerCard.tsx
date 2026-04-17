"use client";

import { Clock, Globe, ArrowUpRight, Cpu } from "lucide-react";
import Typography from "../../atoms/Typography/Typography";
import StatusBadge from "../../molecules/StatusBadge/StatusBadge";
import { Server } from "@/integration/types/response/server.response";
import { clsx } from "clsx";

interface ServerCardProps {
  server: Server;
  onClick?: (server: Server) => void;
}

const ServerCard = ({ server, onClick }: ServerCardProps) => {
  return (
    <article
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={() => onClick?.(server)}
      onKeyDown={(e) => e.key === "Enter" && onClick?.(server)}
      className={clsx(
        "rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all",
        onClick &&
          "cursor-pointer hover:border-blue-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <Typography variant="h4" truncate className="flex-1">
          {server.name}
        </Typography>
        <StatusBadge status={server.status} />
      </div>

      <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3">
        <div className="flex flex-col gap-0.5">
          <dt className="flex items-center gap-1 text-xs text-gray-500">
            <Globe size={11} />
            IP Address
          </dt>
          <dd className="font-mono text-sm text-gray-800">{server.ip_address}</dd>
        </div>

        <div className="flex flex-col gap-0.5">
          <dt className="flex items-center gap-1 text-xs text-gray-500">
            <Clock size={11} />
            Response Time
          </dt>
          <dd className="text-sm text-gray-800">{server.response_time_ms} ms</dd>
        </div>

        <div className="flex flex-col gap-0.5">
          <dt className="flex items-center gap-1 text-xs text-gray-500">
            <ArrowUpRight size={11} />
            Uptime
          </dt>
          <dd className="text-sm text-gray-800">{server.uptime_percentage}%</dd>
        </div>

        <div className="flex flex-col gap-0.5">
          <dt className="flex items-center gap-1 text-xs text-gray-500">
            <Cpu size={11} />
            Region
          </dt>
          <dd className="text-sm text-gray-800">{server.region}</dd>
        </div>
      </dl>

      <p className="mt-3 text-xs text-gray-400">
        Last checked: {new Date(server.last_checked).toLocaleTimeString()}
      </p>
    </article>
  );
};

export default ServerCard;
export type { ServerCardProps };
