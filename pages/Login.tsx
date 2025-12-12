import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Store } from 'lucide-react';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
        setLoading(false);
        navigate('/');
    }, 1000);
  };

  return (
    <div className="min-h-full bg-white px-6 pt-20 pb-10 flex flex-col justify-between">
      <div>
        {/* Brand Header */}
        <div className="mb-10 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-[2rem] mx-auto flex items-center justify-center shadow-xl shadow-orange-500/30 mb-6 transform rotate-3">
                <Store size={40} className="text-white" />
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Merchant Hub</h1>
            <p className="text-gray-500 mt-2 font-medium">Manage your restaurant empire</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
                <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1 mb-1.5 block">Email Address</label>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Mail size={20} className="text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                        </div>
                        <input 
                            type="email" 
                            required
                            className="w-full bg-gray-50 border border-transparent text-gray-900 text-sm rounded-2xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 block w-full pl-12 p-4 font-semibold transition-all" 
                            placeholder="merchant@example.com" 
                        />
                    </div>
                </div>

                <div>
                    <div className="flex justify-between items-center mb-1.5 ml-1">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block">Password</label>
                        <a href="#" className="text-xs font-bold text-orange-600 hover:text-orange-700">Forgot?</a>
                    </div>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Lock size={20} className="text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                        </div>
                        <input 
                            type="password" 
                            required
                            className="w-full bg-gray-50 border border-transparent text-gray-900 text-sm rounded-2xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 block w-full pl-12 p-4 font-semibold transition-all" 
                            placeholder="••••••••" 
                        />
                    </div>
                </div>
            </div>

            <button 
                type="submit" 
                disabled={loading}
                className="w-full text-white bg-gray-900 hover:bg-black focus:ring-4 focus:ring-gray-300 font-bold rounded-2xl text-lg px-5 py-4 text-center shadow-xl shadow-gray-900/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
                {loading ? 'Signing in...' : 'Sign In'}
                {!loading && <ArrowRight size={20} />}
            </button>
        </form>
      </div>

      {/* Footer / Register Link */}
      <div className="text-center mt-8">
        <p className="text-sm text-gray-500 font-medium">
            Don't have an account?{' '}
            <Link to="/register" className="font-bold text-orange-600 hover:text-orange-700">
                Register Now
            </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
