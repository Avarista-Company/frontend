import React from 'react';

const Card = ({ 
  children, 
  className = '', 
  onClick, 
  hoverable = true,
  padding = true,
  ...rest 
}) => {
  const baseClasses = 'bg-white rounded-xl shadow-lg overflow-hidden';
  const hoverClasses = hoverable ? 'transition-transform duration-200 hover:shadow-xl hover:-translate-y-1' : '';
  const paddingClasses = padding ? 'p-6' : '';
  
  return (
    <div 
      className={`${baseClasses} ${hoverClasses} ${paddingClasses} ${className}`}
      onClick={onClick}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Card;