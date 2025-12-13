import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Store, Eye, EyeOff } from 'lucide-react';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
    <div className="min-h-full flex items-center justify-center p-6 bg-gray-100 dark:bg-gray-900 transition-colors duration-300 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[80%] h-[40%] bg-orange-500/10 dark:bg-orange-500/5 blur-[80px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[40%] bg-red-500/10 dark:bg-red-500/5 blur-[80px] rounded-full pointer-events-none"></div>

      <div className="w-full relative z-10">
        <div className="bg-white dark:bg-gray-800 rounded-[35px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] dark:shadow-none p-8 border border-white/50 dark:border-gray-700 backdrop-blur-sm">
            
            {/* Brand Header */}
            <div className="mb-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-[1.5rem] mx-auto flex items-center justify-center shadow-lg shadow-orange-500/30 mb-4 transform rotate-3 hover:rotate-6 transition-transform">
                    <Store size={32} className="text-white" />
                </div>
                <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">Merchant Login</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 font-medium">Welcome back to your dashboard</p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-5">
                <div>
                    <label className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider ml-2 mb-1.5 block">Email or Phone</label>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Mail size={18} className="text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                        </div>
                        <input 
                            type="text" 
                            required
                            className="w-full bg-gray-50 dark:bg-gray-700/50 border border-transparent text-gray-900 dark:text-white text-sm rounded-2xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 block pl-11 p-4 font-semibold transition-all placeholder-gray-400 dark:placeholder-gray-500 focus:bg-white dark:focus:bg-gray-700" 
                            placeholder="merchant@example.com" 
                        />
                    </div>
                </div>

                <div>
                    <div className="flex justify-between items-center mb-1.5 ml-2">
                        <label className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider block">Password</label>
                    </div>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Lock size={18} className="text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                        </div>
                        <input 
                            type={showPassword ? "text" : "password"} 
                            required
                            className="w-full bg-gray-50 dark:bg-gray-700/50 border border-transparent text-gray-900 dark:text-white text-sm rounded-2xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 block pl-11 pr-12 p-4 font-semibold transition-all placeholder-gray-400 dark:placeholder-gray-500 focus:bg-white dark:focus:bg-gray-700" 
                            placeholder="••••••••" 
                        />
                        <button 
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                </div>

                <div className="flex justify-end">
                    <Link to="/forgot-password" class="text-xs font-bold text-orange-600 dark:text-orange-400 hover:text-orange-700 transition-colors">
                        Forgot Password?
                    </Link>
                </div>

                <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full text-white bg-gradient-to-r from-orange-500 to-red-600 hover:to-red-700 focus:ring-4 focus:ring-orange-200 font-bold rounded-2xl text-lg px-5 py-4 text-center shadow-lg shadow-orange-500/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-2"
                >
                    {loading ? (
                        <span className="animate-pulse">Signing in...</span>
                    ) : (
                        <>
                            Login <ArrowRight size={20} />
                        </>
                    )}
                </button>
            </form>

            {/* Footer */}
            <div className="text-center mt-8">
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                    Don't have an account?{' '}
                    <Link to="/register" className="font-bold text-gray-900 dark:text-white hover:text-orange-600 dark:hover:text-orange-400 transition-colors ml-1">
                        Register
                    </Link>
                </p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Login;