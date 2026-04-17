import { Suspense } from "react";
import { getServers } from "@/integration/service/server.service";
import DashboardTemplate from "@/components/common/templates/DashboardTemplate/DashboardTemplate";
import DashboardStats from "@/components/ui/dashboard/DashboardStats/DashboardStats";
import Typography from "@/components/common/atoms/Typography/Typography";
import { Metadata } from "next";
import { ServerCardSkeleton } from "@/components/common/atoms/Skeleton/Skeleton";
import { DashboardPage } from "@/components/ui/dashboard";

export const metadata: Metadata = {
  title: "Dashboard — ServerWatch",
};

async function ServerData() {
  const { data: servers } = await getServers();
  return <DashboardPage initialServers={servers} />;
}

const GridSkeleton = () => (
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    {Array.from({ length: 8 }).map((_, i) => (
      <ServerCardSkeleton key={i} />
    ))}
  </div>
);

export default async function page() {
  const { data: allServers } = await getServers();

  return (
    <DashboardTemplate>
      <div className="flex flex-col gap-6">
        <div>
          <Typography variant="h2">Server Dashboard</Typography>
          <Typography variant="body2" color="muted" className="mt-1">
            Real-time health overview of your infrastructure.
          </Typography>
        </div>

        <DashboardStats servers={allServers} />

        <Suspense fallback={<GridSkeleton />}>
          <ServerData />
        </Suspense>
      </div>
    </DashboardTemplate>
  );
}
