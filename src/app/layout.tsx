import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { AuthGuard } from "@/components/auth/auth-guard";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cotizaciones de Seguros | Inicio",
  description:
    "Interfaz administrativa para el sistema de cotización de seguros de automóviles.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full bg-background text-foreground">
        <AuthGuard>{children}</AuthGuard>
      </body>
    </html>
  );
}
