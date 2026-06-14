import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { authApi } from "@/lib/api";
import { queryKeys, STALE_TIME } from "@/lib/query/keys";
import { useAuthStore } from "@/stores/auth.store";

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const accessToken = useAuthStore((s) => s.accessToken);
  const setUser = useAuthStore((s) => s.setUser);
  const setInitialized = useAuthStore((s) => s.setInitialized);
  const clearAuth = useAuthStore((s) => s.clearAuth);

  const { data, isError, isFetched } = useQuery({
    queryKey: queryKeys.auth.me,
    queryFn: authApi.me,
    enabled: !!accessToken,
    retry: false,
    staleTime: STALE_TIME.profile,
  });

  useEffect(() => {
    if (!accessToken) {
      setInitialized(true);
      return;
    }
    if (data) {
      setUser(data);
      setInitialized(true);
    }
    if (isError) {
      clearAuth();
      setInitialized(true);
    }
  }, [accessToken, data, isError, setUser, setInitialized, clearAuth]);

  useEffect(() => {
    if (accessToken && isFetched && !data && !isError) {
      setInitialized(true);
    }
  }, [accessToken, isFetched, data, isError, setInitialized]);

  return <>{children}</>;
}
