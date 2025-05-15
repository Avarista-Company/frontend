import { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [cart, setCart] = useState([]);
  const [communityUsers, setCommunityUsers] = useState([
    {
      id: '789',
      name: 'Jane Smith',
      avatar: 'https://via.placeholder.com/50?text=JS',
      role: 'Mother of the Bride'
    },
    {
      id: '101',
      name: 'Robert Johnson',
      avatar: 'https://via.placeholder.com/50?text=RJ',
      role: 'Father of the Groom'
    }
  ]);
  
  // Load cart from localStorage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem('avarista_cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);
  
  // Update localStorage when cart changes
  useEffect(() => {
    localStorage.setItem('avarista_cart', JSON.stringify(cart));
  }, [cart]);
  
  // Add item to cart
  const addToCart = (product, quantity = 1, addedBy = currentUser?.id) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      
      if (existingItem) {
        // Update quantity if item already exists
        return prevCart.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Add new item
        return [...prevCart, { 
          ...product, 
          quantity,
          addedBy,
          addedAt: new Date().toISOString()
        }];
      }
    });
  };
  
  // Remove item from cart
  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };
  
  // Update item quantity
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCart(prevCart => 
      prevCart.map(item => 
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };
  
  // Clear cart
  const clearCart = () => {
    setCart([]);
  };
  
  // Calculate total price
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  // Mock function to add user to community cart
  const addUserToCommunity = (userData) => {
    setCommunityUsers(prev => [...prev, userData]);
  };
  
  // Mock function to remove user from community cart
  const removeUserFromCommunity = (userId) => {
    setCommunityUsers(prev => prev.filter(user => user.id !== userId));
  };
  
  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalPrice,
    communityUsers,
    addUserToCommunity,
    removeUserFromCommunity
  };
  
  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};