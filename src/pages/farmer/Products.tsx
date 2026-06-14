import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {DashboardLayout } from '../../components/layout/DashboardLayout';

import Modal from '../../components/ui/Modal';
import ConfirmModal from '../../components/ui/ConfirmModal';
import { Plus, Edit2, Trash2, Eye, Search } from 'lucide-react';
import { toast } from 'react-toastify';
import { MOCK_FARMER_PRODUCTS } from '../../data/mockData';
import type { FarmerProduct } from '../../data/mockData';
import { Badge } from '@/components/ui/badge';

export default function FarmerProducts() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<FarmerProduct[]>(MOCK_FARMER_PRODUCTS);
  const [viewProduct, setViewProduct] = useState<FarmerProduct | null>(null);
  const [editProduct, setEditProduct] = useState<FarmerProduct | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<FarmerProduct | null>(null);
  const [search, setSearch] = useState('');

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = () => {
    if (!deleteTarget) return;
    setProducts(products.filter((p) => p.id !== deleteTarget.id));
    toast.success(`"${deleteTarget.name}" deleted successfully`);
    setDeleteTarget(null);
  };

  const handleEditSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editProduct) return;
    setProducts(products.map((p) => (p.id === editProduct.id ? editProduct : p)));
    toast.success('Product updated successfully');
    setEditProduct(null);
  };

  return (
    <DashboardLayout role="farmer">
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">My Products</h1>
            <p className="text-slate-500">Manage your inventory and product listings.</p>
          </div>
          <button
            onClick={() => navigate('/farmer/products/add')}
            className="bg-primary text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-all flex items-center gap-2"
          >
            <Plus size={20} />
            Add New Product
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 outline-none"
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4 font-bold">Product Name</th>
                  <th className="px-6 py-4 font-bold">Price</th>
                  <th className="px-6 py-4 font-bold">Stock Amount</th>
                  <th className="px-6 py-4 font-bold">Status</th>
                  <th className="px-6 py-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((product) => (
                  <tr key={product.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-bold text-slate-900">{product.name}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">${product.price}/bag</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{product.stock}</td>
                    <td className="px-6 py-4">
                      <Badge variant={product.status === 'Active' ? 'success' : 'error'}>
                        {product.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-1">
                        <button
                          title="View Product"
                          onClick={() => setViewProduct(product)}
                          className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          title="Edit Product"
                          onClick={() => setEditProduct({ ...product })}
                          className="p-2 text-amber-500 hover:bg-amber-50 rounded-lg transition-colors"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          title="Delete Product"
                          onClick={() => setDeleteTarget(product)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Modal
        isOpen={!!viewProduct}
        title="Product Details"
        onClose={() => setViewProduct(null)}
        size="lg"
      >
        {viewProduct && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h4 className="text-xl font-bold text-slate-900">{viewProduct.name}</h4>
              <Badge variant={viewProduct.status === 'Active' ? 'success' : 'error'}>
                {viewProduct.status}
              </Badge>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Description</p>
              <p className="text-sm text-slate-600 leading-relaxed">{viewProduct.description}</p>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-slate-50 rounded-xl">
                <p className="text-xs text-slate-500 mb-1">Price</p>
                <p className="text-lg font-bold text-slate-900">${viewProduct.price}/bag</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl">
                <p className="text-xs text-slate-500 mb-1">Stock</p>
                <p className="text-lg font-bold text-slate-900">{viewProduct.stock}</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl">
                <p className="text-xs text-slate-500 mb-1">Quantity</p>
                <p className="text-lg font-bold text-slate-900">{viewProduct.quantity} bags</p>
              </div>
            </div>
          </div>
        )}
      </Modal>

      <Modal
        isOpen={!!editProduct}
        title="Edit Product"
        onClose={() => setEditProduct(null)}
        size="lg"
      >
        {editProduct && (
          <form onSubmit={handleEditSave} className="space-y-5">
            <div>
              <label className="text-sm font-semibold text-slate-700 block mb-2">Product Name</label>
              <input
                title="Product Name"
                type="text"
                value={editProduct.name}
                disabled
                className="w-full px-4 py-3 bg-slate-100 border border-slate-200 rounded-xl text-slate-500 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-700 block mb-2">Description</label>
              <textarea
                title="Description"
                rows={4}
                value={editProduct.description}
                onChange={(e) => setEditProduct({ ...editProduct, description: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none resize-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold text-slate-700 block mb-2">Price ($/bag)</label>
                <input
                  title="Price"
                  type="number"
                  value={editProduct.price}
                  onChange={(e) => setEditProduct({ ...editProduct, price: Number(e.target.value) })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700 block mb-2">Quantity (Bags)</label>
                <input
                  title="Quantity"
                  type="number"
                  value={editProduct.quantity}
                  onChange={(e) => setEditProduct({ ...editProduct, quantity: Number(e.target.value) })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setEditProduct(null)}
                className="px-6 py-2.5 rounded-xl border border-slate-200 font-bold text-slate-600 hover:bg-slate-50 transition-colors text-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-primary text-white font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-all text-sm"
              >
                Save Changes
              </button>
            </div>
          </form>
        )}
      </Modal>

      <ConfirmModal
        isOpen={!!deleteTarget}
        title="Delete Product"
        message={`Are you sure you want to delete "${deleteTarget?.name}"? This action cannot be undone and will remove the listing from the marketplace.`}
        confirmLabel="Delete Product"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </DashboardLayout>
  );
}
