"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginFormSchema, type LoginFormData } from "@/lib/validations/login";
import { authenticate } from "@/lib/auth";
import { AlertCircle, Loader2 } from "lucide-react";

export function LoginForm() {
  const router = useRouter();
  const [authError, setAuthError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setAuthError(null);

    try {
      await authenticate(data.identification, data.password);
      router.replace("/");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Error de autenticación";
      setAuthError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Error Alert */}
      {authError && (
        <div className="flex gap-3 rounded-lg bg-red-50 p-4 text-sm text-red-800 border border-red-200">
          <AlertCircle className="h-5 w-5 flex-shrink-0 text-red-600" />
          <div>{authError}</div>
        </div>
      )}

      {/* Identification Field */}
      <div>
        <label
          htmlFor="identification"
          className="block text-sm font-medium text-foreground mb-2"
        >
          Usuario / Cédula
        </label>
        <input
          id="identification"
          type="text"
          placeholder="Ingresa tu usuario o cédula"
          className={`w-full px-4 py-2 text-base rounded-[4px] border transition-colors ${
            errors.identification
              ? "border-red-500 bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500"
              : "border-border bg-surface hover:border-primary focus:outline-none focus:ring-2 focus:ring-accent"
          }`}
          disabled={isLoading}
          {...register("identification")}
        />
        {errors.identification && (
          <p className="mt-1 text-sm text-red-600">{errors.identification.message}</p>
        )}
      </div>

      {/* Password Field */}
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-foreground mb-2"
        >
          Contraseña
        </label>
        <input
          id="password"
          type="password"
          placeholder="Ingresa tu contraseña"
          className={`w-full px-4 py-2 text-base rounded-[4px] border transition-colors ${
            errors.password
              ? "border-red-500 bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500"
              : "border-border bg-surface hover:border-primary focus:outline-none focus:ring-2 focus:ring-accent"
          }`}
          disabled={isLoading}
          {...register("password")}
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className={`w-full py-2.5 px-4 rounded-[4px] font-medium text-sm transition-all ${
          isLoading
            ? "bg-primary/70 text-white cursor-not-allowed"
            : "bg-primary text-white hover:bg-primary-hover active:scale-95"
        }`}
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            Iniciando sesión...
          </span>
        ) : (
          "Iniciar sesión"
        )}
      </button>
    </form>
  );
}
