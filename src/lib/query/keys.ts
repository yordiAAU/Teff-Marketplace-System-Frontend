export const queryKeys = {
  auth: {
    me: ["auth", "me"] as const,
  },
  productTypes: {
    all: ["product-types"] as const,
  },
  admin: {
    overview: ["admin", "overview"] as const,
    marketTrend: (productTypeId: string, period: string) =>
      ["admin", "market-trend", productTypeId, period] as const,
    marketStats: (productTypeId: string) =>
      ["admin", "market-stats", productTypeId] as const,
    platformGrowth: ["admin", "platform-growth"] as const,
    recentOrders: ["admin", "recent-orders"] as const,
    products: (params?: Record<string, unknown>) =>
      ["admin-products", params] as const,
    product: (id: string) => ["admin-product", id] as const,
    users: (params?: Record<string, unknown>) =>
      ["admin-users", params] as const,
    user: (id: string) => ["admin-user", id] as const,
  },
  farmer: {
    overview: ["farmer", "overview"] as const,
    marketTrend: (productTypeId: string, period: string) =>
      ["farmer", "market-trend", productTypeId, period] as const,
    marketStats: (productTypeId: string) =>
      ["farmer", "market-stats", productTypeId] as const,
    recentSales: ["farmer", "recent-sales"] as const,
    listings: ["farmer-listings"] as const,
    orders: (params?: Record<string, unknown>) =>
      ["farmer-orders", params] as const,
  },
  customer: {
    overview: ["customer", "overview"] as const,
    spendingTrend: ["customer", "spending-trend"] as const,
    recentOrders: ["customer", "recent-orders"] as const,
    distribution: ["customer", "distribution"] as const,
    favoriteProduct: ["customer", "favorite-product"] as const,
    marketplace: (params?: Record<string, unknown>) =>
      ["customer-marketplace", params] as const,
    productType: (productTypeId: string, params?: Record<string, unknown>) =>
      ["customer-product-type", productTypeId, params] as const,
    listingDetail: (productId: string, farmerId: string) =>
      ["customer-listing-detail", productId, farmerId] as const,
    orders: (params?: Record<string, unknown>) =>
      ["customer-orders", params] as const,
  },
} as const;

/** Cache TTL values (milliseconds) */
export const STALE_TIME = {
  profile: 30 * 60 * 1000,
  productTypes: 24 * 60 * 60 * 1000,
  marketplace: 10 * 60 * 1000,
  productDetails: 10 * 60 * 1000,
  farmerListings: 5 * 60 * 1000,
  orders: 5 * 60 * 1000,
  dashboards: 5 * 60 * 1000,
} as const;

export const GC_TIME = 30 * 60 * 1000;

/** @deprecated use STALE_TIME.dashboards */
export const PRODUCT_TYPES_STALE_TIME = STALE_TIME.productTypes;
