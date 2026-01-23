// src/store/compareStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCompareStore = create(
  persist(
    (set, get) => ({
      items: [], // Array of product IDs (max 4)

      // Add product to comparison
      addToCompare: (productId) => {
        const { items } = get();
        if (items.length >= 4) {
          return { success: false, error: 'Maximum 4 products can be compared' };
        }
        if (items.includes(productId)) {
          return { success: false, error: 'Product already in comparison' };
        }
        set({ items: [...items, productId] });
        return { success: true };
      },

      // Remove product from comparison
      removeFromCompare: (productId) => {
        set({ items: get().items.filter(id => id !== productId) });
      },

      // Toggle comparison
      toggleCompare: (productId) => {
        const { items } = get();
        if (items.includes(productId)) {
          get().removeFromCompare(productId);
          return { success: true, action: 'removed' };
        } else {
          return { ...get().addToCompare(productId), action: 'added' };
        }
      },

      // Check if in comparison
      isInCompare: (productId) => {
        return get().items.includes(productId);
      },

      // Clear comparison
      clearCompare: () => {
        set({ items: [] });
      },

      // Get compare count
      getCompareCount: () => {
        return get().items.length;
      },
    }),
    {
      name: 'compare-storage',
    }
  )
);

export default useCompareStore;

// Ensure persisted IDs are numeric (coerce strings to numbers on load)
try {
  const s = useCompareStore.getState();
  if (s && Array.isArray(s.items) && s.items.some(id => typeof id === 'string')) {
    useCompareStore.setState({ items: s.items.map(id => Number(id)) });
  }
} catch {
  // ignore
}