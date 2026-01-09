import Button from './Button';
import ImageWithSkeleton from './ImageWithSkeleton';
import { Link } from 'react-router-dom';

export default function ProductPreview({ product, onQuickView }) {
  return (
    <div className="p-4">
      <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
        <Link to={`/products/${product.slug}`}>
          <ImageWithSkeleton src={product.images[0]} alt={product.name} className="w-full h-full" />
        </Link>
        <div className="absolute inset-0 flex items-end justify-between p-3">
          <div className="bg-white/80 dark:bg-gray-800/80 rounded px-2 py-1 text-sm font-semibold">${product.price}</div>
          <button onClick={(e) => { e.preventDefault(); onQuickView(product); }} className="bg-white/90 dark:bg-gray-800/90 px-3 py-1 rounded hover:shadow">Quick View</button>
        </div>
      </div>
      <h3 className="mt-3 font-semibold text-gray-900 dark:text-gray-100 text-sm line-clamp-2">{product.name}</h3>
    </div>
  );
}
