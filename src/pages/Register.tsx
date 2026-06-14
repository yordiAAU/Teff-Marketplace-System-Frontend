import React, { useState } from 'react';
    import { Link, useNavigate } from 'react-router-dom';
    import { motion } from 'framer-motion';
    import { User, Mail, Lock, ArrowRight, ShieldCheck } from 'lucide-react';

    export default function Register() {
      const [role, setRole] = useState<'customer' | 'farmer'>('customer');
      const navigate = useNavigate();

      const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        navigate(`/${role}/dashboard`);
      };

      return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-xl w-full bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden"
          >
            <div className="p-8 lg:p-12">
              <div className="text-center mb-10">
                <Link to="/" className="inline-flex items-center gap-2 mb-6">
                  <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold text-xl">T</span>
                  </div>
                  <span className="text-2xl font-bold font-serif text-slate-900">TeffMarket</span>
                </Link>
                <h2 className="text-3xl font-bold text-slate-900 mb-2">Create Account</h2>
                <p className="text-slate-500">Join the modern teff marketplace today</p>
              </div>

              <form onSubmit={handleRegister} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setRole('customer')}
                    className={`
                      p-4 rounded-2xl border-2 text-left transition-all
                      ${role === 'customer' 
                        ? 'border-primary bg-primary/5 ring-4 ring-primary/10' 
                        : 'border-slate-100 hover:border-slate-200'}
                    `}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${role === 'customer' ? 'bg-primary text-white' : 'bg-slate-100 text-slate-500'}`}>
                      <User size={20} />
                    </div>
                    <p className="font-bold text-slate-900">Customer</p>
                    <p className="text-xs text-slate-500">I want to buy teff</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('farmer')}
                    className={`
                      p-4 rounded-2xl border-2 text-left transition-all
                      ${role === 'farmer' 
                        ? 'border-primary bg-primary/5 ring-4 ring-primary/10' 
                        : 'border-slate-100 hover:border-slate-200'}
                    `}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${role === 'farmer' ? 'bg-primary text-white' : 'bg-slate-100 text-slate-500'}`}>
                      <ShieldCheck size={20} />
                    </div>
                    <p className="font-bold text-slate-900">Farmer</p>
                    <p className="text-xs text-slate-500">I want to sell teff</p>
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input 
                      type="text" 
                      required
                      placeholder="Full Name"
                      className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                    />
                  </div>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input 
                      type="email" 
                      required
                      placeholder="Email Address"
                      className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                      <input 
                        type="password" 
                        required
                        placeholder="Password"
                        className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                      />
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                      <input 
                        type="password" 
                        required
                        placeholder="Confirm"
                        className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-primary/30"
                >
                  Create Account <ArrowRight size={20} />
                </button>
              </form>

              <div className="mt-10 text-center">
                <p className="text-slate-500">
                  Already have an account? {' '}
                  <Link to="/login" className="text-primary font-bold hover:underline">Sign In</Link>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      );
    }