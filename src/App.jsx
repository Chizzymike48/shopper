// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import useAuthStore from './stores/authStore';

// Layouts
import ShopperLayout from './components/layout/shopperLayout';
import MerchantLayout from './components/layout/merchantLayout';
import AdminLayout from './components/layout/AdminLayout';

// Shopper Pages
import Home from './Pages/shopper/Home';
import ProductList from './Pages/shopper/ProductList';
import ProductDetail from './Pages/shopper/ProductDetail';
import Cart from './Pages/shopper/Cart';
import Checkout from './Pages/shopper/Checkout';
import OrderSuccess from './Pages/shopper/OrderSuccess';
import MyOrders from './Pages/shopper/MyOrders';
import Profile from './Pages/shopper/Profile';
import Wishlist from './Pages/shopper/WishList';
import Compare from './Pages/shopper/compare';

// Merchant Pages
import MerchantDashboard from './Pages/Merchant/Dashboard';
import MerchantProducts from './Pages/Merchant/Products';
import MerchantOrders from './Pages/Merchant/Orders';
import MerchantAnalytics from './Pages/Merchant/Analytics';

// Admin Pages
import AdminDashboard from './Pages/Admin/Dashboard';
import AdminUsers from './Pages/Admin/User';
import AdminProducts from './Pages/Admin/Products';
import AdminSupport from './Pages/Admin/Support';
import AdminAudit from './Pages/Admin/Audit';
import AdminSettings from './Pages/Admin/Settings';
import MockEmails from './Pages/Admin/MockEmails';

// Auth Pages
import Login from './Pages/shopper/Auth/Login';
import Register from './Pages/shopper/Auth/Register';

// Protected Route Component
function ProtectedRoute({ children, merchantOnly = false, adminOnly = false }) {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    // preserve attempted path for redirect after login
    const redirectTo = encodeURIComponent(window.location.pathname + window.location.search);
    return <Navigate to={`/login?redirect=${redirectTo}`} replace />;
  }

  if (merchantOnly && user?.role !== 'merchant') {
    return <Navigate to="/" replace />;
  }

  if (adminOnly && user?.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return children;
}

// Public Route (redirect if logged in)
function PublicRoute({ children }) {
  const { isAuthenticated } = useAuthStore();
  
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default function App() {
  // Enable admin routes only in development or when VITE_ENABLE_ADMIN is set to 'true'
  const enableAdmin = import.meta.env.VITE_ENABLE_ADMIN === 'true' || import.meta.env.DEV;

  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
      
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } />
        <Route path="/register" element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        } />

        {/* Shopper Routes */}
        <Route element={<ShopperLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:slug" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/compare" element={<Compare />} />
          
          {/* Protected Shopper Routes */}
          <Route path="/checkout" element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          } />
          <Route path="/order-success/:orderId" element={<OrderSuccess />} />
          <Route path="/my-orders" element={
            <ProtectedRoute>
              <MyOrders />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
        </Route>

        {/* Merchant Routes */}
        <Route path="/merchant" element={
          <ProtectedRoute merchantOnly>
            <MerchantLayout />
          </ProtectedRoute>
        }>
          <Route index element={<MerchantDashboard />} />
          <Route path="products" element={<MerchantProducts />} />
          <Route path="orders" element={<MerchantOrders />} />
          <Route path="analytics" element={<MerchantAnalytics />} />
        </Route>

        {/* Admin Routes (dev-only or when VITE_ENABLE_ADMIN=true) */}
        {enableAdmin && (
          <Route path="/admin" element={
            <ProtectedRoute adminOnly>
              <AdminLayout />
            </ProtectedRoute>
          }>
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="support" element={<AdminSupport />} />
            <Route path="mock-emails" element={<MockEmails />} />
            <Route path="audit" element={<AdminAudit />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>
        )}

        {/* 404 Route */}
        <Route path="*" element={
          <div className="min-h-screen flex items-center justify-center px-6 py-16">
            <div className="max-w-xl text-center">
              <p className="text-xs uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">Lost in the aisles</p>
              <h1 className="mt-4 text-6xl sm:text-7xl font-bold text-slate-900 dark:text-white">404</h1>
              <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
                Page not found. The link may be outdated or moved.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Link
                  to="/"
                  className="inline-flex items-center justify-center rounded-full bg-[color:var(--brand)] px-6 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[color:var(--brand-strong)]"
                >
                  Go back home
                </Link>
                <Link
                  to="/products"
                  className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white/70 px-6 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-white dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100 dark:hover:bg-slate-900"
                >
                  Browse products
                </Link>
              </div>
            </div>
          </div>
        } />
      </Routes>
    </BrowserRouter>
  );
}
