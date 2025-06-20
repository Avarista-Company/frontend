import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { ToastProvider } from './contexts/ToastContext';
import Layout from './components/layout/Layout';
import ErrorBoundary from './components/common/ErrorBoundary';

// Pages
import Home from './pages/Home';
import StoreExplorer from './pages/StoreExplorer';
import StoreDetail from './pages/StoreDetail';
import TryOn from './pages/TryOn';
import AiFeedback from './pages/AiFeedback';
import CommunityCart from './pages/CommunityCart';
import Auth from './pages/Auth';
import RetailerDashboard from './pages/RetailerDashboard';
import NotFound from './pages/NotFound';
import ProductDetail from './pages/ProductDetail';
import Profile from './pages/Profile';
import Cart from './pages/Cart'; // Add this import
import Checkout from './pages/Checkout';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <ToastProvider>
          <ErrorBoundary>
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/stores" element={<StoreExplorer />} />
                <Route path="/stores/:storeId" element={<StoreDetail />} />
                <Route path="/try-on" element={<TryOn />} />
                <Route path="/ai-feedback" element={<AiFeedback />} />
                <Route path="/community-cart" element={<CommunityCart />} />
                <Route path="/cart" element={<Cart />} /> {/* Add this route */}
                <Route path="/login" element={<Auth />} />
                <Route path="/register" element={<Auth isRegister />} />
                <Route path="/retailer-dashboard" element={<RetailerDashboard />} />
                <Route path="/product/:productId" element={<ProductDetail />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          </ErrorBoundary>
        </ToastProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;