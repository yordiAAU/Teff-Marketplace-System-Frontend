import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Input } from "@/components/ui/input";
import { ProductCardSkeleton } from "@/components/skeletons/ProductSkeletons";
import { PageState } from "@/components/common/PageState";
import { useCustomerMarketplace } from "@/features/customer/hooks/useCustomer";
import { formatEtb } from "@/lib/utils";

export default function CustomerMarketplacePage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const productsQuery = useCustomerMarketplace({ page: 1, pageSize: 20 });

  const products = (productsQuery.data ?? []).filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout role="customer">
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Marketplace</h1>
          <p className="text-slate-500">Browse teff product types from verified farmers.</p>
        </div>

        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <Input placeholder="Search product types..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
        </div>

        {productsQuery.isLoading ? (
          <ProductCardSkeleton count={6} />
        ) : productsQuery.isError ? (
          <PageState type="error" onRetry={() => productsQuery.refetch()} />
        ) : products.length === 0 ? (
          <PageState type="empty" title="No products available" />
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <button
                key={product.id}
                type="button"
                onClick={() => navigate(`/customer/products/${product.id}`)}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white text-left shadow-sm transition-all hover:shadow-md"
              >
                {product.previewImage ? (
                  <img src={product.previewImage} alt={product.name} className="h-40 w-full object-cover" />
                ) : (
                  <div className="flex h-40 items-center justify-center bg-primary/10 font-bold text-primary">{product.name}</div>
                )}
                <div className="p-4">
                  <h3 className="font-bold text-slate-900">{product.name}</h3>
                  <p className="mt-1 line-clamp-2 text-sm text-slate-500">{product.description}</p>
                  <p className="mt-3 font-bold text-secondary">
                    {product.minPrice != null
                      ? `${formatEtb(product.minPrice)}${product.maxPrice != null && product.maxPrice !== product.minPrice ? ` – ${formatEtb(product.maxPrice)}` : ""}`
                      : "Price on request"}
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
