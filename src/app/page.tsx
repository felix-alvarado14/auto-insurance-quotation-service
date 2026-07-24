import Link from "next/link";
import { AppShell } from "@/components/layout/app-shell";
import { Card } from "@/components/ui/card";
import { ArrowRight, FileText, ShieldCheck } from "lucide-react";

const primaryActions = [
  {
    href: "/products",
    title: "Ver productos",
    description: "Consulta el catálogo disponible para cotización.",
    icon: ShieldCheck,
  },
  {
    href: "/quotations",
    title: "Nueva cotización",
    description: "Inicia una solicitud de seguro en pocos pasos.",
    icon: FileText,
  },
];

export default function Home() {
  return (
    <AppShell>
      <div className="mx-auto max-w-4xl space-y-6 px-4 py-8">
        <Card className="p-6 sm:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="max-w-2xl space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                Sistema de gestión
              </p>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                Cotizaciones de Seguros
              </h1>
              <p className="text-sm leading-6 text-slate-600">
                Plataforma administrativa para gestionar productos y crear cotizaciones
                de seguros de automóviles con rapidez y claridad.
              </p>
            </div>

            <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
              Bienvenido. Comienza con una tarea real del flujo principal.
            </div>
          </div>
        </Card>

        <div className="grid gap-4 md:grid-cols-2">
          {primaryActions.map((action) => {
            const Icon = action.icon;

            return (
              <Card key={action.href} className="p-5 transition-colors hover:border-slate-300">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-3">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
                      <Icon className="size-5" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-slate-900">
                        {action.title}
                      </h2>
                      <p className="mt-1 text-sm text-slate-600">
                        {action.description}
                      </p>
                    </div>
                  </div>

                  <Link
                    href={action.href}
                    className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-700"
                  >
                    Ir
                    <ArrowRight className="size-4" />
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}
