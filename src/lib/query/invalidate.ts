import type { QueryClient } from "@tanstack/react-query";
import { queryKeys } from "./keys";

export function invalidateFarmerListings(queryClient: QueryClient) {
  queryClient.invalidateQueries({ queryKey: queryKeys.farmer.listings });
}

export function invalidateFarmerDashboard(queryClient: QueryClient) {
  queryClient.invalidateQueries({ queryKey: queryKeys.farmer.overview });
  queryClient.invalidateQueries({ queryKey: queryKeys.farmer.recentSales });
  queryClient.invalidateQueries({ queryKey: ["farmer", "market-trend"] });
  queryClient.invalidateQueries({ queryKey: ["farmer", "market-stats"] });
}

export function invalidateCustomerOrders(queryClient: QueryClient) {
  queryClient.invalidateQueries({ queryKey: ["customer-orders"] });
  queryClient.invalidateQueries({ queryKey: queryKeys.customer.overview });
  queryClient.invalidateQueries({ queryKey: queryKeys.customer.recentOrders });
  queryClient.invalidateQueries({ queryKey: queryKeys.customer.distribution });
  queryClient.invalidateQueries({ queryKey: queryKeys.customer.favoriteProduct });
}
