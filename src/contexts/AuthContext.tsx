"use client";
// app/contexts/AuthContext.tsx

import {
  createContext,
  useState,
  ReactNode,
  useEffect,
  useContext,
} from "react";
import { User } from "../types/user";
import { axiosInstance } from "../services/fetcher";

interface AuthContextType {
  user: User | null;
  setUser?: (user: User | null) => void;
  isLoading: Boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axiosInstance.get("/auth/status");
        if (data.isAuthenticated) {
          setUser(data.user);
          setIsLoading(false);
        } else {
          setUser(null);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching auth status", error);
        setUser(null);
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuthe = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
