"use client";

import { useRouter } from "next/navigation";
import { clearToken } from "@/lib/auth";
import { LogOut } from "lucide-react";

export function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    clearToken();
    router.replace("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-[4px] text-foreground hover:bg-surface-muted transition-colors"
      title="Cerrar sesión"
    >
      <LogOut className="w-4 h-4" />
      <span className="hidden sm:inline">Cerrar sesión</span>
    </button>
  );
}
