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
}

export interface Category {
  id: string;
  storeId: string;
  name: string;
}

// Minimal profile for the merchant account itself
export interface MerchantProfile {
  name: string;
  email: string;
  avatar: string;
}
