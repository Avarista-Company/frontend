import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HeartIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { useCart } from '../../contexts/CartContext';
import { useToast } from '../../contexts/ToastContext';

const ProductCard = ({ product }) => {
  const [isWishlisted, setIsWishlisted] = useState(() => {
    const wishlist = JSON.parse(localStorage.getItem('avarista_wishlist')) || [];
    return wishlist.some(item => item.id === product.id);
  });
  const { addToCart } = useCart();
  const { addToast } = useToast();

  const handleWishlist = (e) => {
    e.preventDefault();
    setIsWishlisted(prev => {
      let wishlist = JSON.parse(localStorage.getItem('avarista_wishlist')) || [];
      // Deduplicate by product ID
      wishlist = wishlist.filter(item => item.id !== product.id);
      let updated;
      if (prev) {
        updated = wishlist;
      } else {
        updated = [...wishlist, { ...product }];
      }
      localStorage.setItem('avarista_wishlist', JSON.stringify(updated));
      addToast(`${product.name} ${prev ? 'removed from' : 'added to'} wishlist`);
      return !prev;
    });
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product, 1);
    addToast(`${product.name} added to cart`);
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className="card group hover:-translate-y-1 focus:ring-2 focus:ring-primary-400 p-4 flex flex-col items-center"
    >
      <div className="relative w-full aspect-square overflow-hidden rounded-xl bg-neutral-100 mb-4 flex items-center justify-center">
        <img
          src={product.image}
          alt={product.name}
          className="w-4/5 h-4/5 object-contain transition-transform duration-200 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={handleAddToCart}
            className="p-2 bg-white rounded-full shadow hover:bg-primary-50 transition-colors border border-neutral-200"
            aria-label="Add to cart"
          >
            <ShoppingBagIcon className="h-5 w-5 text-primary-600" />
          </button>
          <button
            onClick={handleWishlist}
            className="p-2 bg-white rounded-full shadow hover:bg-accent-50 transition-colors border border-neutral-200"
            aria-label="Add to wishlist"
          >
            {isWishlisted ? (
              <HeartIconSolid className="h-5 w-5 text-accent-600" />
            ) : (
              <HeartIcon className="h-5 w-5 text-accent-600" />
            )}
          </button>
        </div>
        {product.featured && (
          <span className="absolute top-3 left-3 bg-accent-500 text-white text-xs px-3 py-1 rounded-full shadow font-semibold">
            Featured
          </span>
        )}
      </div>
      <div className="w-full flex flex-col items-center">
        <h3 className="text-lg font-semibold text-neutral-900 mb-1 line-clamp-1 text-center">{product.name}</h3>
        <p className="text-sm text-neutral-500 mb-2 line-clamp-1 text-center">{product.category}</p>
        <span className="text-xl font-bold text-primary-700 mb-2">₹{product.price}</span>
      </div>
    </Link>
  );
};

export default ProductCard;