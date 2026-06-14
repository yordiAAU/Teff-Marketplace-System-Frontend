import React from 'react';
import {DashboardLayout} from '../../components/layout/DashboardLayout';
import PriceTrendChart from '../../components/charts/PriceTrendChart';
import {  PlatformGrowthChart } from '../../components/charts/PlatformGrowthChart';
import { Users, Shield, ShoppingBag, Package } from 'lucide-react';

export default function AdminDashboard() {
  return (
    <DashboardLayout role="admin">
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">System Overview</h1>
          <p className="text-slate-500">Platform-wide monitoring and market insights.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: 'Total Users', value: '12,482', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'Verified Farmers', value: '842', icon: Shield, color: 'text-green-600', bg: 'bg-green-50' },
            { label: 'Total Orders', value: '8,420', icon: ShoppingBag, color: 'text-primary', bg: 'bg-primary/10' },
            { label: 'Active Products', value: '3,120', icon: Package, color: 'text-amber-600', bg: 'bg-amber-50' },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className={`w-12 h-12 ${stat.bg} rounded-xl flex items-center justify-center ${stat.color} mb-4`}>
                <stat.icon size={24} />
              </div>
              <p className="text-sm font-medium text-slate-500">{stat.label}</p>
              <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
            </div>
          ))}
        </div>

        <PriceTrendChart title="Market Price Trend" />

        <PlatformGrowthChart />
      </div>
    </DashboardLayout>
  );
}
