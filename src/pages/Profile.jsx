import { useAuth } from '../contexts/AuthContext';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Mock order and wishlist data
const mockOrders = [
  {
    id: 'ORD-1001',
    date: '2025-05-12',
    total: 1499.99,
    status: 'Delivered',
    items: [
      { name: 'Classic White Wedding Gown', image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=200&q=80', price: 1299.99 },
      { name: 'Blush Bridesmaid Dress', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80', price: 189.99 }
    ]
  },
  {
    id: 'ORD-1002',
    date: '2025-04-28',
    total: 799.99,
    status: 'Shipped',
    items: [
      { name: 'Navy Blue Tuxedo', image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=200&q=80', price: 799.99 }
    ]
  }
];

const mockWishlist = [
  { id: 1, name: 'Classic White Wedding Gown', image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=200&q=80', price: 1299.99 },
  { id: 2, name: 'Navy Blue Tuxedo', image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=200&q=80', price: 799.99 }
];

const Profile = () => {
  const { currentUser } = useAuth();
  const [orders, setOrders] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setOrders(mockOrders);
      setWishlist(JSON.parse(localStorage.getItem('avarista_wishlist')) || mockWishlist);
      setLoading(false);
    }, 600);
  }, []);

  if (!currentUser) {
    return (
      <div className="container-padded py-16 text-center">
        <h1 className="text-3xl font-serif font-bold mb-4">Sign in to view your profile</h1>
        <Link to="/login" className="btn-primary px-8 py-3 text-lg">Sign In</Link>
      </div>
    );
  }

  if (loading) {
    return <div className="flex justify-center items-center h-96"><div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600"></div></div>;
  }

  return (
    <div className="container-padded py-10">
      <h1 className="text-3xl font-serif font-bold mb-8">My Profile</h1>
      <div className="flex flex-col md:flex-row gap-10">
        {/* User Info */}
        <div className="md:w-1/3 bg-white rounded-xl shadow-lg p-6 mb-8 md:mb-0">
          <div className="flex items-center gap-4 mb-4">
            <img src={currentUser.avatar.replace('via.placeholder.com/150', 'images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=100&q=80')} alt={currentUser.name} className="w-16 h-16 rounded-full object-cover border-2 border-primary-200" />
            <div>
              <h2 className="text-xl font-bold">{currentUser.name}</h2>
              <p className="text-neutral-600">{currentUser.email}</p>
            </div>
          </div>
          <div className="text-sm text-neutral-500">Role: {currentUser.role}</div>
        </div>
        {/* Orders & Wishlist */}
        <div className="md:w-2/3 flex flex-col gap-10">
          {/* Order History */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Order History</h3>
            {orders.length === 0 ? (
              <p className="text-neutral-500">No orders yet.</p>
            ) : (
              <div className="space-y-6">
                {orders.map(order => (
                  <div key={order.id} className="border-b border-neutral-200 pb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Order #{order.id}</span>
                      <span className="text-sm text-neutral-500">{order.date}</span>
                      <span className="text-sm font-semibold text-primary-700">{order.status}</span>
                    </div>
                    <div className="flex gap-4 flex-wrap">
                      {order.items.map(item => (
                        <div key={item.name} className="flex items-center gap-2">
                          <img src={item.image} alt={item.name} className="w-12 h-12 rounded object-cover" />
                          <div>
                            <div className="font-medium text-neutral-900">{item.name}</div>
                            <div className="text-xs text-neutral-500">${item.price.toFixed(2)}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-2 text-sm text-neutral-700">Total: <span className="font-bold">${order.total.toFixed(2)}</span></div>
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* Wishlist */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Wishlist</h3>
            {wishlist.length === 0 ? (
              <p className="text-neutral-500">Your wishlist is empty.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {wishlist.map(item => (
                  <div key={item.id} className="card flex flex-col items-center p-4">
                    <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded mb-2" />
                    <div className="font-medium text-neutral-900 mb-1">{item.name}</div>
                    <div className="text-primary-700 font-bold mb-2">${item.price.toFixed(2)}</div>
                    <button className="btn-outline w-full">Remove</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
