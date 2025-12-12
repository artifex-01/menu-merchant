import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Plus, Edit2, Trash2, Search, Wand2, Loader2, Image as ImageIcon, CircleSlash } from 'lucide-react';
import { getItems, getCategories, addItem, updateItem, deleteItem, getStoreById } from '../services/data';
import { MenuItem, Category } from '../types';
import { generateMenuDescription, suggestPrice } from '../services/geminiService';

const MenuBuilder: React.FC = () => {
  const { id: storeId } = useParams();
  const [storeName, setStoreName] = useState('');
  const [items, setItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  
  // UI State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [editingItem, setEditingItem] = useState<Partial<MenuItem> | null>(null);

  useEffect(() => {
    if (storeId) {
        const store = getStoreById(storeId);
        if (store) setStoreName(store.name);
        setItems(getItems(storeId));
        setCategories(getCategories(storeId));
    }
  }, [storeId]);

  const filteredItems = items.filter(item => 
    activeCategory === 'All' ? true : item.category === activeCategory
  );

  const handleGenerateAI = async () => {
    if (!editingItem?.name) return;
    setIsGenerating(true);
    const desc = await generateMenuDescription(editingItem.name, editingItem.category || 'General');
    const price = await suggestPrice(editingItem.name);
    
    setEditingItem(prev => ({ 
        ...prev, 
        description: desc,
        price: price ? parseFloat(price) : prev?.price
    }));
    setIsGenerating(false);
  };

  const handleSave = () => {
    if (!editingItem?.name || !storeId) return;
    
    const itemPayload: MenuItem = {
        id: editingItem.id || Math.random().toString(36).substr(2, 9),
        storeId,
        name: editingItem.name,
        description: editingItem.description || '',
        price: Number(editingItem.price),
        category: editingItem.category || categories[0]?.name || 'Mains',
        image: editingItem.image || `https://picsum.photos/200/200?random=${Math.floor(Math.random() * 100)}`,
        inStock: editingItem.inStock ?? true,
    };

    if (editingItem.id) {
        updateItem(itemPayload);
    } else {
        addItem(itemPayload);
    }
    setItems(getItems(storeId)); // Refresh
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const openAddModal = () => {
      setEditingItem({ storeId, inStock: true, category: categories[0]?.name });
      setIsModalOpen(true);
  };

  const openEditModal = (item: MenuItem) => {
      setEditingItem(item);
      setIsModalOpen(true);
  };

  const handleDelete = (itemId: string) => {
      if(confirm('Delete this item?')) {
          deleteItem(itemId);
          if (storeId) setItems(getItems(storeId));
      }
  };

  return (
    <div className="pb-6 bg-gray-50 min-h-full">
      {/* Filters */}
      <div className="bg-white px-4 py-3 sticky top-0 z-10 shadow-sm border-b border-gray-100">
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Menu for {storeName}</h2>
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          <button 
             onClick={() => setActiveCategory('All')}
             className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${activeCategory === 'All' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600'}`}
          >
            All Items
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.name)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                activeCategory === cat.name 
                  ? 'bg-gray-900 text-white' 
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {cat.name}
            </button>
          ))}
          <button className="px-3 py-1.5 rounded-full text-xs font-bold border border-dashed border-gray-300 text-gray-400 flex items-center gap-1">
             <Plus size={10} /> Cat
          </button>
        </div>
      </div>

      {/* Item List - User App Style Cards */}
      <div className="px-4 py-4 space-y-4">
        {filteredItems.map(item => (
          <div key={item.id} className={`bg-white p-3 rounded-[20px] shadow-sm border border-gray-100 flex gap-4 items-center group ${!item.inStock ? 'opacity-60 bg-gray-50' : ''}`}>
             
             {/* Text Content */}
             <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                    <h3 className="font-bold text-gray-900 truncate pr-2">{item.name}</h3>
                </div>
                <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">{item.description}</p>
                
                <div className="mt-3 flex items-center justify-between">
                    <span className="font-bold text-gray-900 text-sm">${item.price.toFixed(2)}</span>
                    
                    {/* Merchant Actions instead of "Add to Cart" */}
                    <div className="flex items-center gap-3">
                        <button 
                             onClick={() => openEditModal(item)}
                             className="text-xs font-bold text-orange-600 bg-orange-50 px-3 py-1.5 rounded-lg active:scale-95 transition-transform"
                        >
                            Edit
                        </button>
                        {!item.inStock && (
                            <span className="text-[10px] font-bold text-red-500 border border-red-200 px-2 py-1 rounded">Out of Stock</span>
                        )}
                    </div>
                </div>
             </div>

             {/* Thumbnail */}
             <div className="w-24 h-24 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0 relative shadow-inner">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                {/* Delete Overlay */}
                <button 
                    onClick={() => handleDelete(item.id)}
                    className="absolute top-1 right-1 bg-white/90 text-red-500 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                >
                    <Trash2 size={12} />
                </button>
             </div>
          </div>
        ))}
        
        {/* Add Item Spacer */}
        <div className="h-20"></div>
      </div>

      {/* Floating Add Button */}
      <div className="fixed bottom-24 left-0 right-0 px-6 flex justify-center max-w-[430px] mx-auto pointer-events-none z-20">
         <button 
            onClick={openAddModal}
            className="pointer-events-auto bg-gradient-to-r from-orange-500 to-red-500 text-white w-48 h-12 rounded-full shadow-lg flex items-center justify-center gap-2 hover:scale-105 transition-transform active:scale-95 font-bold text-sm"
         >
            <Plus size={18} /> Add New Item
         </button>
      </div>

      {/* Edit/Create Modal */}
      {isModalOpen && editingItem && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-[430px] rounded-t-[30px] p-6 h-[85vh] overflow-y-auto animate-slide-up shadow-2xl">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">{editingItem.id ? 'Edit Item' : 'New Creation'}</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 font-medium">Cancel</button>
            </div>

            <div className="space-y-5">
                {/* Toggle Stock */}
                <div className="flex items-center justify-between bg-gray-50 p-3 rounded-xl border border-gray-100">
                    <div className="flex items-center gap-3">
                        <CircleSlash size={18} className={editingItem.inStock ? 'text-gray-400' : 'text-red-500'} />
                        <span className="text-sm font-semibold text-gray-700">Available In Stock</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                            type="checkbox" 
                            className="sr-only peer" 
                            checked={editingItem.inStock}
                            onChange={(e) => setEditingItem({...editingItem, inStock: e.target.checked})}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                    </label>
                </div>

                <div className="h-32 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400 cursor-pointer hover:bg-gray-100 transition-colors">
                    {editingItem.image && !editingItem.image.includes('random') ? (
                         <img src={editingItem.image} className="w-full h-full object-cover rounded-2xl" />
                    ) : (
                        <>
                            <ImageIcon size={32} className="mb-2 opacity-50"/>
                            <span className="text-xs font-bold">Upload Photo</span>
                        </>
                    )}
                </div>

                <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1 block">Item Name</label>
                    <input 
                        className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-lg font-bold text-gray-900 focus:ring-2 focus:ring-orange-500/20" 
                        placeholder="e.g. Truffle Pasta"
                        value={editingItem.name}
                        onChange={(e) => setEditingItem({...editingItem, name: e.target.value})}
                    />
                </div>

                <div>
                    <div className="flex justify-between items-center mb-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Description</label>
                        <button 
                            onClick={handleGenerateAI}
                            disabled={!editingItem.name || isGenerating}
                            className="flex items-center gap-1 text-[10px] bg-indigo-50 text-indigo-600 px-2 py-1 rounded-md font-bold disabled:opacity-50"
                        >
                            {isGenerating ? <Loader2 size={10} className="animate-spin"/> : <Wand2 size={10} />}
                            AI Enhance
                        </button>
                    </div>
                    <textarea 
                        className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm text-gray-700 resize-none h-24 focus:ring-2 focus:ring-orange-500/20" 
                        placeholder="Describe the dish..."
                        value={editingItem.description}
                        onChange={(e) => setEditingItem({...editingItem, description: e.target.value})}
                    />
                </div>

                <div className="flex gap-4">
                    <div className="flex-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1 block">Price ($)</label>
                        <input 
                            type="number"
                            className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-lg font-bold text-gray-900 focus:ring-2 focus:ring-orange-500/20" 
                            placeholder="0.00"
                            value={editingItem.price || ''}
                            onChange={(e) => setEditingItem({...editingItem, price: parseFloat(e.target.value)})}
                        />
                    </div>
                    <div className="flex-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1 block">Category</label>
                        <select 
                            className="w-full bg-gray-50 border-none rounded-xl px-4 py-3.5 text-sm font-semibold text-gray-900 focus:ring-2 focus:ring-orange-500/20"
                            value={editingItem.category}
                            onChange={(e) => setEditingItem({...editingItem, category: e.target.value})}
                        >
                            {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                        </select>
                    </div>
                </div>

                <div className="pt-4">
                    <button 
                        onClick={handleSave}
                        className="w-full bg-gray-900 text-white font-bold py-4 rounded-xl shadow-lg active:scale-[0.98] transition-all"
                    >
                        Save Item
                    </button>
                </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuBuilder;
