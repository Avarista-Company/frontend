import { useState, useEffect } from 'react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import CartItem from '../components/ui/CartItem';
import UserBadge from '../components/ui/UserBadge';
import { users } from '../data/users';
import { products } from '../data/products';

const CommunityCart = () => {
  const { cart, addToCart, removeFromCart, updateQuantity, totalPrice, communityUsers, addUserToCommunity, removeUserFromCommunity } = useCart();
  const { currentUser } = useAuth();
  const { addToast } = useToast();
  const [inviteEmail, setInviteEmail] = useState('');
  const [shareLink, setShareLink] = useState('');
  const [showShareModal, setShowShareModal] = useState(false);
  const [newActivity, setNewActivity] = useState(null);
  
  useEffect(() => {
    // Generate a share link (mock)
    setShareLink(`https://avarista.com/cart/share/${Math.random().toString(36).substring(2, 10)}`);
    
    // Simulate real-time activity
    const activityInterval = setInterval(() => {
      // 30% chance of activity
      if (Math.random() < 0.3) {
        const randomUser = users[Math.floor(Math.random() * users.length)];
        const randomProduct = products[Math.floor(Math.random() * products.length)];
        const actions = ['added', 'removed', 'updated'];
        const randomAction = actions[Math.floor(Math.random() * actions.length)];
        
        setNewActivity({
          id: Date.now(),
          user: randomUser,
          action: randomAction,
          product: randomProduct,
          timestamp: new Date().toISOString(),
        });
        
        setTimeout(() => {
          setNewActivity(null);
        }, 3000);
      }
    }, 10000);
    
    return () => clearInterval(activityInterval);
  }, []);
  
  const handleInviteUser = (e) => {
    e.preventDefault();
    
    if (!inviteEmail) {
      addToast('Please enter an email address', 'error');
      return;
    }
    
    // Mock invitation
    addToast(`Invitation sent to ${inviteEmail}`, 'success');
    setInviteEmail('');
  };
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareLink)
      .then(() => {
        addToast('Share link copied to clipboard', 'success');
      })
      .catch(() => {
        addToast('Failed to copy link', 'error');
      });
  };
  
  return (
    <div className="container-padded py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold mb-2">Community Cart</h1>
        <p className="text-lg text-gray-600">
          Shop together with your family and wedding party. Everyone can view and edit the cart in real-time.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-medium">Shopping Cart</h2>
              
              <button
                onClick={() => setShowShareModal(true)}
                className="btn-primary flex items-center"
              >
                <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                Share Cart
              </button>
            </div>
            
            {cart.length > 0 ? (
              <div>
                <div className="space-y-4">
                  {cart.map(item => (
                    <CartItem key={item.id} item={item} />
                  ))}
                </div>
                
                <div className="border-t border-gray-200 pt-4 mt-6">
                  <div className="flex justify-between text-lg font-medium">
                    <span>Subtotal</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Shipping and taxes calculated at checkout
                  </p>
                </div>
                
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <button className="btn-primary py-3">
                    Proceed to Checkout
                  </button>
                  <button className="btn-outline py-3">
                    Continue Shopping
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <svg className="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-1">Your cart is empty</h3>
                <p className="text-gray-500 mb-6">
                  Start shopping together with your wedding party.
                </p>
                <button className="btn-primary inline-block">
                  Browse Products
                </button>
              </div>
            )}
          </div>
          
          {/* Recently Viewed */}
          <div className="mt-8 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-medium mb-4">Recently Viewed</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {products.slice(0, 4).map(product => (
                <div key={product.id} className="group cursor-pointer">
                  <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg bg-gray-100 mb-2">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="h-full w-full object-cover object-center group-hover:opacity-75" 
                    />
                  </div>
                  <h3 className="text-sm font-medium text-gray-900 truncate">{product.name}</h3>
                  <p className="text-sm text-gray-500">${product.price.toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Community Members & Activity */}
        <div>
          {/* Community Members */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-medium mb-4">Community Members</h2>
            
            <div className="space-y-3 mb-6">
              {[currentUser, ...communityUsers].map((user, index) => (
                <div key={index} className="flex items-center justify-between">
                  <UserBadge user={user} />
                  
                  {index !== 0 && (
                    <button
                      onClick={() => removeUserFromCommunity(user.id)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              ))}
            </div>
            
            <form onSubmit={handleInviteUser} className="mt-4">
              <label htmlFor="inviteEmail" className="block text-sm font-medium text-gray-700 mb-1">
                Invite Someone to Cart
              </label>
              <div className="flex">
                <input
                  type="email"
                  id="inviteEmail"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="Enter email address"
                  className="flex-grow border border-gray-300 rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <button
                  type="submit"
                  className="bg-primary-600 text-white px-4 py-2 rounded-r-md hover:bg-primary-700"
                >
                  Invite
                </button>
              </div>
            </form>
          </div>
          
          {/* Real-Time Activity */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-medium mb-4">Real-Time Activity</h2>
            
            {newActivity && (
              <div className="mb-4 bg-green-50 border border-green-200 rounded-md p-3 animate-pulse">
                <div className="flex items-start">
                  <img 
                    src={newActivity.user.avatar} 
                    alt={newActivity.user.name}
                    className="w-8 h-8 rounded-full mr-2" 
                  />
                  <div>
                    <p className="text-sm">
                      <span className="font-medium">{newActivity.user.name}</span> {newActivity.action} {newActivity.product.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      Just now
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            <div className="space-y-4">
              <div className="flex items-start">
                <img 
                  src="https://via.placeholder.com/32?text=MW" 
                  alt="Michael Wilson"
                  className="w-8 h-8 rounded-full mr-2" 
                />
                <div>
                  <p className="text-sm">
                    <span className="font-medium">Michael Wilson</span> added Navy Blue Tuxedo
                  </p>
                  <p className="text-xs text-gray-500">
                    5 minutes ago
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <img 
                  src="https://via.placeholder.com/32?text=ED" 
                  alt="Emily Davis"
                  className="w-8 h-8 rounded-full mr-2" 
                />
                <div>
                  <p className="text-sm">
                    <span className="font-medium">Emily Davis</span> updated quantity of Pearl Wedding Earrings
                  </p>
                  <p className="text-xs text-gray-500">
                    12 minutes ago
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <img 
                  src="https://via.placeholder.com/32?text=SA" 
                  alt="Sarah Anderson"
                  className="w-8 h-8 rounded-full mr-2" 
                />
                <div>
                  <p className="text-sm">
                    <span className="font-medium">Sarah Anderson</span> removed Flower Girl Dress
                  </p>
                  <p className="text-xs text-gray-500">
                    27 minutes ago
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <img 
                  src="https://via.placeholder.com/32?text=JS" 
                  alt="John Smith"
                  className="w-8 h-8 rounded-full mr-2" 
                />
                <div>
                  <p className="text-sm">
                    <span className="font-medium">John Smith</span> added Diamond Tiara
                  </p>
                  <p className="text-xs text-gray-500">
                    45 minutes ago
                  </p>
                </div>
              </div>
            </div>
            
            <button className="w-full mt-6 text-center text-primary-600 text-sm font-medium hover:text-primary-800">
              View All Activity
            </button>
          </div>
        </div>
      </div>
      
      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Share Your Cart</h3>
              <button
                onClick={() => setShowShareModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <p className="text-gray-600 mb-4">
              Share this link with your wedding party to collaborate on the shopping cart.
            </p>
            
            <div className="flex mb-4">
              <input
                type="text"
                value={shareLink}
                readOnly
                className="flex-grow border border-gray-300 rounded-l-md px-4 py-2 bg-gray-50"
              />
              <button
                onClick={handleCopyLink}
                className="bg-primary-600 text-white px-4 py-2 rounded-r-md hover:bg-primary-700"
              >
                Copy
              </button>
            </div>
            
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowShareModal(false)}
                className="btn-outline"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* How It Works */}
      <div className="mt-12">
        <h2 className="text-2xl font-serif font-bold text-center mb-8">How Community Cart Works</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mb-4">
              <span className="text-xl font-bold">1</span>
            </div>
            <h3 className="text-lg font-medium mb-2">Create a Cart</h3>
            <p className="text-gray-600">
              Start adding items to your cart that you're considering for your wedding attire needs.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mb-4">
              <span className="text-xl font-bold">2</span>
            </div>
            <h3 className="text-lg font-medium mb-2">Invite Wedding Party</h3>
            <p className="text-gray-600">
              Share your cart with family members and the wedding party via email or link sharing.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mb-4">
              <span className="text-xl font-bold">3</span>
            </div>
            <h3 className="text-lg font-medium mb-2">Shop Together</h3>
            <p className="text-gray-600">
              Collaborate in real-time as everyone can view, add, and edit items in the shared cart.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityCart;