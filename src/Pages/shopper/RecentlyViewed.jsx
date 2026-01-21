// src/components/shopper/RecentlyViewed.jsx
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { products } from '../../data/products';
import useRecentlyViewedStore from '../../stores/recentlyViewedStore';
import Card from '../../components/Shared/Card';
import ImageWithSkeleton from '../../components/Shared/ImageWithSkeleton';

export default function RecentlyViewed() {
  const { items: recentIds } = useRecentlyViewedStore();
  const [scrollPosition, setScrollPosition] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const scrollContainerRef = useRef(null);

  const numericRecentIds = (recentIds || []).map(id => Number(id));
  const recentProducts = products.filter(p => numericRecentIds.includes(p.id))
    .sort((a, b) => numericRecentIds.indexOf(a.id) - numericRecentIds.indexOf(b.id));

  const handleScroll = (direction) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = 300;
    const newPosition = direction === 'left' 
      ? Math.max(0, scrollPosition - scrollAmount)
      : Math.min(container.scrollWidth - container.clientWidth, scrollPosition + scrollAmount);

    container.scrollTo({ left: newPosition, behavior: 'smooth' });
    setScrollPosition(newPosition);
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScrollUpdate = () => {
      setScrollPosition(container.scrollLeft);
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(container.scrollLeft < container.scrollWidth - container.clientWidth);
    };

    container.addEventListener('scroll', handleScrollUpdate);
    // initial update
    handleScrollUpdate();
    return () => container.removeEventListener('scroll', handleScrollUpdate);
  }, []);

  if (recentProducts.length === 0) return null;

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-900">Recently Viewed</h2>
          <div className="flex gap-2">
            <button
              onClick={() => handleScroll('left')}
              disabled={!canScrollLeft}
              className="p-2 rounded-full border border-slate-200 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleScroll('right')}
              disabled={!canScrollRight}
              className="p-2 rounded-full border border-slate-200 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {recentProducts.map((product) => (
            <div key={product.id} className="flex-shrink-0 w-64">
              <Card hover className="overflow-hidden p-0 h-full">
                <Link to={`/products/${product.slug}`}>
                  <div className="relative aspect-square overflow-hidden bg-gray-100">
                    <ImageWithSkeleton
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full"
                    />
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

                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-slate-900">
                      ${product.price}
                    </span>
                    {product.compareAtPrice && (
                      <span className="text-sm text-slate-500 line-through">
                        ${product.compareAtPrice}
                      </span>
                    )}
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
