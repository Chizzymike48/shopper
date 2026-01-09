// src/pages/shopper/Cart.jsx
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, Heart } from 'lucide-react';
import { useState } from 'react';
import Button from '../../components/Shared/Button';
import Card from '../../components/Shared/Card';
import Input from '../../components/Shared/Input';
import useCartStore from '../../stores/cartStore';
import useAuthStore from '../../stores/authStore';
import { sendOrderEmail } from '../../utils/mockEmail';
import useWishlistStore from '../../stores/WishlistStore';
import usePromoStore from '../../stores/promoStore';
import toast from 'react-hot-toast';

export default function Cart() {
  const navigate = useNavigate();
  const { items, updateQuantity, removeItem, getCartTotals, clearCart, expressCheckout } = useCartStore();
  const { user } = useAuthStore();
  const { isAuthenticated } = useAuthStore();
  const { addToWishlist } = useWishlistStore();
  const { appliedPromo, applyPromo, removePromo, calculateDiscount } = usePromoStore();
  
  const [promoCode, setPromoCode] = useState('');
  const [promoLoading, setPromoLoading] = useState(false);

  const { subtotal, tax, shipping, itemCount } = getCartTotals();
  const { discount, freeShipping } = calculateDiscount(subtotal, shipping);
  
  const actualShipping = freeShipping ? 0 : shipping;
  const total = subtotal - discount + tax + actualShipping;

  const handleUpdateQuantity = (itemKey, newQuantity) => {
    if (newQuantity < 1) return;
    updateQuantity(itemKey, newQuantity);
  };

  const handleRemoveItem = (itemKey, productName) => {
    removeItem(itemKey);
    toast.success(`${productName} removed from cart`);
  };

  const handleSaveForLater = (item) => {
    addToWishlist(item.product.id);
    removeItem(item.itemKey);
    toast.success(`${item.product.name} moved to wishlist`);
  };

  const handleApplyPromo = () => {
    if (!promoCode.trim()) return;

    setPromoLoading(true);
    // Simulate API call
    setTimeout(() => {
      const result = applyPromo(promoCode, subtotal);
      if (result.success) {
        toast.success(`Promo code "${promoCode}" applied!`);
        setPromoCode('');
      } else {
        toast.error(result.error);
      }
      setPromoLoading(false);
    }, 500);
  };

  const handleRemovePromo = () => {
    removePromo();
    toast.success('Promo code removed');
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      toast.error('Please login to continue');
      navigate('/login?redirect=/checkout');
    } else {
      navigate('/checkout');
    }
  };

  const handleOneClickBuy = () => {
    if (!isAuthenticated || !user?.savedPayments || user.savedPayments.length === 0) {
      toast.error('Please login and save a payment method to use one-click checkout');
      navigate('/login?redirect=/cart');
      return;
    }

    const customer = { email: user.email, name: `${user.firstName || ''} ${user.lastName || ''}`.trim() };
    const order = expressCheckout(customer);
    try {
      sendOrderEmail(customer.email || 'guest@example.com', { id: order.id, items: order.items, total: order.totals.total });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn('Mock email failed', err);
    }
    navigate(`/order-success/${order.id}`);
  };

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Card className="text-center py-16">
          <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h2>
          <p className="text-gray-600 mb-8 text-lg">
            Looks like you haven't added anything to your cart yet.
          </p>
          <Button size="lg" onClick={() => navigate('/products')}>
            Start Shopping
            <ArrowRight className="w-5 h-5" />
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <Card>
            <div className="divide-y divide-gray-200">
              {items.map((item) => (
                <div key={item.itemKey} className="py-6 first:pt-0 last:pb-0">
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <Link
                      to={`/products/${item.product.slug}`}
                      className="flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden bg-gray-100"
                    >
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </Link>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <Link
                        to={`/products/${item.product.slug}`}
                        className="text-lg font-semibold text-gray-900 hover:text-blue-600 block mb-1"
                      >
                        {item.product.name}
                      </Link>

                      {item.variant && (
                        <p className="text-sm text-gray-600 mb-2">
                          {item.variant.size && `Size: ${item.variant.size}`}
                          {item.variant.size && item.variant.color && ' • '}
                          {item.variant.color && `Color: ${item.variant.color}`}
                        </p>
                      )}

                      <div className="flex items-center justify-between mt-4">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleUpdateQuantity(item.itemKey, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="p-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-12 text-center font-semibold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleUpdateQuantity(item.itemKey, item.quantity + 1)}
                            disabled={item.quantity >= item.product.stock}
                            className="p-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <p className="text-xl font-bold text-gray-900">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </p>
                          <p className="text-sm text-gray-600">
                            ${item.product.price} each
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Remove Button */}
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => handleRemoveItem(item.itemKey, item.product.name)}
                        className="text-red-500 hover:text-red-600 p-2"
                        title="Remove item"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleSaveForLater(item)}
                        className="text-blue-500 hover:text-blue-600 p-2"
                        title="Save for later"
                      >
                        <Heart className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Clear Cart */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <Button
                variant="ghost"
                onClick={() => {
                  if (window.confirm('Are you sure you want to clear your cart?')) {
                    clearCart();
                    toast.success('Cart cleared');
                  }
                }}
                className="text-red-600 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4" />
                Clear Cart
              </Button>
            </div>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

            {/* Promo Code */}
            <div className="mb-6 pb-6 border-b border-gray-200">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Promo Code
              </label>
              {!appliedPromo ? (
                <div className="flex gap-2">
                  <Input
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                    placeholder="Enter code"
                    leftIcon={<Tag className="w-5 h-5" />}
                    onKeyPress={(e) => e.key === 'Enter' && handleApplyPromo()}
                  />
                  <Button
                    onClick={handleApplyPromo}
                    disabled={!promoCode.trim() || promoLoading}
                    loading={promoLoading}
                  >
                    Apply
                  </Button>
                </div>
              ) : (
                <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Tag className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-semibold text-green-900">{appliedPromo.code}</p>
                      <p className="text-sm text-green-700">{appliedPromo.description}</p>
                    </div>
                  </div>
                  <button
                    onClick={handleRemovePromo}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between text-gray-700">
                <span>Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'items'})</span>
                <span className="font-semibold">${subtotal.toFixed(2)}</span>
              </div>

              {discount > 0 && (
                <div className="flex items-center justify-between text-green-600">
                  <span>Discount</span>
                  <span className="font-semibold">-${discount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex items-center justify-between text-gray-700">
                <span>Tax (9%)</span>
                <span className="font-semibold">${tax.toFixed(2)}</span>
              </div>

              <div className="flex items-center justify-between text-gray-700">
                <span>Shipping</span>
                <span className="font-semibold">
                  {actualShipping === 0 ? (
                    <span className="text-green-600">FREE</span>
                  ) : (
                    `${actualShipping.toFixed(2)}`
                  )}
                </span>
              </div>

              {!freeShipping && subtotal < 50 && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-sm text-blue-800">
                    Add <strong>${(50 - subtotal).toFixed(2)}</strong> more for free shipping!
                  </p>
                </div>
              )}
            </div>

            <div className="pt-6 border-t border-gray-200 mb-6">
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-gray-900">Total</span>
                <span className="text-2xl font-bold text-gray-900">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>

            <Button
              fullWidth
              size="lg"
              onClick={handleCheckout}
              rightIcon={<ArrowRight className="w-5 h-5" />}
            >
              Proceed to Checkout
            </Button>

            {isAuthenticated && user?.savedPayments && user.savedPayments.length > 0 && (
              <Button
                fullWidth
                size="lg"
                variant="primary"
                onClick={handleOneClickBuy}
                className="mt-3"
              >
                One-Click Buy ({user.savedPayments[0].label})
              </Button>
            )}

            <Link to="/products">
              <Button fullWidth variant="outline" className="mt-3">
                Continue Shopping
              </Button>
            </Link>

            {/* Payment Methods */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600 text-center mb-3">
                We accept
              </p>
              <div className="flex items-center justify-center gap-3">
                <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center text-xs font-bold">
                  VISA
                </div>
                <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center text-xs font-bold">
                  MC
                </div>
                <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center text-xs font-bold">
                  AMEX
                </div>
                <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center text-xs font-bold">
                  PP
                </div>
              </div>
            </div>

            {/* Security Badge */}
            <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-600">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Secure Checkout
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}