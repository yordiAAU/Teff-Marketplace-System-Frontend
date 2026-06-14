import { useParams } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Badge, statusBadgeVariant } from "@/components/ui/badge";
import { DetailSkeleton } from "@/components/skeletons";
import { PageState } from "@/components/common/PageState";
import { useCustomerProductType } from "@/features/customer/hooks/useCustomer";
import { formatCurrency } from "@/lib/utils";

export default function CustomerProductDetailPage() {
  const { id = "" } = useParams();
  const detailQuery = useCustomerProductType(id);

  const data = detailQuery.data as {
    productType?: { name: string; description: string };
    listings?: Array<{
      id: string;
      quantity: number;
      unit: string;
      pricePerKg: number;
      status: string;
      farmer: { id: string; fullName: string; region: string };
      images?: { imageUrl: string }[];
    }>;
  } | undefined;

  return (
    <DashboardLayout role="customer">
      <div className="mx-auto max-w-4xl space-y-8">
        {detailQuery.isLoading ? (
          <DetailSkeleton />
        ) : detailQuery.isError ? (
          <PageState type="error" onRetry={() => detailQuery.refetch()} />
        ) : !data?.productType ? (
          <PageState type="empty" title="Product not found" />
        ) : (
          <>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">{data.productType.name}</h1>
              <p className="mt-2 text-slate-500">{data.productType.description}</p>
            </div>

            {!data.listings?.length ? (
              <PageState type="empty" title="No listings available" />
            ) : (
              <div className="space-y-4">
                {data.listings.map((listing) => (
                  <div key={listing.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                      <div>
                        <p className="font-bold text-slate-900">{listing.farmer.fullName}</p>
                        <p className="text-sm text-slate-500">{listing.farmer.region}</p>
                        <p className="mt-2 text-lg font-bold text-secondary">
                          {formatCurrency(Number(listing.pricePerKg))}/{listing.unit}
                        </p>
                        <p className="text-sm text-slate-500">{Number(listing.quantity)} {listing.unit} available</p>
                      </div>
                      <Badge variant={statusBadgeVariant(listing.status)}>{listing.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
