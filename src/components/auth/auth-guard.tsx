"use client";

import { useEffect, useState, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";

/**
 * Component that protects routes and redirects to login if not authenticated
 * Used as a wrapper in the root layout
 */
export function AuthGuard({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Skip auth check for login page
    if (pathname === "/login" || pathname?.startsWith("/(auth)")) {
      setIsChecking(false);
      return;
    }

    // Check if user is authenticated
    if (!isAuthenticated()) {
      // Redirect to login if not authenticated
      router.push("/login");
      return;
    }

    setIsChecking(false);
  }, [pathname, router]);

  // Show nothing while checking auth (prevents flash of unauthorized content)
  if (isChecking) {
    return null;
  }

  return <>{children}</>;
}
