import React from 'react';
    import { Link } from 'react-router-dom';
    import { Home } from 'lucide-react';

    export default function NotFound() {
      return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
          <div className="text-center">
            <h1 className="text-9xl font-bold text-primary/20 mb-4">404</h1>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Page Not Found</h2>
            <p className="text-slate-500 mb-8 max-w-md mx-auto">
              The page you are looking for doesn't exist or has been moved.
            </p>
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-all"
            >
              <Home size={20} />
              Back to Home
            </Link>
          </div>
        </div>
      );
    }