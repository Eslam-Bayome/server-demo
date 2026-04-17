import { HTMLAttributes } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

type SkeletonVariant = "rectangular" | "circular" | "text";

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: SkeletonVariant;
  width?: string | number;
  height?: string | number;
  lines?: number;
}

const variantStyles: Record<SkeletonVariant, string> = {
  rectangular: "rounded-lg",
  circular: "rounded-full",
  text: "rounded",
};

const Skeleton = ({
  variant = "rectangular",
  width,
  height,
  lines = 1,
  className,
  style,
  ...props
}: SkeletonProps) => {
  const baseClass = twMerge(
    clsx(
      "animate-pulse bg-gray-200",
      variantStyles[variant]
    ),
    className
  );

  if (variant === "text" && lines > 1) {
    return (
      <div className="flex flex-col gap-2" {...props}>
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={baseClass}
            style={{
              width: i === lines - 1 ? "75%" : "100%",
              height: height ?? "1rem",
              ...style,
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={baseClass}
      style={{
        width: width ?? "100%",
        height: height ?? (variant === "text" ? "1rem" : "1.5rem"),
        ...style,
      }}
      {...props}
    />
  );
};

export const ServerCardSkeleton = () => (
  <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
    <div className="flex items-start justify-between">
      <Skeleton variant="text" width={160} height={20} />
      <Skeleton variant="rectangular" width={70} height={24} />
    </div>
    <div className="mt-4 grid grid-cols-2 gap-3">
      <Skeleton variant="text" width="100%" height={16} />
      <Skeleton variant="text" width="100%" height={16} />
      <Skeleton variant="text" width="100%" height={16} />
      <Skeleton variant="text" width="100%" height={16} />
    </div>
  </div>
);

export const TableRowSkeleton = () => (
  <tr>
    {Array.from({ length: 5 }).map((_, i) => (
      <td key={i} className="px-4 py-3">
        <Skeleton variant="text" height={16} />
      </td>
    ))}
  </tr>
);

export default Skeleton;
export type { SkeletonProps, SkeletonVariant };
