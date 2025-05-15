import React, { useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

const Toast = ({ id, message, type = 'success', duration = 3000, onClose }) => {
  useEffect(() => {
    // Auto remove toast after duration
    if (duration !== Infinity) {
      const timer = setTimeout(() => {
        onClose(id);
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [id, duration, onClose]);
  
  const bgColorClass = {
    success: 'bg-green-600',
    error: 'bg-red-600',
    warning: 'bg-yellow-500',
    info: 'bg-blue-600',
  };
  
  return (
    <div 
      className={`px-4 py-3 rounded-lg shadow-lg flex items-center justify-between ${bgColorClass[type]} text-white`}
    >
      <span>{message}</span>
      <button 
        onClick={() => onClose(id)}
        className="ml-3 text-white opacity-70 hover:opacity-100"
      >
        <XMarkIcon className="h-5 w-5" />
      </button>
    </div>
  );
};

export default Toast;