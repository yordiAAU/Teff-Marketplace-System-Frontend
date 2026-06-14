import { useState } from "react";
import { Search } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge, statusBadgeVariant } from "@/components/ui/badge";
import { TableSkeleton } from "@/components/skeletons";
import { PageState } from "@/components/common/PageState";
import { useCustomerOrders } from "@/features/customer/hooks/useCustomer";
import { formatDate, formatEtb } from "@/lib/utils";
import type { OrderStatus } from "@/types/api.types";

const STATUS_FILTERS = ["All", "pending", "approved", "rejected", "completed", "cancelled"] as const;

export default function CustomerOrdersPage() {
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [search, setSearch] = useState("");

  const ordersQuery = useCustomerOrders({
    query: search || undefined,
    status: statusFilter !== "All" ? (statusFilter as OrderStatus) : undefined,
  });

  const orders = ordersQuery.data ?? [];

  return (
    <DashboardLayout role="customer">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">My Orders</h1>
          <p className="text-slate-500">Track your order history.</p>
        </div>

        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <Input placeholder="Search orders..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex gap-2 overflow-x-auto border-b border-slate-100 px-4 py-3">
            {STATUS_FILTERS.map((status) => (
              <Button
                key={status}
                size="sm"
                variant={statusFilter === status ? "secondary" : "outline"}
                onClick={() => setStatusFilter(status)}
                className="whitespace-nowrap capitalize"
              >
                {status}
              </Button>
            ))}
          </div>

          {ordersQuery.isLoading ? (
            <TableSkeleton rows={6} cols={6} />
          ) : ordersQuery.isError ? (
            <PageState type="error" onRetry={() => ordersQuery.refetch()} />
          ) : orders.length === 0 ? (
            <PageState type="empty" title="No orders found" />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                  <tr>
                    <th className="px-6 py-4 font-bold">productType</th>
                    <th className="px-6 py-4 font-bold">farmer</th>
                    <th className="px-6 py-4 font-bold">quantity</th>
                    <th className="px-6 py-4 font-bold">unitPrice</th>
                    <th className="px-6 py-4 font-bold">totalPrice</th>
                    <th className="px-6 py-4 font-bold">status</th>
                    <th className="px-6 py-4 font-bold">createdAt</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 text-sm font-medium">{order.listing.productType.name}</td>
                      <td className="px-6 py-4 text-sm">{order.farmer.fullName}</td>
                      <td className="px-6 py-4 text-sm">{Number(order.quantity)}</td>
                      <td className="px-6 py-4 text-sm">{formatEtb(Number(order.unitPrice))}</td>
                      <td className="px-6 py-4 text-sm font-bold">{formatEtb(Number(order.totalPrice))}</td>
                      <td className="px-6 py-4"><Badge variant={statusBadgeVariant(order.status)}>{order.status}</Badge></td>
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
