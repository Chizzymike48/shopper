// src/stores/authStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authenticateUser } from '../data/user';

const useAuthStore = create(
  persist((set, get) => ({
    user: null,
    isAuthenticated: false,

    // Simple mock login/register (replace with real API calls)
    login: async (email, password) => {
      // validate against demo users
      const user = authenticateUser(email, password);
      if (user) {
        set({ user, isAuthenticated: true });
        return { success: true, user };
      }
      return { success: false, error: 'Invalid credentials' };
    },

    register: async (payload) => {
      const user = { id: Date.now(), ...payload };
      set({ user, isAuthenticated: true });
      return { success: true, user };
    },

    // Payment method management (mock)
    addPaymentMethod: (payment) => {
      const current = get().user || {};
      const methods = current.savedPayments || [];
      const newMethod = { id: `pm_${Date.now()}`, ...payment };
      const updatedUser = { ...current, savedPayments: [newMethod, ...methods] };
      set({ user: updatedUser });
      return newMethod;
    },

    removePaymentMethod: (id) => {
      const current = get().user || {};
      const methods = current.savedPayments || [];
      const updated = methods.filter(m => m.id !== id);
      set({ user: { ...current, savedPayments: updated } });
    },

    logout: () => {
      set({ user: null, isAuthenticated: false });
    },

    updateProfile: (updates) => {
      set({ user: { ...get().user, ...updates } });
    },

    // Helper used in some places as a function
    isMerchant: () => get().user?.role === 'merchant',
  })),
  {
    name: 'shophub-auth',
  }
);

export default useAuthStore;
