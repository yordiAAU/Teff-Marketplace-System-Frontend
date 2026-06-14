import { api } from "./axios";
import { endpoints } from "./endpoints";
import type {
  CustomerListingDetail,
  CustomerOrder,
  CustomerOverview,
  CustomerProductSummary,
  CustomerProductTypeDetailResponse,
  CustomerRecentOrder,
  Order,
  OrderDistributionItem,
  OrderStatus,
  SpendingTrendPoint,
} from "@/types/api.types";

export interface CustomerMarketplaceParams {
  page?: number;
  pageSize?: number;
}

export interface CustomerProductTypeParams {
  page?: number;
  pageSize?: number;
  minPrice?: number;
  maxPrice?: number;
  location?: string;
  farmerName?: string;
  sort?: "price_asc" | "price_desc";
}

export interface CustomerOrdersParams {
  query?: string;
  status?: OrderStatus;
  page?: number;
  pageSize?: number;
}

export interface PlaceOrderRequest {
  listingId: string;
  quantity: number;
}

export const customerApi = {
  getOverview: async (): Promise<CustomerOverview> => {
    const { data } = await api.get<CustomerOverview>(endpoints.customer.dashboardOverview());
    return data;
  },

  getSpendingTrend: async (): Promise<SpendingTrendPoint[]> => {
    const { data } = await api.get<SpendingTrendPoint[]>(endpoints.customer.dashboardSpendingTrend());
    return data;
  },

  getRecentOrders: async (): Promise<CustomerRecentOrder[]> => {
    const { data } = await api.get<CustomerRecentOrder[]>(endpoints.customer.dashboardRecentOrders());
    return data;
  },

  getDistribution: async (): Promise<OrderDistributionItem[]> => {
    const { data } = await api.get<OrderDistributionItem[]>(endpoints.customer.dashboardDistribution());
    return data;
  },

  getFavoriteProduct: async (): Promise<OrderDistributionItem | null> => {
    const { data } = await api.get<OrderDistributionItem | null>(
      endpoints.customer.dashboardFavoriteProduct()
    );
    return data;
  },

  getProductTypes: async (params?: CustomerMarketplaceParams): Promise<CustomerProductSummary[]> => {
    const { data } = await api.get<CustomerProductSummary[]>(endpoints.customer.products(), { params });
    return data;
  },

  getProductTypeDetail: async (
    productTypeId: string,
    params?: CustomerProductTypeParams
  ): Promise<CustomerProductTypeDetailResponse> => {
    const { data } = await api.get<CustomerProductTypeDetailResponse>(
      endpoints.customer.productType(productTypeId),
      { params }
    );
    return data;
  },

  getListingDetail: async (
    productId: string,
    farmerId: string
  ): Promise<CustomerListingDetail | null> => {
    const { data } = await api.get<CustomerListingDetail | null>(
      endpoints.customer.listingDetail(productId, farmerId)
    );
    return data;
  },

  getOrders: async (params?: CustomerOrdersParams): Promise<CustomerOrder[]> => {
    const { data } = await api.get<CustomerOrder[]>(endpoints.customer.orders(), { params });
    return data;
  },

  placeOrder: async (payload: PlaceOrderRequest): Promise<Order> => {
    const { data } = await api.post<Order>(endpoints.customer.orders(), payload);
    return data;
  },
};
