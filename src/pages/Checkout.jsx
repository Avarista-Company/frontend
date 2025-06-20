import { useCart } from '../contexts/CartContext';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { cart, totalPrice, placeOrder } = useCart();
  const [shipping, setShipping] = useState({ name: '', address: '', city: '', zip: '', phone: '' });
  const [payment, setPayment] = useState('card');
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleInput = e => setShipping({ ...shipping, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    setSubmitted(true);
    placeOrder(shipping, payment);
    setTimeout(() => {
      navigate('/profile');
    }, 2000);
  };

  if (cart.length === 0) {
    return (
      <div className="container-padded py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
        <Link to="/stores" className="btn-primary px-8 py-3 text-lg">Shop Now</Link>
      </div>
    );
  }

  return (
    <main className="container-padded py-12 bg-neutral-50 min-h-screen">
      <h1 className="text-4xl font-bold mb-10 text-center">Checkout</h1>
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Order Summary */}
        <div className="lg:w-2/5 bg-white rounded-2xl shadow-card p-8 mb-8 lg:mb-0">
          <h2 className="text-2xl font-semibold mb-6 text-neutral-900">Order Summary</h2>
          <div className="space-y-4 mb-6">
            {cart.map(item => (
              <div key={item.id} className="flex items-center gap-4 border-b pb-4">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                <div className="flex-1">
                  <div className="font-medium text-neutral-900">{item.name}</div>
                  <div className="text-sm text-neutral-500">Qty: {item.quantity}</div>
                </div>
                <div className="font-bold text-primary-700">₹{(item.price * item.quantity).toFixed(2)}</div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between text-lg font-bold border-t pt-4">
            <span>Total</span>
            <span className="text-primary-700">₹{totalPrice.toFixed(2)}</span>
          </div>
        </div>
        {/* Shipping & Payment */}
        <form className="flex-1 bg-white rounded-2xl shadow-card p-8" onSubmit={handleSubmit}>
          <h2 className="text-2xl font-semibold mb-6 text-neutral-900">Shipping Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <input name="name" required placeholder="Full Name" className="input" value={shipping.name} onChange={handleInput} />
            <input name="phone" required placeholder="Phone Number" className="input" value={shipping.phone} onChange={handleInput} />
            <input name="address" required placeholder="Address" className="input md:col-span-2" value={shipping.address} onChange={handleInput} />
            <input name="city" required placeholder="City" className="input" value={shipping.city} onChange={handleInput} />
            <input name="zip" required placeholder="ZIP Code" className="input" value={shipping.zip} onChange={handleInput} />
          </div>
          <h2 className="text-2xl font-semibold mb-6 text-neutral-900">Payment Method</h2>
          <div className="flex gap-6 mb-8">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="payment" value="card" checked={payment === 'card'} onChange={() => setPayment('card')} />
              <span>Credit/Debit Card</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="payment" value="cod" checked={payment === 'cod'} onChange={() => setPayment('cod')} />
              <span>Cash on Delivery</span>
            </label>
          </div>
          <button type="submit" className="btn-primary w-full py-3 rounded-full text-lg" disabled={submitted}>
            {submitted ? 'Order Placed!' : 'Place Order'}
          </button>
          {submitted && <div className="text-green-600 text-center mt-4">Thank you! Your order has been placed.</div>}
        </form>
      </div>
    </main>
  );
};

export default Checkout;
