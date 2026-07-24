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

export function saveToken(token: string): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(JWT_STORAGE_KEY, token);
  }
}

export function getToken(): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem(JWT_STORAGE_KEY);
  }

  return null;
}

export function clearToken(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(JWT_STORAGE_KEY);
  }
}

export function isAuthenticated(): boolean {
  return !!getToken();
}

export async function authFetch(input: RequestInfo | URL, init: RequestInit = {}) {
  const token = getToken();

  if (!token) {
    clearToken();

    if (typeof window !== "undefined") {
      window.location.assign("/login");
    }

    throw new Error("Unauthorized");
  }

  const response = await fetch(input, {
    ...init,
    headers: {
      ...(init.headers ?? {}),
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 401) {
    clearToken();

    if (typeof window !== "undefined") {
      window.location.assign("/login");
    }

    throw new Error("Unauthorized");
  }

  return response;
}

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
    const error = await response.json().catch(() => null);
    throw new Error(error?.message || "Authentication failed");
  }

  const data: AuthResponse = await response.json();

  if (!data.success || !data.token || !data.user) {
    throw new Error(data.message || "Authentication failed");
  }

  saveToken(data.token);

  return data;
}
