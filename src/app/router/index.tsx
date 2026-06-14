import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { ProtectedRoute } from "./ProtectedRoute";
import { RoleBasedRoute } from "./RoleBasedRoute";

const HomePage = lazy(() => import("@/pages/Home"));
const LoginPage = lazy(() => import("@/features/auth/pages/LoginPage"));
const RegisterPage = lazy(() => import("@/features/auth/pages/RegisterPage"));
const NotFoundPage = lazy(() => import("@/pages/NotFound"));

const AdminDashboardPage = lazy(() => import("@/features/admin/pages/AdminDashboardPage"));
const AdminUsersPage = lazy(() => import("@/features/admin/pages/AdminUsersPage"));
const AdminProductsPage = lazy(() => import("@/features/admin/pages/AdminProductsPage"));

const FarmerDashboardPage = lazy(() => import("@/features/farmer/pages/FarmerDashboardPage"));
const FarmerProductsPage = lazy(() => import("@/features/farmer/pages/FarmerProductsPage"));
const FarmerAddProductPage = lazy(() => import("@/features/farmer/pages/FarmerAddProductPage"));
const FarmerOrdersPage = lazy(() => import("@/features/farmer/pages/FarmerOrdersPage"));

const CustomerDashboardPage = lazy(() => import("@/features/customer/pages/CustomerDashboardPage"));
const CustomerMarketplacePage = lazy(() => import("@/features/customer/pages/CustomerMarketplacePage"));
const CustomerProductTypePage = lazy(() => import("@/features/customer/pages/CustomerProductTypePage"));
const CustomerListingDetailPage = lazy(() => import("@/features/customer/pages/CustomerListingDetailPage"));
const CustomerOrdersPage = lazy(() => import("@/features/customer/pages/CustomerOrdersPage"));

const ProfilePage = lazy(() => import("@/features/profile/pages/ProfilePage"));

function PageLoader() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <Skeleton className="h-32 w-64" />
    </div>
  );
}

export function AppRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<RoleBasedRoute allowedRoles={["admin"]} />}>
              <Route path="dashboard" element={<AdminDashboardPage />} />
              <Route path="users" element={<AdminUsersPage />} />
              <Route path="products" element={<AdminProductsPage />} />
              <Route path="profile" element={<ProfilePage role="admin" />} />
            </Route>

            <Route path="/farmer" element={<RoleBasedRoute allowedRoles={["farmer"]} />}>
              <Route path="dashboard" element={<FarmerDashboardPage />} />
              <Route path="products" element={<FarmerProductsPage />} />
              <Route path="products/add" element={<FarmerAddProductPage />} />
              <Route path="orders" element={<FarmerOrdersPage />} />
              <Route path="profile" element={<ProfilePage role="farmer" />} />
            </Route>

            <Route path="/customer" element={<RoleBasedRoute allowedRoles={["customer"]} />}>
              <Route path="dashboard" element={<CustomerDashboardPage />} />
              <Route path="marketplace" element={<CustomerMarketplacePage />} />
              <Route path="products/:productTypeId" element={<CustomerProductTypePage />} />
              <Route path="products/:productId/farmer/:farmerId" element={<CustomerListingDetailPage />} />
              <Route path="orders" element={<CustomerOrdersPage />} />
              <Route path="profile" element={<ProfilePage role="customer" />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
