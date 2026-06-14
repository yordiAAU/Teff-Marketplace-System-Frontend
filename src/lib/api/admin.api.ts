import { api } from "./axios";
import type {
  AdminOverview,
  AdminUsersResponse,
  AdminUser,
  MarketPeriod,
  MarketStats,
  MarketTrendPoint,
  PlatformGrowthPoint,
  ProductType,
} from "@/types/api.types";
import { buildFormData as createFormData } from "@/lib/utils";

export interface AdminUsersParams {
  page?: number;
  pageSize?: number;
  role?: "customer" | "farmer" | "admin";
  search?: string;
  productTypeId?: string;
}

export interface AdminProductsParams {
  query?: string;
  page?: number;
  pageSize?: number;
}

export interface CreateProductTypeRequest {
  name: string;
  description: string;
  images: File[];
}

export interface UpdateProductTypeRequest {
  name: string;
  description: string;
}

export const adminApi = {
  getOverview: async (): Promise<AdminOverview> => {
    const { data } = await api.get<AdminOverview>("/api/admin/dashboard/overview");
    return data;
  },

  getMarketTrend: async (
    productTypeId: string,
    period: MarketPeriod
  ): Promise<MarketTrendPoint[]> => {
    const { data } = await api.get<MarketTrendPoint[]>("/api/admin/dashboard/market-trend", {
      params: { productTypeId, period },
    });
    return data;
  },

  getMarketStats: async (productTypeId: string): Promise<MarketStats> => {
    const { data } = await api.get<MarketStats>(
      `/api/admin/dashboard/market-stats/${productTypeId}`
    );
    return data;
  },

  getPlatformGrowth: async (): Promise<PlatformGrowthPoint[]> => {
    const { data } = await api.get<PlatformGrowthPoint[]>("/api/admin/dashboard/platform-growth");
    return data;
  },

  getRecentOrders: async (): Promise<unknown[]> => {
    const { data } = await api.get<unknown[]>("/api/admin/dashboard/recent-orders");
    return data;
  },

  getUsers: async (params: AdminUsersParams): Promise<AdminUsersResponse["data"]> => {
    const { data } = await api.get<AdminUsersResponse>("/api/admin/users", { params });
    return data.data;
  },

  getUser: async (id: string): Promise<AdminUser> => {
    const { data } = await api.get<{ success: boolean; data: AdminUser }>(`/api/admin/users/${id}`);
    return data.data;
  },

  getProducts: async (params?: AdminProductsParams): Promise<ProductType[]> => {
    const { data } = await api.get<ProductType[]>("/api/admin/products", { params });
    return data;
  },

  getProduct: async (id: string): Promise<ProductType> => {
    const { data } = await api.get<ProductType>(`/api/admin/products/${id}`);
    return data;
  },

  createProduct: async (payload: CreateProductTypeRequest): Promise<ProductType> => {
    const formData = createFormData(
      { name: payload.name, description: payload.description },
      [{ key: "images", files: payload.images }]
    );
    const { data } = await api.post<ProductType>("/api/admin/products", formData);
    return data;
  },

  updateProduct: async (id: string, payload: UpdateProductTypeRequest): Promise<ProductType> => {
    const { data } = await api.put<ProductType>(`/api/admin/products/${id}`, payload);
    return data;
  },

  deleteProduct: async (id: string): Promise<void> => {
    await api.delete(`/api/admin/products/${id}`);
  },
};
