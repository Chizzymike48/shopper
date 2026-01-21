// src/components/layouts/ShopperLayout.jsx
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, User, Menu, X, BarChart3, SunMoon, MessageCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import useCartStore from '../../stores/cartStore';
import useWishlistStore from '../../stores/WishlistStore';
import useCompareStore from '../../stores/compareStore';
import useAuthStore from '../../stores/authStore';
import Button from '../Shared/Button';
import SearchAutocomplete from '../Shared/SearchAutocomplete';

export default function ShopperLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('theme') || 'light';
    } catch {
      return 'light';
    }
  });
  const navigate = useNavigate();
  
  const { getItemCount } = useCartStore();
  const { getWishlistCount } = useWishlistStore();
  const { getCompareCount } = useCompareStore();
  const { isAuthenticated, user, logout } = useAuthStore();
  
  const cartCount = getItemCount();
  const wishlistCount = getWishlistCount();
  const compareCount = getCompareCount();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Theme toggle
  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    try {
      localStorage.setItem('theme', next);
    } catch { /* ignore localStorage failures */ }
    if (next === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Initialize theme on mount
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <div className="min-h-screen text-slate-900 dark:text-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur border-b border-white/60 dark:border-slate-700/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold font-display tracking-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 via-teal-500 to-amber-400">Thecla</span>
                <span className="ml-2 text-slate-900 dark:text-slate-100">Store</span>
              </span>
            </Link>

            {/* Search Bar - Desktop */}
            <SearchAutocomplete className="hidden md:block flex-1 max-w-lg mx-8" />

            {/* Navigation Icons */}
            <div className="flex items-center gap-4">
              {/* Compare */}
              <Link to="/compare" className="relative p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full">
                <BarChart3 className="w-6 h-6 text-slate-700 dark:text-slate-200" />
                {compareCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {compareCount}
                  </span>
                )}
              </Link>

              {/* Wishlist */}
              <Link to="/wishlist" className="relative p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full">
                <Heart className="w-6 h-6 text-slate-700 dark:text-slate-200" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link to="/cart" className="relative p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full">
                <ShoppingCart className="w-6 h-6 text-slate-700 dark:text-slate-200" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* User Menu */}
              {isAuthenticated ? (
                <div className="relative group">
                  <button className="flex items-center gap-2 p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full">
                    <User className="w-6 h-6 text-slate-700 dark:text-slate-200" />
                    <span className="hidden md:inline text-sm font-medium text-slate-700 dark:text-slate-200">
                      {user?.firstName}
                    </span>
                  </button>
                  
                  {/* Dropdown */}
                  <div className="hidden group-hover:block absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 rounded-xl shadow-lg py-2 border border-slate-200/60 dark:border-slate-700/60">
                    <Link to="/profile" className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800">
                      My Profile
                    </Link>
                    <Link to="/my-orders" className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800">
                      My Orders
                    </Link>
                    <Link to="/wishlist" className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800">
                      Wishlist
                    </Link>
                    {user?.role === 'merchant' && (
                      <Link to="/merchant" className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 border-t border-slate-200/70 dark:border-slate-700/70">
                        Merchant Dashboard
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-slate-100 dark:hover:bg-slate-800 border-t border-slate-200/70 dark:border-slate-700/70"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <div className="hidden md:flex gap-2">
                  <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>
                    Login
                  </Button>
                  <Button size="sm" onClick={() => navigate('/register')}>
                    Sign Up
                  </Button>
                </div>
              )}

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
                title="Toggle theme"
              >
                <SunMoon className="w-5 h-5 text-slate-700 dark:text-slate-200" />
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden py-3">
            <SearchAutocomplete className="w-full" />
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="px-4 space-y-2">
              <Link to="/" className="block py-2 text-slate-700 hover:text-emerald-600">
                Home
              </Link>
              <Link to="/products" className="block py-2 text-slate-700 hover:text-emerald-600">
                Products
              </Link>
              {isAuthenticated ? (
                <>
                  <Link to="/profile" className="block py-2 text-slate-700 hover:text-emerald-600">
                    Profile
                  </Link>
                  <Link to="/my-orders" className="block py-2 text-slate-700 hover:text-emerald-600">
                    My Orders
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left py-2 text-red-600"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="block py-2 text-slate-700 hover:text-emerald-600">
                    Login
                  </Link>
                  <Link to="/register" className="block py-2 text-slate-700 hover:text-emerald-600">
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">
                <span className="font-display">Thecla Store</span>
              </h3>
              <p className="text-gray-400">Your one-stop shop for everything you need.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Shop</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/products" className="hover:text-white">All Products</Link></li>
                <li><Link to="/products?category=mens-clothing" className="hover:text-white">Men's Clothing</Link></li>
                <li><Link to="/products?category=womens-clothing" className="hover:text-white">Women's Clothing</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
                <li><a href="#" className="hover:text-white">FAQ</a></li>
                <li><a href="#" className="hover:text-white">Shipping Info</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Account</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/profile" className="hover:text-white">My Account</Link></li>
                <li><Link to="/my-orders" className="hover:text-white">Order History</Link></li>
                <li><Link to="/wishlist" className="hover:text-white">Wishlist</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Thecla Store. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Support Floating Button */}
      <button
        onClick={() => window.alert('Contact support at support@example.com')}
        className="fixed right-6 bottom-6 bg-emerald-600 text-white w-14 h-14 rounded-full shadow-xl flex items-center justify-center hover:scale-105 transition-transform"
        title="Contact support"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    </div>
  );
}
