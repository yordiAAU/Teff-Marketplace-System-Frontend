/**
 * Centralized endpoint builder.
 * Prevents double slashes and trailing slashes in API paths.
 */
export function buildPath(...segments: (string | number | undefined | null | false)[]): string {
  const cleaned = segments
    .filter((segment) => segment !== undefined && segment !== null && segment !== false && segment !== "")
    .map((segment) => String(segment).replace(/^\/+|\/+$/g, ""))
    .filter(Boolean);

  return `/${cleaned.join("/")}`;
}

export const endpoints = {
  auth: {
    register: () => buildPath("api", "auth", "register"),
    login: () => buildPath("api", "auth", "login"),
    logout: () => buildPath("api", "auth", "logout"),
    refresh: () => buildPath("api", "auth", "refresh"),
    me: () => buildPath("api", "auth", "me"),
  },
  farmer: {
    productTypes: () => buildPath("api", "farmer", "products", "product-types"),
    listings: () => buildPath("api", "farmer", "products", "my"),
    createListing: () => buildPath("api", "farmer", "products"),
    listing: (id: string) => buildPath("api", "farmer", "products", id),
    orders: () => buildPath("api", "farmer", "orders"),
    orderStatus: (id: string) => buildPath("api", "farmer", "orders", id, "status"),
    dashboardOverview: () => buildPath("api", "farmer", "dashboard", "overview"),
    dashboardTrend: () => buildPath("api", "farmer", "dashboard", "trend"),
    dashboardStats: (productTypeId: string) =>
      buildPath("api", "farmer", "dashboard", "stats", productTypeId),
    dashboardRecentSales: () => buildPath("api", "farmer", "dashboard", "recent-sales"),
  },
  customer: {
    products: () => buildPath("api", "customer", "products"),
    productType: (productTypeId: string) => buildPath("api", "customer", "products", productTypeId),
    listingDetail: (productId: string, farmerId: string) =>
      buildPath("api", "customer", "products", productId, "farmer", farmerId),
    orders: () => buildPath("api", "customer", "orders"),
    dashboardOverview: () => buildPath("api", "customer", "dashboard", "overview"),
    dashboardSpendingTrend: () => buildPath("api", "customer", "dashboard", "spending-trend"),
    dashboardRecentOrders: () => buildPath("api", "customer", "dashboard", "recent-orders"),
    dashboardDistribution: () => buildPath("api", "customer", "dashboard", "distribution"),
    dashboardFavoriteProduct: () => buildPath("api", "customer", "dashboard", "favorite-product"),
  },
} as const;
