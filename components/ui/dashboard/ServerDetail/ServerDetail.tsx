import {
  Globe,
  Clock,
  ArrowUpRight,
  Cpu,
  Calendar,
  Tag,
  ChevronLeft,
} from "lucide-react";
import Link from "next/link";
import Typography from "@/components/common/atoms/Typography/Typography";
import StatusBadge from "@/components/common/molecules/StatusBadge/StatusBadge";
import Badge from "@/components/common/atoms/Badge/Badge";
import { Server } from "@/integration/types/response/server.response";

interface ServerDetailProps {
  server: Server;
}

const MetricCard = ({
  icon: Icon,
  label,
  value,
  mono = false,
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  mono?: boolean;
}) => (
  <div className="flex flex-col gap-1.5 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
    <div className="flex items-center gap-2 text-sm text-gray-500">
      <Icon size={14} />
      {label}
    </div>
    <Typography
      variant="h3"
      className={mono ? "font-mono" : ""}
    >
      {value}
    </Typography>
  </div>
);

const ServerDetail = ({ server }: ServerDetailProps) => {
  return (
    <div className="flex flex-col gap-6">
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 transition-colors hover:text-blue-600"
      >
        <ChevronLeft size={15} />
        Back to Dashboard
      </Link>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Typography variant="h2">{server.name}</Typography>
          {server.description && (
            <Typography variant="body2" color="muted" className="mt-1">
              {server.description}
            </Typography>
          )}
        </div>
        <StatusBadge status={server.status} size="md" />
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <MetricCard
          icon={Globe}
          label="IP Address"
          value={server.ip_address}
          mono
        />
        <MetricCard
          icon={Clock}
          label="Response Time"
          value={`${server.response_time_ms} ms`}
        />
        <MetricCard
          icon={ArrowUpRight}
          label="Uptime"
          value={`${server.uptime_percentage}%`}
        />
        <MetricCard
          icon={Cpu}
          label="Region"
          value={server.region}
        />
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <Typography variant="h4" className="mb-4">
          Server Details
        </Typography>
        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <dt className="flex items-center gap-1 text-xs font-medium uppercase tracking-wider text-gray-500">
              <Cpu size={11} />
              Server ID
            </dt>
            <dd className="mt-1 font-mono text-sm text-gray-900">{server.id}</dd>
          </div>

          <div>
            <dt className="flex items-center gap-1 text-xs font-medium uppercase tracking-wider text-gray-500">
              <Calendar size={11} />
              Last Checked
            </dt>
            <dd className="mt-1 text-sm text-gray-900">
              {new Date(server.last_checked).toLocaleString()}
            </dd>
          </div>

          {server.tags && server.tags.length > 0 && (
            <div className="sm:col-span-2">
              <dt className="flex items-center gap-1 text-xs font-medium uppercase tracking-wider text-gray-500">
                <Tag size={11} />
                Tags
              </dt>
              <dd className="mt-2 flex flex-wrap gap-1.5">
                {server.tags.map((tag) => (
                  <Badge key={tag} variant="info">
                    {tag}
                  </Badge>
                ))}
              </dd>
            </div>
          )}
        </dl>
      </div>
    </div>
  );
};

export default ServerDetail;
export type { ServerDetailProps };
