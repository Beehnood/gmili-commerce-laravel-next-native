import { api } from "@/api/api";

export type RegisterData = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export type LoginData = {
  email: string;
  password: string;
};
export type User = {
  id : number;
  first_name: string;
  laste_name: string;
  email: string;
  avatar_url?: string|null;
};
export type AuthResponse = {
  message: string;
  user: User;
  token: string;
};



export const authService = {
  register: async (data: RegisterData) => {
    const response = await api.post("/register", data);
    return response.data;
  },
  login: async (data: LoginData) => {
    const response = await api.post("/login", data);
    return response.data;
  },

  me: async () => {
    const response = await api.get("/me");
    return response;
  },

  logout: async () => {
    const response = await api.post("/logout");
    return response;
  },

  exchangeGoogleCode: async (code: string) => {
    const response = await api.post("/auth/google/exchange", {
      code,
    });

    return response.data;
  },
};
