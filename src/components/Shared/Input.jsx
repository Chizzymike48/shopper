import React from 'react';

export default function Input({
  label,
  id,
  name,
  value,
  onChange,
  error,
  helperText,
  leftIcon,
  placeholder,
  type = 'text',
  fullWidth = false,
  required = false,
  ...props
}) {
  const inputId = id || name;

  return (
    <div className={`flex flex-col ${fullWidth ? 'w-full' : ''}`}>
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-gray-700 mb-1">
          {label}{required ? ' *' : ''}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400" aria-hidden>
            {leftIcon}
          </span>
        )}
        <input
          id={inputId}
          className={`border rounded-md py-2 px-3 ${leftIcon ? 'pl-10' : ''} ${error ? 'border-red-500' : 'border-gray-300'}`}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          type={type}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-help` : undefined}
          aria-required={required || undefined}
          {...props}
        />
      </div>
      {helperText && !error && <p id={`${inputId}-help`} className="text-sm text-gray-500 mt-1">{helperText}</p>}
      {error && <p id={`${inputId}-error`} role="alert" className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
}

export function Select({ label, name, value, onChange, options = [], fullWidth = false }) {
  return (
    <div className={`flex flex-col ${fullWidth ? 'w-full' : ''}`}>
      {label && <label className="text-sm font-medium text-gray-700 mb-1">{label}</label>}
      <select
        className="border rounded-md py-2 px-3 border-gray-300"
        name={name}
        value={value}
        onChange={onChange}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
}
