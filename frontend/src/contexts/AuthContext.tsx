import React, { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import api from "../services/api"; // gunakan instance axios custom
import { useNavigate } from "react-router-dom";

interface User {
  user_id: number;
  user_name: string;
  user_email: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; message?: string }>;
  logout: () => Promise<void>;
  changePassword: (
    oldPassword: string,
    newPassword: string,
    confirmPassword: string
  ) => Promise<{ success: boolean; message?: string }>;
  resetPassword: (
    email: string,
    newPassword: string,
    confirmPassword: string
  ) => Promise<{ success: boolean; message?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        if (token) {
          const response = await api.get<{ user: User }>("/auth/verify");
          setUser(response.data.user);
        }
      } catch (error) {
        console.error("Token verification failed:", error);
        logout();
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
    // eslint-disable-next-line
  }, [token]);

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post<{
        token: string;
        user: User;
        message: string;
      }>("/auth/signin", {
        user_email: email,
        user_password: password,
      });

      const { token, user } = response.data;
      localStorage.setItem("token", token);
      setToken(token);
      setUser(user);
      return { success: true };
    } catch (error: unknown) {
      let message = "Login failed";
      if (error && typeof error === "object" && "response" in error && error.response && typeof error.response === "object" && "data" in error.response && error.response.data && typeof error.response.data === "object" && "message" in error.response.data) {
        message = (error.response as { data: { message?: string } }).data.message || message;
      }
      return {
        success: false,
        message,
      };
    }
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } finally {
      localStorage.removeItem("token");
      setToken(null);
      setUser(null);
      navigate("/admin/login");
    }
  };

  const changePassword = async (
    oldPassword: string,
    newPassword: string,
    confirmPassword: string
  ) => {
    try {
      await api.post("/auth/change-password", {
        old_password: oldPassword,
        new_password: newPassword,
        confirm_new_password: confirmPassword,
      });
      return { success: true };
    } catch (error: unknown) {
      let message = "Login failed";
      if (error && typeof error === "object" && "response" in error && error.response && typeof error.response === "object" && "data" in error.response && error.response.data && typeof error.response.data === "object" && "message" in error.response.data) {
        message = (error.response as { data: { message?: string } }).data.message || message;
      }
      return {
        success: false,
        message,
      };
    }
  };

  const resetPassword = async (
    email: string,
    newPassword: string,
    confirmPassword: string
  ) => {
    try {
      await api.post("/auth/reset-password", {
        user_email: email,
        new_password: newPassword,
        confirm_new_password: confirmPassword,
      });
      return { success: true };
    } catch (error: unknown) {
      let message = "Login failed";
      if (error && typeof error === "object" && "response" in error && error.response && typeof error.response === "object" && "data" in error.response && error.response.data && typeof error.response.data === "object" && "message" in error.response.data) {
        message = (error.response as { data: { message?: string } }).data.message || message;
      }
      return {
        success: false,
        message,
      };
    }
  };

  const value = {
    user,
    token,
    loading,
    isAuthenticated: !!token,
    login,
    logout,
    changePassword,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
