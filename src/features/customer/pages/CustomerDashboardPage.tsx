import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { CardSkeleton, ChartSkeleton, TableSkeleton } from "@/components/skeletons";
import { PageState } from "@/components/common/PageState";
import {
  useCustomerDistribution,
  useCustomerFavoriteProduct,
  useCustomerOverview,
  useCustomerRecentOrders,
  useCustomerSpendingTrend,
} from "@/features/customer/hooks/useCustomer";
import { formatEtb } from "@/lib/utils";
import { ShoppingBag, Package, DollarSign, Star } from "lucide-react";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import { formatDate } from "@/lib/utils";
import { Badge, statusBadgeVariant } from "@/components/ui/badge";

const PIE_COLORS = ["#EBBE7C", "#8B4E24", "#CBD5E1", "#94A3B8", "#64748B"];

export default function CustomerDashboardPage() {
  const overview = useCustomerOverview();
  const spending = useCustomerSpendingTrend();
  const recentOrders = useCustomerRecentOrders();
  const distribution = useCustomerDistribution();
  const favoriteProduct = useCustomerFavoriteProduct();

  const statCards = overview.data
    ? [
        { label: "Total Orders", value: overview.data.totalOrders.toString(), icon: ShoppingBag },
        { label: "Active Orders", value: overview.data.activeOrders.toString(), icon: Package },
        { label: "Completed Orders", value: overview.data.completedOrders.toString(), icon: Package },
        { label: "Total Spent", value: formatEtb(Number(overview.data.totalSpent)), icon: DollarSign },
      ]
    : [];

  return (
    <DashboardLayout role="customer">
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Customer Dashboard</h1>
          <p className="text-slate-500">Track your orders and spending.</p>
        </div>

        {overview.isLoading ? (
          <CardSkeleton count={4} />
        ) : overview.isError ? (
          <PageState type="error" onRetry={() => overview.refetch()} />
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {statCards.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <stat.icon className="mb-4 text-primary" size={24} />
                <p className="text-sm text-slate-500">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            ))}
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-2">
          {spending.isLoading ? (
            <ChartSkeleton />
          ) : spending.isError ? (
            <PageState type="error" onRetry={() => spending.refetch()} />
          ) : spending.data && spending.data.length > 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="mb-4 font-bold">Spending Trend</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={spending.data}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Tooltip formatter={(v: number) => [formatEtb(v), "amount"]} />
                    <Line type="monotone" dataKey="amount" stroke="#8B4E24" strokeWidth={3} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          ) : (
            <PageState type="empty" title="No spending data" />
          )}

          {distribution.isLoading ? (
            <ChartSkeleton />
          ) : distribution.isError ? (
            <PageState type="error" onRetry={() => distribution.refetch()} />
          ) : !distribution.data?.length ? (
            <PageState type="empty" title="No order distribution" />
          ) : (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="mb-4 font-bold">Order Distribution</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={distribution.data} dataKey="count" nameKey="productType" cx="50%" cy="50%" outerRadius={90} label={({ productType, percent }) => `${productType} ${percent}%`}>
                      {distribution.data.map((_, i) => (
                        <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>

        {favoriteProduct.isLoading ? (
          <CardSkeleton count={1} />
        ) : favoriteProduct.data ? (
          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
            <div className="flex items-center gap-3">
              <Star className="text-primary" size={24} />
              <div>
                <p className="text-sm text-slate-500">Favorite Product</p>
                <p className="text-xl font-bold text-slate-900">{favoriteProduct.data.productType}</p>
                <p className="text-sm text-slate-600">{favoriteProduct.data.count} orders ({favoriteProduct.data.percent}%)</p>
              </div>
            </div>
          </div>
        ) : null}

        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 p-6">
            <h3 className="font-bold">Recent Orders</h3>
          </div>
          {recentOrders.isLoading ? (
            <TableSkeleton rows={4} cols={4} />
          ) : recentOrders.isError ? (
            <PageState type="error" onRetry={() => recentOrders.refetch()} />
          ) : !recentOrders.data?.length ? (
            <PageState type="empty" title="No orders yet" />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                  <tr>
                    <th className="px-6 py-4 font-bold">productType</th>
                    <th className="px-6 py-4 font-bold">status</th>
                    <th className="px-6 py-4 font-bold">totalPrice</th>
                    <th className="px-6 py-4 font-bold">createdAt</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {recentOrders.data.map((order) => (
                    <tr key={order.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 text-sm font-medium">{order.listing.productType.name}</td>
                      <td className="px-6 py-4"><Badge variant={statusBadgeVariant(order.status)}>{order.status}</Badge></td>
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
