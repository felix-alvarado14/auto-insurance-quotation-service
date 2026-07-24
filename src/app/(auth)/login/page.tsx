import { Metadata } from "next";
import { LoginForm } from "@/components/auth/login-form";
import { RedirectIfAuthenticated } from "@/components/auth/redirect-if-authenticated";
import { Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Iniciar sesión | Cotizaciones de Seguros",
  description: "Acceso al sistema de cotización de seguros de automóviles",
};

export default function LoginPage() {
  return (
    <>
      <RedirectIfAuthenticated />
      <div className="min-h-screen bg-background">
      <div className="lg:hidden flex flex-col items-center justify-center min-h-screen px-6 py-12">
        <div className="w-full max-w-md space-y-8">
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div className="space-y-1 text-center">
              <h1 className="text-2xl font-semibold text-foreground">
                Cotizaciones de Seguros
              </h1>
              <p className="text-sm text-muted-foreground">
                Sistema de administración de pólizas
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-lg font-semibold text-foreground">Bienvenido</h2>
              <p className="text-sm text-muted-foreground">
                Ingresa tus credenciales para acceder al sistema
              </p>
            </div>
            <LoginForm />
          </div>
        </div>
      </div>

      <div className="hidden lg:grid lg:grid-cols-2 min-h-screen">
        <div className="flex flex-col items-center justify-center px-8">
          <div className="w-full max-w-md space-y-8">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-foreground">
                    Seguros
                  </h1>
                  <p className="text-xs text-muted-foreground">
                    Gestión de cotizaciones
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold text-foreground">Iniciar sesión</h2>
                <p className="text-sm text-muted-foreground">
                  Accede a tu cuenta para administrar cotizaciones y productos
                </p>
              </div>
              <LoginForm />
            </div>

            <div className="pt-6 border-t border-border">
              <p className="text-xs text-muted-foreground text-center">
                ¿Problemas para acceder? Contacta al equipo de soporte
              </p>
            </div>
          </div>
        </div>

        <div className="hidden lg:flex flex-col items-center justify-center bg-gradient-to-br from-primary to-primary-hover px-8 py-12">
          <div className="text-center space-y-8 max-w-md">
            <div className="flex justify-center">
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
                <Shield className="w-8 h-8 text-white" />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-white">
                Bienvenido al sistema
              </h3>
              <p className="text-white/80 text-sm leading-relaxed">
                Plataforma profesional para la administración y cotización de pólizas de seguros de automóviles.
              </p>
            </div>

            <div className="space-y-3 pt-4">
              <div className="flex items-start gap-3 text-white/90 text-sm">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs font-semibold">
                  ✓
                </div>
                <span>Gestión integral de cotizaciones</span>
              </div>
              <div className="flex items-start gap-3 text-white/90 text-sm">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs font-semibold">
                  ✓
                </div>
                <span>Administración de productos y coberturas</span>
              </div>
              <div className="flex items-start gap-3 text-white/90 text-sm">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs font-semibold">
                  ✓
                </div>
                <span>Acceso rápido a productos y cotizaciones</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
