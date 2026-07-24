"use client";

import { AlertCircle, Clock, User } from "lucide-react";

interface UrgentItem {
  id: string;
  type: "quotation" | "review" | "product";
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  timestamp: string;
  assignee?: string;
}

interface UrgentItemsProps {
  items: UrgentItem[];
}

const priorityConfig = {
  high: {
    bgClass: "bg-orange-50 border-orange-200",
    labelClass: "text-orange-700",
    dotClass: "bg-orange-500",
    label: "Crítico",
  },
  medium: {
    bgClass: "bg-amber-50 border-amber-200",
    labelClass: "text-amber-700",
    dotClass: "bg-amber-500",
    label: "Importante",
  },
  low: {
    bgClass: "bg-blue-50 border-blue-200",
    labelClass: "text-blue-700",
    dotClass: "bg-blue-500",
    label: "Normal",
  },
};

export function UrgentItems({ items }: UrgentItemsProps) {
  if (items.length === 0) {
    return (
      <div className="rounded-lg border border-green-200 bg-green-50 p-6">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-lg bg-white">
            <AlertCircle className="size-5 text-green-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-green-700">
              Sin pendientes urgentes
            </p>
            <p className="text-xs text-green-600 opacity-75">
              Todos los ítems críticos han sido atendidos
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {items.map((item) => {
        const config = priorityConfig[item.priority];
        return (
          <div
            key={item.id}
            className={`rounded-lg border ${config.bgClass} p-4 transition-all hover:shadow-md`}
          >
            <div className="flex items-start gap-3">
              {/* Priority Indicator */}
              <div className={`flex-shrink-0 size-2 rounded-full ${config.dotClass} mt-1.5`} />

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-semibold text-slate-900">
                    {item.title}
                  </p>
                  <span className={`text-xs font-medium ${config.labelClass}`}>
                    {config.label}
                  </span>
                </div>
                <p className={`mt-1 text-xs opacity-85 ${config.labelClass}`}>
                  {item.description}
                </p>

                {/* Metadata */}
                <div className="mt-2 flex items-center gap-4 text-xs text-slate-600 opacity-70">
                  <div className="flex items-center gap-1">
                    <Clock className="size-3" />
                    <span>{item.timestamp}</span>
                  </div>
                  {item.assignee && (
                    <div className="flex items-center gap-1">
                      <User className="size-3" />
                      <span>{item.assignee}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
