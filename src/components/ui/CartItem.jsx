import { PlusIcon, MinusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useCart } from '../../contexts/CartContext';

const CartItem = ({ item, showActions = true }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleIncreaseQuantity = () => {
    updateQuantity(item.id, item.quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    } else {
      removeFromCart(item.id);
    }
  };

  return (
    <div className="flex items-center py-6 border-b border-neutral-200 bg-white rounded-xl shadow-sm mb-4">
      <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-lg mr-6 border border-neutral-100">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-neutral-900 mb-1">{item.name}</h3>
        <div className="flex items-center mt-1 text-sm text-neutral-500 flex-wrap gap-4">
          <span>
            ${item.price.toFixed(2)} × {item.quantity}
          </span>
          {item.color && (
            <span>Color: {item.color}</span>
          )}
          {item.size && (
            <span>Size: {item.size}</span>
          )}
        </div>
        <div className="flex items-center justify-between mt-3">
          <span className="font-bold text-primary-600 text-lg">
            ${(item.price * item.quantity).toFixed(2)}
          </span>
          {showActions && (
            <div className="flex items-center gap-2">
              <button
                onClick={handleDecreaseQuantity}
                className="p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 transition-colors"
                aria-label="Decrease quantity"
              >
                <MinusIcon className="h-5 w-5 text-neutral-600" />
              </button>
              <span className="mx-2 w-8 text-center font-medium text-neutral-800">{item.quantity}</span>
              <button
                onClick={handleIncreaseQuantity}
                className="p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 transition-colors"
                aria-label="Increase quantity"
              >
                <PlusIcon className="h-5 w-5 text-neutral-600" />
              </button>
              <button
                onClick={() => removeFromCart(item.id)}
                className="ml-3 p-2 rounded-full bg-red-50 hover:bg-red-100 transition-colors"
                aria-label="Remove from cart"
              >
                <TrashIcon className="h-5 w-5 text-red-500" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartItem;