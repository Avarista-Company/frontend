import { useState } from 'react';
import { Link } from 'react-router-dom';
import { HeartIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { useCart } from '../../contexts/CartContext';
import { useToast } from '../../contexts/ToastContext';

const ProductCard = ({ product }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addToCart } = useCart();
  const { addToast } = useToast();

  const handleWishlist = (e) => {
    e.preventDefault();
    setIsWishlisted(!isWishlisted);
    addToast(`${product.name} ${isWishlisted ? 'removed from' : 'added to'} wishlist`);
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product, 1);
    addToast(`${product.name} added to cart`);
  };

  return (
    <Link 
      to={`/product/${product.id}`} 
      className="card group hover:-translate-y-2 focus:ring-2 focus:ring-primary-400"
    >
      <div className="relative overflow-hidden rounded-xl">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <button 
            onClick={handleAddToCart}
            className="p-3 bg-white rounded-full shadow-lg hover:bg-primary-50 transition-colors"
            aria-label="Add to cart"
          >
            <ShoppingBagIcon className="h-6 w-6 text-primary-600" />
          </button>
          <button 
            onClick={handleWishlist}
            className="p-3 bg-white rounded-full shadow-lg hover:bg-accent-50 transition-colors"
            aria-label="Add to wishlist"
          >
            {isWishlisted ? (
              <HeartIconSolid className="h-6 w-6 text-accent-600" />
            ) : (
              <HeartIcon className="h-6 w-6 text-accent-600" />
            )}
          </button>
        </div>
        {product.featured && (
          <span className="absolute top-3 left-3 bg-accent-500 text-white text-xs px-3 py-1 rounded-full shadow-md font-semibold">
            Featured
          </span>
        )}
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold text-neutral-900 mb-1 line-clamp-1">{product.name}</h3>
        <p className="text-sm text-neutral-500 mb-2 line-clamp-1">{product.category}</p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-primary-700">${product.price.toFixed(2)}</span>
          <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg 
                key={star}
                className={`h-4 w-4 ${star <= Math.round(product.rating || 4) ? 'text-yellow-400' : 'text-neutral-300'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;