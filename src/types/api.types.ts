export type UserRole = "admin" | "farmer" | "customer";
export type UserStatus = "active" | "suspended";
export type OrderStatus = "pending" | "approved" | "rejected" | "completed" | "cancelled";
export type ListingStatus = "active" | "inactive";
export type MarketPeriod = "today" | "week" | "month" | "year";

export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
}

export interface ApiErrorResponse {
  success?: false;
  message?: string;
  errors?: Record<string, string[] | string>;
}

export interface PaginationMeta {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
  phone: string;
  region: string;
  createdAt: string;
}

export interface UserSummary {
  id: string;
  fullName: string;
  email?: string;
  phone?: string;
  region?: string;
}

export interface AuthUser {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
  phone?: string;
  region?: string;
}

export interface LoginResponse {
  success: boolean;
  accessToken: string;
  user: AuthUser;
}

export interface RegisterResponse {
  success: boolean;
  accessToken: string;
  user: AuthUser;
}

export interface RefreshResponse {
  accessToken: string;
}

export interface MeResponse {
  success: boolean;
  data: UserProfile;
}

export interface ProductTypeImage {
  id?: string;
  imageUrl: string;
}

export interface ProductType {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  createdAt: string;
  images?: ProductTypeImage[];
}

export interface ProductTypeOption {
  id: string;
  name: string;
}

export interface ListingImage {
  id: string;
  listingId?: string;
  imageUrl: string;
}

export interface Listing {
  id: string;
  farmerId: string;
  productTypeId: string;
  quantity: number;
  unit: string;
  pricePerKg: number;
  description: string;
  location: string;
  status: ListingStatus;
  createdAt: string;
}

export interface FarmerListing extends Listing {
  productType: ProductType;
  images: ListingImage[];
}

export interface CustomerListing extends Listing {
  farmer: {
    id: string;
    fullName: string;
    region: string;
  };
  images: ListingImage[];
}

export interface CustomerListingDetail extends FarmerListing {
  farmer: {
    id: string;
    fullName: string;
    region: string;
  };
}

export interface CustomerProductTypeDetailResponse {
  productType: ProductType | null;
  listings: CustomerListing[];
  pagination: {
    total: number;
    page: number;
    pageSize: number;
    pages: number;
  };
}

export interface AdminOverview {
  totalUsers: number;
  verifiedFarmers: number;
  totalOrders: number;
  activeProducts: number;
}

export interface MarketTrendPoint {
  date: string;
  price: number;
}

export interface MarketStats {
  averagePrice: number;
  dailyHigh: number;
  dailyLow: number;
  range: number;
}

export interface PlatformGrowthPoint {
  month: string;
  users: number;
  orders: number;
}

export interface FarmerListingSummary {
  id: string;
  quantity: number;
  unit: string;
  pricePerKg: number;
  status: ListingStatus;
  description: string;
  productType: {
    id: string;
    name: string;
  };
}

export interface AdminUser {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  region: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
  farmerListings: FarmerListingSummary[];
}

export interface AdminUsersResponse {
  success: boolean;
  data: {
    users: AdminUser[];
    pagination: PaginationMeta;
  };
}

export interface FarmerOverview {
  totalRevenue: number;
  totalOrders: number;
  totalProducts: number;
  activeListings: number;
}

export interface FarmerRecentSale {
  id: string;
  quantity: number;
  totalPrice: number;
  status: OrderStatus;
  createdAt: string;
  customer: {
    id: string;
    fullName: string;
  };
  listing: {
    productType: {
      id: string;
      name: string;
    };
  };
}

export interface CustomerOverview {
  totalOrders: number;
  activeOrders: number;
  completedOrders: number;
  totalSpent: number;
}

export interface CustomerProductSummary {
  id: string;
  name: string;
  description: string;
  minPrice: number | null;
  maxPrice: number | null;
  previewImage: string | null;
}

export interface CustomerRecentOrder {
  id: string;
  status: OrderStatus;
  totalPrice: number;
  createdAt: string;
  listing: {
    productType: {
      id: string;
      name: string;
    };
  };
}

export interface OrderDistributionItem {
  productType: string;
  count: number;
  percent: number;
}

export interface Order {
  id: string;
  customerId: string;
  farmerId: string;
  listingId: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  status: OrderStatus;
  createdAt: string;
}

export interface FarmerOrder extends Order {
  listing: FarmerListing;
  customer: UserSummary;
}

export interface FarmerOrdersResponse {
  data: FarmerOrder[];
  pagination: {
    page: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
  };
}

export interface CustomerOrder extends Order {
  listing: FarmerListing;
  farmer: UserSummary;
}

export interface SpendingTrendPoint {
  month: string;
  amount: number;
}
