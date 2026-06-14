import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {DashboardLayout} from '../../components/layout/DashboardLayout';
import { Star, ShieldCheck, Truck, ArrowLeft, Minus, Plus, ShoppingCart } from 'lucide-react';
import { toast } from 'react-toastify';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  // Mock data for the specific product
  const product = {
    id,
    name: 'Premium White Teff',
    farmer: 'Abebe Kebede',
    farmerRating: 4.9,
    farmerLocation: 'Gojjam, Ethiopia',
    price: 120,
    stock: 50,
    description: 'Our premium white teff is grown in the fertile highlands of Gojjam. It is meticulously cleaned and processed to ensure the highest nutritional value and superior taste. Perfect for making traditional Injera or gluten-free baking.',
    rating: 4.8,
    reviews: 124,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=800'
  };

  const handlePlaceOrder = () => {
    toast.success(`Order placed for ${quantity} bags of ${product.name}!`);
    navigate('/customer/orders');
  };

  return (
    <DashboardLayout role="customer">
      <div className="max-w-6xl mx-auto space-y-8">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-500 hover:text-primary font-medium transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Marketplace
        </button>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="aspect-square rounded-3xl overflow-hidden border border-slate-200 shadow-sm">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square rounded-xl overflow-hidden border border-slate-200 cursor-pointer hover:border-primary transition-colors">
                  <img src={product.image} alt="" className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill={i < 4 ? 'currentColor' : 'none'} />
                  ))}
                </div>
                <span className="text-sm font-bold text-slate-900">{product.rating}</span>
                <span className="text-sm text-slate-500">({product.reviews} reviews)</span>
              </div>
              <h1 className="text-4xl font-bold text-slate-900 mb-4">{product.name}</h1>
              <p className="text-3xl font-bold text-primary">${product.price}<span className="text-lg font-normal text-slate-500">/bag</span></p>
            </div>

            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400">
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{product.farmer}</p>
                    <p className="text-xs text-slate-500">{product.farmerLocation}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded-lg inline-block">Verified Farmer</p>
                  <p className="text-xs text-slate-500 mt-1">{product.farmerRating} Rating</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-slate-900">Description</h3>
              <p className="text-slate-600 leading-relaxed">{product.description}</p>
            </div>

            <div className="space-y-6 pt-6 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-900">Quantity</p>
                  <p className="text-sm text-slate-500">{product.stock} bags available</p>
                </div>
                <div className="flex items-center gap-4 bg-white border border-slate-200 rounded-xl p-1">
                  <button 
                  title="Decrease quantity"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center text-slate-500 hover:bg-slate-50 rounded-lg transition-colors"
                  >
                    <Minus size={18} />
                  </button>
                  <span className="w-8 text-center font-bold text-slate-900">{quantity}</span>
                  <button 
                  title="Increase quantity"
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="w-10 h-10 flex items-center justify-center text-slate-500 hover:bg-slate-50 rounded-lg transition-colors"
                  >
                    <Plus size={18} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button className="py-4 rounded-xl border-2 border-slate-200 font-bold text-slate-600 hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
                  <ShoppingCart size={20} />
                  Add to Cart
                </button>
                <button 
                  onClick={handlePlaceOrder}
                  className="py-4 rounded-xl bg-primary text-white font-bold shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  Place Order
                </button>
              </div>

              <div className="flex items-center gap-6 text-sm text-slate-500">
                <div className="flex items-center gap-2">
                  <Truck size={18} className="text-primary" />
                  Fast Delivery
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck size={18} className="text-primary" />
                  Quality Guaranteed
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}