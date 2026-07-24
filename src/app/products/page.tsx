import { AppShell } from "@/components/layout/app-shell";
import { Card } from "@/components/ui/card";

export default function ProductsPage() {
  return (
    <AppShell>
      <Card className="p-6">
        <h1 className="text-2xl font-semibold text-foreground">Productos</h1>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          Esta página es un espacio preparado para la gestión de productos en fases posteriores.
        </p>
      </Card>
    </AppShell>
  );
}
