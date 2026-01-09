// src/pages/shopper/Compare.jsx
import { Link, useNavigate } from 'react-router-dom';
import { X, ShoppingCart, Star, ArrowRight } from 'lucide-react';
import { products } from '../../data/products';
import useCompareStore from '../../stores/compareStore';
import useCartStore from '../../stores/cartStore';
import Card from '../../components/Shared/Card';
import Button from '../../components/Shared/Button';
import Badge from '../../components/Shared/Badge';
import toast from 'react-hot-toast';

export default function Compare() {
  const navigate = useNavigate();
  const { items: compareIds, removeFromCompare, clearCompare } = useCompareStore();
  const { addItem } = useCartStore();

  const compareProducts = products.filter(p => compareIds.includes(p.id));

  const handleAddToCart = (product) => {
    addItem(product, 1);
    toast.success(`${product.name} added to cart!`);
  };

  const handleRemove = (productId) => {
    removeFromCompare(productId);
    toast.success('Product removed from comparison');
  };

  if (compareProducts.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Card className="text-center py-16">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">No Products to Compare</h2>
          <p className="text-gray-600 mb-8">
            Add products to comparison to see them side by side
          </p>
          <Button onClick={() => navigate('/products')}>
            Browse Products
            <ArrowRight className="w-5 h-5" />
          </Button>
        </Card>
      </div>
    );
  }

  // Get all unique specification keys
  const allSpecKeys = new Set();
  compareProducts.forEach(product => {
    if (product.specifications) {
      Object.keys(product.specifications).forEach(key => allSpecKeys.add(key));
    }
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Compare Products</h1>
          <p className="text-gray-600 mt-1">
            Comparing {compareProducts.length} {compareProducts.length === 1 ? 'product' : 'products'}
          </p>
        </div>
        {compareProducts.length > 1 && (
          <Button variant="outline" onClick={() => {
            if (window.confirm('Remove all products from comparison?')) {
              clearCompare();
              toast.success('Comparison cleared');
            }
          }}>
            Clear All
          </Button>
        )}
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full align-middle">
          <Card padding={false} className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="sticky left-0 z-10 bg-gray-50 px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-48">
                    Feature
                  </th>
                  {compareProducts.map((product) => (
                    <th key={product.id} className="px-6 py-3 text-center min-w-64">
                      {/* Product Header */}
                      <div className="relative">
                        <button
                          onClick={() => handleRemove(product.id)}
                          className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                        <Link to={`/products/${product.slug}`}>
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-48 object-cover rounded-lg mb-3"
                          />
                        </Link>
                        <Link to={`/products/${product.slug}`}>
                          <h3 className="font-semibold text-gray-900 hover:text-blue-600 mb-2">
                            {product.name}
                          </h3>
                        </Link>
                        <div className="flex items-center justify-center gap-2 mb-3">
                          <span className="text-2xl font-bold text-gray-900">
                            ${product.price}
                          </span>
                          {product.compareAtPrice && (
                            <span className="text-sm text-gray-500 line-through">
                              ${product.compareAtPrice}
                            </span>
                          )}
                        </div>
                        <Button
                          fullWidth
                          size="sm"
                          onClick={() => handleAddToCart(product)}
                          disabled={product.stock === 0}
                          leftIcon={<ShoppingCart className="w-4 h-4" />}
                        >
                          {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                        </Button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {/* Price */}
                <tr>
                  <td className="sticky left-0 z-10 bg-white px-6 py-4 text-sm font-medium text-gray-900">
                    Price
                  </td>
                  {compareProducts.map((product) => (
                    <td key={product.id} className="px-6 py-4 text-center">
                      <div>
                        <p className="text-lg font-bold text-gray-900">${product.price}</p>
                        {product.compareAtPrice && (
                          <Badge variant="danger" className="mt-1">
                            Save ${(product.compareAtPrice - product.price).toFixed(2)}
                          </Badge>
                        )}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Rating */}
                <tr>
                  <td className="sticky left-0 z-10 bg-white px-6 py-4 text-sm font-medium text-gray-900">
                    Rating
                  </td>
                  {compareProducts.map((product) => (
                    <td key={product.id} className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
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
                        <span className="text-sm text-gray-600">
                          {product.rating} ({product.reviews})
                        </span>
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Stock */}
                <tr>
                  <td className="sticky left-0 z-10 bg-white px-6 py-4 text-sm font-medium text-gray-900">
                    Availability
                  </td>
                  {compareProducts.map((product) => (
                    <td key={product.id} className="px-6 py-4 text-center">
                      <Badge variant={product.stock > 0 ? 'success' : 'danger'}>
                        {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
                      </Badge>
                    </td>
                  ))}
                </tr>

                {/* Category */}
                <tr>
                  <td className="sticky left-0 z-10 bg-white px-6 py-4 text-sm font-medium text-gray-900">
                    Category
                  </td>
                  {compareProducts.map((product) => (
                    <td key={product.id} className="px-6 py-4 text-center">
                      <span className="text-sm text-gray-700 capitalize">{product.category}</span>
                    </td>
                  ))}
                </tr>

                {/* Specifications */}
                {Array.from(allSpecKeys).map((specKey) => (
                  <tr key={specKey}>
                    <td className="sticky left-0 z-10 bg-white px-6 py-4 text-sm font-medium text-gray-900">
                      {specKey}
                    </td>
                    {compareProducts.map((product) => (
                      <td key={product.id} className="px-6 py-4 text-center">
                        <span className="text-sm text-gray-700">
                          {product.specifications?.[specKey] || '-'}
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}

                {/* Description */}
                <tr>
                  <td className="sticky left-0 z-10 bg-white px-6 py-4 text-sm font-medium text-gray-900">
                    Description
                  </td>
                  {compareProducts.map((product) => (
                    <td key={product.id} className="px-6 py-4">
                      <p className="text-sm text-gray-700 text-left">
                        {product.description}
                      </p>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </Card>
        </div>
      </div>

      {/* Add More Products */}
      {compareProducts.length < 4 && (
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">
            You can compare up to 4 products. Add {4 - compareProducts.length} more product{4 - compareProducts.length !== 1 ? 's' : ''}.
          </p>
          <Button variant="outline" onClick={() => navigate('/products')}>
            Browse Products
          </Button>
        </div>
      )}
    </div>
  );
}