"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";

/**
 * Component that redirects to dashboard if already authenticated
 * Used in the login page to prevent logged-in users from seeing login
 */
export function RedirectIfAuthenticated() {
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated()) {
      router.push("/");
    }
  }, [router]);

  return null;
}
