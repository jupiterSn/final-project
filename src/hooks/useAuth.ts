"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export type Role = "admin" | "user";

export type AuthUser = {
  id: number;
  name: string;
  email: string;
  role: Role;
  isVerified: boolean;
};

const CURRENT_USER_KEY = "secureexam_current_user";

function getInitialUser(): AuthUser | null {
  if (typeof window === "undefined") {
    return null;
  }

  const savedUser = localStorage.getItem(CURRENT_USER_KEY);

  if (!savedUser) {
    return null;
  }

  try {
    return JSON.parse(savedUser) as AuthUser;
  } catch {
    return null;
  }
}

export function useAuth() {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(getInitialUser);

  function login(userData: AuthUser) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userData));
    setUser(userData);
    router.push("/dashboard");
  }

  function logout() {
    localStorage.removeItem(CURRENT_USER_KEY);
    setUser(null);
    router.push("/login");
  }

  function requireAuth() {
    const savedUser = localStorage.getItem(CURRENT_USER_KEY);

    if (!savedUser) {
      router.push("/login");
      return null;
    }

    return JSON.parse(savedUser) as AuthUser;
  }

  function isAdmin() {
    return user?.role === "admin";
  }

  function isUser() {
    return user?.role === "user";
  }

  return {
    user,
    login,
    logout,
    requireAuth,
    isAdmin,
    isUser,
  };
}