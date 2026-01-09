// src/components/shopper/ShippingEstimator.jsx
import { useState } from 'react';
import { MapPin, Truck, Clock, Package } from 'lucide-react';
import Button from '../../components/Shared/Button';
import Input from '../../components/Shared/Input';
import Badge from '../../components/Shared/Badge';

// Mock shipping options
const mockShippingOptions = [
  {
    id: 1,
    name: 'Standard Shipping',
    price: 0,
    days: '5-7',
    icon: Package,
    description: 'Free standard shipping',
  },
  {
    id: 2,
    name: 'Express Shipping',
    price: 10,
    days: '2-3',
    icon: Truck,
    description: 'Faster delivery',
  },
  {
    id: 3,
    name: 'Next Day',
    price: 25,
    days: '1',
    icon: Clock,
    description: 'Order within 4 hours',
  },
];

export default function ShippingEstimator({ productPrice = 0 }) {
  const [zipCode, setZipCode] = useState('');
  const [estimating, setEstimating] = useState(false);
  const [estimate, setEstimate] = useState(null);
  const [error, setError] = useState('');

  const handleEstimate = (e) => {
    e.preventDefault();
    setError('');

    // Validate ZIP code (basic US ZIP validation)
    const zipRegex = /^\d{5}(-\d{4})?$/;
    if (!zipRegex.test(zipCode)) {
      setError('Please enter a valid ZIP code');
      return;
    }

    setEstimating(true);

    // Simulate API call
    setTimeout(() => {
      const today = new Date();
      
      const estimateData = {
        zipCode,
        location: 'New York, NY', // Mock location
        options: mockShippingOptions.map(option => {
          const minDays = parseInt(option.days.split('-')[0]);
          const maxDays = option.days.includes('-') 
            ? parseInt(option.days.split('-')[1]) 
            : minDays;

          const minDate = new Date(today);
          minDate.setDate(today.getDate() + minDays);
          
          const maxDate = new Date(today);
          maxDate.setDate(today.getDate() + maxDays);

          // Free shipping threshold
          const actualPrice = productPrice >= 50 ? 0 : option.price;

          return {
            ...option,
            price: actualPrice,
            minDate,
            maxDate,
          };
        }),
      };

      setEstimate(estimateData);
      setEstimating(false);
    }, 1000);
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  const handleReset = () => {
    setZipCode('');
    setEstimate(null);
    setError('');
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2">
        <MapPin className="w-5 h-5 text-gray-600" />
        <h3 className="font-semibold text-gray-900">Delivery & Shipping</h3>
      </div>

      {/* ZIP Code Input */}
      {!estimate ? (
        <form onSubmit={handleEstimate} className="space-y-3">
          <div>
            <Input
              placeholder="Enter ZIP code"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              error={error}
              maxLength={10}
              leftIcon={<MapPin className="w-5 h-5" />}
            />
          </div>
          <Button
            type="submit"
            fullWidth
            loading={estimating}
            disabled={estimating || !zipCode}
          >
            {estimating ? 'Calculating...' : 'Get Estimate'}
          </Button>
        </form>
      ) : (
        <>
          {/* Location Display */}
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">{estimate.location}</p>
                <p className="text-xs text-gray-600">ZIP: {estimate.zipCode}</p>
              </div>
            </div>
            <button
              onClick={handleReset}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Change
            </button>
          </div>

          {/* Shipping Options */}
          <div className="space-y-3">
            {estimate.options.map((option) => {
              const Icon = option.icon;
              const isFree = option.price === 0;

              return (
                <div
                  key={option.id}
                  className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 transition-colors cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{option.name}</h4>
                        <p className="text-sm text-gray-600">{option.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      {isFree ? (
                        <Badge variant="success">FREE</Badge>
                      ) : (
                        <p className="font-bold text-gray-900">${option.price.toFixed(2)}</p>
                      )}
                    </div>
                  </div>

                  {/* Delivery Date */}
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <Clock className="w-4 h-4" />
                    <span>
                      Arrives{' '}
                      {option.minDate.getTime() === option.maxDate.getTime() ? (
                        formatDate(option.minDate)
                      ) : (
                        <>
                          {formatDate(option.minDate)} - {formatDate(option.maxDate)}
                        </>
                      )}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Free Shipping Message */}
          {productPrice < 50 && (
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                💡 <strong>Tip:</strong> Add ${(50 - productPrice).toFixed(2)} more to your cart for free shipping!
              </p>
            </div>
          )}
        </>
      )}

      {/* Additional Info */}
      <div className="pt-4 border-t border-gray-200">
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4" />
            <span>Free standard shipping on orders over $50</span>
          </div>
          <div className="flex items-center gap-2">
            <Package className="w-4 h-4" />
            <span>Order by 2 PM for same-day processing</span>
          </div>
        </div>
      </div>
    </div>
  );
}