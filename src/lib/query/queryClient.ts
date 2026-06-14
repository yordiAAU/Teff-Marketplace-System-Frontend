import { QueryClient } from "@tanstack/react-query";
import { GC_TIME, STALE_TIME } from "./keys";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: STALE_TIME.dashboards,
      gcTime: GC_TIME,
      retry: 1,
      refetchOnWindowFocus: true,
    },
    mutations: {
      retry: 0,
    },
  },
});
