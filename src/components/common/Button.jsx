import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  disabled = false,
  type = 'button',
  onClick,
  ...rest 
}) => {
  const sizeClasses = {
    xs: 'px-3 py-1 text-xs',
    sm: 'px-4 py-1.5 text-sm',
    md: 'px-5 py-2 text-base',
    lg: 'px-6 py-2.5 text-lg',
    xl: 'px-7 py-3 text-xl'
  };
  
  const baseClasses = 'rounded-lg font-medium transition-all duration-200 inline-flex items-center justify-center shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-400';
  const disabledClasses = 'opacity-60 cursor-not-allowed';
  
  const variantClasses = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700',
    secondary: 'bg-secondary-700 text-white hover:bg-secondary-800',
    accent: 'bg-accent-500 text-primary-900 hover:bg-accent-600 hover:text-white',
    wedding: 'bg-wedding-burgundy text-white hover:bg-opacity-90',
    outline: 'border border-neutral-300 text-neutral-700 hover:bg-neutral-100',
    text: 'text-primary-600 hover:text-primary-700 hover:underline',
  };
  
  return (
    <button
      type={type}
      className={`
        ${baseClasses}
        ${variantClasses[variant] || variantClasses.primary}
        ${sizeClasses[size] || sizeClasses.md}
        ${disabled ? disabledClasses : ''}
        ${className}
      `}
      disabled={disabled}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;