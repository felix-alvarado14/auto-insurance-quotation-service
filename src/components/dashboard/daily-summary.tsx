"use client";

import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface MetricItem {
  label: string;
  value: string | number;
  description: string;
  trend?: "up" | "down" | "neutral";
  context?: string;
}

interface DailySummaryProps {
  date: string;
  metrics: MetricItem[];
}

const trendConfig = {
  up: {
    icon: TrendingUp,
    color: "text-green-600",
  },
  down: {
    icon: TrendingDown,
    color: "text-orange-600",
  },
  neutral: {
    icon: Minus,
    color: "text-slate-400",
  },
};

export function DailySummary({ date, metrics }: DailySummaryProps) {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          Actividad de hoy
        </p>
        <p className="mt-2 text-sm text-slate-700">{date}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => {
          const trendIcon =
            metric.trend && trendConfig[metric.trend];
          const TrendIcon = trendIcon?.icon;

          return (
            <div
              key={metric.label}
              className="rounded-lg border border-slate-200 bg-slate-50 p-4 transition-colors hover:border-slate-300 hover:bg-white"
            >
              {/* Header with Trend */}
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs font-medium text-slate-600">
                  {metric.label}
                </p>
                {TrendIcon && (
                  <TrendIcon
                    className={`size-4 ${trendIcon?.color || "text-slate-400"}`}
                  />
                )}
              </div>

              {/* Value */}
              <p className="mt-3 text-2xl font-semibold text-slate-900">
                {metric.value}
              </p>

              {/* Description & Context */}
              <div className="mt-3 space-y-1 border-t border-slate-200 pt-3">
                <p className="text-xs text-slate-600">{metric.description}</p>
                {metric.context && (
                  <p className="text-xs text-slate-500 italic">{metric.context}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
