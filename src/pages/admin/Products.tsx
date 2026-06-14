import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {DashboardLayout} from '../../components/layout/DashboardLayout';
import { Badge } from '@/components/ui/badge';
import ConfirmModal from '../../components/ui/ConfirmModal';
import { Search, Package, Trash2, Eye, Plus } from 'lucide-react';
import { toast } from 'react-toastify';
import { PRODUCT_CATALOG } from '../../data/mockData';

const MOCK_LISTINGS = [
  { id: 1, name: 'Premium White Teff', farmer: 'Abebe Kebede', price: 120, stock: 50, status: 'Active' },
  { id: 2, name: 'Organic Brown Teff', farmer: 'Sara Tadesse', price: 95, stock: 30, status: 'Active' },
  { id: 3, name: 'Mixed Grain Teff', farmer: 'Mulugeta Tesfaye', price: 110, stock: 0, status: 'Out of Stock' },
  { id: 4, name: 'Red Teff Flour', farmer: 'Helen Gebre', price: 85, stock: 15, status: 'Active' },
  { id: 5, name: 'Fermented Teff Starter', farmer: 'Dawit Isaac', price: 15, stock: 200, status: 'Active' },
];

export default function AdminProducts() {
  const navigate = useNavigate();
  const [listings, setListings] = useState(MOCK_LISTINGS);
  const [deleteTarget, setDeleteTarget] = useState<{ id: number; name: string } | null>(null);
  const [search, setSearch] = useState('');
  const [activeSection, setActiveSection] = useState<'catalog' | 'listings'>('catalog');

  const filteredListings = listings.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.farmer.toLowerCase().includes(search.toLowerCase())
  );

  const filteredCatalog = PRODUCT_CATALOG.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = () => {
    if (!deleteTarget) return;
    setListings(listings.filter((p) => p.id !== deleteTarget.id));
    toast.success(`"${deleteTarget.name}" removed from marketplace`);
    setDeleteTarget(null);
  };

  return (
    <DashboardLayout role="admin">
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Product Catalog</h1>
            <p className="text-slate-500">Manage product types and marketplace listings.</p>
          </div>
          <button
            onClick={() => navigate('/admin/products/add')}
            className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-slate-800 transition-all flex items-center gap-2"
          >
            <Plus size={20} />
            Create Product
          </button>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setActiveSection('catalog')}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
              activeSection === 'catalog'
                ? 'bg-primary text-white shadow-md'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            Product Types ({PRODUCT_CATALOG.length})
          </button>
          <button
            onClick={() => setActiveSection('listings')}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
              activeSection === 'listings'
                ? 'bg-secondary text-white shadow-md'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            Marketplace Listings ({listings.length})
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder={activeSection === 'catalog' ? 'Search product types...' : 'Search products or farmers...'}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 outline-none"
              />
            </div>
          </div>

          {activeSection === 'catalog' ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-4 font-bold">Product Name</th>
                    <th className="px-6 py-4 font-bold">Category</th>
                    <th className="px-6 py-4 font-bold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredCatalog.map((product) => (
                    <tr key={product.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                            <Package size={16} />
                          </div>
                          <span className="text-sm font-bold text-slate-900">{product.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">{product.category}</td>
                      <td className="px-6 py-4">
                        <Badge variant="success">Active</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-4 font-bold">Product</th>
                    <th className="px-6 py-4 font-bold">Farmer</th>
                    <th className="px-6 py-4 font-bold">Price</th>
                    <th className="px-6 py-4 font-bold">Stock</th>
                    <th className="px-6 py-4 font-bold">Status</th>
                    <th className="px-6 py-4 font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredListings.map((product) => (
                    <tr key={product.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                            <Package size={16} />
                          </div>
                          <span className="text-sm font-bold text-slate-900">{product.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">{product.farmer}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">${product.price}/bag</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{product.stock} bags</td>
                      <td className="px-6 py-4">
                        <Badge variant={product.status === 'Active' ? 'success' : 'error'}>
                          {product.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-1">
                          <button
                            title="View Product Details"
                            className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <Eye size={18} />
                          </button>
                          <button
                            title="Delete Product"
                            onClick={() => setDeleteTarget({ id: product.id, name: product.name })}
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
          )}
        </div>
      </div>

      <ConfirmModal
        isOpen={!!deleteTarget}
        title="Remove Listing"
        message={`Are you sure you want to remove "${deleteTarget?.name}" from the marketplace? This will affect the farmer's active listing.`}
        confirmLabel="Remove Listing"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </DashboardLayout>
  );
}
