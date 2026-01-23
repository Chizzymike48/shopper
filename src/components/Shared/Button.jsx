import React from 'react';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  type = 'button',
  onClick,
  disabled = false,
  leftIcon,
  rightIcon,
  loading = false,
  fullWidth = false,
  ...props
}) {
  const base = 'inline-flex items-center justify-center rounded-full font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-[color:var(--brand)] text-white hover:bg-[color:var(--brand-strong)] focus:ring-[color:var(--brand)] shadow-sm',
    secondary: 'bg-white/80 text-slate-900 hover:bg-white focus:ring-slate-300 dark:bg-slate-800/80 dark:text-slate-100 dark:hover:bg-slate-800',
    ghost: 'bg-transparent text-slate-700 hover:bg-slate-100 focus:ring-slate-200 dark:text-slate-200 dark:hover:bg-slate-800',
    outline: 'border border-slate-200 text-slate-700 hover:bg-white focus:ring-slate-300 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800',
    danger: 'bg-rose-600 text-white hover:bg-rose-700 focus:ring-rose-500',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-7 py-3 text-base',
  };

  const variantClass = variants[variant] || variants.primary;
  const sizeClass = sizes[size] || sizes.md;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={`${base} ${variantClass} ${sizeClass} ${fullWidth ? 'w-full' : ''} ${className} hover:shadow-md active:translate-y-0.5`}
      {...props}
    >
      {loading && (
        <svg className="animate-spin mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden>
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
        </svg>
      )}
      {leftIcon && !loading && <span className="mr-2 flex items-center">{leftIcon}</span>}
      {children}
      {rightIcon && !loading && <span className="ml-2 flex items-center">{rightIcon}</span>}
    </button>
  );
}
