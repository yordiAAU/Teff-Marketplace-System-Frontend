import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {DashboardLayout} from '../../components/layout/DashboardLayout';
import { Search, Filter, SlidersHorizontal, Star } from 'lucide-react';

const MOCK_PRODUCTS = [
  { id: 1, name: 'Premium White Teff', farmer: 'Abebe Kebede', price: 120, quantity: 50, rating: 4.8, image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=400' },
  { id: 2, name: 'Organic Brown Teff', farmer: 'Sara Tadesse', price: 95, quantity: 30, rating: 4.9, image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=400' },
  { id: 3, name: 'Mixed Grain Teff', farmer: 'Mulugeta Tesfaye', price: 110, quantity: 100, rating: 4.7, image: 'https://images.unsplash.com/photo-1536510233921-8e5043fce771?auto=format&fit=crop&q=80&w=400' },
  { id: 4, name: 'Red Teff Flour', farmer: 'Helen Gebre', price: 85, quantity: 15, rating: 4.6, image: 'https://images.unsplash.com/photo-1501747315-124a0eaca060?auto=format&fit=crop&q=80&w=400' },
  { id: 5, name: 'Fermented Teff Starter', farmer: 'Dawit Isaac', price: 15, quantity: 200, rating: 5.0, image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&q=80&w=400' },
  { id: 6, name: 'Whole Grain White Teff', farmer: 'Abebe Kebede', price: 130, quantity: 40, rating: 4.9, image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=400' },
];

export default function Marketplace() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <DashboardLayout role="customer">
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Marketplace</h1>
            <p className="text-slate-500">Discover premium teff directly from local farmers.</p>
          </div>
          
          <div className="flex flex-1 max-w-2xl gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input 
                type="text" 
                placeholder="Search products, farmers..." 
                className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 flex items-center gap-2 font-medium">
              <Filter size={20} />
              <span className="hidden sm:inline">Filters</span>
            </button>
            <button className="px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 flex items-center gap-2 font-medium">
              <SlidersHorizontal size={20} />
              <span className="hidden sm:inline">Sort</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {MOCK_PRODUCTS.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden group hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1 text-xs font-bold text-slate-900">
                  <Star size={12} className="text-amber-500 fill-amber-500" />
                  {product.rating}
                </div>
              </div>
              <div className="p-5">
                <div className="mb-4">
                  <h3 className="font-bold text-slate-900 group-hover:text-primary transition-colors line-clamp-1">{product.name}</h3>
                  <p className="text-sm text-slate-500">by {product.farmer}</p>
                </div>
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Price</p>
                    <p className="text-xl font-bold text-slate-900">${product.price}<span className="text-sm font-normal text-slate-500">/bag</span></p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Stock</p>
                    <p className="text-sm font-bold text-slate-700">{product.quantity} available</p>
                  </div>
                </div>
                <button 
                  onClick={() => navigate(`/customer/product/${product.id}`)}
                  className="w-full py-3 bg-slate-50 text-slate-900 font-bold rounded-xl border border-slate-200 hover:bg-primary hover:text-white hover:border-primary transition-all flex items-center justify-center gap-2"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}