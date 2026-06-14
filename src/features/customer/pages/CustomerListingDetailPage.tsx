import { useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PageBackNav } from "@/components/common/PageBackNav";
import { Button } from "@/components/ui/button";
import { DetailSkeleton } from "@/components/skeletons";
import { PageState } from "@/components/common/PageState";
import { useCustomerListingDetail, usePlaceOrder } from "@/features/customer/hooks/useCustomer";
import { formatDate, formatEtb } from "@/lib/utils";

const QUICK_QUANTITIES = [10, 25, 50, 75, 100];
const MIN_QUANTITY = 10;

export default function CustomerListingDetailPage() {
  const { productId = "", farmerId = "" } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedQuantity, setSelectedQuantity] = useState(MIN_QUANTITY);

  const listingQuery = useCustomerListingDetail(productId, farmerId);
  const placeOrder = usePlaceOrder();

  const listing = listingQuery.data;

  const maxQuantity = useMemo(
    () => (listing ? Math.floor(Number(listing.quantity)) : MIN_QUANTITY),
    [listing]
  );

  const totalAmount = useMemo(
    () => (listing ? Number(listing.pricePerKg) * selectedQuantity : 0),
    [listing, selectedQuantity]
  );

  const adjustQuantity = (delta: number) => {
    setSelectedQuantity((prev) => {
      const next = prev + delta;
      return Math.min(Math.max(MIN_QUANTITY, next), maxQuantity);
    });
  };

  const handlePlaceOrder = async () => {
    if (!listing) return;
    await placeOrder.mutateAsync({ listingId: listing.id, quantity: selectedQuantity });
    navigate("/customer/orders");
  };

  const fromProductTypeId = (location.state as { productTypeId?: string } | null)?.productTypeId;
  const backTo =
    listing?.productType?.id != null
      ? `/customer/products/${listing.productType.id}`
      : fromProductTypeId
        ? `/customer/products/${fromProductTypeId}`
        : undefined;

  return (
    <DashboardLayout role="customer">
      <div className="mx-auto max-w-6xl">
        <PageBackNav label="Back to Listings" to={backTo} />

        {listingQuery.isLoading ? (
          <DetailSkeleton />
        ) : listingQuery.isError ? (
          <PageState type="error" onRetry={() => listingQuery.refetch()} />
        ) : !listing ? (
          <PageState type="empty" title="Listing not found" />
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr_320px]">
            <div className="space-y-4">
              {listing.images.length > 0 ? (
                <div className="space-y-3">
                  <img src={listing.images[0].imageUrl} alt={listing.productType.name} className="h-72 w-full rounded-2xl object-cover" />
                  <div className="grid grid-cols-3 gap-2">
                    {listing.images.slice(1).map((img) => (
                      <img key={img.id} src={img.imageUrl} alt="" className="h-20 w-full rounded-xl object-cover" />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex h-72 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">No images</div>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <h1 className="text-2xl font-bold text-slate-900">{listing.productType.name}</h1>
                <p className="mt-1 text-lg font-semibold text-slate-700">{listing.farmer.fullName}</p>
                <p className="text-sm text-slate-500">{listing.farmer.region}</p>
                <p className="text-sm text-slate-500">location: {listing.location}</p>
              </div>
              <div className="rounded-xl bg-slate-50 p-4 text-sm">
                <p><span className="text-slate-400">quantity:</span> {Number(listing.quantity)} {listing.unit}</p>
                <p className="mt-1"><span className="text-slate-400">pricePerKg:</span> {formatEtb(Number(listing.pricePerKg))}</p>
                <p className="mt-1"><span className="text-slate-400">createdAt:</span> {formatDate(listing.createdAt)}</p>
              </div>
              <div>
                <h3 className="mb-2 font-bold text-slate-900">description</h3>
                <p className="text-sm leading-relaxed text-slate-600">{listing.description}</p>
              </div>
            </div>

            <div className="lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="mb-4 font-bold text-slate-900">Place Order</h3>

                <div className="mb-4 flex flex-wrap gap-2">
                  {QUICK_QUANTITIES.map((qty) => (
                    <Button
                      key={qty}
                      type="button"
                      size="sm"
                      variant={selectedQuantity === qty ? "default" : "outline"}
                      disabled={qty > maxQuantity}
                      onClick={() => setSelectedQuantity(qty)}
                    >
                      {qty}kg
                    </Button>
                  ))}
                </div>

                <div className="mb-6 flex items-center justify-center gap-4">
                  <Button type="button" variant="outline" size="icon" onClick={() => adjustQuantity(-1)} disabled={selectedQuantity <= MIN_QUANTITY}>
                    <Minus size={16} />
                  </Button>
                  <span className="min-w-[60px] text-center text-lg font-bold">{selectedQuantity} kg</span>
                  <Button type="button" variant="outline" size="icon" onClick={() => adjustQuantity(1)} disabled={selectedQuantity >= maxQuantity}>
                    <Plus size={16} />
                  </Button>
                </div>

                <div className="mb-6 space-y-2 rounded-xl bg-slate-50 p-4 text-sm">
                  <div className="flex justify-between"><span className="text-slate-500">Product</span><span>{listing.productType.name}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Farmer</span><span>{listing.farmer.fullName}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">pricePerKg</span><span>{formatEtb(Number(listing.pricePerKg))}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">quantity</span><span>{selectedQuantity} kg</span></div>
                  <div className="flex justify-between border-t border-slate-200 pt-2 font-bold">
                    <span>Total</span>
                    <span className="text-secondary">{formatEtb(totalAmount)}</span>
                  </div>
                </div>

                <Button className="w-full" onClick={handlePlaceOrder} disabled={placeOrder.isPending}>
                  <ShoppingCart size={18} />
                  {placeOrder.isPending ? "Placing Order..." : "Place Order"}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
