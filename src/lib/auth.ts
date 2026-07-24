/**
 * Client-side authentication utilities
 * Manages JWT storage and retrieval
 */

const JWT_STORAGE_KEY = "auth_token";

export type AuthUser = {
  id: number;
  name: string;
  identification: string;
};

export type AuthResponse = {
  success: true;
  message: string;
  token: string;
  user: AuthUser;
};

/**
 * Store JWT in localStorage
 */
export function saveToken(token: string): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(JWT_STORAGE_KEY, token);
  }
}

/**
 * Retrieve JWT from localStorage
 */
export function getToken(): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem(JWT_STORAGE_KEY);
  }
  return null;
}

/**
 * Remove JWT from localStorage
 */
export function clearToken(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(JWT_STORAGE_KEY);
  }
}

/**
 * Check if user is authenticated (has valid JWT)
 */
export function isAuthenticated(): boolean {
  const token = getToken();
  return !!token;
}

/**
 * Authenticate user with the backend
 */
export async function authenticate(
  identification: string,
  password: string,
): Promise<AuthResponse> {
  const response = await fetch("/api/auth/verify", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ identification, password }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Authentication failed");
  }

  const data = await response.json();

  if (!data.data || !data.data.success) {
    throw new Error(data.message || "Authentication failed");
  }

  // Save token to localStorage
  saveToken(data.data.token);

  return data.data;
}
