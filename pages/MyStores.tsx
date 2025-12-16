import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Edit3, QrCode, Utensils, Circle, Star } from 'lucide-react';
import { getStores } from '../services/data';
import { Store } from '../types';

const MyStores: React.FC = () => {
  const [stores, setStores] = useState<Store[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setStores(getStores());
  }, []);

  return (
    <div className="p-5 space-y-5">
      {stores.map(store => (
        <div key={store.id} className="bg-white dark:bg-gray-800 rounded-[20px] shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden group transition-colors">
          {/* Card Header with Cover */}
          <div className="h-32 bg-gray-200 dark:bg-gray-700 relative">
            <img src={store.coverImage} alt="cover" className="w-full h-full object-cover" />
            
            {/* Rating Badge */}
            <div className="absolute top-3 left-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur px-2 py-1 rounded-full flex items-center gap-1 shadow-sm">
                <Star size={10} className="fill-yellow-400 text-yellow-400" />
                <span className="text-[10px] font-bold text-gray-700 dark:text-gray-300">{store.rating}</span>
            </div>

            {/* Status Badge */}
            <div className="absolute top-3 right-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur px-2 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
                <Circle size={8} className={`fill-current ${store.isOpen ? 'text-green-500' : 'text-red-500'}`} />
                <span className="text-[10px] font-bold uppercase tracking-wide text-gray-700 dark:text-gray-300">{store.isOpen ? 'Open' : 'Closed'}</span>
            </div>
          </div>
          
          {/* Store Info */}
          <div className="px-5 pt-10 pb-5 relative">
            {/* Logo - Overlapping */}
            <div className="absolute -top-8 left-5 w-16 h-16 rounded-full border-4 border-white dark:border-gray-800 shadow-md overflow-hidden bg-white dark:bg-gray-700 transition-all">
                <img src={store.logo} alt="logo" className="w-full h-full object-cover" />
            </div>

            <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight transition-colors">{store.name}</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-1 transition-colors">
                <MapPin size={12} className="text-orange-500" />
                {store.address}, {store.city}
            </p>
            <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-2">Updated: {store.lastUpdated.toLocaleDateString()}</p>

            {/* Quick Actions Grid */}
            <div className="grid grid-cols-3 gap-3 mt-6 border-t border-gray-100 dark:border-gray-700 pt-4">
                <button 
                    onClick={() => navigate(`/store/${store.id}/edit`)}
                    className="flex flex-col items-center gap-1 p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 active:scale-95 transition-all"
                >
                    <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 flex items-center justify-center transition-colors">
                        <Edit3 size={18} />
                    </div>
                    <span className="text-[10px] font-medium text-gray-600 dark:text-gray-400">Edit Store</span>
                </button>

                <button 
                    onClick={() => navigate(`/store/${store.id}/menu`)}
                    className="flex flex-col items-center gap-1 p-2 rounded-xl hover:bg-orange-50 dark:hover:bg-orange-900/20 active:scale-95 transition-all"
                >
                    <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 flex items-center justify-center transition-colors">
                        <Utensils size={18} />
                    </div>
                    <span className="text-[10px] font-bold text-orange-600 dark:text-orange-400">Menu</span>
                </button>

                <button 
                    onClick={() => navigate(`/store/${store.id}/qr`)}
                    className="flex flex-col items-center gap-1 p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 active:scale-95 transition-all"
                >
                    <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 flex items-center justify-center transition-colors">
                        <QrCode size={18} />
                    </div>
                    <span className="text-[10px] font-medium text-gray-600 dark:text-gray-400">Get QR</span>
                </button>
            </div>
          </div>
        </div>
      ))}

      {/* Empty State / Add CTA */}
      <button 
        onClick={() => navigate('/store/new')}
        className="w-full py-4 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-[20px] text-gray-400 dark:text-gray-500 font-medium flex items-center justify-center gap-2 hover:border-orange-300 dark:hover:border-orange-700 hover:text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/10 transition-colors"
      >
        <div className="w-6 h-6 rounded-full border border-current flex items-center justify-center">
            <Edit3 size={12} />
        </div>
        Register Another Store
      </button>
    </div>
  );
};

export default MyStores;