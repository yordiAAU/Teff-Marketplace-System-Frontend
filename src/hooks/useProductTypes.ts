import { useQuery } from "@tanstack/react-query";
import { farmerApi } from "@/lib/api";
import { queryKeys, STALE_TIME } from "@/lib/query/keys";

export function useProductTypes() {
  return useQuery({
    queryKey: queryKeys.productTypes.all,
    queryFn: farmerApi.getProductTypes,
    staleTime: STALE_TIME.productTypes,
    gcTime: STALE_TIME.productTypes,
  });
}
