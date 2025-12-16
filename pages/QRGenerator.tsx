import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getStoreById } from '../services/data';
import { Store } from '../types';

const QRGenerator: React.FC = () => {
  const { id } = useParams();
  const [store, setStore] = useState<Store | undefined>();

  useEffect(() => {
      if(id) setStore(getStoreById(id));
  }, [id]);

  if (!store) return <div className="p-10 text-center text-gray-500 dark:text-gray-400">Store not found</div>;

  // Larger QR Code for better scanability
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=STORE:${store.id}&color=111827`;

  return (
    <div className="p-6 flex flex-col h-full items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors">
      
      {/* Printable Card Preview */}
      <div className="bg-white dark:bg-gray-800 p-8 pt-0 rounded-[32px] shadow-xl border border-gray-100 dark:border-gray-700 text-center w-full max-w-[320px] relative flex flex-col items-center mt-12 transition-colors">
          
          {/* Logo - Perfectly Circular and Centered */}
          <div className="w-24 h-24 rounded-full bg-white dark:bg-gray-800 p-1.5 shadow-lg -mt-12 mb-5 relative z-10 border border-gray-100 dark:border-gray-700 flex-shrink-0">
             <div className="w-full h-full rounded-full overflow-hidden relative bg-gray-50 dark:bg-gray-700">
                <img 
                    src={store.logo} 
                    className="w-full h-full object-cover" 
                    alt="Store Logo" 
                />
             </div>
          </div>

          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-2 tracking-tight leading-tight">{store.name}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-8 font-medium">Scan to view menu & order</p>

          <div className="bg-white p-3 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-600 mb-6 w-full aspect-square flex items-center justify-center">
              <img src={qrUrl} alt="QR Code" className="w-full h-full object-contain rounded-lg" />
          </div>

          <div className="flex flex-col items-center gap-1 opacity-60">
              <p className="text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase">Store ID</p>
              <p className="text-xs font-mono font-bold text-gray-600 dark:text-gray-300">{store.id.toUpperCase()}</p>
          </div>
      </div>

      <p className="text-sm text-gray-500 dark:text-gray-400 mt-8 text-center max-w-[240px] leading-relaxed font-medium">
          Place this QR code on tables or at the counter for customers to scan.
      </p>

    </div>
  );
};

export default QRGenerator;