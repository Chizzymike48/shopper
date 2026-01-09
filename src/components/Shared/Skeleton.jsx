import React from 'react';

export default function Skeleton({ className = 'h-40 w-full rounded-lg' }) {
  return (
    <div className={`bg-gray-200 dark:bg-gray-700 overflow-hidden relative ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent dark:via-gray-600/30 animate-shimmer" />
    </div>
  );
}
