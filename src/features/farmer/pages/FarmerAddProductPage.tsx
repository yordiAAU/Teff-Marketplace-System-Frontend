import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Save } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FileUpload } from "@/components/common/FileUpload";
import { DetailSkeleton } from "@/components/skeletons";
import { PageState } from "@/components/common/PageState";
import { useCreateListing } from "@/features/farmer/hooks/useFarmer";
import { useProductTypes } from "@/hooks/useProductTypes";
import { createListingSchema, type CreateListingFormValues } from "@/features/auth/schemas/auth.schemas";

export default function FarmerAddProductPage() {
  const navigate = useNavigate();
  const [images, setImages] = useState<File[]>([]);
  const { data: productTypes, isLoading, isError, refetch } = useProductTypes();
  const createMutation = useCreateListing();

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<CreateListingFormValues>({
    resolver: zodResolver(createListingSchema),
    defaultValues: { unit: "kg" },
  });

  const productTypeId = watch("productTypeId");

  const onSubmit = handleSubmit(async (values) => {
    await createMutation.mutateAsync({ ...values, images });
    navigate("/farmer/products");
  });

  return (
    <DashboardLayout role="farmer">
      <div className="mx-auto max-w-4xl space-y-8">
        <button type="button" onClick={() => navigate(-1)} className="flex items-center gap-2 font-medium text-slate-500 hover:text-primary">
          <ArrowLeft size={20} /> Back to Products
        </button>

        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 p-8">
            <h1 className="text-2xl font-bold text-slate-900">Add New Product</h1>
            <p className="text-slate-500">Select a product from the catalog and add your listing details.</p>
          </div>

          {isLoading ? (
            <div className="p-8"><DetailSkeleton /></div>
          ) : isError ? (
            <PageState type="error" onRetry={() => refetch()} />
          ) : (
            <form onSubmit={onSubmit} className="space-y-8 p-8">
              <div className="grid gap-8 md:grid-cols-2">
                <div className="space-y-6">
                  <div>
                    <Label>Product</Label>
                    <Select value={productTypeId} onValueChange={(v) => setValue("productTypeId", v)}>
                      <SelectTrigger><SelectValue placeholder="Select product type" /></SelectTrigger>
                      <SelectContent>
                        {productTypes?.map((p) => (
                          <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.productTypeId && <p className="mt-1 text-xs text-red-500">{errors.productTypeId.message}</p>}
                  </div>
                  <div>
                    <Label>Description</Label>
                    <Textarea {...register("description")} rows={4} />
                    {errors.description && <p className="mt-1 text-xs text-red-500">{errors.description.message}</p>}
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label>Price</Label>
                      <Input type="number" step="0.01" {...register("price")} />
                      {errors.price && <p className="mt-1 text-xs text-red-500">{errors.price.message}</p>}
                    </div>
                    <div>
                      <Label>Quantity</Label>
                      <Input type="number" {...register("quantity")} />
                      {errors.quantity && <p className="mt-1 text-xs text-red-500">{errors.quantity.message}</p>}
                    </div>
                    <div>
                      <Label>Unit</Label>
                      <Input {...register("unit")} placeholder="kg" />
                    </div>
                  </div>
                </div>
                <div>
                  <Label>Product Images</Label>
                  <FileUpload files={images} onChange={setImages} />
                </div>
              </div>
              <div className="flex justify-end gap-4 border-t border-slate-100 pt-8">
                <Button type="button" variant="outline" onClick={() => navigate(-1)}>Cancel</Button>
                <Button type="submit" disabled={createMutation.isPending}>
                  <Save size={20} /> {createMutation.isPending ? "Saving..." : "Save Product"}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
