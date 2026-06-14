import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Eye } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PageBackNav } from "@/components/common/PageBackNav";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ListingCardSkeleton } from "@/components/skeletons/ProductSkeletons";
import { DetailSkeleton } from "@/components/skeletons";
import { PageState } from "@/components/common/PageState";
import { useCustomerProductType } from "@/features/customer/hooks/useCustomer";
import type { CustomerProductTypeParams } from "@/lib/api/customer.api";
import { formatDate, formatEtb } from "@/lib/utils";

export default function CustomerProductTypePage() {
  const { productTypeId = "" } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [location, setLocation] = useState(searchParams.get("location") ?? "");
  const [farmerName, setFarmerName] = useState(searchParams.get("farmerName") ?? "");
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") ?? "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") ?? "");
  const [sort, setSort] = useState<"price_asc" | "price_desc" | "">(
    (searchParams.get("sort") as "price_asc" | "price_desc") ?? ""
  );
  const page = Number(searchParams.get("page") ?? "1");

  const queryParams: CustomerProductTypeParams = useMemo(() => ({
    page,
    pageSize: 10,
    location: location || undefined,
    farmerName: farmerName || undefined,
    minPrice: minPrice ? Number(minPrice) : undefined,
    maxPrice: maxPrice ? Number(maxPrice) : undefined,
    sort: sort || undefined,
  }), [page, location, farmerName, minPrice, maxPrice, sort]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (location) params.set("location", location);
    if (farmerName) params.set("farmerName", farmerName);
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);
    if (sort) params.set("sort", sort);
    if (page > 1) params.set("page", String(page));
    setSearchParams(params, { replace: true });
  }, [location, farmerName, minPrice, maxPrice, sort, page, setSearchParams]);

  const detailQuery = useCustomerProductType(productTypeId, queryParams);
  const { productType, listings, pagination } = detailQuery.data ?? {
    productType: null,
    listings: [],
    pagination: { total: 0, page: 1, pageSize: 10, pages: 0 },
  };

  const applyFilters = () => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("page", "1");
      return next;
    });
    detailQuery.refetch();
  };

  return (
    <DashboardLayout role="customer">
      <div className="space-y-8">
        <PageBackNav label="Back to Marketplace" to="/customer/marketplace" />

        {detailQuery.isLoading ? (
          <DetailSkeleton />
        ) : detailQuery.isError ? (
          <PageState type="error" onRetry={() => detailQuery.refetch()} />
        ) : !productType ? (
          <PageState type="empty" title="Product type not found" />
        ) : (
          <>
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="grid gap-6 p-6 md:grid-cols-[200px_1fr]">
                <div className="flex h-40 items-center justify-center rounded-xl bg-primary/10 font-bold text-primary md:h-full">
                  {productType.name}
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-slate-900">{productType.name}</h1>
                  <p className="mt-2 text-slate-500">{productType.description}</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="mb-4 font-bold text-slate-900">Filters</h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                <div><Label>location</Label><Input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Search location" /></div>
                <div><Label>farmerName</Label><Input value={farmerName} onChange={(e) => setFarmerName(e.target.value)} placeholder="Search farmer" /></div>
                <div><Label>minPrice</Label><Input type="number" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} /></div>
                <div><Label>maxPrice</Label><Input type="number" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} /></div>
                <div>
                  <Label>sort</Label>
                  <Select value={sort || "none"} onValueChange={(v) => setSort(v === "none" ? "" : (v as "price_asc" | "price_desc"))}>
                    <SelectTrigger><SelectValue placeholder="Sort" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Default</SelectItem>
                      <SelectItem value="price_asc">Lowest Price</SelectItem>
                      <SelectItem value="price_desc">Highest Price</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button className="mt-4" onClick={applyFilters}>Apply Filters</Button>
            </div>

            {detailQuery.isFetching && !detailQuery.isLoading ? (
              <ListingCardSkeleton count={2} />
            ) : listings.length === 0 ? (
              <PageState type="empty" title="No listings found" message="Try adjusting your filters." />
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {listings.map((listing) => (
                  <button
                    key={listing.id}
                    type="button"
                    onClick={() =>
                      navigate(`/customer/products/${listing.id}/farmer/${listing.farmer.id}`, {
                        state: { productTypeId },
                      })
                    }
                    className="overflow-hidden rounded-2xl border border-slate-200 bg-white text-left shadow-sm transition-all hover:border-primary/30 hover:shadow-md"
                  >
                    <div className="flex gap-4 p-4">
                      {listing.images[0]?.imageUrl ? (
                        <img src={listing.images[0].imageUrl} alt="" className="h-24 w-24 rounded-xl object-cover" />
                      ) : (
                        <div className="flex h-24 w-24 items-center justify-center rounded-xl bg-slate-100 text-xs text-slate-400">No image</div>
                      )}
                      <div className="flex-1 space-y-1">
                        <p className="font-bold text-slate-900">{listing.farmer.fullName}</p>
                        <p className="text-sm text-slate-500">{listing.farmer.region}</p>
                        <p className="text-sm text-slate-500">{Number(listing.quantity)} {listing.unit} available</p>
                        <p className="font-bold text-secondary">{formatEtb(Number(listing.pricePerKg))}/kg</p>
                        <p className="line-clamp-2 text-xs text-slate-400">{listing.description}</p>
                        <p className="text-xs text-slate-400">{formatDate(listing.createdAt)}</p>
                        <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary">
                          <Eye size={14} /> View Details
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {pagination.pages > 1 && (
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-500">Page {pagination.page} of {pagination.pages}</p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setSearchParams((p) => { p.set("page", String(page - 1)); return p; })}>Previous</Button>
                  <Button variant="outline" size="sm" disabled={page >= pagination.pages} onClick={() => setSearchParams((p) => { p.set("page", String(page + 1)); return p; })}>Next</Button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
