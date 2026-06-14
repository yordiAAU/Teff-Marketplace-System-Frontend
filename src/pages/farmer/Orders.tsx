import React, { useState, useMemo } from 'react';
import {DashboardLayout} from '../../components/layout/DashboardLayout';
import { Badge } from '@/components/ui/badge';
import { Search, ChevronDown, CheckCircle2, Clock, Package } from 'lucide-react';
import { toast } from 'react-toastify';

const MOCK_RECEIVED_ORDERS = [
  { id: 'ORD-7281', customer: 'Helen Gebre', product: 'Premium White Teff', quantity: '2 bags', status: 'Pending', date: 'Oct 24, 2023' },
  { id: 'ORD-7280', customer: 'Dawit Isaac', product: 'Organic Brown Teff', quantity: '1 bag', status: 'Processing', date: 'Oct 23, 2023' },
  { id: 'ORD-7279', customer: 'Sara Tadesse', product: 'Mixed Grain Teff', quantity: '5 bags', status: 'Completed', date: 'Oct 20, 2023' },
  { id: 'ORD-7278', customer: 'John Doe', product: 'Premium White Teff', quantity: '3 bags', status: 'Pending', date: 'Oct 19, 2023' },
  { id: 'ORD-7277', customer: 'Mulugeta Tesfaye', product: 'Organic Brown Teff', quantity: '2 bags', status: 'Completed', date: 'Oct 18, 2023' },
];

const STATUS_FILTERS = ['All', 'Pending', 'Processing', 'Completed'] as const;

export default function FarmerOrders() {
  const [orders, setOrders] = useState(MOCK_RECEIVED_ORDERS);
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [search, setSearch] = useState('');

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesStatus = statusFilter === 'All' || order.status === statusFilter;
      const matchesSearch =
        order.customer.toLowerCase().includes(search.toLowerCase()) ||
        order.product.toLowerCase().includes(search.toLowerCase()) ||
        order.id.toLowerCase().includes(search.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [orders, statusFilter, search]);

  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = { All: orders.length };
    STATUS_FILTERS.slice(1).forEach((s) => {
      counts[s] = orders.filter((o) => o.status === s).length;
    });
    return counts;
  }, [orders]);

  const updateStatus = (id: string, newStatus: string) => {
    setOrders(orders.map((order) => (order.id === id ? { ...order, status: newStatus } : order)));
    toast.success(`Order ${id} updated to ${newStatus}`);
  };

  return (
    <DashboardLayout role="farmer">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Customer Orders</h1>
            <p className="text-slate-500">Manage orders received from your customers.</p>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search orders..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 outline-none w-64"
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-100 flex items-center gap-2 overflow-x-auto">
            {STATUS_FILTERS.map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  statusFilter === status
                    ? 'bg-secondary text-white shadow-sm'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {status}
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  statusFilter === status ? 'bg-white/20' : 'bg-slate-200'
                }`}>
                  {statusCounts[status]}
                </span>
              </button>
            ))}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4 font-bold">Customer</th>
                  <th className="px-6 py-4 font-bold">Product</th>
                  <th className="px-6 py-4 font-bold">Quantity</th>
                  <th className="px-6 py-4 font-bold">Status</th>
                  <th className="px-6 py-4 font-bold">Date</th>
                  <th className="px-6 py-4 font-bold text-right">Update Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-sm text-slate-400">
                      No orders found for this filter.
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500">
                            {order.customer.charAt(0)}
                          </div>
                          <span className="text-sm font-medium text-slate-900">{order.customer}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">{order.product}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{order.quantity}</td>
                      <td className="px-6 py-4">
                        <Badge variant={order.status === 'Completed' ? 'success' : order.status === 'Pending' ? 'warning' : 'primary'}>
                          {order.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-500">{order.date}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="relative inline-block text-left group">
                          <button className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors">
                            Change Status
                            <ChevronDown size={14} />
                          </button>
                          <div className="absolute right-0 mt-2 w-40 bg-white border border-slate-200 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                            <div className="p-1">
                              {['Pending', 'Processing', 'Completed'].map((status) => (
                                <button
                                  key={status}
                                  onClick={() => updateStatus(order.id, status)}
                                  className="w-full text-left px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 hover:text-primary rounded-lg transition-colors flex items-center gap-2"
                                >
                                  {status === 'Pending' && <Clock size={14} />}
                                  {status === 'Processing' && <Package size={14} />}
                                  {status === 'Completed' && <CheckCircle2 size={14} />}
                                  {status}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
