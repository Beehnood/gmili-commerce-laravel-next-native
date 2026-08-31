import { create } from "zustand";
import {
  authService,
  LoginData,
  RegisterData,
} from "@/services/auth.service";

type User = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  avatar_url?: string | null;
};

type AuthStore = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;

  loadToken: () => void;

  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;

  loginWithGoogle: (code: string) => Promise<void>;

  // exchangeGoogleCode: (code: string) => Promise<void>;

  logout: () => Promise<void>;
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,

  loadToken: () => {
    if (typeof window === "undefined") {
      return;
    }

    const token = localStorage.getItem("token");

    set({
      token,
      isAuthenticated: !!token,
    });
  },

  register: async (data) => {
    const response = await authService.register(data);

    localStorage.setItem("token", response.token);

    set({
      user: response.user,
      token: response.token,
      isAuthenticated: true,
    });
  },

  login: async (data) => {
    const response = await authService.login(data);

    localStorage.setItem("token", response.token);

    set({
      user: response.user,
      token: response.token,
      isAuthenticated: true,
    });
  },

  loginWithGoogle: async (code) => {
    const response = await authService.exchangeGoogleCode(code);

    localStorage.setItem("token", response.token);

    set({
      user: response.user,
      token: response.token,
      isAuthenticated: true,
    });
  },

  logout: async () => {
    await authService.logout();

    localStorage.removeItem("token");

    set({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  },
}));