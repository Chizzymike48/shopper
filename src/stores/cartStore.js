// src/store/cartStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      
      // Add item to cart
      addItem: (product, quantity = 1, variant = null) => {
        const { items } = get();
        const itemKey = variant ? `${product.id}-${variant.id}` : `${product.id}`;
        
        const existingItemIndex = items.findIndex(item => {
          if (variant) {
            return item.product.id === product.id && item.variant?.id === variant.id;
          }
          return item.product.id === product.id && !item.variant;
        });

        if (existingItemIndex > -1) {
          // Update quantity if item exists
          const updatedItems = [...items];
          updatedItems[existingItemIndex].quantity += quantity;
          set({ items: updatedItems });
        } else {
          // Add new item
          set({
            items: [...items, { product, quantity, variant, itemKey }],
          });
        }
      },

      // Remove item from cart
      removeItem: (itemKey) => {
        set({ items: get().items.filter(item => item.itemKey !== itemKey) });
      },

      // Update item quantity
      updateQuantity: (itemKey, quantity) => {
        if (quantity <= 0) {
          get().removeItem(itemKey);
          return;
        }
        
        const updatedItems = get().items.map(item =>
          item.itemKey === itemKey ? { ...item, quantity } : item
        );
        set({ items: updatedItems });
      },

      // Clear cart
      clearCart: () => {
        set({ items: [] });
      },

      // Get cart totals
      getCartTotals: () => {
        const { items } = get();
        const subtotal = items.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        );
        const tax = subtotal * 0.09; // 9% tax
        const shipping = subtotal > 50 ? 0 : 10; // Free shipping over $50
        const total = subtotal + tax + shipping;

        return {
          subtotal: parseFloat(subtotal.toFixed(2)),
          tax: parseFloat(tax.toFixed(2)),
          shipping: parseFloat(shipping.toFixed(2)),
          total: parseFloat(total.toFixed(2)),
          itemCount: items.reduce((count, item) => count + item.quantity, 0),
        };
      },

      // Get item count
      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },

      // Express checkout: create a mock order, clear cart and return order info
      expressCheckout: (customer = {}) => {
        const { items, getCartTotals, clearCart } = get();
        const totals = getCartTotals();
        const orderId = `ORD-${Date.now()}`;
        const order = {
          id: orderId,
          items,
          totals,
          customer,
          createdAt: new Date().toISOString(),
        };

        // Clear cart after creating order
        clearCart();

        return order;
      },
    }),
    {
      name: 'shopping-cart', // localStorage key
    }
  )
);

export default useCartStore;