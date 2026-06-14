import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Search, Plus, Edit2, Trash2, Package } from "lucide-react";
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
import { FileUpload, ImagePreviewGrid } from "@/components/common/FileUpload";
import { TableSkeleton } from "@/components/skeletons";
import { PageState } from "@/components/common/PageState";
import {
  useAdminProducts,
  useCreateAdminProduct,
  useUpdateAdminProduct,
  useDeleteAdminProduct,
} from "@/features/admin/hooks/useAdmin";
import {
  createProductTypeSchema,
  updateProductTypeSchema,
  type CreateProductTypeFormValues,
  type UpdateProductTypeFormValues,
} from "@/features/auth/schemas/auth.schemas";
import { formatDate } from "@/lib/utils";
import type { ProductType } from "@/types/api.types";

export default function AdminProductsPage() {
  const [search, setSearch] = useState("");
  const [createOpen, setCreateOpen] = useState(false);
  const [editProduct, setEditProduct] = useState<ProductType | null>(null);
  const [deleteProduct, setDeleteProduct] = useState<ProductType | null>(null);
  const [createImages, setCreateImages] = useState<File[]>([]);

  const productsQuery = useAdminProducts({ query: search || undefined });
  const createMutation = useCreateAdminProduct();
  const updateMutation = useUpdateAdminProduct();
  const deleteMutation = useDeleteAdminProduct();

  const createForm = useForm<CreateProductTypeFormValues>({
    resolver: zodResolver(createProductTypeSchema),
    defaultValues: { name: "", description: "" },
  });

  const editForm = useForm<UpdateProductTypeFormValues>({
    resolver: zodResolver(updateProductTypeSchema),
  });

  const handleCreate = createForm.handleSubmit(async (values) => {
    await createMutation.mutateAsync({ ...values, images: createImages });
    setCreateOpen(false);
    createForm.reset();
    setCreateImages([]);
  });

  const handleEdit = editForm.handleSubmit(async (values) => {
    if (!editProduct) return;
    await updateMutation.mutateAsync({ id: editProduct.id, payload: values });
    setEditProduct(null);
  });

  const openEdit = (product: ProductType) => {
    setEditProduct(product);
    editForm.reset({ name: product.name, description: product.description });
  };

  const confirmDelete = async () => {
    if (!deleteProduct) return;
    await deleteMutation.mutateAsync(deleteProduct.id);
    setDeleteProduct(null);
  };

  return (
    <DashboardLayout role="admin">
      <div className="space-y-8">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Product Catalog</h1>
            <p className="text-slate-500">Create and manage platform product types.</p>
          </div>
          <Button variant="secondary" onClick={() => setCreateOpen(true)}>
            <Plus size={20} /> Create Product
          </Button>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 p-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <Input
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {productsQuery.isLoading ? (
            <TableSkeleton rows={5} cols={4} />
          ) : productsQuery.isError ? (
            <PageState type="error" onRetry={() => productsQuery.refetch()} />
          ) : !productsQuery.data?.length ? (
            <PageState type="empty" title="No products" message="Create your first product type." />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                  <tr>
                    <th className="px-6 py-4 font-bold">Product</th>
                    <th className="px-6 py-4 font-bold">Description</th>
                    <th className="px-6 py-4 font-bold">Status</th>
                    <th className="px-6 py-4 font-bold">Created</th>
                    <th className="px-6 py-4 font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {productsQuery.data.map((product) => (
                    <tr key={product.id} className="transition-colors hover:bg-slate-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                            <Package size={16} />
                          </div>
                          <span className="text-sm font-bold text-slate-900">{product.name}</span>
                        </div>
                      </td>
                      <td className="max-w-xs truncate px-6 py-4 text-sm text-slate-600">{product.description}</td>
                      <td className="px-6 py-4">
                        <Badge variant={product.isActive ? "success" : "error"}>
                          {product.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-500">{formatDate(product.createdAt)}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-1">
                          <button type="button" onClick={() => openEdit(product)} className="rounded-lg p-2 text-amber-500 hover:bg-amber-50">
                            <Edit2 size={18} />
                          </button>
                          <button type="button" onClick={() => setDeleteProduct(product)} className="rounded-lg p-2 text-red-500 hover:bg-red-50">
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Create Product Type</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreate} className="space-y-4">
            <div>
              <Label htmlFor="create-name">Name</Label>
              <Input id="create-name" {...createForm.register("name")} />
              {createForm.formState.errors.name && (
                <p className="mt-1 text-xs text-red-500">{createForm.formState.errors.name.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="create-desc">Description</Label>
              <Textarea id="create-desc" {...createForm.register("description")} />
              {createForm.formState.errors.description && (
                <p className="mt-1 text-xs text-red-500">{createForm.formState.errors.description.message}</p>
              )}
            </div>
            <div>
              <Label>Images</Label>
              <FileUpload files={createImages} onChange={setCreateImages} />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setCreateOpen(false)}>Cancel</Button>
              <Button type="submit" disabled={createMutation.isPending}>
                {createMutation.isPending ? "Creating..." : "Create Product"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={!!editProduct} onOpenChange={() => setEditProduct(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Product Type</DialogTitle>
          </DialogHeader>
          {editProduct && (
            <form onSubmit={handleEdit} className="space-y-4">
              {editProduct.images && editProduct.images.length > 0 && (
                <ImagePreviewGrid urls={editProduct.images.map((i) => i.imageUrl)} />
              )}
              <div>
                <Label htmlFor="edit-name">Name</Label>
                <Input id="edit-name" {...editForm.register("name")} />
              </div>
              <div>
                <Label htmlFor="edit-desc">Description</Label>
                <Textarea id="edit-desc" {...editForm.register("description")} />
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setEditProduct(null)}>Cancel</Button>
                <Button type="submit" disabled={updateMutation.isPending}>
                  {updateMutation.isPending ? "Saving..." : "Save Changes"}
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteProduct} onOpenChange={() => setDeleteProduct(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Product Type</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete &quot;{deleteProduct?.name}&quot;? This will deactivate the product type.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-500 hover:bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  );
}
