import React from 'react';
import { useNavigate } from 'react-router-dom';
import {DashboardLayout} from '../../components/layout/DashboardLayout';
import { Badge } from '@/components/ui/badge';
import PriceTrendChart from '../../components/charts/PriceTrendChart';
import { BarChart3, Package, DollarSign, ShoppingCart } from 'lucide-react';

export default function FarmerDashboard() {
  const navigate = useNavigate();

  return (
    <DashboardLayout role="farmer">
      <div className="space-y-8">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Farmer Dashboard</h1>
            <p className="text-slate-500">Track market prices and manage your harvest.</p>
          </div>
          <button
            onClick={() => navigate('/farmer/products/add')}
            className="bg-primary text-white px-6 py-2 rounded-xl font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-all"
          >
            Add Product
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: 'Total Revenue', value: '$8,420', icon: DollarSign, color: 'bg-green-500', trend: '+18%' },
            { label: 'Active Products', value: '24', icon: Package, color: 'bg-primary', trend: '+2' },
            { label: 'New Orders', value: '18', icon: ShoppingCart, color: 'bg-blue-500', trend: '+5' },
            { label: 'Avg. Rating', value: '4.9', icon: BarChart3, color: 'bg-amber-500', trend: '0.1' },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center text-white shadow-lg shadow-slate-200`}>
                  <stat.icon size={24} />
                </div>
                <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-lg">{stat.trend}</span>
              </div>
              <p className="text-sm font-medium text-slate-500">{stat.label}</p>
              <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
            </div>
          ))}
        </div>

        <PriceTrendChart title="Market Price Trend" />

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold text-slate-900">Recent Sales</h3>
            <button
              onClick={() => navigate('/farmer/orders')}
              className="text-sm font-bold text-primary hover:underline"
            >
              View All Orders
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4 font-bold">Customer</th>
                  <th className="px-6 py-4 font-bold">Product</th>
                  <th className="px-6 py-4 font-bold">Quantity</th>
                  <th className="px-6 py-4 font-bold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  { customer: 'Abebe Kebede', product: 'White Teff (50kg)', qty: '2 bags', status: 'Pending' },
                  { customer: 'Sara Tadesse', product: 'Brown Teff (25kg)', qty: '4 bags', status: 'Processing' },
                  { customer: 'John Doe', product: 'Mixed Teff (100kg)', qty: '1 bag', status: 'Completed' },
                ].map((order, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500">
                          {order.customer.charAt(0)}
                        </div>
                        <span className="text-sm font-medium text-slate-900">{order.customer}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">{order.product}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{order.qty}</td>
                    <td className="px-6 py-4">
                      <Badge variant={order.status === 'Completed' ? 'success' : order.status === 'Pending' ? 'warning' : 'primary'}>
                        {order.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
