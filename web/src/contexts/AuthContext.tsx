"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { authApi } from "../lib/api";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  email: string;
  full_name: string;
  phone?: string;
  user_type: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (token: string, userData: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const res = await authApi.getMe();
          if (res.success) {
            setUser(res.data);
          } else {
            localStorage.removeItem("token");
          }
        } catch (error) {
          localStorage.removeItem("token");
        }
      }
      setLoading(false);
    };
    loadUser();
  }, []);

  const login = (token: string, userData: User) => {
    localStorage.setItem("token", token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
