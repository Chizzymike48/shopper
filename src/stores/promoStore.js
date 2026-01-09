// src/store/promoStore.js
import { create } from 'zustand';

// Mock promo codes
const promoCodes = {
  'SAVE10': {
    code: 'SAVE10',
    type: 'percentage',
    value: 10,
    minPurchase: 0,
    description: '10% off your order',
  },
  'SAVE20': {
    code: 'SAVE20',
    type: 'percentage',
    value: 20,
    minPurchase: 100,
    description: '20% off orders over $100',
  },
  'FREESHIP': {
    code: 'FREESHIP',
    type: 'free_shipping',
    value: 0,
    minPurchase: 0,
    description: 'Free shipping on your order',
  },
  'FLAT15': {
    code: 'FLAT15',
    type: 'fixed',
    value: 15,
    minPurchase: 50,
    description: '$15 off orders over $50',
  },
};

const usePromoStore = create((set, get) => ({
  appliedPromo: null,

  // Apply promo code
  applyPromo: (code, subtotal) => {
    const promo = promoCodes[code.toUpperCase()];

    if (!promo) {
      return { success: false, error: 'Invalid promo code' };
    }

    if (subtotal < promo.minPurchase) {
      return {
        success: false,
        error: `This code requires a minimum purchase of $${promo.minPurchase}`,
      };
    }

    set({ appliedPromo: promo });
    return { success: true, promo };
  },

  // Remove promo code
  removePromo: () => {
    set({ appliedPromo: null });
  },

  // Calculate discount
  calculateDiscount: (subtotal, shipping) => {
    const { appliedPromo } = get();

    if (!appliedPromo) {
      return { discount: 0, freeShipping: false };
    }

    let discount = 0;
    let freeShipping = false;

    if (appliedPromo.type === 'percentage') {
      discount = (subtotal * appliedPromo.value) / 100;
    } else if (appliedPromo.type === 'fixed') {
      discount = Math.min(appliedPromo.value, subtotal);
    } else if (appliedPromo.type === 'free_shipping') {
      freeShipping = true;
    }

    return { discount, freeShipping };
  },

  // Get applied promo
  getAppliedPromo: () => get().appliedPromo,
}));

export default usePromoStore;