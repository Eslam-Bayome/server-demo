import { Server, CheckCircle, AlertTriangle, XCircle } from "lucide-react";
import Typography from "@/components/common/atoms/Typography/Typography";
import { Server as ServerType } from "@/integration/types/response/server.response";

interface DashboardStatsProps {
  servers: ServerType[];
}

const DashboardStats = ({ servers }: DashboardStatsProps) => {
  const total = servers.length;
  const up = servers.filter((s) => s.status === "up").length;
  const degraded = servers.filter((s) => s.status === "degraded").length;
  const down = servers.filter((s) => s.status === "down").length;

  const stats = [
    {
      label: "Total Servers",
      value: total,
      icon: Server,
      iconClass: "bg-blue-100 text-blue-600",
      valueClass: "text-gray-900",
    },
    {
      label: "Online",
      value: up,
      icon: CheckCircle,
      iconClass: "bg-green-100 text-green-600",
      valueClass: "text-green-700",
    },
    {
      label: "Degraded",
      value: degraded,
      icon: AlertTriangle,
      iconClass: "bg-yellow-100 text-yellow-600",
      valueClass: "text-yellow-700",
    },
    {
      label: "Offline",
      value: down,
      icon: XCircle,
      iconClass: "bg-red-100 text-red-600",
      valueClass: "text-red-700",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {stats.map(({ label, value, icon: Icon, iconClass, valueClass }) => (
        <div
          key={label}
          className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
        >
          <div
            className={`flex h-9 w-9 items-center justify-center rounded-lg ${iconClass}`}
          >
            <Icon size={18} />
          </div>
          <div>
            <Typography variant="h2" className={valueClass}>
              {value}
            </Typography>
            <Typography variant="caption" color="muted" className="mt-0.5">
              {label}
            </Typography>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;
export type { DashboardStatsProps };
