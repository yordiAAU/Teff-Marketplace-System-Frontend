import React from 'react';
import {DashboardLayout} from '../components/layout/DashboardLayout';
import { User, Mail, Phone, MapPin, Shield, Camera, Save } from 'lucide-react';

interface ProfileProps {
  role: 'customer' | 'farmer' | 'admin';
}

export default function Profile({ role }: ProfileProps) {
  const userData = {
    name: `${role.charAt(0).toUpperCase() + role.slice(1)} User`,
    email: `${role}@teffmarket.com`,
    phone: '+251 911 234 567',
    address: 'Bole Sub-city, Addis Ababa, Ethiopia',
    joined: 'January 2024',
    status: 'Verified'
  };

  return (
    <DashboardLayout role={role}>
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Account Settings</h1>
          <p className="text-slate-500">Manage your personal information and preferences.</p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-primary to-secondary"></div>
          <div className="px-8 pb-8">
            <div className="relative -mt-12 mb-6 flex items-end justify-between">
              <div className="relative">
                <div className="w-32 h-32 rounded-3xl bg-white p-1 shadow-xl">
                  <div className="w-full h-full rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 overflow-hidden">
                    <User size={64} />
                  </div>
                </div>
                <button 
                title="Change Profile Picture"
                
                className="absolute bottom-2 right-2 p-2 bg-primary text-white rounded-xl shadow-lg hover:scale-110 transition-transform">
                  <Camera size={18} />
                </button>
              </div>
              <div className="flex gap-3 mb-2">
                <button className="px-6 py-2.5 rounded-xl border border-slate-200 font-bold text-slate-600 hover:bg-slate-50 transition-colors">
                  Cancel
                </button>
                <button className="px-6 py-2.5 rounded-xl bg-primary text-white font-bold shadow-lg shadow-primary/20 flex items-center gap-2 hover:scale-105 transition-all">
                  <Save size={18} />
                  Save Changes
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <User size={20} className="text-primary" />
                  Personal Information
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-semibold text-slate-700 block mb-1.5">Full Name</label>
                    <input 
                      aria-label="Full Name"
                      placeholder="Full Name"
                      type="text" 
                      defaultValue={userData.name}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-slate-700 block mb-1.5">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input 
                        aria-label="Email Address"
                        placeholder="Email Address"
                        type="email" 
                        defaultValue={userData.email}
                        className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-slate-700 block mb-1.5">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input 
                        aria-label="Phone Number"
                        placeholder="Phone Number"
                        type="tel" 
                        defaultValue={userData.phone}
                        className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <MapPin size={20} className="text-primary" />
                  Location & Security
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-semibold text-slate-700 block mb-1.5">Address</label>
                    <textarea 
                      aria-label="Address"
                      placeholder="Address"
                      rows={3}
                      defaultValue={userData.address}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
                    />
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-bold text-slate-900 flex items-center gap-2">
                        <Shield size={16} className="text-green-600" />
                        Account Status
                      </span>
                      <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded-lg">
                        {userData.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">Member since {userData.joined}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-red-50 rounded-3xl border border-red-100 p-8 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-red-900">Danger Zone</h3>
            <p className="text-red-600 text-sm">Once you delete your account, there is no going back. Please be certain.</p>
          </div>
          <button className="px-6 py-2.5 rounded-xl bg-red-600 text-white font-bold hover:bg-red-700 transition-colors">
            Delete Account
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}