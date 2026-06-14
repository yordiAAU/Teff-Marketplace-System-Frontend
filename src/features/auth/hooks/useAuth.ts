import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { authApi } from "@/lib/api";
import { handleApiError } from "@/lib/api/axios";
import { queryKeys, STALE_TIME } from "@/lib/query/keys";
import { useAuthStore } from "@/stores/auth.store";
import type { LoginFormValues, RegisterFormValues } from "@/features/auth/schemas/auth.schemas";
import type { UserRole } from "@/types/api.types";

export function useMe() {
  const accessToken = useAuthStore((s) => s.accessToken);
  return useQuery({
    queryKey: queryKeys.auth.me,
    queryFn: authApi.me,
    enabled: !!accessToken,
    staleTime: STALE_TIME.profile,
  });
}

export function useLogin() {
  const navigate = useNavigate();
  const setAccessToken = useAuthStore((s) => s.setAccessToken);
  const setUser = useAuthStore((s) => s.setUser);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      setAccessToken(data.accessToken);
      setUser(data.user);
      queryClient.setQueryData(queryKeys.auth.me, data.user);
      toast.success("Welcome back!");
      navigate(`/${data.user.role}/dashboard`);
    },
    onError: (error) => handleApiError(error, "Login failed"),
  });
}

export function useRegister() {
  const navigate = useNavigate();
  const setAccessToken = useAuthStore((s) => s.setAccessToken);
  const setUser = useAuthStore((s) => s.setUser);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.register,
    onSuccess: (data) => {
      setAccessToken(data.accessToken);
      setUser(data.user);
      queryClient.setQueryData(queryKeys.auth.me, data.user);
      toast.success("Account created successfully!");
      navigate(`/${data.user.role}/dashboard`);
    },
    onError: (error) => handleApiError(error, "Registration failed"),
  });
}

export function useLogout() {
  const navigate = useNavigate();
  const clearAuth = useAuthStore((s) => s.clearAuth);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.logout,
    onSettled: () => {
      clearAuth();
      queryClient.clear();
      navigate("/login");
      toast.success("Logged out");
    },
  });
}

export function useAuthLoginForm() {
  const login = useLogin();
  const submit = (values: LoginFormValues) => login.mutate(values);
  return { submit, isPending: login.isPending };
}

export function useAuthRegisterForm() {
  const register = useRegister();
  const submit = (values: RegisterFormValues) => register.mutate(values);
  return { submit, isPending: register.isPending };
}

export function getDashboardPath(role: UserRole): string {
  return `/${role}/dashboard`;
}
