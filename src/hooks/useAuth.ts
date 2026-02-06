"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "hawas_auth";

export function useAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const stored = typeof window !== "undefined"
      ? window.localStorage.getItem(STORAGE_KEY)
      : null;
    setIsAuthenticated(stored === "true");
    setIsReady(true);
  }, []);

  const login = async (data: { email: string; password: string }) => {
    setIsLoading(true);
    setError(null);

    try {
      // Mock login logic - replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsAuthenticated(true);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(STORAGE_KEY, "true");
      }
      return { success: true };
    } catch (err) {
      setError("Login failed");
      return { success: false };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    setIsLoading(true);
    setError(null);

    try {
      // Mock register logic - replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return { success: true };
    } catch (err) {
      setError("Registration failed");
      return { success: false };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
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
    isAuthenticated,
    isReady,
  };
}
