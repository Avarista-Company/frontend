import { useState, useEffect } from 'react';
import { useToast } from '../contexts/ToastContext';
import { useCart } from '../contexts/CartContext';
import { generateAIFeedback } from '../utils/helpers';
import { products } from '../data/products';
import { WEDDING_ROLES } from '../utils/constants';
import ProductCard from '../components/ui/ProductCard';

const AiFeedback = () => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [availableProducts, setAvailableProducts] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [weddingRole, setWeddingRole] = useState('');
  const { addToast } = useToast();
  const { addToCart } = useCart();

  useEffect(() => {
    setAvailableProducts(products);
  }, []);

  const handleProductSelect = (e) => {
    const productId = parseInt(e.target.value);
    if (productId) {
      const product = availableProducts.find(p => p.id === productId);
      if (!selectedProducts.some(p => p.id === productId)) {
        setSelectedProducts(prev => [...prev, product]);
        addToast(`${product.name} added to outfit`, 'success');
      } else {
        addToast('This product is already in your outfit', 'warning');
      }
    }
  };

  const handleRemoveProduct = (productId) => {
    setSelectedProducts(prev => prev.filter(p => p.id !== productId));
  };

  const handleRoleChange = (e) => {
    setWeddingRole(e.target.value);
  };

  const handleGenerateFeedback = () => {
    if (selectedProducts.length === 0) {
      addToast('Please select at least one product', 'error');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      const aiResponse = generateAIFeedback(selectedProducts);
      setFeedback(aiResponse);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="container-padded py-12 bg-neutral-50 min-h-screen">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-3 text-neutral-900 tracking-tight">AI Outfit Suggestions</h1>
        <p className="text-lg text-neutral-600 max-w-2xl mx-auto">Get intelligent feedback and recommendations for your wedding look. Build your outfit and let our AI help you perfect it!</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Product Selection */}
        <div className="bg-white rounded-3xl shadow-card p-8 flex flex-col">
          <h2 className="text-2xl font-semibold mb-6 text-neutral-900">Create Your Outfit</h2>
          <div className="mb-6">
            <label htmlFor="weddingRole" className="block text-sm font-medium text-neutral-700 mb-1">Your Role in the Wedding</label>
            <select
              id="weddingRole"
              value={weddingRole}
              onChange={handleRoleChange}
              className="input"
            >
              <option value="">Select your role</option>
              {WEDDING_ROLES.map((role, index) => (
                <option key={index} value={role}>{role}</option>
              ))}
            </select>
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-neutral-700 mb-3">Select Products</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-96 overflow-y-auto pr-2">
              {availableProducts.map(product => {
                const isSelected = selectedProducts.some(p => p.id === product.id);
                return (
                  <div key={product.id} className={`relative group border rounded-xl p-2 transition-all duration-200 ${isSelected ? 'ring-2 ring-primary-500 bg-primary-50' : 'bg-neutral-50'}`}>
                    <ProductCard product={product} />
                    <button
                      className={`absolute top-3 right-3 z-10 rounded-full px-3 py-1 text-xs font-semibold shadow ${isSelected ? 'bg-red-500 text-white' : 'bg-primary-600 text-white'}`}
                      onClick={e => {
                        e.preventDefault();
                        if (isSelected) handleRemoveProduct(product.id);
                        else handleProductSelect({ target: { value: product.id } });
                      }}
                    >
                      {isSelected ? 'Remove' : 'Add'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="mt-6">
            <button
              onClick={handleGenerateFeedback}
              disabled={selectedProducts.length === 0 || isLoading}
              className="btn-primary w-full py-3 rounded-full text-lg disabled:opacity-50"
            >
              {isLoading ? 'Analyzing...' : 'Get AI Feedback'}
            </button>
            <button
              onClick={() => { setSelectedProducts([]); setFeedback(null); }}
              className="btn-outline w-full py-3 rounded-full text-lg mt-3"
              disabled={isLoading}
            >
              Clear Selection
            </button>
          </div>
        </div>
        {/* AI Feedback */}
        <div className="lg:col-span-2 bg-white rounded-3xl shadow-card p-8 flex flex-col">
          <h2 className="text-2xl font-semibold mb-6 text-neutral-900">AI Style Analysis</h2>
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-96 w-full animate-pulse">
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-primary-200 to-primary-400 mb-6 animate-spin-slow"></div>
              <div className="w-2/3 h-8 bg-neutral-200 rounded mb-4"></div>
              <div className="w-1/2 h-6 bg-neutral-100 rounded mb-2"></div>
              <div className="w-full h-32 bg-neutral-100 rounded-2xl mb-4"></div>
              <div className="w-full h-8 bg-neutral-200 rounded mb-2"></div>
              <div className="w-1/2 h-8 bg-neutral-100 rounded"></div>
            </div>
          ) : feedback ? (
            <div className="transition-all duration-700 ease-in-out animate-fade-in">
              <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-8">
                <div className="flex flex-col items-center">
                  <div className="relative">
                    <svg className="h-24 w-24 text-primary-200" viewBox="0 0 120 120"><circle cx="60" cy="60" r="54" fill="none" stroke="currentColor" strokeWidth="12" /></svg>
                    <span className="absolute inset-0 flex items-center justify-center text-5xl font-bold text-primary-700 animate-bounce-slow">{feedback.score.toFixed(1)}</span>
                  </div>
                  <p className="text-neutral-600 mt-2">Outfit Score</p>
                </div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className={`h-7 w-7 ${star <= Math.round(feedback.score / 2) ? 'text-yellow-400' : 'text-neutral-300'} transition-colors duration-300`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <div className="mb-8 p-6 bg-gradient-to-br from-primary-50 to-neutral-100 rounded-2xl shadow-inner animate-fade-in">
                <h3 className="font-semibold mb-2 text-neutral-900 flex items-center gap-2">
                  <svg className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3" /></svg>
                  Feedback
                </h3>
                <p className="text-neutral-700 text-lg">{feedback.feedback}</p>
              </div>
              <div className="mb-8 animate-fade-in">
                <h3 className="font-semibold mb-2 text-neutral-900 flex items-center gap-2">
                  <svg className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" /></svg>
                  Suggestions
                </h3>
                <ul className="space-y-2">
                  {feedback.suggestions.map((suggestion, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="h-5 w-5 text-primary-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      <span>{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="grid grid-cols-2 gap-6 mb-8 animate-fade-in">
                <div className="p-4 bg-neutral-50 rounded-2xl">
                  <h3 className="font-medium mb-2">Style Coherence</h3>
                  <div className="w-full bg-neutral-200 rounded-full h-2.5">
                    <div className="bg-primary-600 h-2.5 rounded-full transition-all duration-700" style={{ width: `${(feedback.analytics.styleCoherence / 10) * 100}%` }}></div>
                  </div>
                  <p className="mt-1 text-sm text-right text-neutral-600">{feedback.analytics.styleCoherence.toFixed(1)}/10</p>
                </div>
                <div className="p-4 bg-neutral-50 rounded-2xl">
                  <h3 className="font-medium mb-2">Occasion Match</h3>
                  <div className="w-full bg-neutral-200 rounded-full h-2.5">
                    <div className="bg-primary-600 h-2.5 rounded-full transition-all duration-700" style={{ width: `${(feedback.analytics.occasionMatch / 10) * 100}%` }}></div>
                  </div>
                  <p className="mt-1 text-sm text-right text-neutral-600">{feedback.analytics.occasionMatch.toFixed(1)}/10</p>
                </div>
              </div>
              <div className="mt-8 grid grid-cols-2 gap-4 animate-fade-in">
                <button className="btn-primary py-3 rounded-full text-lg">Add All to Cart</button>
                <button className="btn-outline py-3 rounded-full text-lg">Modify Outfit</button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-96 text-center animate-fade-in">
              <svg className="h-16 w-16 text-neutral-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
              <h3 className="text-lg font-medium text-neutral-900 mb-2">AI Style Advisor</h3>
              <p className="text-neutral-500 max-w-md">Select your wedding role and add items to your outfit, then click "Get AI Feedback" to receive personalized style advice.</p>
            </div>
          )}
        </div>
      </div>
      {/* How It Works */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-center mb-10 text-neutral-900">How Our AI Style Advisor Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="bg-white rounded-2xl shadow-card p-8">
            <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mb-4"><span className="text-xl font-bold">1</span></div>
            <h3 className="text-lg font-semibold mb-2">Build Your Outfit</h3>
            <p className="text-neutral-600">Select items you're considering for your wedding role. Mix and match different pieces to create your ideal look.</p>
          </div>
          <div className="bg-white rounded-2xl shadow-card p-8">
            <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mb-4"><span className="text-xl font-bold">2</span></div>
            <h3 className="text-lg font-semibold mb-2">AI Analysis</h3>
            <p className="text-neutral-600">Our AI analyzes your selections based on color coordination, style coherence, wedding formality, and role appropriateness.</p>
          </div>
          <div className="bg-white rounded-2xl shadow-card p-8">
            <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mb-4"><span className="text-xl font-bold">3</span></div>
            <h3 className="text-lg font-semibold mb-2">Get Suggestions</h3>
            <p className="text-neutral-600">Receive personalized feedback and suggestions to improve your outfit. Add the perfect ensemble to your cart with confidence.</p>
          </div>
        </div>
      </div>
      {/* Testimonials */}
      <div className="mt-16 bg-neutral-100 rounded-2xl p-10">
        <h2 className="text-2xl font-bold text-center mb-10 text-neutral-900">What Our Users Say</h2>
        <div className="flex overflow-x-auto pb-4 space-x-8">
          <div className="flex-shrink-0 w-80 bg-white p-8 rounded-2xl shadow-card">
            <p className="italic text-neutral-700 mb-4">"The AI suggestions were spot on! I was unsure about my mother-of-the-bride outfit, but the feedback helped me make the perfect choice."</p>
            <div className="flex items-center">
              <img src="https://via.placeholder.com/50?text=JD" alt="User" className="w-10 h-10 rounded-full mr-3" />
              <div>
                <p className="font-medium">Jane Davis</p>
                <p className="text-sm text-neutral-500">Mother of the Bride</p>
              </div>
            </div>
          </div>
          <div className="flex-shrink-0 w-80 bg-white p-8 rounded-2xl shadow-card">
            <p className="italic text-neutral-700 mb-4">"As a groom, I was clueless about wedding attire. The AI helped me coordinate with our wedding colors and suggested perfect accessories."</p>
            <div className="flex items-center">
              <img src="https://via.placeholder.com/50?text=MS" alt="User" className="w-10 h-10 rounded-full mr-3" />
              <div>
                <p className="font-medium">Michael Smith</p>
                <p className="text-sm text-neutral-500">Groom</p>
              </div>
            </div>
          </div>
          <div className="flex-shrink-0 w-80 bg-white p-8 rounded-2xl shadow-card">
            <p className="italic text-neutral-700 mb-4">"I was able to coordinate outfits for all six bridesmaids using the AI advisor. Everyone looked cohesive yet unique. Absolutely amazing!"</p>
            <div className="flex items-center">
              <img src="https://via.placeholder.com/50?text=AR" alt="User" className="w-10 h-10 rounded-full mr-3" />
              <div>
                <p className="font-medium">Amanda Reynolds</p>
                <p className="text-sm text-neutral-500">Bride</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiFeedback;