import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Plus, Edit2, Trash2, Search, Image as ImageIcon, CircleSlash, X, ChefHat, DollarSign, Leaf, Drumstick, Upload, Check } from 'lucide-react';
import { getItems, getCategories, addItem, updateItem, deleteItem, getStoreById, addCategory } from '../services/data';
import { MenuItem, Category } from '../types';

const MenuBuilder: React.FC = () => {
  const { id: storeId } = useParams();
  const [storeName, setStoreName] = useState('');
  const [items, setItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // UI State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Partial<MenuItem> | null>(null);
  
  // Custom Category State
  const [showCategoryInput, setShowCategoryInput] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (storeId) {
        const store = getStoreById(storeId);
        if (store) setStoreName(store.name);
        setItems(getItems(storeId));
        setCategories(getCategories(storeId));
    }
  }, [storeId]);

  const filteredItems = items.filter(item => {
    const matchesCategory = activeCategory === 'All' ? true : item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && editingItem) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditingItem({ ...editingItem, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (!editingItem?.name || !storeId) return;
    
    const itemPayload: MenuItem = {
        id: editingItem.id || Math.random().toString(36).substr(2, 9),
        storeId,
        name: editingItem.name,
        description: editingItem.description || '',
        price: Number(editingItem.price),
        category: editingItem.category!,
        image: editingItem.image || '',
        inStock: editingItem.inStock ?? true,
        itemType: editingItem.itemType
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
      setEditingItem({ 
          storeId, 
          inStock: true, 
          category: '', // Force user to select
          image: '',
      });
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

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const val = e.target.value;
      if (val === '__NEW__') {
          setShowCategoryInput(true);
      } else {
          setEditingItem(prev => prev ? ({ ...prev, category: val }) : null);
      }
  };

  const handleSaveNewCategory = () => {
      if (newCategoryName.trim() && storeId) {
          addCategory(storeId, newCategoryName.trim());
          const updatedCategories = getCategories(storeId);
          setCategories(updatedCategories);
          setEditingItem(prev => prev ? ({ ...prev, category: newCategoryName.trim() }) : null);
          setNewCategoryName('');
          setShowCategoryInput(false);
      }
  };

  // Form Validation
  const isFormValid = 
    editingItem?.name && 
    editingItem?.name.trim() !== '' &&
    editingItem?.price !== undefined && 
    editingItem?.price > 0 &&
    editingItem?.itemType &&
    editingItem?.category &&
    editingItem?.image;

  return (
    <div className="pb-6 bg-gray-50 dark:bg-gray-900 min-h-full transition-colors duration-300 relative">
      
      {/* Search Header */}
      <div className="bg-white dark:bg-gray-800 pt-6 px-5 pb-4 sticky top-0 z-20 shadow-sm border-b border-gray-100 dark:border-gray-700 transition-colors">
          <div className="flex justify-between items-center mb-4">
             <h2 className="text-xl font-extrabold text-gray-900 dark:text-white tracking-tight">Menu Builder</h2>
             <span className="text-xs font-bold text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-md">{items.length} items</span>
          </div>
          
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400 group-focus-within:text-orange-500 transition-colors" />
            </div>
            <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search menu items..."
                className="w-full bg-gray-100 dark:bg-gray-700/50 border-none rounded-2xl pl-11 pr-10 py-3.5 text-sm font-bold text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-orange-500/20 focus:bg-white dark:focus:bg-gray-700 transition-all"
            />
            {searchQuery && (
                <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                    <X size={16} />
                </button>
            )}
          </div>

          {/* Categories */}
          <div className="flex gap-2 overflow-x-auto pt-4 pb-1 scrollbar-hide -mx-5 px-5">
            <button 
                onClick={() => setActiveCategory('All')}
                className={`px-5 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all active:scale-95 ${activeCategory === 'All' ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900 shadow-md' : 'bg-gray-100 dark:bg-gray-700/50 text-gray-600 dark:text-gray-400'}`}
            >
                All
            </button>
            {categories.map(cat => (
                <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.name)}
                className={`px-5 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all active:scale-95 ${
                    activeCategory === cat.name 
                    ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900 shadow-md' 
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700'
                }`}
                >
                {cat.name}
                </button>
            ))}
            <button className="w-8 h-8 rounded-full border border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center text-gray-400 hover:text-orange-500 hover:border-orange-500 transition-colors flex-shrink-0">
                <Plus size={14} />
            </button>
          </div>
      </div>

      {/* Item List */}
      <div className="px-5 py-6 space-y-4">
        {filteredItems.length > 0 ? (
            filteredItems.map(item => (
            <div key={item.id} className={`bg-white dark:bg-gray-800 p-4 rounded-[24px] shadow-sm border border-gray-100 dark:border-gray-700 flex gap-4 items-start group transition-all duration-300 hover:shadow-md ${!item.inStock ? 'opacity-70 grayscale-[0.5]' : ''}`}>
                {/* Thumbnail */}
                <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-2xl overflow-hidden flex-shrink-0 relative shadow-inner">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                    {!item.inStock && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center backdrop-blur-[1px]">
                            <span className="text-[10px] font-bold text-white bg-red-500/80 px-2 py-0.5 rounded-full">SOLD OUT</span>
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 flex flex-col h-24 justify-between">
                    <div>
                        <div className="flex justify-between items-start">
                            <h3 className="font-bold text-gray-900 dark:text-white truncate pr-2 text-base flex items-center gap-1.5">
                                {item.itemType === 'veg' && <Leaf size={14} className="text-green-500" />}
                                {item.itemType === 'non-veg' && <Drumstick size={14} className="text-red-500" />}
                                {item.name}
                            </h3>
                            <button 
                                onClick={() => handleDelete(item.id)}
                                className="text-gray-300 hover:text-red-500 dark:text-gray-600 dark:hover:text-red-400 -mt-1 -mr-1 p-1 transition-colors"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2 leading-relaxed">{item.description}</p>
                    </div>
                    
                    <div className="flex items-end justify-between">
                        <span className="font-extrabold text-gray-900 dark:text-white text-lg">${item.price.toFixed(2)}</span>
                        <button 
                                onClick={() => openEditModal(item)}
                                className="flex items-center gap-1.5 text-xs font-bold text-white bg-gray-900 dark:bg-gray-700 hover:bg-black dark:hover:bg-gray-600 px-4 py-2 rounded-xl active:scale-95 transition-all shadow-lg shadow-gray-200 dark:shadow-none"
                        >
                            <Edit2 size={12} /> Edit
                        </button>
                    </div>
                </div>
            </div>
            ))
        ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center opacity-60">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                    <ChefHat size={32} className="text-gray-400" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">No items found</h3>
                <p className="text-sm text-gray-500">Try adjusting your search or add a new item.</p>
            </div>
        )}
        
        {/* Spacer for FAB */}
        <div className="h-40"></div>
      </div>

      {/* Floating Add Button */}
      <div className="fixed bottom-32 left-0 right-0 px-6 flex justify-center w-full pointer-events-none z-40">
         <button 
            onClick={openAddModal}
            className="pointer-events-auto bg-gray-900 dark:bg-white text-white dark:text-gray-900 w-full max-w-md h-14 rounded-2xl shadow-2xl shadow-gray-900/20 dark:shadow-none flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform active:scale-[0.98] font-bold text-sm border border-white/10"
         >
            <Plus size={20} strokeWidth={3} /> 
            <span className="tracking-wide">Add New Item</span>
         </button>
      </div>

      {/* Edit/Create Modal */}
      {isModalOpen && editingItem && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={() => setIsModalOpen(false)}
            ></div>

            {/* Modal Content */}
            <div className="relative bg-white dark:bg-gray-900 w-full max-w-md rounded-t-[35px] p-6 h-[90vh] overflow-y-auto animate-slide-up shadow-2xl transition-colors duration-300">
                {/* Drag Handle */}
                <div className="w-12 h-1.5 bg-gray-300 dark:bg-gray-700 rounded-full mx-auto mb-6"></div>

                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">{editingItem.id ? 'Edit Item' : 'New Creation'}</h2>
                        <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-1">Refine your menu details below</p>
                    </div>
                    <button 
                        onClick={() => setIsModalOpen(false)} 
                        className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    >
                        <X size={18} />
                    </button>
                </div>

                <div className="space-y-6">
                    {/* Image Upload */}
                    <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handleImageUpload} 
                        accept="image/*" 
                        className="hidden" 
                    />
                    <div 
                        onClick={() => fileInputRef.current?.click()}
                        className="h-48 bg-gray-50 dark:bg-gray-800 rounded-[24px] border-2 border-dashed border-gray-200 dark:border-gray-700 overflow-hidden relative group cursor-pointer hover:border-orange-300 dark:hover:border-orange-700 transition-colors"
                    >
                        {editingItem.image && !editingItem.image.includes('random') && editingItem.image !== '' ? (
                            <img src={editingItem.image} className="w-full h-full object-cover" />
                        ) : (
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 dark:text-gray-500">
                                <div className="w-12 h-12 bg-white dark:bg-gray-700 rounded-full flex items-center justify-center shadow-sm mb-3">
                                    <ImageIcon size={20} className="text-orange-500" />
                                </div>
                                <span className="text-xs font-bold">Tap to upload photo</span>
                            </div>
                        )}
                        {/* Overlay for existing image */}
                        {editingItem.image && (
                            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <div className="bg-white/90 dark:bg-gray-900/90 px-3 py-1.5 rounded-full flex items-center gap-2 text-xs font-bold shadow-lg">
                                    <Upload size={14} /> Change
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Stock Switch */}
                    <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 p-4 rounded-2xl border border-transparent dark:border-gray-700">
                        <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${editingItem.inStock ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                <CircleSlash size={16} />
                            </div>
                            <span className="text-sm font-bold text-gray-900 dark:text-white">Available In Stock</span>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input 
                                type="checkbox" 
                                className="sr-only peer" 
                                checked={editingItem.inStock}
                                onChange={(e) => setEditingItem({...editingItem, inStock: e.target.checked})}
                            />
                            <div className="w-12 h-7 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-green-500"></div>
                        </label>
                    </div>

                    {/* Name & Veg/Non-Veg */}
                    <div>
                        <label className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider ml-2 mb-1.5 block">Item Name</label>
                        <div className="flex flex-col gap-3">
                             <input 
                                className="w-full bg-gray-50 dark:bg-gray-800 border-transparent rounded-2xl px-5 py-4 text-base font-bold text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500/20 placeholder-gray-400 dark:placeholder-gray-600 focus:bg-white dark:focus:bg-gray-700 transition-all" 
                                placeholder="e.g. Truffle Pasta"
                                value={editingItem.name}
                                onChange={(e) => setEditingItem({...editingItem, name: e.target.value})}
                            />
                            
                            {/* Veg / Non-Veg Toggle */}
                            <div className="flex bg-gray-50 dark:bg-gray-800 p-1 rounded-xl">
                                <button
                                    onClick={() => setEditingItem({...editingItem, itemType: 'veg'})}
                                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-xs font-bold transition-all ${
                                        editingItem.itemType === 'veg' 
                                            ? 'bg-green-100 text-green-700 border-green-500 shadow-sm' 
                                            : 'text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700'
                                    }`}
                                >
                                    <Leaf size={14} /> Veg
                                </button>
                                <button
                                    onClick={() => setEditingItem({...editingItem, itemType: 'non-veg'})}
                                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-xs font-bold transition-all ${
                                        editingItem.itemType === 'non-veg' 
                                            ? 'bg-red-100 text-red-700 border-red-500 shadow-sm' 
                                            : 'text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700'
                                    }`}
                                >
                                    <Drumstick size={14} /> Non-Veg
                                </button>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider ml-2 mb-1.5 block">Description</label>
                        <textarea 
                            className="w-full bg-gray-50 dark:bg-gray-800 border-transparent rounded-2xl px-5 py-4 text-sm font-medium text-gray-900 dark:text-white resize-none h-28 focus:ring-2 focus:ring-orange-500/20 placeholder-gray-400 dark:placeholder-gray-600 focus:bg-white dark:focus:bg-gray-700 transition-all leading-relaxed" 
                            placeholder="Describe the flavors, ingredients..."
                            value={editingItem.description}
                            onChange={(e) => setEditingItem({...editingItem, description: e.target.value})}
                        />
                    </div>

                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider ml-2 mb-1.5 block">Price ($)</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <DollarSign size={16} className="text-gray-400" />
                                </div>
                                <input 
                                    type="number"
                                    className="w-full bg-gray-50 dark:bg-gray-800 border-transparent rounded-2xl pl-10 pr-4 py-4 text-lg font-bold text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500/20 placeholder-gray-400 dark:placeholder-gray-600 focus:bg-white dark:focus:bg-gray-700 transition-all" 
                                    placeholder="0.00"
                                    value={editingItem.price || ''}
                                    onChange={(e) => setEditingItem({...editingItem, price: parseFloat(e.target.value)})}
                                />
                            </div>
                        </div>
                        <div className="flex-1">
                            <label className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider ml-2 mb-1.5 block">Category</label>
                            <div className="relative">
                                <select 
                                    className={`w-full bg-gray-50 dark:bg-gray-800 border-transparent rounded-2xl px-5 py-4 text-sm font-bold text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500/20 appearance-none focus:bg-white dark:focus:bg-gray-700 transition-all ${!editingItem.category ? 'text-gray-400 dark:text-gray-500' : ''}`}
                                    value={editingItem.category || ''}
                                    onChange={handleCategoryChange}
                                >
                                    <option value="" disabled>Select Category</option>
                                    {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                                    <option disabled>──────────</option>
                                    <option value="__NEW__" className="font-bold text-orange-500">+ Add New Category</option>
                                </select>
                                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400">
                                    <ChefHat size={16} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 pb-2">
                        <button 
                            onClick={handleSave}
                            disabled={!isFormValid}
                            className={`w-full text-white font-extrabold text-lg py-4 rounded-2xl shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-2 ${
                                isFormValid 
                                ? 'bg-gradient-to-r from-orange-500 to-red-600 shadow-orange-500/20 hover:to-red-700' 
                                : 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed text-gray-500 dark:text-gray-500 shadow-none'
                            }`}
                        >
                            Save Item
                        </button>
                    </div>
                </div>
            </div>

            {/* Add Category Modal Overlay */}
            {showCategoryInput && (
                <div className="absolute inset-0 z-[60] flex items-center justify-center p-6 bg-black/40 backdrop-blur-[2px] animate-fade-in">
                    <div className="bg-white dark:bg-gray-800 w-full max-w-xs rounded-2xl p-5 shadow-2xl animate-slide-up">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">New Category</h3>
                        <input 
                            autoFocus
                            value={newCategoryName}
                            onChange={(e) => setNewCategoryName(e.target.value)}
                            placeholder="e.g. Specials"
                            className="w-full bg-gray-100 dark:bg-gray-700 border-none rounded-xl px-4 py-3 text-sm font-bold mb-4 focus:ring-2 focus:ring-orange-500/20"
                        />
                        <div className="flex gap-2">
                            <button 
                                onClick={() => { setShowCategoryInput(false); setNewCategoryName(''); }}
                                className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 py-3 rounded-xl text-xs font-bold"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={handleSaveNewCategory}
                                className="flex-1 bg-orange-500 text-white py-3 rounded-xl text-xs font-bold"
                            >
                                Add
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
      )}
    </div>
  );
};

export default MenuBuilder;