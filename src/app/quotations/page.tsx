"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, CheckCircle2, Loader2, ShieldCheck } from "lucide-react";
import { useForm } from "react-hook-form";

import { AppShell } from "@/components/layout/app-shell";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { authFetch } from "@/lib/auth";
import { quotationCreateSchema, type QuotationCreateInput } from "@/lib/validations/quotations";

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

type QuotationSuccessResponse = {
  success: true;
  message: "Quotation created successfully.";
  data: {
    reference: string;
    quotedPrice: string;
  };
};

type QuotationErrorResponse = {
  success: false;
  message: string;
  errors?: Record<string, string[] | string>;
};

const PRODUCTS_QUERY = "page=1&limit=10";

function textInputClassName(hasError: boolean) {
  return `w-full rounded-[4px] border px-4 py-2.5 text-sm text-slate-900 transition-colors ${
    hasError
      ? "border-red-500 bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500"
      : "border-slate-300 bg-white hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
  }`;
}

export default function QuotationsPage() {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [productsError, setProductsError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [quotationResult, setQuotationResult] = useState<QuotationSuccessResponse | null>(null);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(quotationCreateSchema),
    defaultValues: {
      productId: 0,
      vehicleYear: 0,
      vehicleBrand: "",
      vehicleModel: "",
      vehicleValue: 0,
    },
  });

  const selectedProduct = products.find((product) => product.id === selectedProductId) ?? null;

  useEffect(() => {
    let isMounted = true;

    async function loadProducts() {
      setProductsLoading(true);
      setProductsError(null);

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
      } catch (caughtError) {
        if (!isMounted) {
          return;
        }

        const message =
          caughtError instanceof Error ? caughtError.message : "No fue posible cargar los productos.";

        if (message !== "Unauthorized") {
          setProductsError(message);
        }
      } finally {
        if (isMounted) {
          setProductsLoading(false);
        }
      }
    }

    void loadProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  const selectProduct = (productId: number) => {
    setSelectedProductId(productId);
    setValue("productId", productId, {
      shouldDirty: true,
      shouldValidate: true,
    });
    clearErrors("productId");
    setSubmitError(null);
  };

  const onSubmit = async (data: QuotationCreateInput) => {
    setIsSubmitting(true);
    setSubmitError(null);
    setQuotationResult(null);

    try {
      const response = await authFetch("/api/quotations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: data.productId,
          vehicleYear: data.vehicleYear,
          vehicleBrand: data.vehicleBrand,
          vehicleModel: data.vehicleModel,
          vehicleValue: data.vehicleValue,
        }),
      });

      const payload = (await response.json()) as QuotationSuccessResponse | QuotationErrorResponse;

      if (!response.ok) {
        const errorMessage =
          payload.success === false ? payload.message : "No fue posible crear la cotización.";
        setSubmitError(errorMessage);

        if (payload.success === false && payload.errors) {
          Object.entries(payload.errors).forEach(([field, value]) => {
            const messages = Array.isArray(value) ? value.join(" ") : value;
            setError(field as keyof QuotationCreateInput, {
              type: "server",
              message: messages,
            });
          });
        }

        return;
      }

      if (payload.success) {
        setQuotationResult(payload);
      }
    } catch (caughtError) {
      setSubmitError(
        caughtError instanceof Error ? caughtError.message : "No fue posible crear la cotización.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AppShell>
      <div className="mx-auto max-w-6xl space-y-6 px-4 py-8">
        <Card className="p-6">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-slate-900">Nueva cotización</h1>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Selecciona un producto, completa los datos del vehículo y envía la solicitud.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
              <ShieldCheck className="h-4 w-4 text-slate-600" />
              Solicitud autenticada
            </div>
          </div>
        </Card>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="p-6">
            <div className="mb-5">
              <h2 className="text-lg font-semibold text-slate-900">1. Selección de producto</h2>
              <p className="mt-1 text-sm text-slate-600">Selecciona uno de los productos disponibles.</p>
            </div>

            {productsLoading ? (
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <Loader2 className="h-4 w-4 animate-spin" />
                Cargando productos...
              </div>
            ) : productsError ? (
              <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800">
                <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-600" />
                <div>{productsError}</div>
              </div>
            ) : products.length === 0 ? (
              <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-sm text-slate-600">
                No hay productos activos disponibles para cotizar.
              </div>
            ) : (
              <div className="space-y-3">
                {products.map((product) => (
                  <button
                    key={product.id}
                    type="button"
                    onClick={() => selectProduct(product.id)}
                    className={`w-full rounded-lg border p-4 text-left transition-colors ${
                      selectedProductId === product.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-sm font-semibold text-slate-900">{product.name}</span>
                          <Badge variant="secondary">{product.code}</Badge>
                          <Badge variant="accent">{product.coverageType}</Badge>
                        </div>
                        <p className="mt-2 text-sm leading-6 text-slate-600">{product.description}</p>
                      </div>
                      <div className="text-sm text-slate-700">
                        <div>Base: {product.basePrice}</div>
                        <div>
                          Rango: {product.minVehicleValue} - {product.maxVehicleValue}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </Card>

          <Card className="p-6">
            {selectedProduct ? (
              <div className="space-y-3 rounded-lg border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                  Producto seleccionado
                </p>
                <div className="space-y-1 text-sm text-slate-700">
                  <div>
                    <span className="font-semibold text-slate-900">Nombre:</span> {selectedProduct.name}
                  </div>
                  <div>
                    <span className="font-semibold text-slate-900">Cobertura:</span>{" "}
                    {selectedProduct.coverageType}
                  </div>
                  <div>
                    <span className="font-semibold text-slate-900">Valor mínimo:</span>{" "}
                    {selectedProduct.minVehicleValue}
                  </div>
                  <div>
                    <span className="font-semibold text-slate-900">Valor máximo:</span>{" "}
                    {selectedProduct.maxVehicleValue}
                  </div>
                  <div>
                    <span className="font-semibold text-slate-900">Precio base:</span>{" "}
                    {selectedProduct.basePrice}
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-600">
                Selecciona un producto para habilitar el formulario.
              </div>
            )}
          </Card>
        </div>

        <Card className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-5 md:grid-cols-2">
              <div className="md:col-span-2">
                <label htmlFor="productId" className="mb-2 block text-sm font-medium text-slate-900">
                  Producto
                </label>
                <input
                  id="productId"
                  type="number"
                  inputMode="numeric"
                  readOnly
                  value={selectedProductId ?? ""}
                  className={textInputClassName(Boolean(errors.productId))}
                  placeholder="Selecciona un producto"
                  {...register("productId", { valueAsNumber: true })}
                />
                {errors.productId && (
                  <p className="mt-1 text-sm text-red-600">{errors.productId.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="vehicleYear" className="mb-2 block text-sm font-medium text-slate-900">
                  Año del vehículo
                </label>
                <input
                  id="vehicleYear"
                  type="number"
                  inputMode="numeric"
                  step="1"
                  className={textInputClassName(Boolean(errors.vehicleYear))}
                  placeholder="Ej. 2022"
                  {...register("vehicleYear", { valueAsNumber: true })}
                />
                {errors.vehicleYear && (
                  <p className="mt-1 text-sm text-red-600">{errors.vehicleYear.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="vehicleValue" className="mb-2 block text-sm font-medium text-slate-900">
                  Valor del vehículo
                </label>
                <input
                  id="vehicleValue"
                  type="number"
                  inputMode="decimal"
                  step="0.01"
                  className={textInputClassName(Boolean(errors.vehicleValue))}
                  placeholder="Ej. 28000"
                  {...register("vehicleValue", { valueAsNumber: true })}
                />
                {errors.vehicleValue && (
                  <p className="mt-1 text-sm text-red-600">{errors.vehicleValue.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="vehicleBrand" className="mb-2 block text-sm font-medium text-slate-900">
                  Marca del vehículo
                </label>
                <input
                  id="vehicleBrand"
                  type="text"
                  className={textInputClassName(Boolean(errors.vehicleBrand))}
                  placeholder="Ej. Toyota"
                  {...register("vehicleBrand")}
                />
                {errors.vehicleBrand && (
                  <p className="mt-1 text-sm text-red-600">{errors.vehicleBrand.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="vehicleModel" className="mb-2 block text-sm font-medium text-slate-900">
                  Modelo del vehículo
                </label>
                <input
                  id="vehicleModel"
                  type="text"
                  className={textInputClassName(Boolean(errors.vehicleModel))}
                  placeholder="Ej. Corolla"
                  {...register("vehicleModel")}
                />
                {errors.vehicleModel && (
                  <p className="mt-1 text-sm text-red-600">{errors.vehicleModel.message}</p>
                )}
              </div>
            </div>

            {submitError && (
              <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800">
                <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-600" />
                <div>{submitError}</div>
              </div>
            )}

            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <button
                type="submit"
                disabled={isSubmitting || !selectedProduct}
                className="inline-flex items-center justify-center gap-2 rounded-[4px] bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Enviando cotización...
                  </>
                ) : (
                  "Crear cotización"
                )}
              </button>
              <p className="text-xs text-slate-500">
                Completa los datos del vehículo para crear la cotización.
              </p>
            </div>
          </form>
        </Card>

        {quotationResult && (
          <Card className="p-6">
            <div className="flex items-start gap-3 rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-900">
              <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
              <div className="space-y-1">
                <p className="font-semibold">{quotationResult.message}</p>
                <p>
                  <span className="font-semibold">Referencia:</span> {quotationResult.data.reference}
                </p>
                <p>
                  <span className="font-semibold">Precio cotizado:</span> {quotationResult.data.quotedPrice}
                </p>
              </div>
            </div>
          </Card>
        )}
      </div>
    </AppShell>
  );
}
