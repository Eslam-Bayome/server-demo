import DashboardTemplate from "@/components/common/templates/DashboardTemplate/DashboardTemplate";
import Skeleton from "@/components/common/atoms/Skeleton/Skeleton";

export default function ServerDetailLoading() {
  return (
    <DashboardTemplate>
      <div className="flex flex-col gap-6">
        <Skeleton variant="text" width={140} height={20} />

        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1.5">
            <Skeleton variant="text" width={240} height={32} />
            <Skeleton variant="text" width={340} height={20} />
          </div>
          <Skeleton variant="rectangular" width={80} height={28} />
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} variant="rectangular" height={90} />
          ))}
        </div>

        <Skeleton variant="rectangular" height={200} />
      </div>
    </DashboardTemplate>
  );
}
