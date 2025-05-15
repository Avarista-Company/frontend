import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { ToastProvider } from './contexts/ToastContext';
import Layout from './components/layout/Layout';

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

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <ToastProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/stores" element={<StoreExplorer />} />
              <Route path="/stores/:storeId" element={<StoreDetail />} />
              <Route path="/try-on" element={<TryOn />} />
              <Route path="/ai-feedback" element={<AiFeedback />} />
              <Route path="/community-cart" element={<CommunityCart />} />
              <Route path="/login" element={<Auth />} />
              <Route path="/register" element={<Auth isRegister />} />
              <Route path="/retailer-dashboard" element={<RetailerDashboard />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </ToastProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;