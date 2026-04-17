import Skeleton from "@/components/common/atoms/Skeleton/Skeleton";

export default function LoginLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center gap-3">
          <Skeleton variant="circular" width={48} height={48} />
          <Skeleton variant="text" width={200} height={28} />
          <Skeleton variant="text" width={260} height={20} />
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-5">
            <Skeleton variant="rectangular" height={68} />
            <Skeleton variant="rectangular" height={68} />
            <Skeleton variant="rectangular" height={42} />
          </div>
        </div>
      </div>
    </div>
  );
}
