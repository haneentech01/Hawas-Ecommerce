import { useEffect, useState } from "react";

const STORAGE_KEY = "hawas_auth";

interface User {
  id: string;
  name: string;
  email?: string;
}

export function useAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const stored =
      typeof window !== "undefined"
        ? window.localStorage.getItem(STORAGE_KEY)
        : null;
    setIsAuthenticated(stored === "true");
    setIsReady(true);
  }, []);

  const login = async (credentials: { email: string; password: string }) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Login failed");
      }

      const data = await response.json();
      setUser(data.user || { id: "1", name: "Guest" });
      setIsAuthenticated(true);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(STORAGE_KEY, "true");
      }
      return { success: true };
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Login failed";
      setError(msg);
      return { success: false };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (credentials: {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    setIsLoading(true);
    setError(null);

    try {
      const body = {
        email: credentials.email,
        password: credentials.password,
        username: credentials.fullName,
      };
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Registration failed");
      }

      const data = await response.json();
      setUser(data.user || { id: "1", name: "Guest" });
      setIsAuthenticated(true);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(STORAGE_KEY, "true");
      }
      return { success: true };
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Registration failed";
      setError(msg);
      return { success: false };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  };

  return {
    login,
    register,
    logout,
    isLoading,
    error,
    user,
    isAuthenticated,
    isReady,
  };
}
