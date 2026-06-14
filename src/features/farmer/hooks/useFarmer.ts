import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { farmerApi } from "@/lib/api";
import type { CreateListingRequest, FarmerOrdersParams, UpdateListingRequest } from "@/lib/api/farmer.api";
import { handleApiError } from "@/lib/api/axios";
import { invalidateFarmerDashboard, invalidateFarmerListings } from "@/lib/query/invalidate";
import { queryKeys, STALE_TIME } from "@/lib/query/keys";
import type { FarmerOrdersResponse, MarketPeriod, OrderStatus } from "@/types/api.types";

export function useFarmerOverview() {
  return useQuery({
    queryKey: queryKeys.farmer.overview,
    queryFn: farmerApi.getOverview,
    staleTime: STALE_TIME.dashboards,
  });
}

export function useFarmerMarketTrend(productTypeId: string, period: MarketPeriod) {
  return useQuery({
    queryKey: queryKeys.farmer.marketTrend(productTypeId, period),
    queryFn: () => farmerApi.getMarketTrend(productTypeId, period),
    enabled: !!productTypeId,
    staleTime: STALE_TIME.dashboards,
  });
}

export function useFarmerMarketStats(productTypeId: string) {
  return useQuery({
    queryKey: queryKeys.farmer.marketStats(productTypeId),
    queryFn: () => farmerApi.getMarketStats(productTypeId),
    enabled: !!productTypeId,
    staleTime: STALE_TIME.dashboards,
  });
}

export function useFarmerRecentSales() {
  return useQuery({
    queryKey: queryKeys.farmer.recentSales,
    queryFn: farmerApi.getRecentSales,
    staleTime: STALE_TIME.dashboards,
  });
}

export function useFarmerListings() {
  return useQuery({
    queryKey: queryKeys.farmer.listings,
    queryFn: farmerApi.getMyListings,
    staleTime: STALE_TIME.farmerListings,
  });
}

export function useFarmerOrders(params?: FarmerOrdersParams) {
  return useQuery({
    queryKey: queryKeys.farmer.orders(params),
    queryFn: () => farmerApi.getOrders(params),
    staleTime: STALE_TIME.orders,
  });
}

export function useCreateListing() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateListingRequest) => farmerApi.createListing(payload),
    onSuccess: () => {
      invalidateFarmerListings(queryClient);
      invalidateFarmerDashboard(queryClient);
      toast.success("Listing created");
    },
    onError: (e) => handleApiError(e, "Failed to create listing"),
  });
}

export function useUpdateListing() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateListingRequest }) =>
      farmerApi.updateListing(id, payload),
    onSuccess: () => {
      invalidateFarmerListings(queryClient);
      invalidateFarmerDashboard(queryClient);
      toast.success("Listing updated");
    },
    onError: (e) => handleApiError(e, "Failed to update listing"),
  });
}

export function useDeleteListing() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: farmerApi.deleteListing,
    onSuccess: () => {
      invalidateFarmerListings(queryClient);
      invalidateFarmerDashboard(queryClient);
      toast.success("Listing deleted");
    },
    onError: (e) => handleApiError(e, "Failed to delete listing"),
  });
}

export function useUpdateOrderStatus(_params?: FarmerOrdersParams) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: OrderStatus }) =>
      farmerApi.updateOrderStatus(id, status),
    onMutate: async ({ id, status }) => {
      await queryClient.cancelQueries({ queryKey: ["farmer-orders"] });
      const previousEntries = queryClient.getQueriesData<FarmerOrdersResponse>({
        queryKey: ["farmer-orders"],
      });

      previousEntries.forEach(([key, data]) => {
        if (!data) return;
        queryClient.setQueryData(key, {
          ...data,
          data: data.data.map((order) =>
            order.id === id ? { ...order, status } : order
          ),
        });
      });

      return { previousEntries };
    },
    onError: (error, _variables, context) => {
      context?.previousEntries.forEach(([key, data]) => {
        queryClient.setQueryData(key, data);
      });
      handleApiError(error, "Failed to update order status");
    },
    onSuccess: () => {
      toast.success("Order status updated");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["farmer-orders"] });
      invalidateFarmerDashboard(queryClient);
    },
  });
}
