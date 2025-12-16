import { Store, MenuItem, Category, MerchantProfile } from '../types';

// Default Categories as per requirement
const DEFAULT_CATEGORIES = [
  'Starters', 'Main Course', 'Desserts', 'Beverages', 'Snacks', 'Combos', 'Add-ons'
];

const seedCategories = (storeId: string) => {
    return DEFAULT_CATEGORIES.map((name, index) => ({
        id: `${storeId}-cat-${index}`,
        storeId,
        name
    }));
};

// Initial Mock Data
let stores: Store[] = [
  {
    id: 'store-1',
    name: 'The Golden Spoon',
    address: '123 Culinary Ave',
    city: 'New York, NY',
    logo: 'https://picsum.photos/100/100?random=101',
    coverImage: 'https://picsum.photos/800/400?random=201',
    isOpen: true,
    lat: 40.7128,
    lng: -74.0060,
    lastUpdated: new Date(),
    rating: 4.8
  },
  {
    id: 'store-2',
    name: 'Burger & Co',
    address: '45 Meatpacker Dist',
    city: 'New York, NY',
    logo: 'https://picsum.photos/100/100?random=102',
    coverImage: 'https://picsum.photos/800/400?random=202',
    isOpen: false,
    lat: 40.7589,
    lng: -73.9851,
    lastUpdated: new Date(Date.now() - 86400000),
    rating: 4.5
  }
];

let categories: Category[] = [
  ...seedCategories('store-1'),
  ...seedCategories('store-2')
];

let items: MenuItem[] = [
  {
    id: 'i1',
    storeId: 'store-1',
    name: 'Truffle Pasta',
    description: 'Tagliatelle with black truffle cream.',
    price: 24.00,
    category: 'Main Course',
    image: 'https://picsum.photos/200/200?random=1',
    inStock: true,
    itemType: 'veg'
  },
  {
    id: 'i2',
    storeId: 'store-1',
    name: 'Burrata',
    description: 'Creamy cheese with tomatoes.',
    price: 18.00,
    category: 'Starters',
    image: 'https://picsum.photos/200/200?random=2',
    inStock: true,
    itemType: 'veg'
  },
  {
    id: 'i3',
    storeId: 'store-2',
    name: 'Classic Smash',
    description: 'Double beef patty, cheese, onion.',
    price: 14.00,
    category: 'Main Course',
    image: 'https://picsum.photos/200/200?random=3',
    inStock: true,
    itemType: 'non-veg'
  }
];

// Centralized Profile State
let profile: MerchantProfile = {
  name: 'John Merchant',
  id: '883492',
  email: 'merchant@example.com',
  phone: '+1 (555) 012-3456',
  avatar: 'https://picsum.photos/200/200?random=888',
  plan: 'Premium',
  revenue: '12.4k',
  storeCount: 2,
  rating: 4.8
};

export const getStores = () => [...stores];
export const getStoreById = (id: string) => stores.find(s => s.id === id);
export const updateStore = (updated: Store) => {
  stores = stores.map(s => s.id === updated.id ? updated : s);
  return updated;
};
export const addStore = (store: Store) => {
  stores.push(store);
  // Also seed categories for new store
  categories = [...categories, ...seedCategories(store.id)];
  return store;
};

export const getCategories = (storeId: string) => categories.filter(c => c.storeId === storeId);
export const addCategory = (storeId: string, name: string) => {
  const newCat: Category = {
    id: Math.random().toString(36).substr(2, 9),
    storeId,
    name
  };
  categories.push(newCat);
  return newCat;
};

export const getItems = (storeId: string) => items.filter(i => i.storeId === storeId);

export const addItem = (item: MenuItem) => {
  items.push(item);
  return item;
};
export const updateItem = (updated: MenuItem) => {
  items = items.map(i => i.id === updated.id ? updated : i);
  return updated;
};
export const deleteItem = (id: string) => {
  items = items.filter(i => i.id !== id);
};

export const getMerchantProfile = () => ({ ...profile });
export const updateMerchantProfile = (updated: Partial<MerchantProfile>) => {
  profile = { ...profile, ...updated };
  return profile;
};