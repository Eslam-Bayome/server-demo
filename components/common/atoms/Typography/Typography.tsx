import { HTMLAttributes, ElementType } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "body1"
  | "body2"
  | "caption"
  | "overline";

type TypographyColor =
  | "default"
  | "muted"
  | "primary"
  | "danger"
  | "success"
  | "warning";

interface TypographyProps extends HTMLAttributes<HTMLElement> {
  variant?: TypographyVariant;
  color?: TypographyColor;
  as?: ElementType;
  truncate?: boolean;
}

const variantStyles: Record<TypographyVariant, string> = {
  h1: "text-3xl font-bold tracking-tight",
  h2: "text-2xl font-semibold tracking-tight",
  h3: "text-xl font-semibold",
  h4: "text-lg font-semibold",
  body1: "text-base",
  body2: "text-sm",
  caption: "text-xs",
  overline: "text-xs font-semibold uppercase tracking-widest",
};

const defaultTag: Record<TypographyVariant, ElementType> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  body1: "p",
  body2: "p",
  caption: "span",
  overline: "span",
};

const colorStyles: Record<TypographyColor, string> = {
  default: "text-gray-900",
  muted: "text-gray-500",
  primary: "text-blue-600",
  danger: "text-red-600",
  success: "text-green-600",
  warning: "text-yellow-600",
};

const Typography = ({
  variant = "body1",
  color = "default",
  as,
  truncate = false,
  className,
  children,
  ...props
}: TypographyProps) => {
  const Tag = as ?? defaultTag[variant];

  return (
    <Tag
      className={twMerge(
        clsx(
          variantStyles[variant],
          colorStyles[color],
          truncate && "truncate"
        ),
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
};

export default Typography;
export type { TypographyProps, TypographyVariant, TypographyColor };
