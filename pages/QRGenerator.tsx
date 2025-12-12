import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Share2, Download, Printer } from 'lucide-react';
import { getStoreById } from '../services/data';
import { Store } from '../types';

const QRGenerator: React.FC = () => {
  const { id } = useParams();
  const [store, setStore] = useState<Store | undefined>();

  useEffect(() => {
      if(id) setStore(getStoreById(id));
  }, [id]);

  if (!store) return <div className="p-10 text-center">Store not found</div>;

  // Simulate QR Code URL
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=STORE:${store.id}&color=111827`;

  return (
    <div className="p-6 flex flex-col h-full">
      <div className="flex-1 flex flex-col justify-center items-center">
        
        {/* Printable Card Preview */}
        <div className="bg-white p-6 rounded-[30px] shadow-xl border border-gray-100 text-center w-full max-w-[320px] relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-orange-500 to-red-500"></div>
            
            <div className="w-16 h-16 bg-white p-1 rounded-full mx-auto -mt-10 shadow-md border-4 border-white mb-4 relative z-10">
                <img src={store.logo} className="w-full h-full rounded-full object-cover" />
            </div>

            <h2 className="text-xl font-bold text-gray-900 mb-1">{store.name}</h2>
            <p className="text-xs text-gray-500 mb-6">Scan to view menu & order</p>

            <div className="bg-gray-50 p-4 rounded-2xl inline-block mb-4 border border-gray-100">
                <img src={qrUrl} alt="QR Code" className="w-48 h-48 mix-blend-multiply opacity-90" />
            </div>

            <p className="text-[10px] text-gray-400 font-mono tracking-widest uppercase">ID: {store.id.toUpperCase()}</p>
        </div>

        <p className="text-xs text-gray-500 mt-8 text-center max-w-[200px]">
            Place this QR code on tables or at the counter for customers to scan.
        </p>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-3 gap-3 mt-auto">
         <button className="flex flex-col items-center gap-2 p-3 bg-white border border-gray-200 rounded-2xl shadow-sm active:scale-95 transition-transform">
            <Download size={20} className="text-gray-700" />
            <span className="text-[10px] font-bold text-gray-600">Save</span>
         </button>
         <button className="flex flex-col items-center gap-2 p-3 bg-white border border-gray-200 rounded-2xl shadow-sm active:scale-95 transition-transform">
            <Printer size={20} className="text-gray-700" />
            <span className="text-[10px] font-bold text-gray-600">Print</span>
         </button>
         <button className="flex flex-col items-center gap-2 p-3 bg-gray-900 text-white rounded-2xl shadow-lg shadow-gray-900/20 active:scale-95 transition-transform">
            <Share2 size={20} />
            <span className="text-[10px] font-bold">Share</span>
         </button>
      </div>
    </div>
  );
};

export default QRGenerator;
