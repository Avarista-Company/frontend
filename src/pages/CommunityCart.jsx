import { useState, useEffect } from 'react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import CartItem from '../components/ui/CartItem';
import UserBadge from '../components/ui/UserBadge';
import { users } from '../data/users';
import { products } from '../data/products';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ui/ProductCard';

const CommunityCart = () => {
  const { cart, addToCart, removeFromCart, updateQuantity, totalPrice, communityUsers, addUserToCommunity, removeUserFromCommunity } = useCart();
  const { currentUser } = useAuth();
  const { addToast } = useToast();
  const [inviteEmail, setInviteEmail] = useState('');
  const [shareLink, setShareLink] = useState('');
  const [showShareModal, setShowShareModal] = useState(false);
  const [newActivity, setNewActivity] = useState(null);

  useEffect(() => {
    setShareLink(`https://avarista.com/cart/share/${Math.random().toString(36).substring(2, 10)}`);
    const activityInterval = setInterval(() => {
      if (Math.random() < 0.3) {
        const randomUser = users[Math.floor(Math.random() * users.length)];
        const randomProduct = products[Math.floor(Math.random() * products.length)];
        const actions = ['added', 'removed', 'updated'];
        const randomAction = actions[Math.floor(Math.random() * actions.length)];
        setNewActivity({ id: Date.now(), user: randomUser, action: randomAction, product: randomProduct, timestamp: new Date().toISOString() });
        setTimeout(() => setNewActivity(null), 3000);
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
    addToast(`Invitation sent to ${inviteEmail}`, 'success');
    setInviteEmail('');
  };
  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareLink)
      .then(() => addToast('Share link copied to clipboard', 'success'))
      .catch(() => addToast('Failed to copy link', 'error'));
  };

  if (!currentUser) {
    return (
      <div className="container-padded py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Sign in to access Community Cart</h1>
        <p className="mb-6 text-lg text-neutral-600">You must be logged in to view and collaborate on the community cart.</p>
        <Link to="/login" className="btn-primary px-8 py-3 text-lg">Sign In</Link>
      </div>
    );
  }

  return (
    <main className="container-padded py-16 bg-neutral-50 min-h-screen">
      <h1 className="text-4xl font-bold mb-12 text-neutral-900 text-center tracking-tight">Community Cart</h1>
      <div className="flex flex-col md:flex-row gap-14">
        {/* Cart Items */}
        <div className="md:w-2/3 bg-white rounded-3xl shadow-card p-10 flex flex-col">
          <h2 className="text-2xl font-semibold mb-8 text-neutral-900">Your Cart</h2>
          {cart.length === 0 ? (
            <div className="text-neutral-400 text-center py-16 text-lg">Your cart is empty.</div>
          ) : (
            <div className="space-y-8">
              {cart.map(item => <CartItem key={item.id} item={item} onRemove={removeFromCart} onUpdateQuantity={updateQuantity} />)}
            </div>
          )}
          <div className="mt-10 flex items-center justify-between border-t border-neutral-200 pt-8">
            <span className="font-bold text-xl text-neutral-900">Total:</span>
            <span className="text-3xl font-bold text-primary-700">₹{totalPrice.toFixed(2)}</span>
          </div>
        </div>
        {/* Community & Share */}
        <div className="md:w-1/3 flex flex-col gap-10">
          <div className="bg-white rounded-3xl shadow-card p-8">
            <h3 className="text-xl font-semibold mb-6 text-neutral-900">Community Members</h3>
            <div className="space-y-4 mb-8">
              {[currentUser, ...communityUsers].map((user, index) => (
                <div key={user.id} className="flex items-center gap-3">
                  <UserBadge user={user} />
                  {index !== 0 && (
                    <button onClick={() => removeUserFromCommunity(user.id)} className="text-neutral-400 hover:text-red-500 ml-auto text-sm">Remove</button>
                  )}
                </div>
              ))}
            </div>
            <form onSubmit={handleInviteUser} className="flex gap-2 mt-2">
              <input type="email" placeholder="Invite by email" value={inviteEmail} onChange={e => setInviteEmail(e.target.value)} className="input flex-1" />
              <button type="submit" className="btn-primary px-5 py-2 rounded-full">Invite</button>
            </form>
          </div>
          <div className="bg-white rounded-3xl shadow-card p-8">
            <h3 className="text-xl font-semibold mb-6 text-neutral-900">Share Cart</h3>
            <div className="flex items-center gap-2 mb-4">
              <input type="text" value={shareLink} readOnly className="input flex-1" />
              <button onClick={handleCopyLink} className="btn-outline px-5 py-2 rounded-full">Copy</button>
            </div>
            <p className="text-xs text-neutral-500">Share this link with your family to collaborate in real time.</p>
          </div>
        </div>
      </div>
      {/* Activity Feed */}
      {newActivity && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-white rounded-full shadow-card px-8 py-4 flex items-center gap-4 border border-primary-100 z-50 animate-fade-in-up">
          <UserBadge user={newActivity.user} />
          <span className="text-neutral-700 font-medium">{newActivity.user.name} {newActivity.action} <span className="font-semibold">{newActivity.product.name}</span></span>
        </div>
      )}
    </main>
  );
};

export default CommunityCart;