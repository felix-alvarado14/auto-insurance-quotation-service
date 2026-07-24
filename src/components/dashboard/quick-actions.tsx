"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface QuickAction {
  id: string;
  label: string;
  description: string;
  href: string;
  variant?: "primary" | "secondary";
  icon?: React.ReactNode;
}

interface QuickActionsProps {
  actions: QuickAction[];
}

export function QuickActions({ actions }: QuickActionsProps) {
  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
        Acciones disponibles
      </p>

      <div className="grid gap-3 sm:grid-cols-2">
        {actions.map((action) => (
          <Link
            key={action.id}
            href={action.href}
            className={`group relative flex items-center justify-between rounded-lg border p-4 transition-all ${
              action.variant === "primary"
                ? "border-green-200 bg-green-50 hover:border-green-300 hover:bg-white hover:shadow-md"
                : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
            }`}
          >
            <div className="flex items-center gap-3">
              {action.icon && (
                <div
                  className={`flex size-9 items-center justify-center rounded-lg ${
                    action.variant === "primary"
                      ? "bg-green-100"
                      : "bg-slate-100"
                  }`}
                >
                  {action.icon}
                </div>
              )}
              <div>
                <p className="font-medium text-slate-900">{action.label}</p>
                <p
                  className={`text-xs ${
                    action.variant === "primary"
                      ? "text-green-700"
                      : "text-slate-600"
                  }`}
                >
                  {action.description}
                </p>
              </div>
            </div>
            <ArrowRight
              className={`size-4 opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100 ${
                action.variant === "primary"
                  ? "text-green-600"
                  : "text-slate-400"
              }`}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
