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
    } catch (e) {
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
    } catch (e) {}
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
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">ShopHub</span>
            </Link>

            {/* Search Bar - Desktop */}
            <SearchAutocomplete className="hidden md:block flex-1 max-w-lg mx-8" />

            {/* Navigation Icons */}
            <div className="flex items-center gap-4">
              {/* Compare */}
              <Link to="/compare" className="relative p-2 hover:bg-gray-100 rounded-lg">
                <BarChart3 className="w-6 h-6 text-gray-700" />
                {compareCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {compareCount}
                  </span>
                )}
              </Link>

              {/* Wishlist */}
              <Link to="/wishlist" className="relative p-2 hover:bg-gray-100 rounded-lg">
                <Heart className="w-6 h-6 text-gray-700" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link to="/cart" className="relative p-2 hover:bg-gray-100 rounded-lg">
                <ShoppingCart className="w-6 h-6 text-gray-700" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* User Menu */}
              {isAuthenticated ? (
                <div className="relative group">
                  <button className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg">
                    <User className="w-6 h-6 text-gray-700" />
                    <span className="hidden md:inline text-sm font-medium text-gray-700">
                      {user?.firstName}
                    </span>
                  </button>
                  
                  {/* Dropdown */}
                  <div className="hidden group-hover:block absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2">
                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      My Profile
                    </Link>
                    <Link to="/my-orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      My Orders
                    </Link>
                    <Link to="/wishlist" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Wishlist
                    </Link>
                    {user?.role === 'merchant' && (
                      <Link to="/merchant" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 border-t">
                        Merchant Dashboard
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 border-t"
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
                className="p-2 rounded-lg hover:bg-gray-100"
                title="Toggle theme"
              >
                <SunMoon className="w-5 h-5 text-gray-700" />
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
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
              <Link to="/" className="block py-2 text-gray-700 hover:text-blue-600">
                Home
              </Link>
              <Link to="/products" className="block py-2 text-gray-700 hover:text-blue-600">
                Products
              </Link>
              {isAuthenticated ? (
                <>
                  <Link to="/profile" className="block py-2 text-gray-700 hover:text-blue-600">
                    Profile
                  </Link>
                  <Link to="/my-orders" className="block py-2 text-gray-700 hover:text-blue-600">
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
                  <Link to="/login" className="block py-2 text-gray-700 hover:text-blue-600">
                    Login
                  </Link>
                  <Link to="/register" className="block py-2 text-gray-700 hover:text-blue-600">
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
      <footer className="bg-gray-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">ShopHub</h3>
              <p className="text-gray-400">Your one-stop shop for everything you need.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Shop</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/products" className="hover:text-white">All Products</Link></li>
                <li><Link to="/products?category=electronics" className="hover:text-white">Electronics</Link></li>
                <li><Link to="/products?category=clothing" className="hover:text-white">Clothing</Link></li>
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
            <p>&copy; 2024 ShopHub. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Support Floating Button */}
      <button
        onClick={() => window.alert('Contact support at support@example.com')}
        className="fixed right-6 bottom-6 bg-blue-600 text-white w-14 h-14 rounded-full shadow-xl flex items-center justify-center hover:scale-105 transition-transform"
        title="Contact support"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    </div>
  );
}