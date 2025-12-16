import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Save, User, Mail, Phone, Edit2 } from 'lucide-react';
import { getMerchantProfile, updateMerchantProfile } from '../services/data';
import { MerchantProfile } from '../types';

const EditProfile: React.FC = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<MerchantProfile | null>(null);
  const [originalProfile, setOriginalProfile] = useState<MerchantProfile | null>(null);

  useEffect(() => {
    const data = getMerchantProfile();
    setProfile(data);
    setOriginalProfile(data);
  }, []);

  const handleSave = () => {
    if (profile) {
      updateMerchantProfile(profile);
      navigate('/profile');
    }
  };

  const handleAvatarChange = () => {
    if (profile) {
      setProfile({
        ...profile,
        avatar: `https://picsum.photos/200/200?random=${Math.floor(Math.random() * 9999)}`
      });
    }
  };

  if (!profile) return null;

  const hasChanges = JSON.stringify(profile) !== JSON.stringify(originalProfile);

  return (
    <div className="min-h-full bg-white dark:bg-gray-900 relative flex flex-col">
      {/* Main Content */}
      <div className="flex-1 px-6 py-6 pb-28">
        
        {/* Avatar Section */}
        <div className="flex flex-col items-center mb-8">
            <div className="relative group cursor-pointer" onClick={handleAvatarChange}>
                <div className="w-28 h-28 rounded-full bg-gray-100 dark:bg-gray-800 border-4 border-white dark:border-gray-800 shadow-lg overflow-hidden relative">
                    <img src={profile.avatar} className="w-full h-full object-cover" alt="Avatar" />
                </div>
                <div className="absolute bottom-1 right-1 bg-gray-900 dark:bg-white text-white dark:text-gray-900 p-2 rounded-full shadow-md border-2 border-white dark:border-gray-900 transition-transform active:scale-95">
                    <Camera size={14} />
                </div>
            </div>
            <p className="text-xs font-bold text-gray-400 mt-3">Tap to change profile photo</p>
        </div>

        {/* Form Fields */}
        <div className="space-y-5">
            <div className="group">
                <label className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 block">Full Name</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <User size={18} className="text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                    </div>
                    <input 
                        type="text"
                        value={profile.name}
                        onChange={(e) => setProfile({...profile, name: e.target.value})}
                        className="w-full bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-orange-500/20 rounded-2xl pl-11 pr-4 py-3.5 text-base font-bold text-gray-900 dark:text-white focus:outline-none focus:bg-white dark:focus:bg-gray-700 transition-all placeholder-gray-400"
                        placeholder="Your Name"
                    />
                </div>
            </div>

            <div className="group">
                <label className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 block">Email Address</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Mail size={18} className="text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                    </div>
                    <input 
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({...profile, email: e.target.value})}
                        className="w-full bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-orange-500/20 rounded-2xl pl-11 pr-4 py-3.5 text-base font-bold text-gray-900 dark:text-white focus:outline-none focus:bg-white dark:focus:bg-gray-700 transition-all placeholder-gray-400"
                        placeholder="email@example.com"
                    />
                </div>
            </div>

            <div className="group">
                <label className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 block">Phone Number</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Phone size={18} className="text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                    </div>
                    <input 
                        type="tel"
                        value={profile.phone}
                        onChange={(e) => setProfile({...profile, phone: e.target.value})}
                        className="w-full bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-orange-500/20 rounded-2xl pl-11 pr-4 py-3.5 text-base font-bold text-gray-900 dark:text-white focus:outline-none focus:bg-white dark:focus:bg-gray-700 transition-all placeholder-gray-400"
                        placeholder="+1 000 000 0000"
                    />
                </div>
            </div>
        </div>
      </div>

      {/* Fixed Save Button Area */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg border-t border-gray-100 dark:border-gray-800 z-30">
         <button 
            onClick={handleSave}
            disabled={!hasChanges}
            className={`w-full font-extrabold text-lg py-4 rounded-2xl shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2 ${
                hasChanges 
                ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-orange-500/20 hover:to-red-700' 
                : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed shadow-none'
            }`}
        >
            <Save size={20} /> Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditProfile;