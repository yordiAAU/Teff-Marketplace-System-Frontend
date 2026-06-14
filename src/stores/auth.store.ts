import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthUser, UserProfile } from "@/types/api.types";

interface AuthState {
  accessToken: string | null;
  user: AuthUser | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
  setAccessToken: (token: string | null) => void;
  setUser: (user: AuthUser | UserProfile | null) => void;
  setInitialized: (value: boolean) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      user: null,
      isAuthenticated: false,
      isInitialized: false,
      setAccessToken: (token) =>
        set({ accessToken: token, isAuthenticated: !!token }),
      setUser: (user) => set({ user }),
      setInitialized: (value) => set({ isInitialized: value }),
      clearAuth: () =>
        set({
          accessToken: null,
          user: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: "teff-auth",
      partialize: (state) => ({
        accessToken: state.accessToken,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
