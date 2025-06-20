import { useCart } from '../contexts/CartContext';
import CartItem from '../components/ui/CartItem';
import { Link } from 'react-router-dom';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { products } from '../data/products';
import StoreMap from './StoreMap';
import ProductCard from '../components/ui/ProductCard';

const Cart = () => {
  // Debug message
  console.log('Cart page rendered');

  const { cart, removeFromCart, updateQuantity } = useCart();
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <main className="container-padded py-14 bg-neutral-50 min-h-screen">
      <div className="flex items-center gap-4 mb-10">
        <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-100">
          <ShoppingCartIcon className="h-7 w-7 text-primary-600" />
        </span>
        <h1 className="text-3xl font-bold text-neutral-900">Your Cart</h1>
      </div>
      {cart.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-card p-10 text-center flex flex-col items-center">
          <p className="text-neutral-500 text-lg mb-6">Your cart is empty. Start shopping now!</p>
          <Link to="/stores" className="btn-primary px-8 py-3 rounded-full mb-8">Shop Stores</Link>
          <div className="w-full max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold mb-6 text-neutral-900 text-left">Recommended for you</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.slice(0, 6).map(product => (
                <div key={product.id} className="w-full">
                  <CartItem item={{...product, quantity: 1}} showActions={false} />
                  <button
                    className="btn-primary w-full mt-2"
                    onClick={() => window.location.href = `/product/${product.id}`}
                  >
                    View Product
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="flex-1 bg-white rounded-2xl shadow-card p-8">
            <div className="space-y-6">
              {cart.map(item => (
                <CartItem key={item.id} item={item} onRemove={removeFromCart} onUpdateQuantity={updateQuantity} />
              ))}
            </div>
            {/* Amazon-style: Estimated delivery, savings, etc. */}
            <div className="mt-8 border-t pt-6">
              <div className="flex items-center gap-4 mb-2">
                <span className="text-green-600 font-semibold">Estimated Delivery:</span>
                <span className="text-neutral-700">2-4 business days</span>
              </div>
              <div className="flex items-center gap-4 mb-2">
                <span className="text-yellow-600 font-semibold">You Save:</span>
                <span className="text-neutral-700">₹{(totalPrice * 0.1).toFixed(2)}</span>
              </div>
              <div className="flex items-center gap-4 mb-2">
                <span className="text-blue-600 font-semibold">Free Returns</span>
              </div>
            </div>
          </div>
          <div className="w-full max-w-sm bg-white rounded-2xl shadow-card p-8 h-fit self-start">
            <h2 className="text-xl font-semibold mb-6 text-neutral-900">Order Summary</h2>
            <div className="flex items-center justify-between mb-4">
              <span className="text-neutral-700">Subtotal</span>
              <span className="text-lg font-bold text-primary-700">₹{totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-neutral-700">Estimated Savings</span>
              <span className="text-green-600 font-bold">-₹{(totalPrice * 0.1).toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-neutral-700">Delivery</span>
              <span className="text-blue-600 font-bold">Free</span>
            </div>
            <div className="flex items-center justify-between border-t pt-4 mt-4">
              <span className="text-xl font-bold text-neutral-900">Total</span>
              <span className="text-2xl font-bold text-primary-700">₹{(totalPrice * 0.9).toFixed(2)}</span>
            </div>
            <Link to="/checkout" className="btn-primary w-full py-3 rounded-full text-lg mt-6 block text-center">Proceed to Checkout</Link>
            <Link to="/stores" className="btn-outline w-full py-3 rounded-full text-lg mt-3">Continue Shopping</Link>
          </div>
        </div>
      )}
      {/* Related Products Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-semibold mb-6 text-neutral-900">Related Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.slice(0, 6).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
      {/* Reviews Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-semibold mb-6 text-neutral-900">What Customers Say</h2>
        <div className="flex overflow-x-auto pb-4 space-x-8">
          <div className="flex-shrink-0 w-80 bg-white p-8 rounded-2xl shadow-card">
            <ProductCard product={products[0]} />
            <p className="italic text-neutral-700 mb-4 mt-2">"Great quality and fast delivery! The wedding gown was exactly as pictured."</p>
            <div className="flex items-center">
              <img src="https://via.placeholder.com/50?text=JD" alt="User" className="w-10 h-10 rounded-full mr-3" />
              <div>
                <p className="font-medium">Jane Davis</p>
                <p className="text-sm text-neutral-500">Verified Buyer</p>
              </div>
            </div>
          </div>
          <div className="flex-shrink-0 w-80 bg-white p-8 rounded-2xl shadow-card">
            <ProductCard product={products[1]} />
            <p className="italic text-neutral-700 mb-4 mt-2">"Loved the tuxedo! Fit perfectly and the material is premium."</p>
            <div className="flex items-center">
              <img src="https://via.placeholder.com/50?text=MS" alt="User" className="w-10 h-10 rounded-full mr-3" />
              <div>
                <p className="font-medium">Michael Smith</p>
                <p className="text-sm text-neutral-500">Verified Buyer</p>
              </div>
            </div>
          </div>
          <div className="flex-shrink-0 w-80 bg-white p-8 rounded-2xl shadow-card">
            <ProductCard product={products[2]} />
            <p className="italic text-neutral-700 mb-4 mt-2">"Customer service was very helpful and the bridesmaid dresses were beautiful!"</p>
            <div className="flex items-center">
              <img src="https://via.placeholder.com/50?text=AR" alt="User" className="w-10 h-10 rounded-full mr-3" />
              <div>
                <p className="font-medium">Amanda Reynolds</p>
                <p className="text-sm text-neutral-500">Verified Buyer</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Cart;
