import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { adminApi } from "@/lib/api";
import type { AdminProductsParams, AdminUsersParams, CreateProductTypeRequest, UpdateProductTypeRequest } from "@/lib/api/admin.api";
import { handleApiError } from "@/lib/api/axios";
import { queryKeys } from "@/lib/query/keys";
import type { MarketPeriod } from "@/types/api.types";

export function useAdminOverview() {
  return useQuery({
    queryKey: queryKeys.admin.overview,
    queryFn: adminApi.getOverview,
  });
}

export function useAdminMarketTrend(productTypeId: string, period: MarketPeriod) {
  return useQuery({
    queryKey: queryKeys.admin.marketTrend(productTypeId, period),
    queryFn: () => adminApi.getMarketTrend(productTypeId, period),
    enabled: !!productTypeId,
  });
}

export function useAdminMarketStats(productTypeId: string) {
  return useQuery({
    queryKey: queryKeys.admin.marketStats(productTypeId),
    queryFn: () => adminApi.getMarketStats(productTypeId),
    enabled: !!productTypeId,
  });
}

export function useAdminPlatformGrowth() {
  return useQuery({
    queryKey: queryKeys.admin.platformGrowth,
    queryFn: adminApi.getPlatformGrowth,
  });
}

export function useAdminUsers(params: AdminUsersParams) {
  return useQuery({
    queryKey: queryKeys.admin.users(params),
    queryFn: () => adminApi.getUsers(params),
  });
}

export function useAdminUser(id: string) {
  return useQuery({
    queryKey: queryKeys.admin.user(id),
    queryFn: () => adminApi.getUser(id),
    enabled: !!id,
  });
}

export function useAdminProducts(params?: AdminProductsParams) {
  return useQuery({
    queryKey: queryKeys.admin.products(params),
    queryFn: () => adminApi.getProducts(params),
  });
}

export function useCreateAdminProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateProductTypeRequest) => adminApi.createProduct(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      queryClient.invalidateQueries({ queryKey: queryKeys.productTypes.all });
      toast.success("Product type created");
    },
    onError: (error) => handleApiError(error, "Failed to create product"),
  });
}

export function useUpdateAdminProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateProductTypeRequest }) =>
      adminApi.updateProduct(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      toast.success("Product updated");
    },
    onError: (error) => handleApiError(error, "Failed to update product"),
  });
}

export function useDeleteAdminProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: adminApi.deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      toast.success("Product deleted");
    },
    onError: (error) => handleApiError(error, "Failed to delete product"),
  });
}
