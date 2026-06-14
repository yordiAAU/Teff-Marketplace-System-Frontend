import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge, statusBadgeVariant } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TableSkeleton } from "@/components/skeletons";
import { PageState } from "@/components/common/PageState";
import { useFarmerOrders, useUpdateOrderStatus } from "@/features/farmer/hooks/useFarmer";
import { formatDate, formatEtb } from "@/lib/utils";
import type { OrderStatus } from "@/types/api.types";

const STATUS_FILTERS = ["All", "pending", "approved", "rejected", "completed", "cancelled"] as const;

export default function FarmerOrdersPage() {
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const orderParams = {
    page,
    pageSize: 10,
    query: search || undefined,
    status: statusFilter !== "All" ? (statusFilter as OrderStatus) : undefined,
  };

  const ordersQuery = useFarmerOrders(orderParams);
  const updateStatus = useUpdateOrderStatus(orderParams);

  const orders = ordersQuery.data?.data ?? [];
  const pagination = ordersQuery.data?.pagination;

  const statusCounts = useMemo(() => ({ All: pagination?.totalCount ?? orders.length }), [pagination, orders.length]);

  return (
    <DashboardLayout role="farmer">
      <div className="space-y-6">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Customer Orders</h1>
            <p className="text-slate-500">Manage orders received from your customers.</p>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <Input
              placeholder="Search orders..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="w-64 pl-10"
            />
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center gap-2 overflow-x-auto border-b border-slate-100 px-4 py-3">
            {STATUS_FILTERS.map((status) => (
              <Button
                key={status}
                type="button"
                size="sm"
                variant={statusFilter === status ? "secondary" : "outline"}
                onClick={() => { setStatusFilter(status); setPage(1); }}
                className="whitespace-nowrap capitalize"
              >
                {status}
                {status === "All" && <span className="ml-1 rounded-full bg-white/20 px-1.5 text-[10px]">{statusCounts.All}</span>}
              </Button>
            ))}
          </div>

          {ordersQuery.isLoading ? (
            <TableSkeleton rows={6} cols={7} />
          ) : ordersQuery.isError ? (
            <PageState type="error" onRetry={() => ordersQuery.refetch()} />
          ) : orders.length === 0 ? (
            <PageState type="empty" title="No orders found" />
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                    <tr>
                      <th className="px-6 py-4 font-bold">Customer</th>
                      <th className="px-6 py-4 font-bold">Product</th>
                      <th className="px-6 py-4 font-bold">quantity</th>
                      <th className="px-6 py-4 font-bold">unitPrice</th>
                      <th className="px-6 py-4 font-bold">totalPrice</th>
                      <th className="px-6 py-4 font-bold">status</th>
                      <th className="px-6 py-4 font-bold">createdAt</th>
                      <th className="px-6 py-4 font-bold text-right">Update</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {orders.map((order) => (
                      <tr key={order.id} className="hover:bg-slate-50">
                        <td className="px-6 py-4 text-sm font-medium">{order.customer.fullName}</td>
                        <td className="px-6 py-4 text-sm">{order.listing.productType.name}</td>
                        <td className="px-6 py-4 text-sm">{Number(order.quantity)}</td>
                        <td className="px-6 py-4 text-sm">{formatEtb(Number(order.unitPrice))}</td>
                        <td className="px-6 py-4 text-sm font-bold">{formatEtb(Number(order.totalPrice))}</td>
                        <td className="px-6 py-4"><Badge variant={statusBadgeVariant(order.status)}>{order.status}</Badge></td>
                        <td className="px-6 py-4 text-sm text-slate-500">{formatDate(order.createdAt)}</td>
                        <td className="px-6 py-4 text-right">
                          <Select
                            value={order.status}
                            onValueChange={(value) =>
                              updateStatus.mutate({ id: order.id, status: value as OrderStatus })
                            }
                          >
                            <SelectTrigger className="w-36"><SelectValue /></SelectTrigger>
                            <SelectContent>
                              {(["pending", "approved", "rejected", "completed", "cancelled"] as OrderStatus[]).map((s) => (
                                <SelectItem key={s} value={s} className="capitalize">{s}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {pagination && pagination.totalPages > 1 && (
                <div className="flex items-center justify-between border-t border-slate-100 px-6 py-4">
                  <p className="text-sm text-slate-500">Page {pagination.page} of {pagination.totalPages}</p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>Previous</Button>
                    <Button variant="outline" size="sm" disabled={page >= pagination.totalPages} onClick={() => setPage((p) => p + 1)}>Next</Button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
