export interface Store {
  id: string;
  name: string;
  address: string;
  city: string;
  logo: string;
  coverImage: string;
  isOpen: boolean;
  lat: number;
  lng: number;
  lastUpdated: Date;
  rating: number;
}

export interface MenuItem {
  id: string;
  storeId: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  inStock: boolean;
  itemType?: 'veg' | 'non-veg';
}

export interface Category {
  id: string;
  storeId: string;
  name: string;
}

// Full profile for the merchant
export interface MerchantProfile {
  name: string;
  id: string;
  email: string;
  phone: string;
  avatar: string;
  plan: string;
  revenue: string;
  storeCount: number;
  rating: number;
}