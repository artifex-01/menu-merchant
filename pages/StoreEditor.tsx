import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Upload, Locate } from 'lucide-react';
import { getStoreById, updateStore, addStore } from '../services/data';
import { Store } from '../types';

const StoreEditor: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = !id || id === 'new';
  
  const [formData, setFormData] = useState<Partial<Store>>({
    name: '',
    address: '',
    city: '',
    isOpen: true,
    lat: 40.7128,
    lng: -74.0060,
    coverImage: 'https://picsum.photos/800/400?random=99',
    logo: 'https://picsum.photos/100/100?random=99',
    rating: 5.0,
  });

  useEffect(() => {
    if (!isNew && id) {
      const existing = getStoreById(id);
      if (existing) setFormData(existing);
    }
  }, [id, isNew]);

  const handleSave = () => {
    const storeToSave = {
        ...formData,
        id: isNew ? Math.random().toString(36).substr(2, 9) : id!,
        lastUpdated: new Date()
    } as Store;

    if (isNew) addStore(storeToSave);
    else updateStore(storeToSave);
    
    navigate('/');
  };

  const simulateLocate = () => {
     // Simulate finding location
     setFormData(prev => ({ ...prev, lat: 40.7580, lng: -73.9855, address: 'Detected Location, NY' }));
  };

  return (
    <div className="pb-8">
      {/* Visual Preview Header */}
      <div className="relative h-48 w-full group cursor-pointer bg-gray-100 dark:bg-gray-800">
         <img src={formData.coverImage} className="w-full h-full object-cover" alt="Cover" />
         <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="bg-white/90 dark:bg-gray-900/90 px-3 py-2 rounded-full flex items-center gap-2 text-xs font-bold text-gray-800 dark:text-white shadow-lg">
                <Upload size={14} /> Change Cover
            </div>
         </div>
      </div>
      
      <div className="px-5 -mt-10 relative z-10">
         <div className="flex justify-between items-end">
             <div className="w-24 h-24 rounded-full border-4 border-white dark:border-gray-800 bg-white dark:bg-gray-700 shadow-md overflow-hidden relative group cursor-pointer transition-colors">
                 <img src={formData.logo} className="w-full h-full object-cover" alt="Logo" />
                 <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Upload size={20} className="text-white" />
                 </div>
             </div>
         </div>
      </div>

      <div className="p-5 space-y-6">
        {/* Basic Info */}
        <div className="space-y-4">
            <div>
                <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase ml-1">Store Name</label>
                <input 
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 font-semibold text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all placeholder-gray-400 dark:placeholder-gray-600"
                    placeholder="e.g. The Burger Joint"
                />
            </div>
            <div className="grid grid-cols-2 gap-4">
                 <div>
                    <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase ml-1">City</label>
                    <input 
                        value={formData.city}
                        onChange={e => setFormData({...formData, city: e.target.value})}
                        className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-orange-500 transition-colors"
                    />
                 </div>
                 <div>
                    <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase ml-1">Status</label>
                    <select 
                        value={formData.isOpen ? 'open' : 'closed'}
                        onChange={e => setFormData({...formData, isOpen: e.target.value === 'open'})}
                        className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-orange-500 transition-colors"
                    >
                        <option value="open">Open</option>
                        <option value="closed">Closed</option>
                    </select>
                 </div>
            </div>
        </div>

        {/* Location / Map */}
        <div>
            <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase ml-1">Pin Location</label>
                <button onClick={simulateLocate} className="text-[10px] text-orange-600 dark:text-orange-400 font-bold flex items-center gap-1 bg-orange-50 dark:bg-orange-900/20 px-2 py-1 rounded-md">
                    <Locate size={10} /> Locate Me
                </button>
            </div>
            
            {/* Mock Interactive Map */}
            <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded-2xl overflow-hidden relative border border-gray-200 dark:border-gray-600 shadow-inner group">
                <div 
                    className="absolute inset-0 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=40.7128,-74.0060&zoom=13&size=600x300&sensor=false&key=YOUR_KEY')] bg-cover bg-center opacity-70 group-hover:opacity-100 transition-opacity"
                    style={{ backgroundImage: 'url(https://imgs.search.brave.com/5w2gNfT-jVwZl-25f0y3b_yV8jB2k5ZkFk_y3V2k5Zk/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tYXBz/Lm1hcHMgYXBpcy5j/b20vbWFwcy9hcGkv/c3RhdGljbWFwP2Nl/bnRlcj00MC43MTI4/LC03NC4wMDYwJnpv/b209MTQmc2l6ZT02/MDB4MzAwJm1hcHR5/cGU9cm9hZG1hcCZr/ZXk9QUl6YVN5RGp3/eHR4LWdkMkZqLW55/LV9sOV9sLV9sLV9s/LV9sLV9s&fake=1)'}}
                ></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full text-orange-600 drop-shadow-md">
                    <MapPin size={32} fill="currentColor" />
                </div>
                <div className="absolute bottom-2 left-2 right-2 bg-white/90 dark:bg-gray-900/90 backdrop-blur text-[10px] p-2 rounded-lg flex justify-between font-mono text-gray-600 dark:text-gray-300">
                    <span>LAT: {formData.lat?.toFixed(4)}</span>
                    <span>LNG: {formData.lng?.toFixed(4)}</span>
                </div>
            </div>
            <input 
                value={formData.address}
                onChange={e => setFormData({...formData, address: e.target.value})}
                className="w-full mt-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-orange-500 transition-colors"
                placeholder="Full Street Address"
            />
        </div>

        <button 
            onClick={handleSave}
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold text-lg py-4 rounded-xl shadow-lg shadow-orange-500/20 active:scale-[0.98] transition-all"
        >
            {isNew ? 'Create Store' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
};

export default StoreEditor;