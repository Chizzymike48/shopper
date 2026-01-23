import React from 'react';

export function CardHeader({ children, className = '' }) {
  return <div className={`px-6 py-4 border-b border-slate-200/70 dark:border-slate-700/70 ${className}`}>{children}</div>;
}

export function CardTitle({ children, className = '' }) {
  return <h3 className={`text-lg font-semibold ${className}`}>{children}</h3>;
}

export function CardDescription({ children, className = '' }) {
  return <p className={`text-sm text-slate-600 dark:text-slate-300 ${className}`}>{children}</p>;
}

export function CardContent({ children, className = '' }) {
  return <div className={`p-6 ${className}`}>{children}</div>;
}

export default function Card({ children, className = '', padding = true, hover = false }) {
  return (
    <div className={`bg-white/85 dark:bg-slate-900/70 dark:text-slate-100 rounded-2xl border border-white/70 dark:border-slate-700/60 shadow-sm backdrop-blur ${hover ? 'hover:shadow-lg transition-shadow' : ''} ${padding ? 'p-6' : ''} ${className}`}>
      <div className="transform-gpu will-change-transform transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.01]">
        {children}
      </div>
    </div>
  );
}
