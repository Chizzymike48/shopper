// src/store/wishlistStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useWishlistStore = create(
  persist(
    (set, get) => ({
      items: [], // Array of product IDs

      // Add to wishlist
      addToWishlist: (productId) => {
        const { items } = get();
        if (!items.includes(productId)) {
          set({ items: [...items, productId] });
        }
      },

      // Remove from wishlist
      removeFromWishlist: (productId) => {
        set({ items: get().items.filter(id => id !== productId) });
      },

      // Toggle wishlist
      toggleWishlist: (productId) => {
        const { items } = get();
        if (items.includes(productId)) {
          get().removeFromWishlist(productId);
        } else {
          get().addToWishlist(productId);
        }
      },

      // Check if in wishlist
      isInWishlist: (productId) => {
        return get().items.includes(productId);
      },

      // Clear wishlist
      clearWishlist: () => {
        set({ items: [] });
      },

      // Get wishlist count
      getWishlistCount: () => {
        return get().items.length;
      },
    }),
    {
      name: 'wishlist-storage',
    }
  )
);

export default useWishlistStore;

// Ensure persisted IDs are numeric (coerce strings to numbers on load)
try {
  const s = useWishlistStore.getState();
  if (s && Array.isArray(s.items) && s.items.some(id => typeof id === 'string')) {
    useWishlistStore.setState({ items: s.items.map(id => Number(id)) });
  }
} catch (e) {
  // ignore
}