import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LogOut, Settings, Bell, 
  User, ChevronRight, HelpCircle, Shield, 
  Store, Star, Moon
} from 'lucide-react';
import { getMerchantProfile } from '../services/data';
import { MerchantProfile } from '../types';

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [userProfile, setUserProfile] = useState<MerchantProfile | null>(null);

  useEffect(() => {
    // Theme initialization
    if (localStorage.getItem('theme') === 'dark' || document.documentElement.classList.contains('dark')) {
        setIsDarkMode(true);
        document.documentElement.classList.add('dark');
    }
    
    // Load profile data from central store
    setUserProfile(getMerchantProfile());
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (newMode) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    }
  };

  const handleLogout = () => {
    navigate('/login');
  };

  if (!userProfile) return null;

  const menuGroups = [
    {
      title: "Account",
      items: [
        { 
            icon: User, 
            label: "Personal Information", 
            sub: "Edit your details",
            action: () => navigate('/profile/edit')
        },
        { 
            icon: Shield, 
            label: "Login & Security", 
            sub: "2FA, Password",
            action: () => navigate('/profile/security')
        },
        { 
            icon: Bell, 
            label: "Notifications", 
            sub: "Orders, Alerts",
            action: () => navigate('/profile/notifications')
        },
      ]
    },
    {
      title: "Preferences",
      items: [
        { 
            icon: Moon, 
            label: "Dark Mode", 
            sub: isDarkMode ? "Enabled" : "Disabled", 
            isToggle: true, 
            active: isDarkMode, 
            action: toggleDarkMode 
        },
      ]
    },
    {
      title: "Support",
      items: [
        { 
            icon: HelpCircle, 
            label: "Help Center", 
            sub: "FAQ, Chat support",
            action: () => navigate('/profile/help')
        },
      ]
    }
  ];

  return (
    <div className="bg-gray-50 min-h-full transition-colors duration-300 dark:bg-gray-900 relative">
        {/* Profile Header */}
        <div className="bg-white px-6 pt-4 pb-8 rounded-b-[40px] shadow-sm border-b border-gray-100 mb-6 transition-colors duration-300 dark:bg-gray-800 dark:border-gray-800">
            <div className="flex items-center gap-4 mb-6">
                <div className="relative group cursor-pointer" onClick={() => navigate('/profile/edit')}>
                    <div className="w-20 h-20 rounded-full bg-gray-900 p-1 dark:bg-gray-700 transition-colors">
                         <img src={userProfile.avatar} alt="Merchant" className="w-full h-full rounded-full object-cover border-4 border-white dark:border-gray-800 transition-colors" />
                    </div>
                    <div className="absolute bottom-0 right-0 bg-green-500 w-5 h-5 rounded-full border-4 border-white dark:border-gray-800 transition-colors"></div>
                    <div className="absolute inset-0 bg-black/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                        <Settings size={20} />
                    </div>
                </div>
                <div>
                    <h2 className="text-xl font-bold text-gray-900 leading-tight dark:text-white transition-colors">{userProfile.name}</h2>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide shadow-sm">
                            {userProfile.plan}
                        </span>
                        <span className="text-xs text-gray-400">ID: {userProfile.id}</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">{userProfile.email}</p>
                </div>
            </div>

            {/* Quick Stats Row */}
            <div className="flex gap-3">
                <div className="flex-1 bg-gray-50 p-3 rounded-2xl border border-gray-100 flex flex-col items-center justify-center transition-colors dark:bg-gray-700 dark:border-gray-600">
                    <div className="flex items-center gap-1.5 text-blue-600 mb-1 dark:text-blue-400">
                        <Store size={14} />
                        <span className="text-[10px] font-bold uppercase tracking-wider">Stores</span>
                    </div>
                    <span className="text-lg font-extrabold text-gray-900 dark:text-white transition-colors">{userProfile.storeCount}</span>
                </div>
                <div className="flex-1 bg-gray-50 p-3 rounded-2xl border border-gray-100 flex flex-col items-center justify-center transition-colors dark:bg-gray-700 dark:border-gray-600">
                    <div className="flex items-center gap-1.5 text-yellow-600 mb-1 dark:text-yellow-400">
                        <Star size={14} />
                        <span className="text-[10px] font-bold uppercase tracking-wider">Rating</span>
                    </div>
                    <span className="text-lg font-extrabold text-gray-900 dark:text-white transition-colors">{userProfile.rating}</span>
                </div>
            </div>
        </div>

        {/* Menu Groups */}
        <div className="px-6 space-y-6 pb-6">
            {menuGroups.map((group, idx) => (
                <div key={idx}>
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 ml-2">{group.title}</h3>
                    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden transition-colors dark:bg-gray-800 dark:border-gray-700">
                        {group.items.map((item: any, i) => (
                            <button 
                                key={i}
                                onClick={item.action}
                                className={`w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors dark:hover:bg-gray-700 ${i !== group.items.length - 1 ? 'border-b border-gray-50 dark:border-gray-700' : ''}`}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${item.bg || 'bg-gray-100 dark:bg-gray-700'} ${item.color || 'text-gray-600 dark:text-gray-300'}`}>
                                        <item.icon size={20} />
                                    </div>
                                    <div className="text-left">
                                        <div className="text-sm font-bold text-gray-900 dark:text-white transition-colors">{item.label}</div>
                                        <div className="text-[11px] text-gray-500 font-medium dark:text-gray-400 transition-colors">{item.sub}</div>
                                    </div>
                                </div>
                                
                                {item.isToggle ? (
                                    <div className={`w-11 h-6 rounded-full p-1 transition-colors duration-200 ease-in-out ${item.active ? 'bg-orange-500' : 'bg-gray-200 dark:bg-gray-600'}`}>
                                        <div className={`bg-white w-4 h-4 rounded-full shadow-sm transform transition-transform duration-200 ease-in-out ${item.active ? 'translate-x-5' : 'translate-x-0'}`}></div>
                                    </div>
                                ) : (
                                    <ChevronRight size={16} className="text-gray-300 dark:text-gray-600" />
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            ))}

            <button 
                onClick={handleLogout}
                className="w-full bg-white border border-red-100 p-4 rounded-3xl flex items-center justify-center gap-2 text-red-500 font-bold text-sm shadow-sm hover:bg-red-50 active:scale-[0.98] transition-all mt-4 dark:bg-gray-800 dark:border-red-900/30 dark:hover:bg-red-900/10"
            >
                <LogOut size={18} />
                Sign Out
            </button>
            
        </div>
    </div>
  );
};

export default Profile;