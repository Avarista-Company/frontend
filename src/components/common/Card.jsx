import React from 'react';

const Card = ({ 
  children, 
  className = '', 
  onClick, 
  hoverable = true,
  padding = true,
  ...rest 
}) => {
  const baseClasses = 'bg-white rounded-lg shadow-md overflow-hidden';
  const hoverClasses = hoverable ? 'transition-transform duration-300 hover:shadow-lg hover:-translate-y-1' : '';
  const paddingClasses = padding ? 'p-4' : '';
  
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