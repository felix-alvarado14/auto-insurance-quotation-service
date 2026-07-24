import { AppShell } from "@/components/layout/app-shell";
import { StatusStrip } from "@/components/dashboard/status-strip";
import { UrgentItems } from "@/components/dashboard/urgent-items";
import { DailySummary } from "@/components/dashboard/daily-summary";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { Plus, FileText, ShieldCheck } from "lucide-react";

export default function Home() {
  // Mock data based on real admin workflow
  const urgentItems = [
    {
      id: "quote-1",
      type: "quotation" as const,
      title: "Cotización pendiente: Cliente ABC Corp",
      description: "Requiere revisión de cobertura médica. Enviada hace 4 horas.",
      priority: "high" as const,
      timestamp: "Hace 4h",
      assignee: "María García",
    },
    {
      id: "product-1",
      type: "product" as const,
      title: "Producto en evaluación: Seguro Plus",
      description:
        "Actualización de rangos de cobertura. Debe ser revisada antes de activar.",
      priority: "high" as const,
      timestamp: "Hace 2 días",
    },
  ];

  const dailyMetrics = [
    {
      label: "Cotizaciones creadas",
      value: "12",
      description: "Nuevas solicitudes procesadas",
      trend: "up" as const,
      context: "Aumento del 15% vs ayer",
    },
    {
      label: "Revisiones completadas",
      value: "8",
      description: "Aprobadas y comunicadas",
      trend: "neutral" as const,
      context: "En línea con promedio semanal",
    },
    {
      label: "Productos activos",
      value: "18",
      description: "Disponibles para cotizar",
      trend: "neutral" as const,
      context: "Sin cambios hoy",
    },
    {
      label: "Solicitudes pendientes",
      value: "4",
      description: "Esperando tu revisión",
      trend: "down" as const,
      context: "2 menos que ayer",
    },
  ];

  const quickActions = [
    {
      id: "new-quote",
      label: "Nueva cotización",
      description: "Crear solicitud de cotización",
      href: "/quotations",
      variant: "primary" as const,
      icon: <Plus className="size-5 text-green-600" />,
    },
    {
      id: "review-requests",
      label: "Revisar solicitudes",
      description: "4 solicitudes pendientes",
      href: "/quotations",
      variant: "secondary" as const,
      icon: <FileText className="size-5 text-slate-600" />,
    },
    {
      id: "manage-products",
      label: "Gestionar productos",
      description: "18 productos activos",
      href: "/products",
      variant: "secondary" as const,
      icon: <ShieldCheck className="size-5 text-slate-600" />,
    },
    {
      id: "view-reports",
      label: "Reportes semanales",
      description: "Estadísticas de operación",
      href: "/quotations",
      variant: "secondary" as const,
      icon: <FileText className="size-5 text-slate-600" />,
    },
  ];

  const today = new Date().toLocaleDateString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <AppShell>
      <div className="mx-auto max-w-6xl space-y-8 py-8 px-4">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Centro de operaciones
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Gestiona cotizaciones, revisa solicitudes y supervisa productos de seguros
          </p>
        </div>

        {/* Status Strip - System Health */}
        <StatusStrip
          systemStatus="operational"
          pendingReviews={urgentItems.length}
          lastUpdate="hace 2 min"
        />

        {/* Primary Zone: What Needs Attention Now */}
        <section className="space-y-3">
          <div>
            <h2 className="text-lg font-semibold tracking-tight text-slate-900">
              Requiere tu atención
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Ítems prioritarios que necesitan revisión inmediata
            </p>
          </div>
          <UrgentItems items={urgentItems} />
        </section>

        {/* Secondary Zone: Today's Summary */}
        <section>
          <DailySummary date={today} metrics={dailyMetrics} />
        </section>

        {/* Tertiary Zone: Quick Navigation */}
        <section className="rounded-lg border border-slate-200 bg-white p-6">
          <QuickActions actions={quickActions} />
        </section>

        {/* Footer Info */}
        <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 p-4 text-xs">
          <p className="text-slate-600">
            Sistema de gestión de cotizaciones de seguros de automóviles
          </p>
          <p className="text-slate-500">
            Última sincronización: hace 1 min
          </p>
        </div>
      </div>
    </AppShell>
  );
}
