"use client";

import { AlertCircle, CheckCircle, Activity } from "lucide-react";

interface StatusStripProps {
  systemStatus: "operational" | "degraded" | "warning";
  pendingReviews: number;
  lastUpdate: string;
}

export function StatusStrip({
  systemStatus,
  pendingReviews,
  lastUpdate,
}: StatusStripProps) {
  const statusConfig = {
    operational: {
      icon: CheckCircle,
      label: "Sistema operativo",
      bgClass: "bg-green-50 border-green-200",
      textClass: "text-green-700",
      dotClass: "bg-green-500",
    },
    degraded: {
      icon: AlertCircle,
      label: "Rendimiento reducido",
      bgClass: "bg-amber-50 border-amber-200",
      textClass: "text-amber-700",
      dotClass: "bg-amber-500",
    },
    warning: {
      icon: AlertCircle,
      label: "Se requiere atención",
      bgClass: "bg-orange-50 border-orange-200",
      textClass: "text-orange-700",
      dotClass: "bg-orange-500",
    },
  };

  const config = statusConfig[systemStatus];
  const StatusIcon = config.icon;

  return (
    <div className={`rounded-lg border ${config.bgClass} p-4`}>
      <div className="flex items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className={`flex size-10 items-center justify-center rounded-lg bg-white`}>
            <StatusIcon className={`size-5 ${config.textClass}`} />
          </div>
          <div className={config.textClass}>
            <p className="text-sm font-medium">{config.label}</p>
          </div>
        </div>

        <div className="flex items-center gap-8 text-sm text-slate-600">
          <div className="flex items-center gap-2">
            <Activity className="size-4 opacity-70" />
            <span className="opacity-85">
              {pendingReviews > 0 ? (
                <>
                  <strong className="font-semibold">{pendingReviews}</strong>{" "}
                  por revisar
                </>
              ) : (
                "Sin pendientes"
              )}
            </span>
          </div>

          <span className="opacity-60">Actualizado {lastUpdate}</span>
        </div>
      </div>
    </div>
  );
}
