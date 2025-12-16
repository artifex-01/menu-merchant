import React, { useState } from 'react';
import { Lock, Shield, Smartphone, Key, Monitor } from 'lucide-react';

const LoginSecurity: React.FC = () => {
  const [twoFactor, setTwoFactor] = useState(false);
  
  const handlePasswordChange = (e: React.FormEvent) => {
      e.preventDefault();
      alert("Password updated successfully!");
  };

  return (
    <div className="px-6 py-6 space-y-8">
        {/* Password Section */}
        <div>
            <h3 className="text-lg font-extrabold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Key size={20} className="text-orange-500" />
                Change Password
            </h3>
            <form onSubmit={handlePasswordChange} className="space-y-4">
                <input 
                    type="password" 
                    placeholder="Current Password"
                    className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl px-5 py-4 text-sm font-bold text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500/20"
                />
                <input 
                    type="password" 
                    placeholder="New Password"
                    className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl px-5 py-4 text-sm font-bold text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500/20"
                />
                <button className="w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold py-4 rounded-2xl shadow-lg active:scale-95 transition-all">
                    Update Password
                </button>
            </form>
        </div>

        {/* 2FA Section */}
        <div>
            <h3 className="text-lg font-extrabold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Shield size={20} className="text-orange-500" />
                Two-Factor Auth
            </h3>
            <div className="bg-white dark:bg-gray-800 p-5 rounded-3xl border border-gray-100 dark:border-gray-700 flex items-center justify-between">
                <div>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">Enable 2FA</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Secure via SMS/App</p>
                </div>
                <div 
                    onClick={() => setTwoFactor(!twoFactor)}
                    className={`w-14 h-8 rounded-full p-1 transition-colors duration-300 cursor-pointer ${twoFactor ? 'bg-orange-500' : 'bg-gray-200 dark:bg-gray-700'}`}
                >
                    <div className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${twoFactor ? 'translate-x-6' : 'translate-x-0'}`}></div>
                </div>
            </div>
        </div>

        {/* Active Sessions */}
        <div>
            <h3 className="text-lg font-extrabold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Monitor size={20} className="text-orange-500" />
                Active Sessions
            </h3>
            <div className="space-y-3">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-3xl border border-gray-100 dark:border-gray-700 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                        <Smartphone size={18} />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-gray-900 dark:text-white">iPhone 14 Pro</p>
                        <p className="text-[10px] text-gray-400">New York, US • Active Now</p>
                    </div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-3xl border border-gray-100 dark:border-gray-700 flex items-center gap-4 opacity-70">
                    <div className="w-10 h-10 rounded-full bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400 flex items-center justify-center">
                        <Monitor size={18} />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-gray-900 dark:text-white">MacBook Pro</p>
                        <p className="text-[10px] text-gray-400">London, UK • 2 days ago</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default LoginSecurity;