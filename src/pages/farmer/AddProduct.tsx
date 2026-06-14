import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {DashboardLayout} from '../../components/layout/DashboardLayout';
import { ArrowLeft, Upload, Save } from 'lucide-react';
import { toast } from 'react-toastify';
import { PRODUCT_CATALOG } from '../../data/mockData';

export default function AddProduct() {
  const navigate = useNavigate();
  const [catalogId, setCatalogId] = useState(PRODUCT_CATALOG[0].id);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const productName = PRODUCT_CATALOG.find((p) => p.id === catalogId)?.name;
    toast.success(`${productName} listed successfully!`);
    navigate('/farmer/products');
  };

  return (
    <DashboardLayout role="farmer">
      <div className="max-w-4xl mx-auto space-y-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-500 hover:text-primary font-medium transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Products
        </button>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-slate-100">
            <h1 className="text-2xl font-bold text-slate-900">Add New Product</h1>
            <p className="text-slate-500">Select a product from the catalog and add your listing details.</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-semibold text-slate-700 block mb-2">Product</label>
                  <select
                  title='Product'
                    value={catalogId}
                    onChange={(e) => setCatalogId(Number(e.target.value))}
                    required
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  >
                    {PRODUCT_CATALOG.map((product) => (
                      <option key={product.id} value={product.id}>
                        {product.name} ({product.category})
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-slate-400 mt-1.5">Products are managed by the platform admin.</p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-700 block mb-2">Description</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe the quality, origin, and processing of your teff..."
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-slate-700 block mb-2">Price ($/bag)</label>
                    <input
                      type="number"
                      required
                      placeholder="0.00"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-slate-700 block mb-2">Quantity (Bags)</label>
                    <input
                      type="number"
                      required
                      placeholder="0"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="text-sm font-semibold text-slate-700 block mb-2">Product Image</label>
                  <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center hover:border-primary hover:bg-primary/5 transition-all cursor-pointer group">
                    <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 mx-auto mb-4 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                      <Upload size={32} />
                    </div>
                    <p className="text-sm font-bold text-slate-900 mb-1">Click to upload or drag and drop</p>
                    <p className="text-xs text-slate-500">PNG, JPG or WEBP (max. 5MB)</p>
                  </div>
                </div>
                <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100">
                  <h4 className="text-sm font-bold text-amber-900 mb-2">Listing Tips</h4>
                  <ul className="text-xs text-amber-700 space-y-2 list-disc pl-4">
                    <li>Use high-quality photos of your actual product.</li>
                    <li>Be specific about the teff variety in your description.</li>
                    <li>Mention the region where it was grown.</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-4 pt-8 border-t border-slate-100">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-8 py-3 rounded-xl border border-slate-200 font-bold text-slate-600 hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-8 py-3 rounded-xl bg-primary text-white font-bold shadow-lg shadow-primary/20 flex items-center gap-2 hover:scale-105 transition-all"
              >
                <Save size={20} />
                Save Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}
