import { useContext } from 'react';
import { ToastContext } from '../contexts/ToastContext';

/**
 * Custom hook for using toast notifications
 * @returns {{
 *   addToast: (message: string, type?: 'success' | 'error' | 'warning' | 'info', duration?: number) => number,
 *   removeToast: (id: number) => void,
 *   toasts: Array<{id: number, message: string, type: string, duration: number}>
 * }}
 */
const useToast = () => {
  const context = useContext(ToastContext);
  
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  
  return context;
};

export default useToast;