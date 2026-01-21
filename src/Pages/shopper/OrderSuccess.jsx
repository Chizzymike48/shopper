// src/pages/shopper/OrderSuccess.jsx
import { useParams, Link } from 'react-router-dom';
import { CheckCircle, Package, Home, FileText } from 'lucide-react';
import Button from '../../components/Shared/Button';
import Card from '../../components/Shared/Card';

export default function OrderSuccess() {
  const { orderId } = useParams();

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <Card className="text-center">
        {/* Success Icon */}
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>

        {/* Success Message */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Order Placed Successfully!
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Thank you for your order. We've received your order and will process it shortly.
        </p>

        {/* Order ID */}
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <p className="text-sm text-gray-600 mb-2">Order Number</p>
          <p className="text-2xl font-bold text-gray-900 font-mono">{orderId}</p>
        </div>

        {/* What's Next */}
        <div className="text-left mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">What's Next?</h2>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                <FileText className="w-5 h-5 text-emerald-700" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Order Confirmation</h3>
                <p className="text-sm text-gray-600">
                  You'll receive an email confirmation shortly with your order details.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Package className="w-5 h-5 text-amber-700" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Processing</h3>
                <p className="text-sm text-gray-600">
                  We'll start processing your order and prepare it for shipping.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Delivery</h3>
                <p className="text-sm text-gray-600">
                  Your order will be delivered to your specified address within 3-5 business days.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/my-orders" className="flex-1">
            <Button fullWidth size="lg" leftIcon={<Package className="w-5 h-5" />}>
              View My Orders
            </Button>
          </Link>
          <Link to="/" className="flex-1">
            <Button fullWidth size="lg" variant="outline" leftIcon={<Home className="w-5 h-5" />}>
              Continue Shopping
            </Button>
          </Link>
        </div>

        {/* Support */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            Need help? Contact our{' '}
            <a href="#" className="text-emerald-600 hover:underline">
              customer support
            </a>
          </p>
        </div>
      </Card>
    </div>
  );
}
