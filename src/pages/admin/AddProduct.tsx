import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {DashboardLayout} from '../../components/layout/DashboardLayout';
import { ArrowLeft, Save, Package } from 'lucide-react';
import { toast } from 'react-toastify';

export default function AdminAddProduct() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [category, setCategory] = useState('White Teff');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(`"${name}" added to product catalog!`);
    navigate('/admin/products');
  };

  return (
    <DashboardLayout role="admin">
      <div className="max-w-2xl mx-auto space-y-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-500 hover:text-primary font-medium transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Product Catalog
        </button>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                <Package size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Create New Product</h1>
                <p className="text-slate-500">Add a new product type to the platform catalog.</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div>
              <label className="text-sm font-semibold text-slate-700 block mb-2">Product Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Premium White Teff"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
              />
              <p className="text-xs text-slate-400 mt-1.5">Farmers will select from this catalog when listing products.</p>
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-700 block mb-2">Category</label>
              <select
                title="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none"
              >
                <option value="White Teff">White Teff</option>
                <option value="Brown Teff">Brown Teff</option>
                <option value="Mixed Teff">Mixed Teff</option>
                <option value="Flour">Flour</option>
                <option value="Starter">Starter</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-700 block mb-2">Default Description</label>
              <textarea
                rows={3}
                placeholder="Default product description for the catalog..."
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none resize-none"
              />
            </div>

            <div className="flex items-center justify-end gap-4 pt-6 border-t border-slate-100">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-8 py-3 rounded-xl border border-slate-200 font-bold text-slate-600 hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-8 py-3 rounded-xl bg-slate-900 text-white font-bold shadow-lg flex items-center gap-2 hover:bg-slate-800 transition-all"
              >
                <Save size={20} />
                Create Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}
