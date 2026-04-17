import DashboardTemplate from "@/components/common/templates/DashboardTemplate/DashboardTemplate";
import Skeleton from "@/components/common/atoms/Skeleton/Skeleton";
import { ServerCardSkeleton } from "@/components/common/atoms/Skeleton/Skeleton";

export default function DashboardLoading() {
  return (
    <DashboardTemplate>
      <div className="flex flex-col gap-6">
        <div>
          <Skeleton variant="text" width={220} height={32} />
          <Skeleton variant="text" width={320} height={20} className="mt-1" />
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} variant="rectangular" height={100} />
          ))}
        </div>

        <Skeleton variant="rectangular" height={44} />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <ServerCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </DashboardTemplate>
  );
}
