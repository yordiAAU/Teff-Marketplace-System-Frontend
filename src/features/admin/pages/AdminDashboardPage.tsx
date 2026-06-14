import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { MarketTrendChart, useMarketTrendFilters } from "@/components/charts/MarketTrendChart";
import { PlatformGrowthChart } from "@/components/charts/PlatformGrowthChart";
import { CardSkeleton } from "@/components/skeletons";
import { PageState } from "@/components/common/PageState";
import {
  useAdminMarketStats,
  useAdminMarketTrend,
  useAdminOverview,
  useAdminPlatformGrowth,
} from "@/features/admin/hooks/useAdmin";
import { Users, Shield, ShoppingBag, Package } from "lucide-react";

export default function AdminDashboardPage() {
  const { productTypeId, period, setProductTypeId, setPeriod } = useMarketTrendFilters("today");

  const overview = useAdminOverview();
  const trend = useAdminMarketTrend(productTypeId, period);
  const stats = useAdminMarketStats(productTypeId);
  const growth = useAdminPlatformGrowth();

  const statCards = overview.data
    ? [
        { label: "Total Users", value: overview.data.totalUsers.toLocaleString(), icon: Users, bg: "bg-blue-50", color: "text-blue-600" },
        { label: "Verified Farmers", value: overview.data.verifiedFarmers.toLocaleString(), icon: Shield, bg: "bg-green-50", color: "text-green-600" },
        { label: "Total Orders", value: overview.data.totalOrders.toLocaleString(), icon: ShoppingBag, bg: "bg-primary/10", color: "text-primary" },
        { label: "Active Products", value: overview.data.activeProducts.toLocaleString(), icon: Package, bg: "bg-amber-50", color: "text-amber-600" },
      ]
    : [];

  return (
    <DashboardLayout role="admin">
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">System Overview</h1>
          <p className="text-slate-500">Platform-wide monitoring and market insights.</p>
        </div>

        {overview.isLoading ? (
          <CardSkeleton count={4} />
        ) : overview.isError ? (
          <PageState type="error" onRetry={() => overview.refetch()} />
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {statCards.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${stat.bg} ${stat.color}`}>
                  <stat.icon size={24} />
                </div>
                <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
              </div>
            ))}
          </div>
        )}

        <MarketTrendChart
          trendData={trend.data}
          stats={stats.data}
          isLoading={trend.isLoading || stats.isLoading}
          isError={trend.isError}
          onRetry={() => trend.refetch()}
          productTypeId={productTypeId}
          period={period}
          onProductTypeChange={setProductTypeId}
          onPeriodChange={setPeriod}
        />

        <PlatformGrowthChart
          data={growth.data}
          isLoading={growth.isLoading}
          isError={growth.isError}
          onRetry={() => growth.refetch()}
        />
      </div>
    </DashboardLayout>
  );
}
