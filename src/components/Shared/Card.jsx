import React from 'react';

export function CardHeader({ children, className = '' }) {
  return <div className={`px-6 py-4 border-b ${className}`}>{children}</div>;
}

export function CardTitle({ children, className = '' }) {
  return <h3 className={`text-lg font-semibold ${className}`}>{children}</h3>;
}

export function CardDescription({ children, className = '' }) {
  return <p className={`text-sm text-gray-600 ${className}`}>{children}</p>;
}

export function CardContent({ children, className = '' }) {
  return <div className={`p-6 ${className}`}>{children}</div>;
}

export default function Card({ children, className = '', padding = true, hover = false }) {
  return (
    <div className={`bg-white dark:bg-gray-800 dark:text-gray-100 rounded-lg shadow-sm ${hover ? 'hover:shadow-md transition-shadow' : ''} ${padding ? 'p-6' : ''} ${className}`}>
      <div className="transform-gpu will-change-transform transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.01]">
        {children}
      </div>
    </div>
  );
}
