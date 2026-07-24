"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as Dialog from "@radix-ui/react-dialog";
import { House, ShieldCheck, FileText, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { LogoutButton } from "@/components/auth/logout-button";

const navigation = [
  {
    group: "Principal",
    items: [
      {
        label: "Inicio",
        href: "/",
        icon: House,
      },
    ],
  },
  {
    group: "Gestión",
    items: [
      {
        label: "Productos",
        href: "/products",
        icon: ShieldCheck,
      },
      {
        label: "Cotizaciones",
        href: "/quotations",
        icon: FileText,
      },
    ],
  },
];

function SidebarContent() {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col bg-white text-slate-900 border-r border-slate-200">
      <div className="space-y-6 border-b border-slate-200 pb-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Sistema de gestión
          </p>
          <p className="mt-3 text-lg font-bold text-slate-900">
            Cotizaciones Auto
          </p>
          <p className="mt-2 text-xs leading-5 text-slate-600">
            Herramienta empresarial para administración y cotización de seguros
          </p>
        </div>

        <div className="space-y-4">
          {navigation.map((group) => (
            <div key={group.group}>
              <p className="px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                {group.group}
              </p>
              <nav className="mt-2 space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;

                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      className={cn(
                        "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                        isActive
                          ? "bg-blue-50 text-blue-900"
                          : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                      )}
                      aria-current={isActive ? "page" : undefined}
                    >
                      <Icon className={cn(
                        "h-5 w-5 transition-colors",
                        isActive
                          ? "text-blue-600"
                          : "text-slate-500 group-hover:text-slate-700"
                      )} />
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-auto border-t border-slate-200 pt-6 text-xs text-slate-600">
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
          <p className="font-semibold text-slate-900">Estado</p>
          <div className="mt-2 space-y-1 text-slate-600">
            <p>Acceso autenticado y flujo disponible.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <Dialog.Root>
      <div className="min-h-screen bg-white text-slate-900">
        <div className="lg:flex lg:min-h-screen">
          <aside className="hidden lg:flex lg:w-64 lg:flex-shrink-0 lg:flex-col lg:border-r lg:border-slate-200 lg:bg-white lg:px-6 lg:py-6">
            <SidebarContent />
          </aside>

          <div className="flex flex-1 flex-col">
            <header className="border-b border-slate-200 bg-white px-4 py-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <Dialog.Trigger asChild>
                    <button
                      type="button"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-300 bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900 lg:hidden"
                      aria-label="Abrir menú"
                    >
                      <Menu size={18} />
                    </button>
                  </Dialog.Trigger>

                  <div>
                    <p className="text-xs uppercase tracking-wider text-slate-500">
                      Inicio del sistema
                    </p>
                    <p className="text-lg font-semibold text-slate-900">
                      Seguros de Automóviles
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="hidden sm:flex items-center gap-2 rounded-lg bg-green-50 px-3 py-1.5 text-xs font-medium text-green-700 border border-green-200">
                    <div className="size-2 rounded-full bg-green-500" />
                    Operativo
                  </div>
                  <LogoutButton />
                </div>
              </div>
            </header>

            <main className="flex-1 bg-white">{children}</main>
          </div>
        </div>

        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-40 bg-slate-900/20 backdrop-blur-sm lg:hidden" />
          <Dialog.Content className="fixed inset-y-0 left-0 z-50 flex w-full max-w-xs flex-col border-r border-slate-200 bg-white p-6 shadow-lg lg:hidden">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-slate-900">Navegación</p>
              <Dialog.Close asChild>
                <button
                  type="button"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-100"
                  aria-label="Cerrar menú"
                >
                  <X size={18} />
                </button>
              </Dialog.Close>
            </div>

            <div className="mt-8">
              <SidebarContent />
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </div>
    </Dialog.Root>
  );
}
