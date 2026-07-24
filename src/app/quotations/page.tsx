import { AppShell } from "@/components/layout/app-shell";
import { Card } from "@/components/ui/card";

export default function QuotationsPage() {
  return (
    <AppShell>
      <Card className="p-6">
        <h1 className="text-2xl font-semibold text-foreground">Cotizaciones</h1>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          Página de cotizaciones preparada para la siguiente fase, con datos estáticos de referencia.
        </p>
      </Card>
    </AppShell>
  );
}
