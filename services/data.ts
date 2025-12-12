import { Store, MenuItem, Category } from '../types';

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
    lastUpdated: new Date()
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
    lastUpdated: new Date(Date.now() - 86400000)
  }
];

let categories: Category[] = [
  { id: 'c1', storeId: 'store-1', name: 'Starters' },
  { id: 'c2', storeId: 'store-1', name: 'Mains' },
  { id: 'c3', storeId: 'store-2', name: 'Burgers' },
  { id: 'c4', storeId: 'store-2', name: 'Drinks' },
];

let items: MenuItem[] = [
  {
    id: 'i1',
    storeId: 'store-1',
    name: 'Truffle Pasta',
    description: 'Tagliatelle with black truffle cream.',
    price: 24.00,
    category: 'Mains',
    image: 'https://picsum.photos/200/200?random=1',
    inStock: true,
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
  },
  {
    id: 'i3',
    storeId: 'store-2',
    name: 'Classic Smash',
    description: 'Double beef patty, cheese, onion.',
    price: 14.00,
    category: 'Burgers',
    image: 'https://picsum.photos/200/200?random=3',
    inStock: true,
  }
];

export const getStores = () => [...stores];
export const getStoreById = (id: string) => stores.find(s => s.id === id);
export const updateStore = (updated: Store) => {
  stores = stores.map(s => s.id === updated.id ? updated : s);
  return updated;
};
export const addStore = (store: Store) => {
  stores.push(store);
  return store;
};

export const getCategories = (storeId: string) => categories.filter(c => c.storeId === storeId);
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
