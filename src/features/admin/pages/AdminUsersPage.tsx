import { useState } from "react";
import { Search, Eye, Mail, Shield } from "lucide-react";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TableSkeleton } from "@/components/skeletons";
import { PageState } from "@/components/common/PageState";
import { useAdminUsers } from "@/features/admin/hooks/useAdmin";
import { useProductTypes } from "@/hooks/useProductTypes";
import { formatDate, capitalize } from "@/lib/utils";
import type { AdminUser } from "@/types/api.types";

type UserTab = "customer" | "farmer";

export default function AdminUsersPage() {
  const [activeTab, setActiveTab] = useState<UserTab>("customer");
  const [search, setSearch] = useState("");
  const [productTypeId, setProductTypeId] = useState<string>("all");
  const [page, setPage] = useState(1);
  const [selectedFarmer, setSelectedFarmer] = useState<AdminUser | null>(null);

  const { data: productTypes } = useProductTypes();

  const usersQuery = useAdminUsers({
    page,
    pageSize: 10,
    role: activeTab,
    search: search || undefined,
    productTypeId: activeTab === "farmer" && productTypeId !== "all" ? productTypeId : undefined,
  });

  const users = usersQuery.data?.users ?? [];
  const pagination = usersQuery.data?.pagination;

  return (
    <DashboardLayout role="admin">
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">User Management</h1>
          <p className="text-slate-500">Manage all platform users and their permissions.</p>
        </div>

        <div className="flex gap-2">
          <Button
            variant={activeTab === "customer" ? "secondary" : "outline"}
            onClick={() => { setActiveTab("customer"); setPage(1); }}
          >
            <Mail size={16} /> Customers
          </Button>
          <Button
            variant={activeTab === "farmer" ? "default" : "outline"}
            onClick={() => { setActiveTab("farmer"); setPage(1); }}
          >
            <Shield size={16} /> Farmers
          </Button>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-4 border-b border-slate-100 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative max-w-md flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <Input
                placeholder="Search by name or email..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                className="pl-10"
              />
            </div>
            {activeTab === "farmer" && (
              <Select value={productTypeId} onValueChange={(v) => { setProductTypeId(v); setPage(1); }}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by product" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Products</SelectItem>
                  {productTypes?.map((p) => (
                    <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>

          {usersQuery.isLoading ? (
            <TableSkeleton rows={6} cols={activeTab === "farmer" ? 6 : 5} />
          ) : usersQuery.isError ? (
            <PageState type="error" onRetry={() => usersQuery.refetch()} />
          ) : users.length === 0 ? (
            <PageState type="empty" title="No users found" />
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                    <tr>
                      <th className="px-6 py-4 font-bold">Full Name</th>
                      <th className="px-6 py-4 font-bold">Email</th>
                      <th className="px-6 py-4 font-bold">Phone</th>
                      <th className="px-6 py-4 font-bold">Region</th>
                      <th className="px-6 py-4 font-bold">Status</th>
                      <th className="px-6 py-4 font-bold">Created</th>
                      {activeTab === "farmer" && <th className="px-6 py-4 font-bold text-right">Actions</th>}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {users.map((user) => (
                      <tr key={user.id} className="transition-colors hover:bg-slate-50">
                        <td className="px-6 py-4 text-sm font-bold text-slate-900">{user.fullName}</td>
                        <td className="px-6 py-4 text-sm text-slate-600">{user.email}</td>
                        <td className="px-6 py-4 text-sm text-slate-600">{user.phone}</td>
                        <td className="px-6 py-4 text-sm text-slate-600">{user.region}</td>
                        <td className="px-6 py-4">
                          <Badge variant={statusBadgeVariant(user.status)}>{capitalize(user.status)}</Badge>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-500">{formatDate(user.createdAt)}</td>
                        {activeTab === "farmer" && (
                          <td className="px-6 py-4 text-right">
                            <button
                              type="button"
                              onClick={() => setSelectedFarmer(user)}
                              className="rounded-lg p-2 text-blue-500 transition-colors hover:bg-blue-50"
                            >
                              <Eye size={18} />
                            </button>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {pagination && pagination.totalPages > 1 && (
                <div className="flex items-center justify-between border-t border-slate-100 px-6 py-4">
                  <p className="text-sm text-slate-500">
                    Page {pagination.page} of {pagination.totalPages} ({pagination.total} total)
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
                      Previous
                    </Button>
                    <Button variant="outline" size="sm" disabled={page >= pagination.totalPages} onClick={() => setPage((p) => p + 1)}>
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <Dialog open={!!selectedFarmer} onOpenChange={() => setSelectedFarmer(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Farmer Details</DialogTitle>
          </DialogHeader>
          {selectedFarmer && (
            <div className="space-y-4">
              <div>
                <p className="font-bold text-slate-900">{selectedFarmer.fullName}</p>
                <p className="text-sm text-slate-500">{selectedFarmer.email}</p>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><span className="text-slate-400">Phone:</span> {selectedFarmer.phone}</div>
                <div><span className="text-slate-400">Region:</span> {selectedFarmer.region}</div>
              </div>
              <div>
                <p className="mb-2 text-sm font-bold text-slate-900">Product Listings ({selectedFarmer.farmerListings.length})</p>
                {selectedFarmer.farmerListings.length === 0 ? (
                  <p className="text-sm text-slate-400">No listings</p>
                ) : (
                  <div className="space-y-2">
                    {selectedFarmer.farmerListings.map((listing) => (
                      <div key={listing.id} className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 p-3">
                        <div>
                          <p className="text-sm font-medium">{listing.productType.name}</p>
                          <p className="text-xs text-slate-500">{listing.quantity} {listing.unit} · ${listing.pricePerKg}/kg</p>
                        </div>
                        <Badge variant={statusBadgeVariant(listing.status)}>{listing.status}</Badge>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
