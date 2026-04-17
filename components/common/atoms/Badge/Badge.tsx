import { HTMLAttributes } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

type BadgeVariant = "success" | "warning" | "danger" | "neutral" | "info";
type BadgeSize = "sm" | "md";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
}

const variantStyles: Record<BadgeVariant, string> = {
  success: "bg-green-100 text-green-800 ring-green-200",
  warning: "bg-yellow-100 text-yellow-800 ring-yellow-200",
  danger: "bg-red-100 text-red-800 ring-red-200",
  neutral: "bg-gray-100 text-gray-700 ring-gray-200",
  info: "bg-blue-100 text-blue-800 ring-blue-200",
};

const dotVariantStyles: Record<BadgeVariant, string> = {
  success: "bg-green-500",
  warning: "bg-yellow-500",
  danger: "bg-red-500",
  neutral: "bg-gray-400",
  info: "bg-blue-500",
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-2.5 py-1 text-sm",
};

const Badge = ({
  variant = "neutral",
  size = "sm",
  dot = false,
  className,
  children,
  ...props
}: BadgeProps) => {
  return (
    <span
      className={twMerge(
        clsx(
          "inline-flex items-center gap-1.5 rounded-full font-medium ring-1 ring-inset",
          variantStyles[variant],
          sizeStyles[size]
        ),
        className
      )}
      {...props}
    >
      {dot && (
        <span
          className={clsx(
            "h-1.5 w-1.5 rounded-full",
            dotVariantStyles[variant]
          )}
        />
      )}
      {children}
    </span>
  );
};

export default Badge;
export type { BadgeProps, BadgeVariant, BadgeSize };
