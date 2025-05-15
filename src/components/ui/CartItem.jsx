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
    <div className="flex items-center py-4 border-b border-gray-200">
      <div className="w-20 h-20 flex-shrink-0 overflow-hidden rounded-md mr-4">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="flex-1">
        <h3 className="text-base font-medium text-gray-900">{item.name}</h3>
        
        <div className="flex items-center mt-1 text-sm text-gray-500">
          <span className="mr-4">
            ${item.price.toFixed(2)} × {item.quantity}
          </span>
          
          {item.color && (
            <span className="mr-4">Color: {item.color}</span>
          )}
          
          {item.size && (
            <span>Size: {item.size}</span>
          )}
        </div>
        
        <div className="flex items-center justify-between mt-2">
          <span className="font-medium">
            ${(item.price * item.quantity).toFixed(2)}
          </span>
          
          {showActions && (
            <div className="flex items-center">
              <button
                onClick={handleDecreaseQuantity}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <MinusIcon className="h-4 w-4 text-gray-500" />
              </button>
              
              <span className="mx-2 w-8 text-center">{item.quantity}</span>
              
              <button
                onClick={handleIncreaseQuantity}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <PlusIcon className="h-4 w-4 text-gray-500" />
              </button>
              
              <button
                onClick={() => removeFromCart(item.id)}
                className="ml-4 p-1 rounded-full hover:bg-gray-100"
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