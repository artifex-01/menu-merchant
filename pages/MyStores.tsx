import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Edit3, QrCode, Utensils, Circle } from 'lucide-react';
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
        <div key={store.id} className="bg-white rounded-[20px] shadow-sm border border-gray-100 overflow-hidden group">
          {/* Card Header with Cover */}
          <div className="h-32 bg-gray-200 relative">
            <img src={store.coverImage} alt="cover" className="w-full h-full object-cover" />
            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
                <Circle size={8} className={`fill-current ${store.isOpen ? 'text-green-500' : 'text-red-500'}`} />
                <span className="text-[10px] font-bold uppercase tracking-wide text-gray-700">{store.isOpen ? 'Open' : 'Closed'}</span>
            </div>
          </div>
          
          {/* Store Info */}
          <div className="px-5 pt-10 pb-5 relative">
            {/* Logo - Overlapping */}
            <div className="absolute -top-8 left-5 w-16 h-16 rounded-full border-4 border-white shadow-md overflow-hidden bg-white">
                <img src={store.logo} alt="logo" className="w-full h-full object-cover" />
            </div>

            <h3 className="text-lg font-bold text-gray-900 leading-tight">{store.name}</h3>
            <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                <MapPin size={12} className="text-orange-500" />
                {store.address}, {store.city}
            </p>
            <p className="text-[10px] text-gray-400 mt-2">Updated: {store.lastUpdated.toLocaleDateString()}</p>

            {/* Quick Actions Grid */}
            <div className="grid grid-cols-3 gap-3 mt-6 border-t border-gray-100 pt-4">
                <button 
                    onClick={() => navigate(`/store/${store.id}/edit`)}
                    className="flex flex-col items-center gap-1 p-2 rounded-xl hover:bg-gray-50 active:scale-95 transition-all"
                >
                    <div className="w-10 h-10 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center">
                        <Edit3 size={18} />
                    </div>
                    <span className="text-[10px] font-medium text-gray-600">Edit Store</span>
                </button>

                <button 
                    onClick={() => navigate(`/store/${store.id}/menu`)}
                    className="flex flex-col items-center gap-1 p-2 rounded-xl hover:bg-orange-50 active:scale-95 transition-all"
                >
                    <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center">
                        <Utensils size={18} />
                    </div>
                    <span className="text-[10px] font-bold text-orange-600">Menu</span>
                </button>

                <button 
                    onClick={() => navigate(`/store/${store.id}/qr`)}
                    className="flex flex-col items-center gap-1 p-2 rounded-xl hover:bg-gray-50 active:scale-95 transition-all"
                >
                    <div className="w-10 h-10 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center">
                        <QrCode size={18} />
                    </div>
                    <span className="text-[10px] font-medium text-gray-600">Get QR</span>
                </button>
            </div>
          </div>
        </div>
      ))}

      {/* Empty State / Add CTA */}
      <button 
        onClick={() => navigate('/store/new')}
        className="w-full py-4 border-2 border-dashed border-gray-300 rounded-[20px] text-gray-400 font-medium flex items-center justify-center gap-2 hover:border-orange-300 hover:text-orange-500 hover:bg-orange-50 transition-colors"
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
