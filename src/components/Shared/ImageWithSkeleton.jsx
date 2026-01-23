import React, { useEffect, useMemo, useState } from 'react';
import Skeleton from './Skeleton';

const DEFAULT_FALLBACK = (() => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="640" height="640" viewBox="0 0 640 640">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#e2e8f0"/>
          <stop offset="100%" stop-color="#cbd5f5"/>
        </linearGradient>
      </defs>
      <rect width="640" height="640" fill="url(#g)"/>
      <rect x="96" y="110" width="448" height="300" rx="24" fill="#f8fafc" stroke="#94a3b8" stroke-width="8"/>
      <circle cx="240" cy="230" r="44" fill="#94a3b8"/>
      <path d="M140 356l110-120 90 86 86-96 74 130z" fill="#94a3b8"/>
      <text x="320" y="500" text-anchor="middle" font-family="Arial, sans-serif" font-size="32" fill="#475569">Image unavailable</text>
    </svg>
  `.trim();
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
})();

export default function ImageWithSkeleton({
  src,
  alt,
  className = '',
  imgClassName = 'object-cover',
  fallbackSrc = DEFAULT_FALLBACK,
  onImageError,
  ...props
}) {
  const [loaded, setLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src || fallbackSrc);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setLoaded(false);
    setHasError(false);
    setCurrentSrc(src || fallbackSrc);
  }, [src, fallbackSrc]);

  const showSkeleton = useMemo(() => !loaded && !hasError, [loaded, hasError]);

  return (
    <div className={`relative ${className}`}>
      {showSkeleton && (
        <div className="absolute inset-0">
          <Skeleton className="h-full w-full rounded-md" />
        </div>
      )}

      {hasError ? (
        <div className="flex h-full w-full items-center justify-center rounded-md bg-slate-100 text-xs text-slate-500">
          Image unavailable
        </div>
      ) : (
        <img
          src={currentSrc}
          alt={alt}
          loading={props.loading || 'lazy'}
          decoding={props.decoding || 'async'}
          onLoad={() => setLoaded(true)}
          onError={() => {
            if (typeof onImageError === 'function') {
              onImageError();
            }
            if (currentSrc !== fallbackSrc) {
              setCurrentSrc(fallbackSrc);
            } else {
              setHasError(true);
            }
            setLoaded(true);
          }}
          className={`w-full h-full ${imgClassName} transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          {...props}
        />
      )}
    </div>
  );
}
