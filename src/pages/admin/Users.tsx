import React, { useState, useMemo } from 'react';
import {DashboardLayout} from '../../components/layout/DashboardLayout';
import { Badge } from '@/components/ui/badge';
import Modal from '../../components/ui/Modal';
import { Search, UserPlus, Mail, Shield, MapPin, Phone, Star, Package, Eye } from 'lucide-react';
import { MOCK_FARMERS, MOCK_CUSTOMERS, PRODUCT_CATALOG } from '../../data/mockData';
import type { FarmerUser } from '../../data/mockData';

type UserTab = 'customer' | 'farmer';

export default function AdminUsers() {
  const [activeTab, setActiveTab] = useState<UserTab>('customer');
  const [search, setSearch] = useState('');
  const [productFilter, setProductFilter] = useState('All');
  const [selectedFarmer, setSelectedFarmer] = useState<FarmerUser | null>(null);

  const filteredCustomers = useMemo(() => {
    return MOCK_CUSTOMERS.filter(
      (u) =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const filteredFarmers = useMemo(() => {
    return MOCK_FARMERS.filter((u) => {
      const matchesSearch =
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase());
      const matchesProduct =
        productFilter === 'All' || u.products.includes(productFilter);
      return matchesSearch && matchesProduct;
    });
  }, [search, productFilter]);

  return (
    <DashboardLayout role="admin">
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">User Management</h1>
            <p className="text-slate-500">Manage all platform users and their permissions.</p>
          </div>
          <button className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-slate-800 transition-all flex items-center gap-2">
            <UserPlus size={20} />
            Add New User
          </button>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => { setActiveTab('customer'); setProductFilter('All'); }}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === 'customer'
                ? 'bg-slate-900 text-white shadow-lg'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Mail size={16} />
            Customers
            <span className={`text-xs px-2 py-0.5 rounded-full ${
              activeTab === 'customer' ? 'bg-white/20' : 'bg-slate-100'
            }`}>
              {MOCK_CUSTOMERS.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('farmer')}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === 'farmer'
                ? 'bg-primary text-white shadow-lg shadow-primary/20'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Shield size={16} />
            Farmers
            <span className={`text-xs px-2 py-0.5 rounded-full ${
              activeTab === 'farmer' ? 'bg-white/20' : 'bg-slate-100'
            }`}>
              {MOCK_FARMERS.length}
            </span>
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search users by name or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 outline-none"
              />
            </div>
            {activeTab === 'farmer' && (
              <select
              title='Product'
                value={productFilter}
                onChange={(e) => setProductFilter(e.target.value)}
                className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 focus:ring-2 focus:ring-primary/20 outline-none"
              >
                <option value="All">All Products</option>
                {PRODUCT_CATALOG.map((p) => (
                  <option key={p.id} value={p.name}>{p.name}</option>
                ))}
              </select>
            )}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4 font-bold">User</th>
                  {activeTab === 'farmer' && <th className="px-6 py-4 font-bold">Products</th>}
                  <th className="px-6 py-4 font-bold">Status</th>
                  <th className="px-6 py-4 font-bold">Joined Date</th>
                  {activeTab === 'farmer' && <th className="px-6 py-4 font-bold text-right">Actions</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {activeTab === 'customer' ? (
                  filteredCustomers.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-12 text-center text-sm text-slate-400">No customers found.</td>
                    </tr>
                  ) : (
                    filteredCustomers.map((user) => (
                      <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 font-bold">
                              {user.name.charAt(0)}
                            </div>
                            <div>
                              <p className="text-sm font-bold text-slate-900">{user.name}</p>
                              <p className="text-xs text-slate-500">{user.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <Badge variant={user.status === 'Active' ? 'success' : user.status === 'Pending' ? 'warning' : 'error'}>
                            {user.status}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-500">{user.joined}</td>
                      </tr>
                    ))
                  )
                ) : (
                  filteredFarmers.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-sm text-slate-400">No farmers found.</td>
                    </tr>
                  ) : (
                    filteredFarmers.map((user) => (
                      <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                              {user.name.charAt(0)}
                            </div>
                            <div>
                              <p className="text-sm font-bold text-slate-900">{user.name}</p>
                              <p className="text-xs text-slate-500">{user.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-1">
                            {user.products.slice(0, 2).map((p) => (
                              <span key={p} className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{p}</span>
                            ))}
                            {user.products.length > 2 && (
                              <span className="text-xs text-slate-400">+{user.products.length - 2}</span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <Badge variant={user.status === 'Active' ? 'success' : user.status === 'Pending' ? 'warning' : 'error'}>
                            {user.status}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-500">{user.joined}</td>
                        <td className="px-6 py-4 text-right">
                          <button
                            title="View Farmer Details"
                            onClick={() => setSelectedFarmer(user)}
                            className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <Eye size={18} />
                          </button>
                        </td>
                      </tr>
                    ))
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Modal
        isOpen={!!selectedFarmer}
        title="Farmer Details"
        onClose={() => setSelectedFarmer(null)}
        size="lg"
      >
        {selectedFarmer && (
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary text-2xl font-bold">
                {selectedFarmer.name.charAt(0)}
              </div>
              <div className="flex-1">
                <h4 className="text-xl font-bold text-slate-900">{selectedFarmer.name}</h4>
                <p className="text-sm text-slate-500">{selectedFarmer.email}</p>
                <div className="flex items-center gap-3 mt-2">
                  <Badge variant={selectedFarmer.status === 'Active' ? 'success' : 'warning'}>
                    {selectedFarmer.status}
                  </Badge>
                  <span className="flex items-center gap-1 text-xs text-amber-600 font-bold">
                    <Star size={12} fill="currentColor" /> {selectedFarmer.rating}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                <Phone size={16} className="text-slate-400" />
                <div>
                  <p className="text-xs text-slate-400">Phone</p>
                  <p className="text-sm font-medium text-slate-700">{selectedFarmer.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                <MapPin size={16} className="text-slate-400" />
                <div>
                  <p className="text-xs text-slate-400">Location</p>
                  <p className="text-sm font-medium text-slate-700">{selectedFarmer.location}</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-green-50 rounded-xl border border-green-100">
              <p className="text-xs text-green-600 font-medium mb-1">Total Sales</p>
              <p className="text-2xl font-bold text-green-700">${selectedFarmer.totalSales.toLocaleString()}</p>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3">
                <Package size={16} className="text-primary" />
                <p className="text-sm font-bold text-slate-900">Product Listings ({selectedFarmer.products.length})</p>
              </div>
              <div className="space-y-2">
                {selectedFarmer.products.map((product) => (
                  <div key={product} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-sm font-medium text-slate-700">{product}</span>
                    <Badge variant="success">Active</Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </DashboardLayout>
  );
}
