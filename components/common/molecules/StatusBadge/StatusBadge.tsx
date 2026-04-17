import Badge, { BadgeVariant, BadgeSize } from "../../atoms/Badge/Badge";
import { ServerStatus } from "@/integration/types/response/server.response";

const statusConfig: Record<
  ServerStatus,
  { label: string; variant: BadgeVariant }
> = {
  up: { label: "Up", variant: "success" },
  down: { label: "Down", variant: "danger" },
  degraded: { label: "Degraded", variant: "warning" },
};

interface StatusBadgeProps {
  status: ServerStatus;
  showDot?: boolean;
  size?: BadgeSize;
  className?: string;
}

const StatusBadge = ({ status, showDot = true, size = "sm", className }: StatusBadgeProps) => {
  const config = statusConfig[status];

  return (
    <Badge variant={config.variant} dot={showDot} size={size} className={className}>
      {config.label}
    </Badge>
  );
};

export default StatusBadge;
export type { StatusBadgeProps };
