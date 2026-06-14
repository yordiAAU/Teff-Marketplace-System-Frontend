import { api } from "./axios";
import type {
  LoginResponse,
  MeResponse,
  RefreshResponse,
  RegisterResponse,
  UserProfile,
} from "@/types/api.types";

export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
  role: "customer" | "farmer" | "admin";
  phoneNumber: string;
  region: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export const authApi = {
  register: async (body: RegisterRequest): Promise<RegisterResponse> => {
    const { data } = await api.post<RegisterResponse>("/api/auth/register", body);
    return data;
  },

  login: async (body: LoginRequest): Promise<LoginResponse> => {
    const { data } = await api.post<LoginResponse>("/api/auth/login", body);
    return data;
  },

  logout: async (): Promise<void> => {
    await api.post("/api/auth/logout");
  },

  refresh: async (): Promise<RefreshResponse> => {
    const { data } = await api.post<RefreshResponse>("/api/auth/refresh");
    return data;
  },

  me: async (): Promise<UserProfile> => {
    const { data } = await api.get<MeResponse>("/api/auth/me");
    return data.data;
  },
};
