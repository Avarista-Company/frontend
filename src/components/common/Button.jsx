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
    xs: 'px-2 py-1 text-xs',
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-5 py-2.5 text-lg',
    xl: 'px-6 py-3 text-xl'
  };
  
  const baseClasses = 'rounded-md font-medium transition-all duration-300 inline-flex items-center justify-center';
  const disabledClasses = 'opacity-50 cursor-not-allowed';
  
  const variantClasses = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 shadow-sm',
    secondary: 'bg-secondary-600 text-white hover:bg-secondary-700 shadow-sm',
    accent: 'bg-accent-600 text-white hover:bg-accent-700 shadow-sm',
    wedding: 'bg-wedding-burgundy text-white hover:bg-opacity-90 shadow-sm',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-100',
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