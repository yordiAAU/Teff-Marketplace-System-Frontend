import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { customerApi } from "@/lib/api";
import type {
  CustomerOrdersParams,
  CustomerProductTypeParams,
  PlaceOrderRequest,
} from "@/lib/api/customer.api";
import { handleApiError } from "@/lib/api/axios";
import { invalidateCustomerOrders } from "@/lib/query/invalidate";
import { queryKeys, STALE_TIME } from "@/lib/query/keys";

export function useCustomerOverview() {
  return useQuery({
    queryKey: queryKeys.customer.overview,
    queryFn: customerApi.getOverview,
    staleTime: STALE_TIME.dashboards,
  });
}

export function useCustomerSpendingTrend() {
  return useQuery({
    queryKey: queryKeys.customer.spendingTrend,
    queryFn: customerApi.getSpendingTrend,
    staleTime: STALE_TIME.dashboards,
  });
}

export function useCustomerRecentOrders() {
  return useQuery({
    queryKey: queryKeys.customer.recentOrders,
    queryFn: customerApi.getRecentOrders,
    staleTime: STALE_TIME.dashboards,
  });
}

export function useCustomerDistribution() {
  return useQuery({
    queryKey: queryKeys.customer.distribution,
    queryFn: customerApi.getDistribution,
    staleTime: STALE_TIME.dashboards,
  });
}

export function useCustomerFavoriteProduct() {
  return useQuery({
    queryKey: queryKeys.customer.favoriteProduct,
    queryFn: customerApi.getFavoriteProduct,
    staleTime: STALE_TIME.dashboards,
  });
}

export function useCustomerMarketplace(params?: { page?: number; pageSize?: number }) {
  return useQuery({
    queryKey: queryKeys.customer.marketplace(params),
    queryFn: () => customerApi.getProductTypes(params),
    staleTime: STALE_TIME.marketplace,
  });
}

export function useCustomerProductType(productTypeId: string, params?: CustomerProductTypeParams) {
  return useQuery({
    queryKey: queryKeys.customer.productType(productTypeId, params),
    queryFn: () => customerApi.getProductTypeDetail(productTypeId, params),
    enabled: !!productTypeId,
    staleTime: STALE_TIME.productDetails,
  });
}

export function useCustomerListingDetail(productId: string, farmerId: string) {
  return useQuery({
    queryKey: queryKeys.customer.listingDetail(productId, farmerId),
    queryFn: () => customerApi.getListingDetail(productId, farmerId),
    enabled: !!productId && !!farmerId,
    staleTime: STALE_TIME.productDetails,
  });
}

export function useCustomerOrders(params?: CustomerOrdersParams) {
  return useQuery({
    queryKey: queryKeys.customer.orders(params),
    queryFn: () => customerApi.getOrders(params),
    staleTime: STALE_TIME.orders,
  });
}

export function usePlaceOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: PlaceOrderRequest) => customerApi.placeOrder(payload),
    onSuccess: () => {
      invalidateCustomerOrders(queryClient);
      toast.success("Order placed successfully");
    },
    onError: (e) => handleApiError(e, "Failed to place order"),
  });
}
