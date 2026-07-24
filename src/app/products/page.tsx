"use client";

import { useEffect, useState } from "react";
import { AlertCircle, Loader2, ShieldCheck } from "lucide-react";

import { AppShell } from "@/components/layout/app-shell";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { authFetch } from "@/lib/auth";

type ProductItem = {
  id: number;
  code: string;
  name: string;
  coverageType: string;
  description: string;
  minVehicleValue: string;
  maxVehicleValue: string;
  basePrice: string;
  conditions: string;
};

type ProductsResponse = {
  success: true;
  message: string;
  data: ProductItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

const PRODUCTS_QUERY = "page=1&limit=10";

export default function ProductsPage() {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [pagination, setPagination] = useState<ProductsResponse["pagination"] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadProducts() {
      setIsLoading(true);
      setError(null);

      try {
        const response = await authFetch(`/api/products?${PRODUCTS_QUERY}`);
        const payload = (await response.json()) as ProductsResponse;

        if (!isMounted) {
          return;
        }

        if (!response.ok) {
          throw new Error(payload.message || "No fue posible cargar los productos.");
        }

        setProducts(payload.data);
        setPagination(payload.pagination);
      } catch (caughtError) {
        if (!isMounted) {
          return;
        }

        const message =
          caughtError instanceof Error ? caughtError.message : "No fue posible cargar los productos.";

        if (message !== "Unauthorized") {
          setError(message);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void loadProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <AppShell>
      <div className="mx-auto max-w-6xl space-y-6 px-4 py-8">
        <Card className="p-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-foreground">Productos</h1>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Consulta el catálogo disponible para completar una cotización.
              </p>
            </div>

            {pagination && (
              <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
                <span className="font-semibold text-slate-900">{pagination.total}</span> productos activos
              </div>
            )}
          </div>
        </Card>

        <Card className="p-6">
          {isLoading ? (
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              Cargando productos...
            </div>
          ) : error ? (
            <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800">
              <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-600" />
              <div>{error}</div>
            </div>
          ) : products.length === 0 ? (
            <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center text-sm text-slate-600">
              No hay productos disponibles.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table className="min-w-[900px]">
                <TableHeader>
                  <TableRow>
                    <TableHead>Id</TableHead>
                    <TableHead>Código</TableHead>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Cobertura</TableHead>
                    <TableHead>Descripción</TableHead>
                    <TableHead>Valor mínimo</TableHead>
                    <TableHead>Valor máximo</TableHead>
                    <TableHead>Precio base</TableHead>
                    <TableHead>Condiciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>{product.id}</TableCell>
                      <TableCell>{product.code}</TableCell>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>{product.coverageType}</TableCell>
                      <TableCell>{product.description}</TableCell>
                      <TableCell>{product.minVehicleValue}</TableCell>
                      <TableCell>{product.maxVehicleValue}</TableCell>
                      <TableCell>{product.basePrice}</TableCell>
                      <TableCell>{product.conditions}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </Card>

        {pagination && !error && products.length > 0 && (
          <Card className="p-4">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <ShieldCheck className="h-4 w-4 text-slate-500" />
              Página {pagination.page} de {pagination.totalPages}
            </div>
          </Card>
        )}
      </div>
    </AppShell>
  );
}
