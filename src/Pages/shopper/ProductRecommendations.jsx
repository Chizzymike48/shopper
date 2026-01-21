// src/components/shopper/ProductRecommendations.jsx
import { Link } from 'react-router-dom';
import { Star, Sparkles } from 'lucide-react';
import { products } from '../../data/products';
import useRecentlyViewedStore from '../../stores/recentlyViewedStore';
import useCartStore from '../../stores/cartStore';
import Card from '../../components/Shared/Card';
import Button from '../../components/Shared/Button';
import ImageWithSkeleton from '../../components/Shared/ImageWithSkeleton';
import toast from 'react-hot-toast';

export default function ProductRecommendations({ currentProductId = null, limit = 4 }) {
  const { items: recentIds } = useRecentlyViewedStore();
  const numericRecentIds = (recentIds || []).map(id => Number(id));
  const { items: cartItems } = useCartStore();
  const { addItem } = useCartStore();

  // Simple recommendation algorithm
  const getRecommendations = () => {
    // Get categories from recently viewed and cart
    const recentProducts = products.filter(p => numericRecentIds.includes(p.id));
    const cartProducts = cartItems.map(item => item.product);
    
    const allViewedAndCart = [...recentProducts, ...cartProducts];
    const categories = [...new Set(allViewedAndCart.map(p => p.category))];
    const tags = [...new Set(allViewedAndCart.flatMap(p => p.tags))];

    // Score products based on:
    // 1. Same category as viewed/cart items
    // 2. Similar tags
    // 3. Similar price range
    // 4. High ratings
    // 5. Not already in cart or currently viewing
    
    const cartProductIds = cartItems.map(item => item.product.id);
    const excludeIds = [...cartProductIds, currentProductId].filter(Boolean);

    const scoredProducts = products
      .filter(p => !excludeIds.includes(p.id))
      .map(product => {
        let score = 0;

        // Category match (highest weight)
        if (categories.includes(product.category)) score += 5;

        // Tag match
        const matchingTags = product.tags.filter(tag => tags.includes(tag)).length;
        score += matchingTags * 2;

        // Rating boost
        score += product.rating;

        // Featured products boost
        if (product.featured) score += 2;

        // Price range similarity (if we have viewed products)
        if (allViewedAndCart.length > 0) {
          const avgPrice = allViewedAndCart.reduce((sum, p) => sum + p.price, 0) / allViewedAndCart.length;
          const priceDiff = Math.abs(product.price - avgPrice);
          if (priceDiff < 50) score += 3;
          else if (priceDiff < 100) score += 1;
        }

        return { product, score };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(item => item.product);

    // If no recommendations based on history, return featured products
    if (scoredProducts.length === 0) {
      return products
        .filter(p => !excludeIds.includes(p.id) && p.featured)
        .slice(0, limit);
    }

    return scoredProducts;
  };

  const recommendations = getRecommendations();

  if (recommendations.length === 0) return null;

  const handleAddToCart = (product) => {
    addItem(product, 1);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="py-12">
      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="w-6 h-6 text-emerald-600" />
        <h2 className="text-2xl font-bold text-slate-900">Recommended For You</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {recommendations.map((product) => (
          <Card key={product.id} hover className="overflow-hidden p-0">
            <Link to={`/products/${product.slug}`}>
              <div className="relative aspect-square overflow-hidden bg-gray-100">
                <ImageWithSkeleton
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full"
                />
                {product.compareAtPrice && (
                  <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-semibold">
                    SALE
                  </div>
                )}
              </div>
            </Link>

            <div className="p-4">
              <Link to={`/products/${product.slug}`}>
                <h3 className="font-semibold text-slate-900 mb-2 hover:text-emerald-700 line-clamp-2">
                  {product.name}
                </h3>
              </Link>

              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-slate-600">
                  ({product.reviews})
                </span>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl font-bold text-slate-900">
                  ${product.price}
                </span>
                {product.compareAtPrice && (
                  <span className="text-sm text-slate-500 line-through">
                    ${product.compareAtPrice}
                  </span>
                )}
              </div>

              <Button
                fullWidth
                onClick={() => handleAddToCart(product)}
                disabled={product.stock === 0}
              >
                {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
