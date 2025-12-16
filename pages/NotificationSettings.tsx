import React, { useState } from 'react';
import { Bell, Tag, Info } from 'lucide-react';

const NotificationSettings: React.FC = () => {
  const [settings, setSettings] = useState({
      orders: true,
      system: true,
      promos: false
  });

  const toggle = (key: keyof typeof settings) => {
      setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const Option = ({ 
      label, 
      desc, 
      active, 
      icon: Icon,
      onClick 
  }: { 
      label: string; 
      desc: string; 
      active: boolean; 
      icon: any; 
      onClick: () => void 
  }) => (
    <div className="bg-white dark:bg-gray-800 p-5 rounded-3xl border border-gray-100 dark:border-gray-700 flex items-center justify-between">
        <div className="flex items-center gap-4">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${active ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400'}`}>
                <Icon size={20} />
            </div>
            <div>
                <p className="text-sm font-bold text-gray-900 dark:text-white">{label}</p>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">{desc}</p>
            </div>
        </div>
        
        <div 
            onClick={onClick}
            className={`w-12 h-7 rounded-full p-1 transition-colors duration-300 cursor-pointer flex-shrink-0 ${active ? 'bg-orange-500' : 'bg-gray-200 dark:bg-gray-600'}`}
        >
            <div className={`bg-white w-5 h-5 rounded-full shadow-sm transform transition-transform duration-300 ${active ? 'translate-x-5' : 'translate-x-0'}`}></div>
        </div>
    </div>
  );

  return (
    <div className="px-6 py-6 space-y-4">
        <Option 
            label="Order Alerts" 
            desc="Get notified for new orders instantly" 
            active={settings.orders} 
            icon={Bell}
            onClick={() => toggle('orders')} 
        />
        <Option 
            label="System Updates" 
            desc="Maintenance and feature updates" 
            active={settings.system} 
            icon={Info}
            onClick={() => toggle('system')} 
        />
        <Option 
            label="Promotions" 
            desc="Tips to grow your business" 
            active={settings.promos} 
            icon={Tag}
            onClick={() => toggle('promos')} 
        />
    </div>
  );
};

export default NotificationSettings;