import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Product } from '@/types';

interface WishlistItem {
  id: string;
  productId: string;
  product: Product;
  addedAt: Date;
}

interface WishlistStore {
  items: WishlistItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  toggleItem: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
  getCount: () => number;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        if (get().isInWishlist(product.id)) return;
        const item: WishlistItem = {
          id: `wishlist-${product.id}`,
          productId: product.id,
          product,
          addedAt: new Date(),
        };
        set({ items: [...get().items, item] });
      },

      removeItem: (productId) => {
        set({ items: get().items.filter(i => i.productId !== productId) });
      },

      toggleItem: (product) => {
        if (get().isInWishlist(product.id)) {
          get().removeItem(product.id);
        } else {
          get().addItem(product);
        }
      },

      isInWishlist: (productId) =>
        get().items.some(i => i.productId === productId),

      clearWishlist: () => set({ items: [] }),
      getCount: () => get().items.length,
    }),
    {
      name: 'berlin-wishlist',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
