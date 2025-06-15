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
      className={`px-5 py-3 rounded-xl shadow-2xl flex items-center justify-between ${bgColorClass[type]} text-white animate-fade-in-up`}
      style={{ minWidth: 280 }}
    >
      <span className="font-medium text-base">{message}</span>
      <button 
        onClick={() => onClose(id)}
        className="ml-4 text-white opacity-80 hover:opacity-100 rounded-full focus:outline-none focus:ring-2 focus:ring-white"
      >
        <XMarkIcon className="h-5 w-5" />
      </button>
    </div>
  );
};

export default Toast;