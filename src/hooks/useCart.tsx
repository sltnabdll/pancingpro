import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product } from '@/types/product';

interface CartStore {
  items: CartItem[];
  addItem: (product: Product, type: 'rent' | 'buy', quantity: number, rentalDays?: number) => void;
  removeItem: (productId: string, type: 'rent' | 'buy') => void;
  updateQuantity: (productId: string, type: 'rent' | 'buy', quantity: number) => void;
  updateRentalDays: (productId: string, days: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, type, quantity, rentalDays) => {
        const items = get().items;
        const existingItem = items.find(
          item => item.product.id === product.id && item.type === type
        );

        if (existingItem) {
          set({
            items: items.map(item =>
              item.product.id === product.id && item.type === type
                ? { ...item, quantity: item.quantity + quantity }
                : item
            )
          });
        } else {
          set({
            items: [...items, { product, quantity, type, rentalDays }]
          });
        }
      },

      removeItem: (productId, type) => {
        set({
          items: get().items.filter(
            item => !(item.product.id === productId && item.type === type)
          )
        });
      },

      updateQuantity: (productId, type, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId, type);
          return;
        }

        set({
          items: get().items.map(item =>
            item.product.id === productId && item.type === type
              ? { ...item, quantity }
              : item
          )
        });
      },

      updateRentalDays: (productId, days) => {
        set({
          items: get().items.map(item =>
            item.product.id === productId && item.type === 'rent'
              ? { ...item, rentalDays: days }
              : item
          )
        });
      },

      clearCart: () => set({ items: [] }),

      getTotalPrice: () => {
        return get().items.reduce((total, item) => {
          if (item.type === 'rent' && item.product.rentalPrice && item.rentalDays) {
            return total + (item.product.rentalPrice * item.rentalDays * item.quantity);
          }
          return total + (item.product.buyPrice * item.quantity);
        }, 0);
      }
    }),
    {
      name: 'cart-storage'
    }
  )
);
