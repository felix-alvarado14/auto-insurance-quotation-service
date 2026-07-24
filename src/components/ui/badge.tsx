import * as React from "react";
import { cn } from "@/lib/utils";

const badgeVariants = {
  default:
    "bg-slate-200 text-slate-900 border border-slate-300",
  secondary:
    "bg-slate-100 text-slate-700 border border-slate-200",
  accent: "bg-green-100 text-green-700 border border-green-200",
  success: "bg-green-100 text-green-700 border border-green-200",
  warning: "bg-amber-100 text-amber-700 border border-amber-200",
  destructive: "bg-orange-100 text-orange-700 border border-orange-200",
} as const;

export type BadgeVariant = keyof typeof badgeVariants;

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

export function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.14em]",
        badgeVariants[variant],
        className
      )}
      {...props}
    />
  );
}
