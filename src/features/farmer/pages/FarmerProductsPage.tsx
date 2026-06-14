import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Edit2, Trash2, Eye, Search } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge, statusBadgeVariant } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ListingCardSkeleton } from "@/components/skeletons/ProductSkeletons";
import { PageState } from "@/components/common/PageState";
import { ImagePreviewGrid } from "@/components/common/FileUpload";
import {
  useDeleteListing,
  useFarmerListings,
  useUpdateListing,
} from "@/features/farmer/hooks/useFarmer";
import { updateListingSchema, type UpdateListingFormValues } from "@/features/auth/schemas/auth.schemas";
import { formatDate, formatEtb } from "@/lib/utils";
import type { FarmerListing } from "@/types/api.types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function FarmerProductsPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [viewListing, setViewListing] = useState<FarmerListing | null>(null);
  const [editListing, setEditListing] = useState<FarmerListing | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<FarmerListing | null>(null);

  const listingsQuery = useFarmerListings();
  const updateMutation = useUpdateListing();
  const deleteMutation = useDeleteListing();

  const editForm = useForm<UpdateListingFormValues>({
    resolver: zodResolver(updateListingSchema),
  });

  const listings = (listingsQuery.data ?? []).filter((listing) =>
    listing.productType.name.toLowerCase().includes(search.toLowerCase())
  );

  const openEdit = (listing: FarmerListing) => {
    setEditListing(listing);
    editForm.reset({
      quantity: Number(listing.quantity),
      unit: listing.unit,
      price: Number(listing.pricePerKg),
      description: listing.description,
    });
  };

  const handleEdit = editForm.handleSubmit(async (values) => {
    if (!editListing) return;
    await updateMutation.mutateAsync({ id: editListing.id, payload: values });
    setEditListing(null);
  });

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    await deleteMutation.mutateAsync(deleteTarget.id);
    setDeleteTarget(null);
  };

  return (
    <DashboardLayout role="farmer">
      <div className="space-y-8">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">My Listings</h1>
            <p className="text-slate-500">Manage your inventory and product listings.</p>
          </div>
          <Button onClick={() => navigate("/farmer/products/add")}>
            <Plus size={20} /> Add Listing
          </Button>
        </div>

        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <Input placeholder="Search listings..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
        </div>

        {listingsQuery.isLoading ? (
          <ListingCardSkeleton count={4} />
        ) : listingsQuery.isError ? (
          <PageState type="error" onRetry={() => listingsQuery.refetch()} />
        ) : listings.length === 0 ? (
          <PageState type="empty" title="No listings" message="Add your first product listing." />
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {listings.map((listing) => (
              <div key={listing.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                {listing.images[0]?.imageUrl ? (
                  <img src={listing.images[0].imageUrl} alt={listing.productType.name} className="h-44 w-full object-cover" />
                ) : (
                  <div className="flex h-44 items-center justify-center bg-primary/10 text-primary font-bold">
                    {listing.productType.name}
                  </div>
                )}
                <div className="space-y-3 p-5">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-bold text-slate-900">{listing.productType.name}</h3>
                    <Badge variant={statusBadgeVariant(listing.status)}>{listing.status}</Badge>
                  </div>
                  <p className="line-clamp-2 text-sm text-slate-500">{listing.description}</p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div><span className="text-slate-400">Quantity:</span> {Number(listing.quantity)} {listing.unit}</div>
                    <div><span className="text-slate-400">pricePerKg:</span> {formatEtb(Number(listing.pricePerKg))}</div>
                    <div className="col-span-2 text-xs text-slate-400">{formatDate(listing.createdAt)}</div>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <Button variant="outline" size="sm" onClick={() => setViewListing(listing)}>
                      <Eye size={16} /> View Details
                    </Button>
                    <div className="flex gap-1">
                      <button  type="button" onClick={() => openEdit(listing)} className="rounded-lg p-2 text-amber-500 hover:bg-amber-50"><Edit2 size={16} /></button>
                      <button type="button" onClick={() => setDeleteTarget(listing)} className="rounded-lg p-2 text-red-500 hover:bg-red-50"><Trash2 size={16} /></button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Dialog open={!!viewListing} onOpenChange={() => setViewListing(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>Listing Details</DialogTitle></DialogHeader>
          {viewListing && (
            <div className="space-y-4">
              <h4 className="text-xl font-bold">{viewListing.productType.name}</h4>
              <p className="text-sm leading-relaxed text-slate-600">{viewListing.description}</p>
              <ImagePreviewGrid urls={viewListing.images.map((img) => img.imageUrl)} />
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-xl bg-slate-50 p-3"><p className="text-slate-400">quantity</p><p className="font-bold">{Number(viewListing.quantity)} {viewListing.unit}</p></div>
                <div className="rounded-xl bg-slate-50 p-3"><p className="text-slate-400">pricePerKg</p><p className="font-bold">{formatEtb(Number(viewListing.pricePerKg))}</p></div>
                <div className="rounded-xl bg-slate-50 p-3"><p className="text-slate-400">location</p><p className="font-bold">{viewListing.location}</p></div>
                <div className="rounded-xl bg-slate-50 p-3"><p className="text-slate-400">status</p><Badge variant={statusBadgeVariant(viewListing.status)}>{viewListing.status}</Badge></div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={!!editListing} onOpenChange={() => setEditListing(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>Edit Listing</DialogTitle></DialogHeader>
          <form onSubmit={handleEdit} className="space-y-4">
            <div><Label>description</Label><Textarea {...editForm.register("description")} /></div>
            <div className="grid grid-cols-3 gap-3">
              <div><Label>price</Label><Input type="number" step="0.01" {...editForm.register("price")} /></div>
              <div><Label>quantity</Label><Input type="number" {...editForm.register("quantity")} /></div>
              <div><Label>unit</Label><Input {...editForm.register("unit")} /></div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setEditListing(null)}>Cancel</Button>
              <Button type="submit" disabled={updateMutation.isPending}>Save</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteTarget} onOpenChange={() => setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Listing</AlertDialogTitle>
            <AlertDialogDescription>
              Delete &quot;{deleteTarget?.productType.name}&quot;? This will deactivate the listing.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-500 hover:bg-red-600">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  );
}
