// src/pages/shopper/Wishlist.jsx
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { products } from '../../data/products';
import useWishlistStore from '../../stores/WishlistStore';
import useCartStore from '../../stores/cartStore';
import Card from '../../components/Shared/Card';
import Button from '../../components/Shared/Button';
import toast from 'react-hot-toast';

export default function Wishlist() {
  const { items: wishlistIds, removeFromWishlist } = useWishlistStore();
  const { addItem } = useCartStore();

  const wishlistProducts = products.filter(p => wishlistIds.includes(p.id));

  const handleAddToCart = (product) => {
    addItem(product, 1);
    toast.success(`${product.name} added to cart!`);
  };

  const handleRemove = (product) => {
    removeFromWishlist(product.id);
    toast.success(`${product.name} removed from wishlist`);
  };

  if (wishlistProducts.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Card className="text-center py-16">
          <Heart className="w-24 h-24 text-gray-300 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Wishlist is Empty</h2>
          <p className="text-gray-600 mb-8">
            Save your favorite items for later!
          </p>
          <Button onClick={() => window.location.href = '/products'}>
            Browse Products
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          My Wishlist ({wishlistProducts.length})
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {wishlistProducts.map((product) => (
          <Card key={product.id} hover className="overflow-hidden p-0 relative">
            {/* Remove Button */}
            <button
              onClick={() => handleRemove(product)}
              className="absolute top-3 right-3 z-10 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors"
            >
              <Trash2 className="w-5 h-5 text-red-500" />
            </button>

            {/* Product Image */}
            <Link to={`/products/${product.slug}`}>
              <div className="relative aspect-square overflow-hidden bg-gray-100">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                {product.compareAtPrice && (
                  <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-semibold">
                    SALE
                  </div>
                )}
              </div>
            </Link>

            {/* Product Info */}
            <div className="p-4">
              <Link to={`/products/${product.slug}`}>
                <h3 className="font-semibold text-gray-900 mb-2 hover:text-blue-600 line-clamp-2">
                  {product.name}
                </h3>
              </Link>

              {/* Price */}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl font-bold text-gray-900">
                  ${product.price}
                </span>
                {product.compareAtPrice && (
                  <span className="text-sm text-gray-500 line-through">
                    ${product.compareAtPrice}
                  </span>
                )}
              </div>

              {/* Add to Cart Button */}
              <Button
                fullWidth
                onClick={() => handleAddToCart(product)}
                disabled={product.stock === 0}
                leftIcon={<ShoppingCart className="w-4 h-4" />}
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