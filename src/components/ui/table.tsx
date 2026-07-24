import * as React from "react";
import { cn } from "@/lib/utils";

type TableProps = React.HTMLAttributes<HTMLTableElement>;
type TableSectionProps = React.HTMLAttributes<HTMLTableSectionElement>;
type TableCellProps = React.TdHTMLAttributes<HTMLTableCellElement>;

export function Table({ className, ...props }: TableProps) {
  return (
    <div className="min-w-full overflow-hidden">
      <table className={cn("min-w-full divide-y divide-border", className)} {...props} />
    </div>
  );
}

export function TableHeader({ className, ...props }: TableSectionProps) {
  return <thead className={cn("bg-background", className)} {...props} />;
}

export function TableBody({ className, ...props }: TableSectionProps) {
  return <tbody className={cn("divide-y divide-border", className)} {...props} />;
}

export function TableRow({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) {
  return <tr className={cn("transition-colors hover:bg-background/70", className)} {...props} />;
}

export function TableHead({ className, ...props }: React.ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      className={cn(
        "whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground",
        className
      )}
      {...props}
    />
  );
}

export function TableCell({ className, ...props }: TableCellProps) {
  return (
    <td className={cn("px-4 py-4 text-sm text-foreground", className)} {...props} />
  );
}
