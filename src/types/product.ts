export interface Product {
  id: string;
  name: string;
  category: 'joran' | 'reel' | 'umpan' | 'aksesoris';
  rentalPrice?: number;
  buyPrice: number;
  stock: number;
  description: string;
  specifications: string[];
  image: string;
  canRent: boolean;
  canBuy: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  type: 'rent' | 'buy';
  rentalDays?: number;
}

export type PaymentMethod = 'bank' | 'gopay' | 'ovo' | 'dana' | 'qris';
