// src/pages/shopper/Home.jsx
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Star, TrendingUp, Shirt, Footprints } from 'lucide-react';
import { categories, getFeaturedProducts } from '../../data/products';
import Button from '../../components/Shared/Button';
import Card from '../../components/Shared/Card';
// framer-motion removed for compatibility with React 19; using Tailwind transitions
import ImageWithSkeleton from '../../components/Shared/ImageWithSkeleton';
import QuickViewModal from '../../components/Shared/QuickViewModal';
import ProductPreview from '../../components/Shared/ProductPreview';
import { useEffect, useState } from 'react';
import ProductRecommendations from './ProductRecommendations';
import RecentlyViewed from './RecentlyViewed';
import useCartStore from '../../stores/cartStore';
import useWishlistStore from '../../stores/WishlistStore';
import toast from 'react-hot-toast';

export default function Home() {
  const featuredProducts = getFeaturedProducts();
  const { addItem } = useCartStore();
  const { toggleWishlist, isInWishlist } = useWishlistStore();
  const [quickProduct, setQuickProduct] = useState(null);
  const [heroIndex, setHeroIndex] = useState(0);
  const [hiddenFeaturedIds, setHiddenFeaturedIds] = useState([]);
  const navigate = useNavigate();

  const handleAddToCart = (product) => {
    addItem(product, 1);
    toast.success(`${product.name} added to cart!`);
  };

  const handleToggleWishlist = (product) => {
    toggleWishlist(product.id);
    if (isInWishlist(product.id)) {
      toast.success('Removed from wishlist');
    } else {
      toast.success('Added to wishlist');
    }
  };

  const handleHideFeatured = (productId) => {
    setHiddenFeaturedIds((prev) => (prev.includes(productId) ? prev : [...prev, productId]));
  };

  const categoryMeta = {
    'mens-clothing': { icon: Shirt, tone: 'bg-emerald-100 text-emerald-700' },
    'womens-clothing': { icon: Shirt, tone: 'bg-rose-100 text-rose-700' },
    'mens-shoes': { icon: Footprints, tone: 'bg-amber-100 text-amber-700' },
    'womens-shoes': { icon: Footprints, tone: 'bg-sky-100 text-sky-700' },
  };

  const heroImages = [
    'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1400',
    'https://images.unsplash.com/photo-1521334884684-d80222895322?w=1400',
    'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1400',
  ];
  const visibleFeatured = featuredProducts.filter((product) => !hiddenFeaturedIds.includes(product.id));

  useEffect(() => {
    const id = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 4500);
    return () => clearInterval(id);
  }, [heroImages.length]);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute -top-32 right-[-10%] h-72 w-72 rounded-full bg-emerald-400/20 blur-3xl" />
        <div className="absolute bottom-[-20%] left-[-5%] h-80 w-80 rounded-full bg-amber-300/20 blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="max-w-3xl animate-rise">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-sm font-semibold text-emerald-700 shadow-sm">
                <TrendingUp className="w-4 h-4" />
                Smart picks for the season
              </div>
              <h1 className="mt-6 text-4xl md:text-6xl font-bold text-slate-900">
                Shop smarter with curated, confident picks.
              </h1>
              <p className="text-xl md:text-2xl mt-6 text-slate-600">
                Discover high-performing products, quick delivery, and seamless checkout. Free shipping on orders over $50.
              </p>
              <div className="flex flex-wrap gap-4 mt-8">
                <Button 
                  size="lg" 
                  variant="primary"
                  onClick={() => navigate('/products')}
                >
                  Shop Now
                  <ArrowRight className="w-5 h-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                >
                  Learn More
                </Button>
              </div>
            </div>

            <div className="relative animate-rise">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-white/70 shadow-xl bg-white/70 backdrop-blur">
                {heroImages.map((image, index) => (
                  <div
                    key={image}
                    className={`absolute inset-0 transition-opacity duration-700 ${heroIndex === index ? 'opacity-100' : 'opacity-0'}`}
                  >
                    <ImageWithSkeleton
                      src={image}
                      alt={`Thecla Store showcase ${index + 1}`}
                      className="w-full h-full"
                    />
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-center gap-2">
                {heroImages.map((_, index) => (
                  <button
                    key={`hero-dot-${index}`}
                    onClick={() => setHeroIndex(index)}
                    className={`h-2.5 w-2.5 rounded-full transition-colors ${heroIndex === index ? 'bg-emerald-600' : 'bg-emerald-200'}`}
                    aria-label={`Show hero image ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Shop by Category
            </h2>
            <p className="text-lg text-slate-600">
              Browse our wide selection of products
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => {
              const meta = categoryMeta[category.slug];
              const Icon = meta?.icon;
              return (
                <Link
                  key={category.id}
                  to={`/products?category=${category.slug}`}
                  className="group"
                >
                  <Card hover className="text-center p-6 h-full">
                    <div className={`mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl ${meta?.tone || 'bg-slate-100 text-slate-700'}`}>
                      {Icon ? <Icon className="w-6 h-6" /> : <span className="text-sm">Shop</span>}
                    </div>
                    <h3 className="font-semibold text-slate-900 group-hover:text-emerald-700 transition-colors">
                      {category.name}
                    </h3>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <div className="flex items-center gap-2 text-emerald-600 mb-2">
                <TrendingUp className="w-5 h-5" />
                <span className="text-sm font-semibold uppercase">Featured</span>
              </div>
              <h2 className="text-3xl font-bold text-slate-900">
                Trending Products
              </h2>
            </div>
            <Link to="/products">
              <Button variant="outline">
                View All
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {visibleFeatured.map((product) => (
              <Card key={product.id} hover className="overflow-hidden p-0 animate-float tilt-perspective group">
                <Link to={`/products/${product.slug}`} className="block">
                  <div className="relative aspect-square overflow-hidden bg-gray-100 transform transition-transform duration-200 hover:scale-105">
                    <ImageWithSkeleton
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full"
                      onImageError={() => handleHideFeatured(product.id)}
                    />
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setQuickProduct(product);
                      }}
                      className="absolute top-3 right-3 p-2 bg-white/90 rounded-full shadow-md hover:bg-white transition-colors"
                    >
                      <svg className="w-5 h-5 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A2 2 0 0020 5.764V4a2 2 0 00-2-2h-4.236a2 2 0 00-1.792 1.106L9 8" />
                      </svg>
                    </button>
                  </div>
                </Link>

                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <Link to={`/products/${product.slug}`}>
                      <h3 className="font-semibold text-slate-900 mb-2 hover:text-emerald-700 line-clamp-2">
                        {product.name}
                      </h3>
                    </Link>
                    <div className="text-sm text-slate-600">${product.price}</div>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                      ))}
                    </div>
                    <span className="text-sm text-slate-600">({product.reviews})</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button fullWidth onClick={() => handleAddToCart(product)} disabled={product.stock === 0}>
                      {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                    </Button>
                    <button onClick={() => handleToggleWishlist(product)} className="p-2 rounded-full hover:bg-slate-100">
                      <svg className={`w-5 h-5 ${isInWishlist(product.id) ? 'fill-red-500 text-red-500' : 'text-slate-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          <QuickViewModal isOpen={!!quickProduct} onClose={() => setQuickProduct(null)} product={quickProduct} />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                Free Shipping
              </h3>
              <p className="text-slate-600">
                On orders over $50
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                Secure Payment
              </h3>
              <p className="text-slate-600">
                100% secure transactions
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                Easy Returns
              </h3>
              <p className="text-slate-600">
                30-day return policy
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-emerald-600 to-amber-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Shopping?
          </h2>
          <p className="text-xl mb-8 text-emerald-50">
            Join thousands of happy customers today
          </p>
          <Button 
            size="lg" 
            variant="secondary"
            onClick={() => navigate('/products')}
          >
            Browse Products
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* Recently Viewed */}
      <RecentlyViewed />

      {/* Recommendations */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <ProductRecommendations limit={4} />
      </div>
    </div>
  );
}
