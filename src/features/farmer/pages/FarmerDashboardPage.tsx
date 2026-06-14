import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { MarketTrendChart, useMarketTrendFilters } from "@/components/charts/MarketTrendChart";
import { CardSkeleton, TableSkeleton } from "@/components/skeletons";
import { PageState } from "@/components/common/PageState";
import { Button } from "@/components/ui/button";

import {
  useFarmerMarketStats,
  useFarmerMarketTrend,
  useFarmerOverview,
  useFarmerRecentSales,
} from "@/features/farmer/hooks/useFarmer";
import { formatDate, formatEtb } from "@/lib/utils";
import { BarChart3, Package, DollarSign, ShoppingCart } from "lucide-react";

export default function FarmerDashboardPage() {
  const navigate = useNavigate();
  const { productTypeId, period, setProductTypeId, setPeriod } = useMarketTrendFilters("today");

  const overview = useFarmerOverview();
  const trend = useFarmerMarketTrend(productTypeId, period);
  const stats = useFarmerMarketStats(productTypeId);
  const recentSales = useFarmerRecentSales();

  const statCards = overview.data
    ? [
        { label: "Total Revenue", value: formatEtb(Number(overview.data.totalRevenue)), icon: DollarSign, color: "bg-green-500" },
        { label: "Total Orders", value: overview.data.totalOrders.toString(), icon: ShoppingCart, color: "bg-blue-500" },
        { label: "Total Products", value: overview.data.totalProducts.toString(), icon: Package, color: "bg-primary" },
        { label: "Active Listings", value: overview.data.activeListings.toString(), icon: BarChart3, color: "bg-amber-500" },
      ]
    : [];

  return (
    <DashboardLayout role="farmer">
      <div className="space-y-8">
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Farmer Dashboard</h1>
            <p className="text-slate-500">Track market prices and manage your harvest.</p>
          </div>
          <Button onClick={() => navigate("/farmer/products/add")}>Add Listing</Button>
        </div>

        {overview.isLoading ? (
          <CardSkeleton count={4} />
        ) : overview.isError ? (
          <PageState type="error" onRetry={() => overview.refetch()} />
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {statCards.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${stat.color} text-white`}>
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

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 p-6">
            <h3 className="font-bold text-slate-900">Recent Sales</h3>
            <Button variant="ghost" size="sm" onClick={() => navigate("/farmer/orders")}>View All</Button>
          </div>
          {recentSales.isLoading ? (
            <TableSkeleton rows={4} cols={5} />
          ) : recentSales.isError ? (
            <PageState type="error" onRetry={() => recentSales.refetch()} />
          ) : !recentSales.data?.length ? (
            <PageState type="empty" title="No recent sales" />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                  <tr>
                    <th className="px-6 py-4 font-bold">Customer</th>
                    <th className="px-6 py-4 font-bold">Product</th>
                    <th className="px-6 py-4 font-bold">quantity</th>
                    <th className="px-6 py-4 font-bold">totalPrice</th>
                    <th className="px-6 py-4 font-bold">createdAt</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {recentSales.data.map((order) => (
                    <tr key={order.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 text-sm">{order.customer.fullName}</td>
                      <td className="px-6 py-4 text-sm">{order.listing.productType.name}</td>
                      <td className="px-6 py-4 text-sm">{Number(order.quantity)}</td>
                      <td className="px-6 py-4 text-sm font-bold">{formatEtb(Number(order.totalPrice))}</td>
                      <td className="px-6 py-4 text-sm text-slate-500">{formatDate(order.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
