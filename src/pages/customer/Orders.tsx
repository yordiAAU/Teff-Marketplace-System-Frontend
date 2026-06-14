import React from 'react';
import {DashboardLayout} from '../../components/layout/DashboardLayout';
import { Badge } from '@/components/ui/badge';
import { Package, Search, Filter, ExternalLink } from 'lucide-react';

const MOCK_ORDERS = [
  { id: 'ORD-7281', product: 'Premium White Teff', farmer: 'Abebe Kebede', quantity: '2 bags', total: '$240.00', status: 'Processing', date: 'Oct 24, 2023' },
  { id: 'ORD-7280', product: 'Organic Brown Teff', farmer: 'Sara Tadesse', quantity: '1 bag', total: '$95.00', status: 'Completed', date: 'Oct 20, 2023' },
  { id: 'ORD-7279', product: 'Mixed Grain Teff', farmer: 'Mulugeta Tesfaye', quantity: '3 bags', total: '$330.00', status: 'Completed', date: 'Oct 15, 2023' },
  { id: 'ORD-7278', product: 'Red Teff Flour', farmer: 'Helen Gebre', quantity: '1 bag', total: '$85.00', status: 'Pending', date: 'Oct 12, 2023' },
  { id: 'ORD-7277', product: 'Premium White Teff', farmer: 'Abebe Kebede', quantity: '5 bags', total: '$600.00', status: 'Completed', date: 'Sep 28, 2023' },
];

export default function CustomerOrders() {
  return (
    <DashboardLayout role="customer">
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">My Orders</h1>
            <p className="text-slate-500">Track and manage your teff purchases.</p>
          </div>
          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search orders..." 
                className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 outline-none"
              />
            </div>
            <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 flex items-center gap-2">
              <Filter size={18} />
              Filter
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4 font-bold">Order ID</th>
                  <th className="px-6 py-4 font-bold">Product</th>
                  <th className="px-6 py-4 font-bold">Farmer</th>
                  <th className="px-6 py-4 font-bold">Quantity</th>
                  <th className="px-6 py-4 font-bold">Total</th>
                  <th className="px-6 py-4 font-bold">Status</th>
                  <th className="px-6 py-4 font-bold">Date</th>
                  <th className="px-6 py-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {MOCK_ORDERS.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-bold text-slate-900">{order.id}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                          <Package size={16} />
                        </div>
                        <span className="text-sm font-medium text-slate-900">{order.product}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">{order.farmer}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{order.quantity}</td>
                    <td className="px-6 py-4 text-sm font-bold text-slate-900">{order.total}</td>
                    <td className="px-6 py-4">
                      <Badge variant={order.status === 'Completed' ? 'success' : order.status === 'Pending' ? 'warning' : 'primary'}>
                        {order.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">{order.date}</td>
                    <td className="px-6 py-4 text-right">
                      <button
                        title="View order details"
                        className="p-2 text-slate-400 hover:text-primary transition-colors">
                        <ExternalLink size={18} />
                      </button>
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