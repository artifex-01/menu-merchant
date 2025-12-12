import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, Store } from 'lucide-react';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
        setLoading(false);
        navigate('/');
    }, 1500);
  };

  return (
    <div className="min-h-full bg-white px-6 pt-16 pb-10 flex flex-col justify-between">
      <div>
         {/* Minimal Header */}
         <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600">
                <Store size={20} />
            </div>
            <span className="font-bold text-gray-900 tracking-tight">Merchant Hub</span>
         </div>

        <div className="mb-8">
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">Create Account</h1>
            <p className="text-gray-500 font-medium">Start managing your store digital presence today.</p>
        </div>

        {/* Register Form */}
        <form onSubmit={handleRegister} className="space-y-5">
            <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1 mb-1.5 block">Full Name</label>
                <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <User size={20} className="text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                    </div>
                    <input 
                        type="text" 
                        required
                        className="w-full bg-gray-50 border border-transparent text-gray-900 text-sm rounded-2xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 block w-full pl-12 p-4 font-semibold transition-all" 
                        placeholder="John Doe" 
                    />
                </div>
            </div>

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
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1 mb-1.5 block">Password</label>
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

            <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1 mb-1.5 block">Confirm Password</label>
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

            <button 
                type="submit" 
                disabled={loading}
                className="w-full text-white bg-gradient-to-r from-orange-500 to-red-500 hover:to-red-600 focus:ring-4 focus:ring-orange-200 font-bold rounded-2xl text-lg px-5 py-4 text-center shadow-xl shadow-orange-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-4"
            >
                {loading ? 'Creating Account...' : 'Get Started'}
                {!loading && <ArrowRight size={20} />}
            </button>
        </form>
      </div>

      {/* Footer / Login Link */}
      <div className="text-center mt-8">
        <p className="text-sm text-gray-500 font-medium">
            Already have an account?{' '}
            <Link to="/login" className="font-bold text-gray-900 hover:underline">
                Log in
            </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;