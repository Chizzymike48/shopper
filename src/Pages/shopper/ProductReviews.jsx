// src/components/shopper/ProductReviews.jsx
import { useState } from 'react';
import { Star, ThumbsUp, CheckCircle, Image as ImageIcon } from 'lucide-react';
import Card from '../../components/Shared/Card';
import Button from '../../components/Shared/Button';
import Badge from '../../components/Shared/Badge';

// Mock reviews data
const mockReviews = [
  {
    id: 1,
    userName: 'Sarah Johnson',
    userAvatar: 'https://i.pravatar.cc/150?img=5',
    rating: 5,
    title: 'Excellent product!',
    comment: 'This product exceeded my expectations. The quality is outstanding and it arrived quickly. Highly recommend!',
    date: '2024-12-15',
    verified: true,
    helpful: 24,
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=300',
    ],
  },
  {
    id: 2,
    userName: 'Mike Chen',
    userAvatar: 'https://i.pravatar.cc/150?img=12',
    rating: 4,
    title: 'Good value for money',
    comment: 'Great product overall. Only minor issue is the packaging could be better, but the product itself is excellent.',
    date: '2024-12-10',
    verified: true,
    helpful: 15,
    images: [],
  },
  {
    id: 3,
    userName: 'Emma Davis',
    userAvatar: 'https://i.pravatar.cc/150?img=9',
    rating: 5,
    title: 'Love it!',
    comment: 'Perfect! Exactly what I was looking for. Fast shipping and great customer service.',
    date: '2024-12-08',
    verified: true,
    helpful: 32,
    images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300'],
  },
  {
    id: 4,
    userName: 'John Smith',
    userAvatar: 'https://i.pravatar.cc/150?img=8',
    rating: 3,
    title: 'Decent product',
    comment: 'It\'s okay. Does what it\'s supposed to do but nothing special.',
    date: '2024-12-05',
    verified: false,
    helpful: 8,
    images: [],
  },
];

export default function ProductReviews({ productRating, totalReviews }) {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('helpful');
  const [expandedImages, setExpandedImages] = useState(null);

  // Calculate rating distribution
  const ratingDistribution = {
    5: mockReviews.filter(r => r.rating === 5).length,
    4: mockReviews.filter(r => r.rating === 4).length,
    3: mockReviews.filter(r => r.rating === 3).length,
    2: mockReviews.filter(r => r.rating === 2).length,
    1: mockReviews.filter(r => r.rating === 1).length,
  };

  // Filter reviews
  const filteredReviews = mockReviews
    .filter(review => {
      if (filter === 'all') return true;
      if (filter === 'verified') return review.verified;
      if (filter === 'withPhotos') return review.images.length > 0;
      return review.rating === parseInt(filter);
    })
    .sort((a, b) => {
      if (sortBy === 'helpful') return b.helpful - a.helpful;
      if (sortBy === 'recent') return new Date(b.date) - new Date(a.date);
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });

  return (
    <div className="space-y-6">
      {/* Rating Overview */}
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Overall Rating */}
          <div className="text-center md:text-left">
            <div className="flex items-center gap-4 justify-center md:justify-start mb-4">
              <div className="text-6xl font-bold text-gray-900">{productRating}</div>
              <div>
                <div className="flex items-center mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-6 h-6 ${
                        i < Math.floor(productRating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-600">{totalReviews} reviews</p>
              </div>
            </div>
            <Button fullWidth>Write a Review</Button>
          </div>

          {/* Rating Distribution */}
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => {
              const count = ratingDistribution[rating];
              const percentage = (count / mockReviews.length) * 100;
              
              return (
                <button
                  key={rating}
                  onClick={() => setFilter(rating.toString())}
                  className="w-full flex items-center gap-3 hover:bg-gray-50 p-2 rounded transition-colors"
                >
                  <div className="flex items-center gap-1 w-16">
                    <span className="text-sm font-medium">{rating}</span>
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  </div>
                  <div className="flex-1">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-yellow-400 h-2 rounded-full transition-all"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-sm text-gray-600 w-12 text-right">{count}</span>
                </button>
              );
            })}
          </div>
        </div>
      </Card>

      {/* Filters & Sort */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex gap-2">
          <Button
            variant={filter === 'all' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setFilter('all')}
          >
            All ({mockReviews.length})
          </Button>
          <Button
            variant={filter === 'verified' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setFilter('verified')}
          >
            Verified ({mockReviews.filter(r => r.verified).length})
          </Button>
          <Button
            variant={filter === 'withPhotos' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setFilter('withPhotos')}
            leftIcon={<ImageIcon className="w-4 h-4" />}
          >
            With Photos ({mockReviews.filter(r => r.images.length > 0).length})
          </Button>
        </div>

        <div className="ml-auto">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-200"
          >
            <option value="helpful">Most Helpful</option>
            <option value="recent">Most Recent</option>
            <option value="rating">Highest Rating</option>
          </select>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.map((review) => (
          <Card key={review.id}>
            <div className="flex items-start gap-4">
              {/* Avatar */}
              <img
                src={review.userAvatar}
                alt={review.userName}
                className="w-12 h-12 rounded-full"
              />

              {/* Review Content */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-gray-900">{review.userName}</h4>
                      {review.verified && (
                        <Badge variant="success" className="flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" />
                          Verified Purchase
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">
                        {new Date(review.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                  </div>
                </div>

                <h5 className="font-semibold text-gray-900 mb-2">{review.title}</h5>
                <p className="text-gray-700 mb-4">{review.comment}</p>

                {/* Review Images */}
                {review.images.length > 0 && (
                  <div className="flex gap-2 mb-4">
                    {review.images.map((image, idx) => (
                      <button
                        key={idx}
                        onClick={() => setExpandedImages({ review, imageIndex: idx })}
                        className="w-20 h-20 rounded-lg overflow-hidden border border-gray-200 hover:border-emerald-500 transition-colors"
                      >
                        <img
                          src={image}
                          alt={`Review image ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}

                {/* Helpful Button */}
                <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  <ThumbsUp className="w-4 h-4" />
                  Helpful ({review.helpful})
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Load More */}
      {filteredReviews.length < mockReviews.length && (
        <div className="text-center">
          <Button variant="outline">Load More Reviews</Button>
        </div>
      )}

      {/* Expanded Image Modal */}
      {expandedImages && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setExpandedImages(null)}
        >
          <button
            onClick={() => setExpandedImages(null)}
            className="absolute top-4 right-4 text-white p-2 hover:bg-white/10 rounded-lg"
          >
            <X className="w-8 h-8" />
          </button>
          <img
            src={expandedImages.review.images[expandedImages.imageIndex]}
            alt="Review image"
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
