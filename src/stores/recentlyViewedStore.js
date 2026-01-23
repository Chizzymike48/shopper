// src/store/recentlyViewedStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useRecentlyViewedStore = create(
  persist(
    (set, get) => ({
      items: [], // Array of product IDs

      // Add product to recently viewed
      addToRecentlyViewed: (productId) => {
        const { items } = get();
        // Remove if already exists and add to front
        const updated = [productId, ...items.filter(id => id !== productId)].slice(0, 20);
        set({ items: updated });
      },

      // Get recently viewed products
      getRecentlyViewed: () => {
        return get().items;
      },

      // Clear recently viewed
      clearRecentlyViewed: () => {
        set({ items: [] });
      },
    }),
    {
      name: 'recently-viewed-storage',
    }
  )
);

export default useRecentlyViewedStore;

// Ensure persisted IDs are numeric (coerce strings to numbers on load)
try {
  const s = useRecentlyViewedStore.getState();
  if (s && Array.isArray(s.items) && s.items.some(id => typeof id === 'string')) {
    useRecentlyViewedStore.setState({ items: s.items.map(id => Number(id)) });
  }
} catch {
  // ignore
}