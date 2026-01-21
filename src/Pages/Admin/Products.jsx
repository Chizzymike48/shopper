// src/pages/admin/Products.jsx
import { useState } from 'react';
import { Search, Eye, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { products } from '../../data/products';

// Precomputed review status to avoid calling impure functions during render
const productsWithReview = products.map(p => ({
  ...p,
  reviewStatus: Math.random() > 0.8 ? 'pending' : 'approved',
  reportCount: Math.floor(Math.random() * 5),
}));
import Button from '../../components/Shared/Button';
import Input, { Select } from '../../components/Shared/Input';
import Badge from '../../components/Shared/Badge';
import Card from '../../components/Shared/Card';
import ImageWithSkeleton from '../../components/Shared/ImageWithSkeleton';
import toast from 'react-hot-toast';

export default function Products() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Add review status to products
  // (moved to module-level precomputed `productsWithReview`)
  // const productsWithReview = productsWithReview; // (module-level)

  const filteredProducts = productsWithReview.filter(product => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || product.reviewStatus === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleApprove = (productId, productName) => {
    toast.success(`${productName} has been approved`);
  };

  const handleReject = (productId, productName) => {
    if (window.confirm(`Are you sure you want to reject "${productName}"?`)) {
      toast.success(`${productName} has been rejected`);
    }
  };

  const pendingCount = productsWithReview.filter(p => p.reviewStatus === 'pending').length;
  const reportedCount = productsWithReview.filter(p => p.reportCount > 0).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Product Management</h1>
        <p className="text-gray-600 mt-1">Review and moderate platform products</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card hover>
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">Total Products</p>
            <p className="text-3xl font-bold text-gray-900">{productsWithReview.length}</p>
          </div>
        </Card>
        <Card hover>
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">Approved</p>
            <p className="text-3xl font-bold text-green-600">
              {productsWithReview.filter(p => p.reviewStatus === 'approved').length}
            </p>
          </div>
        </Card>
        <Card hover className="border-l-4 border-l-orange-500">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">Pending Review</p>
            <p className="text-3xl font-bold text-orange-600">{pendingCount}</p>
          </div>
        </Card>
        <Card hover className="border-l-4 border-l-red-500">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">Reported</p>
            <p className="text-3xl font-bold text-red-600">{reportedCount}</p>
          </div>
        </Card>
      </div>

      {/* Search & Filters */}
      <Card>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search className="w-5 h-5" />}
            />
          </div>
          <Select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            options={[
              { value: 'all', label: 'All Categories' },
              { value: 'electronics', label: 'Electronics' },
              { value: 'clothing', label: 'Clothing' },
              { value: 'home-garden', label: 'Home & Garden' },
              { value: 'sports', label: 'Sports' },
              { value: 'books', label: 'Books' },
            ]}
            className="w-48"
          />
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            options={[
              { value: 'all', label: 'All Status' },
              { value: 'approved', label: 'Approved' },
              { value: 'pending', label: 'Pending' },
            ]}
            className="w-40"
          />
        </div>
      </Card>

      {/* Products Table */}
      <Card padding={false}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                  Reports
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
                        <ImageWithSkeleton
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-gray-900 truncate">
                          {product.name}
                        </p>
                        <p className="text-xs text-gray-600">ID: {product.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-900 capitalize">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-semibold text-gray-900">${product.price}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`font-semibold ${
                      product.stock === 0 ? 'text-red-600' :
                      product.stock < 20 ? 'text-orange-600' :
                      'text-green-600'
                    }`}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant={product.reviewStatus === 'approved' ? 'success' : 'warning'}>
                      {product.reviewStatus}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    {product.reportCount > 0 ? (
                      <div className="flex items-center gap-1">
                        <AlertTriangle className="w-4 h-4 text-red-500" />
                        <span className="text-sm font-semibold text-red-600">
                          {product.reportCount}
                        </span>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-500">None</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => toast.success('View product details')}
                        className="p-2 hover:bg-gray-100 rounded-lg"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4 text-gray-600" />
                      </button>
                      {product.reviewStatus === 'pending' && (
                        <>
                          <button
                            onClick={() => handleApprove(product.id, product.name)}
                            className="p-2 hover:bg-green-50 rounded-lg"
                            title="Approve"
                          >
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          </button>
                          <button
                            onClick={() => handleReject(product.id, product.name)}
                            className="p-2 hover:bg-red-50 rounded-lg"
                            title="Reject"
                          >
                            <XCircle className="w-4 h-4 text-red-600" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-600 mb-4">No products found</p>
            <Button variant="outline" onClick={() => {
              setSearchQuery('');
              setCategoryFilter('all');
              setStatusFilter('all');
            }}>
              Clear Filters
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}
