import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LogOut, Settings, CreditCard, Bell, 
  User, ChevronRight, HelpCircle, Shield, 
  TrendingUp, Store, Star, Zap 
} from 'lucide-react';

const Profile: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any auth tokens here
    navigate('/login');
  };

  const menuGroups = [
    {
      title: "Account",
      items: [
        { icon: User, label: "Personal Information", sub: "Edit your details" },
        { icon: Shield, label: "Login & Security", sub: "2FA, Password" },
        { icon: Bell, label: "Notifications", sub: "Orders, Alerts" },
      ]
    },
    {
      title: "Business",
      items: [
        { icon: CreditCard, label: "Billing & Subscription", sub: "Premium Plan", color: "text-blue-600", bg: "bg-blue-50" },
        { icon: Zap, label: "Integrations", sub: "Connect apps", color: "text-purple-600", bg: "bg-purple-50" },
      ]
    },
    {
      title: "Support",
      items: [
        { icon: HelpCircle, label: "Help Center", sub: "FAQ, Chat support" },
      ]
    }
  ];

  return (
    <div className="bg-gray-50 min-h-full pb-10">
        {/* Profile Header */}
        <div className="bg-white px-6 pt-4 pb-8 rounded-b-[40px] shadow-sm border-b border-gray-100 mb-6">
            <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                    <div className="w-20 h-20 rounded-full bg-gray-900 p-1">
                         <img src="https://picsum.photos/200/200?random=888" alt="Merchant" className="w-full h-full rounded-full object-cover border-4 border-white" />
                    </div>
                    <div className="absolute bottom-0 right-0 bg-green-500 w-5 h-5 rounded-full border-4 border-white"></div>
                </div>
                <div>
                    <h2 className="text-xl font-bold text-gray-900 leading-tight">John Merchant</h2>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide shadow-sm">
                            Premium
                        </span>
                        <span className="text-xs text-gray-400">ID: 883492</span>
                    </div>
                </div>
            </div>

            {/* Quick Stats Row */}
            <div className="flex gap-3">
                <div className="flex-1 bg-gray-50 p-3 rounded-2xl border border-gray-100 flex flex-col items-center justify-center">
                    <div className="flex items-center gap-1.5 text-orange-600 mb-1">
                        <TrendingUp size={14} />
                        <span className="text-[10px] font-bold uppercase tracking-wider">Revenue</span>
                    </div>
                    <span className="text-lg font-extrabold text-gray-900">$12.4k</span>
                </div>
                <div className="flex-1 bg-gray-50 p-3 rounded-2xl border border-gray-100 flex flex-col items-center justify-center">
                    <div className="flex items-center gap-1.5 text-blue-600 mb-1">
                        <Store size={14} />
                        <span className="text-[10px] font-bold uppercase tracking-wider">Stores</span>
                    </div>
                    <span className="text-lg font-extrabold text-gray-900">2</span>
                </div>
                <div className="flex-1 bg-gray-50 p-3 rounded-2xl border border-gray-100 flex flex-col items-center justify-center">
                    <div className="flex items-center gap-1.5 text-yellow-600 mb-1">
                        <Star size={14} />
                        <span className="text-[10px] font-bold uppercase tracking-wider">Rating</span>
                    </div>
                    <span className="text-lg font-extrabold text-gray-900">4.8</span>
                </div>
            </div>
        </div>

        {/* Menu Groups */}
        <div className="px-6 space-y-6">
            {menuGroups.map((group, idx) => (
                <div key={idx}>
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 ml-2">{group.title}</h3>
                    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                        {group.items.map((item, i) => (
                            <button 
                                key={i}
                                className={`w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors ${i !== group.items.length - 1 ? 'border-b border-gray-50' : ''}`}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${item.bg || 'bg-gray-100'} ${item.color || 'text-gray-600'}`}>
                                        <item.icon size={20} />
                                    </div>
                                    <div className="text-left">
                                        <div className="text-sm font-bold text-gray-900">{item.label}</div>
                                        <div className="text-[11px] text-gray-500 font-medium">{item.sub}</div>
                                    </div>
                                </div>
                                <ChevronRight size={16} className="text-gray-300" />
                            </button>
                        ))}
                    </div>
                </div>
            ))}

            <button 
                onClick={handleLogout}
                className="w-full bg-white border border-red-100 p-4 rounded-3xl flex items-center justify-center gap-2 text-red-500 font-bold text-sm shadow-sm hover:bg-red-50 active:scale-[0.98] transition-all mt-4 mb-6"
            >
                <LogOut size={18} />
                Sign Out
            </button>
            
            <p className="text-center text-[10px] text-gray-400 font-medium pb-4">
                Version 2.4.0 • Build 8839
            </p>
        </div>
    </div>
  );
};

export default Profile;
