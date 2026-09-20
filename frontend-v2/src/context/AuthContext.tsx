import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import api from "../services/api";
import type { AuthResponse, User } from "../types/auth";

interface AuthContextValue {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    name: string,
    email: string,
    password: string,
  ) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("access_token"),
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const restoreSession = async () => {
      const savedToken = localStorage.getItem("access_token");

      if (!savedToken) {
        setLoading(false);
        return;
      }

      try {
        const response = await api.get<{ user: User }>("/auth/me");
        setUser(response.data.user);
      } catch {
        localStorage.removeItem("access_token");
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    restoreSession();
  }, []);

 const login = async (email: string, password: string) => {
  const response = await api.post<AuthResponse>("/auth/login", {
    email,
    password,
  });

  localStorage.setItem("access_token", response.data.token);
  setToken(response.data.token);

  const meResponse = await api.get<{ user: User }>("/auth/me");

  setUser(meResponse.data.user);
};

const register = async (
  name: string,
  email: string,
  password: string,
) => {
  const response = await api.post<AuthResponse>("/auth/register", {
    name,
    email,
    password,
  });

  localStorage.setItem("access_token", response.data.token);
  setToken(response.data.token);

  const meResponse = await api.get<{ user: User }>("/auth/me");

  setUser(meResponse.data.user);
};

  const logout = () => {
    localStorage.removeItem("access_token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}