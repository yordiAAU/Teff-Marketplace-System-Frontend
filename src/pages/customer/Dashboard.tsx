import React from 'react';
import {DashboardLayout} from '../../components/layout/DashboardLayout';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Package, Clock, TrendingUp, ArrowUpRight } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const spendingData = [
  { name: 'Jan', amount: 400 },
  { name: 'Feb', amount: 300 },
  { name: 'Mar', amount: 600 },
  { name: 'Apr', amount: 800 },
  { name: 'May', amount: 500 },
  { name: 'Jun', amount: 900 },
];

const categoryData = [
  { name: 'White Teff', value: 45 },
  { name: 'Brown Teff', value: 30 },
  { name: 'Mixed', value: 25 },
];

export default function CustomerDashboard() {
  const stats = [
    { label: 'Total Orders', value: '12', icon: ShoppingCart, color: 'bg-blue-500' },
    { label: 'Active Orders', value: '3', icon: Clock, color: 'bg-amber-500' },
    { label: 'Completed', value: '9', icon: Package, color: 'bg-green-500' },
    { label: 'Total Spent', value: '$1,240', icon: TrendingUp, color: 'bg-primary' },
  ];

  return (
    <DashboardLayout role="customer">
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Welcome back, Alex!</h1>
            <p className="text-slate-500">Here's what's happening with your orders today.</p>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors">
              Download Report
            </button>
            <button className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-all">
              New Order
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center text-white shadow-lg shadow-slate-200`}>
                  <stat.icon size={24} />
                </div>
                <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-lg flex items-center gap-1">
                  <ArrowUpRight size={12} />
                  12%
                </span>
              </div>
              <p className="text-sm font-medium text-slate-500">{stat.label}</p>
              <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Spending Chart */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-slate-900">Spending Overview</h3>
                <select
                  aria-label="Spending overview time range"
                  className="text-xs font-bold text-slate-500 bg-slate-50 border-none rounded-lg focus:ring-0"
                >
                  <option>Last 6 Months</option>
                  <option>Last Year</option>
                </select>
              </div>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={spendingData}>
                    <defs>
                      <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#EBBE7C" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#EBBE7C" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                    />
                    <Area type="monotone" dataKey="amount" stroke="#EBBE7C" strokeWidth={3} fillOpacity={1} fill="url(#colorAmount)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recent Orders Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <h3 className="font-bold text-slate-900">Recent Orders</h3>
                <button className="text-sm font-bold text-primary hover:underline">View All</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                    <tr>
                      <th className="px-6 py-4 font-bold">Order ID</th>
                      <th className="px-6 py-4 font-bold">Product</th>
                      <th className="px-6 py-4 font-bold">Status</th>
                      <th className="px-6 py-4 font-bold">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {[
                      { id: '#ORD-7281', product: 'Premium White Teff', status: 'Processing', total: '$120.00' },
                      { id: '#ORD-7280', product: 'Brown Teff Flour', status: 'Completed', total: '$85.50' },
                      { id: '#ORD-7279', product: 'Organic Mixed Teff', status: 'Completed', total: '$210.00' },
                      { id: '#ORD-7278', product: 'Red Teff Grain', status: 'Completed', total: '$45.00' },
                    ].map((order, i) => (
                      <tr key={i} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 text-sm font-medium text-slate-900">{order.id}</td>
                        <td className="px-6 py-4 text-sm text-slate-600">{order.product}</td>
                        <td className="px-6 py-4">
                          <Badge variant={order.status === 'Completed' ? 'success' : 'warning'}>
                            {order.status}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 text-sm font-bold text-slate-900">{order.total}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            {/* Category Distribution */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-6">Order Distribution</h3>
              <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={categoryData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8'}} />
                    <YAxis hide />
                    <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '12px', border: 'none' }} />
                    <Bar dataKey="value" fill="#8B4E24" radius={[4, 4, 0, 0]} barSize={30} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 space-y-2">
                {categoryData.map((item, i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">{item.name}</span>
                    <span className="font-bold text-slate-900">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Products */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <h3 className="font-bold text-slate-900 mb-6">Recommended for You</h3>
              <div className="space-y-6">
                {[
                  { name: 'Red Teff Grain', price: '$45.00', img: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=200' },
                  { name: 'Fermented Teff Starter', price: '$12.99', img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=200' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 group cursor-pointer">
                    <img src={item.img} className="w-16 h-16 rounded-xl object-cover group-hover:scale-105 transition-transform" alt={item.name} />
                    <div>
                      <p className="font-bold text-slate-900 group-hover:text-primary transition-colors">{item.name}</p>
                      <p className="text-sm text-slate-500">High Protein • Organic</p>
                      <p className="text-primary font-bold mt-1">{item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-8 py-3 rounded-xl border-2 border-slate-100 font-bold text-slate-600 hover:bg-slate-50 transition-colors">
                Explore Marketplace
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}