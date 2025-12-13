import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, Store, Phone, Check } from 'lucide-react';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
        alert("Please agree to the Terms & Conditions");
        return;
    }
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
        setLoading(false);
        navigate('/');
    }, 1500);
  };

  return (
    <div className="min-h-full flex items-center justify-center p-4 bg-gray-100 dark:bg-gray-900 transition-colors duration-300 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-[80%] h-[40%] bg-blue-500/5 dark:bg-blue-500/5 blur-[100px] rounded-full pointer-events-none"></div>
      
      <div className="w-full relative z-10 max-h-[90vh] overflow-y-auto no-scrollbar">
        <div className="bg-white dark:bg-gray-800 rounded-[35px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] dark:shadow-none p-6 sm:p-8 border border-white/50 dark:border-gray-700 backdrop-blur-sm">
            
            <div className="mb-6">
                <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-1">Create Account</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Start your merchant journey.</p>
            </div>

            <form onSubmit={handleRegister} className="space-y-4">
                <div>
                    <label className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider ml-2 mb-1.5 block">Full Name</label>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <User size={18} className="text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                        </div>
                        <input 
                            type="text" 
                            required
                            className="w-full bg-gray-50 dark:bg-gray-700/50 border border-transparent text-gray-900 dark:text-white text-sm rounded-2xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 block pl-11 p-3.5 font-semibold transition-all placeholder-gray-400 dark:placeholder-gray-500 focus:bg-white dark:focus:bg-gray-700" 
                            placeholder="John Doe" 
                        />
                    </div>
                </div>

                <div>
                    <label className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider ml-2 mb-1.5 block">Email Address</label>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Mail size={18} className="text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                        </div>
                        <input 
                            type="email" 
                            required
                            className="w-full bg-gray-50 dark:bg-gray-700/50 border border-transparent text-gray-900 dark:text-white text-sm rounded-2xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 block pl-11 p-3.5 font-semibold transition-all placeholder-gray-400 dark:placeholder-gray-500 focus:bg-white dark:focus:bg-gray-700" 
                            placeholder="merchant@example.com" 
                        />
                    </div>
                </div>

                <div>
                    <label className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider ml-2 mb-1.5 block">Phone Number</label>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Phone size={18} className="text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                        </div>
                        <input 
                            type="tel" 
                            required
                            className="w-full bg-gray-50 dark:bg-gray-700/50 border border-transparent text-gray-900 dark:text-white text-sm rounded-2xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 block pl-11 p-3.5 font-semibold transition-all placeholder-gray-400 dark:placeholder-gray-500 focus:bg-white dark:focus:bg-gray-700" 
                            placeholder="+1 (555) 000-0000" 
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider ml-2 mb-1.5 block">Password</label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Lock size={18} className="text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                            </div>
                            <input 
                                type="password" 
                                required
                                className="w-full bg-gray-50 dark:bg-gray-700/50 border border-transparent text-gray-900 dark:text-white text-sm rounded-2xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 block pl-11 p-3.5 font-semibold transition-all placeholder-gray-400 dark:placeholder-gray-500 focus:bg-white dark:focus:bg-gray-700" 
                                placeholder="••••••" 
                            />
                        </div>
                    </div>
                    <div>
                        <label className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider ml-2 mb-1.5 block">Confirm</label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Lock size={18} className="text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                            </div>
                            <input 
                                type="password" 
                                required
                                className="w-full bg-gray-50 dark:bg-gray-700/50 border border-transparent text-gray-900 dark:text-white text-sm rounded-2xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 block pl-11 p-3.5 font-semibold transition-all placeholder-gray-400 dark:placeholder-gray-500 focus:bg-white dark:focus:bg-gray-700" 
                                placeholder="••••••" 
                            />
                        </div>
                    </div>
                </div>

                {/* Terms Checkbox */}
                <div 
                    className="flex items-center gap-3 p-2 cursor-pointer group"
                    onClick={() => setAgreed(!agreed)}
                >
                    <div className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all ${agreed ? 'bg-orange-500 border-orange-500' : 'border-gray-300 dark:border-gray-600'}`}>
                        {agreed && <Check size={12} className="text-white" strokeWidth={4} />}
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">I agree to <span className="text-gray-900 dark:text-white font-bold underline">Terms & Conditions</span></span>
                </div>

                <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full text-white bg-gradient-to-r from-orange-500 to-red-600 hover:to-red-700 focus:ring-4 focus:ring-orange-200 font-bold rounded-2xl text-lg px-5 py-4 text-center shadow-lg shadow-orange-500/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-2"
                >
                    {loading ? 'Creating Account...' : 'Register'}
                    {!loading && <ArrowRight size={20} />}
                </button>
            </form>

            <div className="text-center mt-6">
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                    Already have an account?{' '}
                    <Link to="/login" className="font-bold text-gray-900 dark:text-white hover:text-orange-600 dark:hover:text-orange-400 transition-colors ml-1">
                        Login
                    </Link>
                </p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Register;