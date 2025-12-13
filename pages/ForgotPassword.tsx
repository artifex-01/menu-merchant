import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, ArrowRight, ChevronLeft, CheckCircle } from 'lucide-react';

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
        setLoading(false);
        setSubmitted(true);
    }, 1500);
  };

  return (
    <div className="min-h-full flex items-center justify-center p-6 bg-gray-100 dark:bg-gray-900 transition-colors duration-300 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute bottom-0 left-0 w-[60%] h-[40%] bg-purple-500/5 dark:bg-purple-500/5 blur-[80px] rounded-full pointer-events-none"></div>

      <div className="w-full relative z-10">
        <div className="bg-white dark:bg-gray-800 rounded-[35px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] dark:shadow-none p-8 border border-white/50 dark:border-gray-700 backdrop-blur-sm">
            
            <button onClick={() => navigate('/login')} className="flex items-center gap-1 text-xs font-bold text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white mb-6 transition-colors">
                <ChevronLeft size={16} /> Back to Login
            </button>

            {!submitted ? (
                <>
                    <div className="mb-8">
                        <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-2">Reset Password</h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
                            Enter the email associated with your account and we'll send you a link to reset your password.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider ml-2 mb-1.5 block">Email Address</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Mail size={18} className="text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                                </div>
                                <input 
                                    type="email" 
                                    required
                                    className="w-full bg-gray-50 dark:bg-gray-700/50 border border-transparent text-gray-900 dark:text-white text-sm rounded-2xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 block pl-11 p-4 font-semibold transition-all placeholder-gray-400 dark:placeholder-gray-500 focus:bg-white dark:focus:bg-gray-700" 
                                    placeholder="merchant@example.com" 
                                />
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            disabled={loading}
                            className="w-full text-white bg-gradient-to-r from-orange-500 to-red-600 hover:to-red-700 focus:ring-4 focus:ring-orange-200 font-bold rounded-2xl text-lg px-5 py-4 text-center shadow-lg shadow-orange-500/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <span className="animate-pulse">Sending Link...</span>
                            ) : (
                                <>
                                    Send Reset Link <ArrowRight size={20} />
                                </>
                            )}
                        </button>
                    </form>
                </>
            ) : (
                <div className="text-center py-4">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                        <CheckCircle size={32} />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Check your inbox</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-8">
                        We have sent a password reset link to your email address.
                    </p>
                    
                    <button 
                        onClick={() => navigate('/login')}
                        className="w-full text-gray-700 dark:text-white bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 font-bold rounded-2xl text-base px-5 py-3.5 transition-all"
                    >
                        Back to Login
                    </button>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;