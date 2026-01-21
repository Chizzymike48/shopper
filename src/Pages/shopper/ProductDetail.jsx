// src/pages/shopper/ProductDetail.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Star, Heart, ShoppingCart, Minus, Plus, ChevronLeft, Truck, Shield, RefreshCw, BarChart3 } from 'lucide-react';
import { getProductBySlug, products } from '../../data/products';
import Button from '../../components/Shared/Button';
import Card from '../../components/Shared/Card';
import Badge from '../../components/Shared/Badge';
import ImageGallery from '../../Pages/shopper/ImageGallery';
import ProductReviews from '../../Pages/shopper/ProductReviews';
import ProductQA from '../../Pages/shopper/ProductQA';
import ShippingEstimator from '../../Pages/shopper/ShippingEstimator';
import ProductRecommendations from '../../Pages/shopper/ProductRecommendations';
import ImageWithSkeleton from '../../components/Shared/ImageWithSkeleton';
import useCartStore from '../../stores/cartStore';
import useWishlistStore from '../../stores/WishlistStore';
import useRecentlyViewedStore from '../../stores/recentlyViewedStore';
import useCompareStore from '../../stores/compareStore';
import useAuthStore from '../../stores/authStore';
import { sendOrderEmail } from '../../utils/mockEmail';
import toast from 'react-hot-toast';

export default function ProductDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const product = getProductBySlug(slug);

  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(product?.variants?.[0] || null);
  const [activeTab, setActiveTab] = useState('description');

  const { addItem, expressCheckout } = useCartStore();
  const { user, isAuthenticated } = useAuthStore();
  const { toggleWishlist, isInWishlist } = useWishlistStore();
  const { addToRecentlyViewed } = useRecentlyViewedStore();
  const { toggleCompare, isInCompare } = useCompareStore();

  // Track product view
  useEffect(() => {
    if (product) {
      addToRecentlyViewed(product.id);
    }
  }, [product, addToRecentlyViewed]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Card className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
          <p className="text-gray-600 mb-6">The product you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/products')}>Browse Products</Button>
        </Card>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem(product, quantity, selectedVariant);
    toast.success(`${product.name} added to cart!`);
  };

  const handleBuyNow = () => {
    // If user has saved payment methods and is authenticated, use express checkout with customer info
    addItem(product, quantity, selectedVariant);
    const customer = {
      email: isAuthenticated ? user?.email : '',
      name: isAuthenticated ? `${user?.firstName || ''} ${user?.lastName || ''}`.trim() : '',
    };

    const order = expressCheckout(customer);
    try {
      sendOrderEmail(customer.email || 'guest@example.com', { id: order.id, items: order.items, total: order.totals.total });
    } catch (err) {
       
      console.warn('Mock email failed', err);
    }
    navigate(`/order-success/${order.id}`);
  };

  const handleOneClick = () => {
    if (!isAuthenticated || !user?.savedPayments || user.savedPayments.length === 0) {
      toast.error('Please login and save a payment method to use one-click checkout');
      return;
    }
    // perform express checkout using saved customer info
    const customer = { email: user.email, name: `${user.firstName || ''} ${user.lastName || ''}`.trim() };
    const order = expressCheckout(customer);
    try {
      sendOrderEmail(customer.email || 'guest@example.com', { id: order.id, items: order.items, total: order.totals.total });
    } catch (err) {
       
      console.warn('Mock email failed', err);
    }
    navigate(`/order-success/${order.id}`);
  };

  const handleToggleWishlist = () => {
    toggleWishlist(product.id);
    if (isInWishlist(product.id)) {
      toast.success('Removed from wishlist');
    } else {
      toast.success('Added to wishlist');
    }
  };

  const handleToggleCompare = () => {
    const result = toggleCompare(product.id);
    if (result.success) {
      if (result.action === 'added') {
        toast.success('Added to comparison');
      } else {
        toast.success('Removed from comparison');
      }
    } else {
      toast.error(result.error);
    }
  };

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // Get related products (same category, exclude current)
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const isWishlisted = isInWishlist(product.id);
  const isComparing = isInCompare(product.id);
  const discount = product.compareAtPrice 
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
        <Link to="/" className="hover:text-emerald-700">Home</Link>
        <span>/</span>
        <Link to="/products" className="hover:text-emerald-700">Products</Link>
        <span>/</span>
        <span className="text-gray-900 font-medium">{product.name}</span>
      </div>

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <ChevronLeft className="w-5 h-5" />
        Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Images Section - Now using ImageGallery component */}
        <div>
          <ImageGallery images={product.images} productName={product.name} />
        </div>

        {/* Product Info Section */}
        <div>
          {/* Title & Rating */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {product.name}
          </h1>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(product.rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-gray-600">
              {product.rating} ({product.reviews} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-4xl font-bold text-gray-900">
              ${product.price}
            </span>
            {product.compareAtPrice && (
              <>
                <span className="text-2xl text-gray-500 line-through">
                  ${product.compareAtPrice}
                </span>
                <Badge variant="danger">
                  {discount}% OFF
                </Badge>
              </>
            )}
          </div>

          {/* Description */}
          <p className="text-gray-700 mb-6 leading-relaxed">
            {product.description}
          </p>

          {/* Stock Status */}
          <div className="mb-6">
            {product.stock > 0 ? (
              <Badge variant="success">
                {product.stock} in stock
              </Badge>
            ) : (
              <Badge variant="danger">
                Out of stock
              </Badge>
            )}
          </div>

          {/* Variants */}
          {product.variants && product.variants.length > 0 && (
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Select Variant
              </label>
              <div className="grid grid-cols-3 gap-3">
                {product.variants.map((variant) => (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariant(variant)}
                    className={`px-4 py-3 border-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedVariant?.id === variant.id
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-700'
                        : 'border-gray-300 text-gray-700 hover:border-gray-400'
                    }`}
                    disabled={variant.stock === 0}
                  >
                    <div>{variant.size || variant.color}</div>
                    {variant.stock === 0 && (
                      <div className="text-xs text-red-500">Out</div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              Quantity
            </label>
            <div className="flex items-center gap-3">
              <button
                onClick={decrementQuantity}
                disabled={quantity <= 1}
                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
              >
                <Minus className="w-5 h-5" />
              </button>
              <span className="text-xl font-semibold w-12 text-center">
                {quantity}
              </span>
              <button
                onClick={incrementQuantity}
                disabled={quantity >= product.stock}
                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mb-8">
            <Button
              fullWidth
              size="lg"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              leftIcon={<ShoppingCart className="w-5 h-5" />}
            >
              Add to Cart
            </Button>
            <Button
              fullWidth
              size="lg"
              variant="secondary"
              onClick={handleBuyNow}
              disabled={product.stock === 0}
            >
              Buy Now
            </Button>
            {isAuthenticated && user?.savedPayments && user.savedPayments.length > 0 && (
              <Button
                fullWidth
                size="lg"
                variant="primary"
                onClick={handleOneClick}
                className="ml-2"
              >
                One-Click Buy ({user.savedPayments[0].label})
              </Button>
            )}
            <Button
              size="lg"
              variant="outline"
              onClick={handleToggleWishlist}
              className={isWishlisted ? 'text-red-500 border-red-500' : ''}
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={handleToggleCompare}
              className={isComparing ? 'text-emerald-600 border-emerald-600' : ''}
              title="Compare"
            >
              <BarChart3 className="w-5 h-5" />
            </Button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-3 gap-4 py-6 border-t border-gray-200">
            <div className="text-center">
              <Truck className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Free Shipping</p>
            </div>
            <div className="text-center">
              <Shield className="w-8 h-8 text-amber-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Secure Payment</p>
            </div>
            <div className="text-center">
              <RefreshCw className="w-8 h-8 text-sky-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Easy Returns</p>
            </div>
          </div>

          {/* Shipping Estimator */}
          <div className="pt-6 border-t border-gray-200">
            <ShippingEstimator productPrice={product.price} />
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mb-16">
        <div className="border-b border-gray-200 mb-6">
          <nav className="flex gap-8">
            {['description', 'specifications', 'reviews', 'qa'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab
                    ? 'border-emerald-600 text-emerald-700'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab === 'description' && 'Description'}
                {tab === 'specifications' && 'Specifications'}
                {tab === 'reviews' && `Reviews (${product.reviews})`}
                {tab === 'qa' && 'Questions & Answers'}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === 'description' && (
            <Card>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Description</h2>
              <p className="text-gray-700 leading-relaxed mb-6">{product.description}</p>
              
              {product.tags && product.tags.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.tags.map((tag) => (
                      <Badge key={tag} variant="default">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          )}

          {activeTab === 'specifications' && product.specifications && (
            <Card>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Specifications</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex items-center py-3 border-b border-gray-200">
                    <span className="font-semibold text-gray-700 w-1/2">{key}:</span>
                    <span className="text-gray-600">{value}</span>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {activeTab === 'reviews' && (
            <ProductReviews productRating={product.rating} totalReviews={product.reviews} />
          )}

          {activeTab === 'qa' && (
            <ProductQA />
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <Card key={relatedProduct.id} hover className="overflow-hidden p-0">
                <Link to={`/products/${relatedProduct.slug}`}>
                  <div className="aspect-square overflow-hidden bg-gray-100">
                    <ImageWithSkeleton
                      src={relatedProduct.images[0]}
                      alt={relatedProduct.name}
                      className="w-full h-full"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                      {relatedProduct.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold text-gray-900">
                        ${relatedProduct.price}
                      </span>
                      {relatedProduct.compareAtPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          ${relatedProduct.compareAtPrice}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Recommendations */}
      <ProductRecommendations currentProductId={product.id} />
    </div>
  );
}
