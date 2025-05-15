import { useState, useEffect } from 'react';
import { useToast } from '../contexts/ToastContext';
import { generateAIFeedback } from '../utils/helpers';
import { products } from '../data/products';
import { WEDDING_ROLES } from '../utils/constants';

const AiFeedback = () => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [availableProducts, setAvailableProducts] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [weddingRole, setWeddingRole] = useState('');
  const { addToast } = useToast();
  
  useEffect(() => {
    // In a real app, this would fetch from an API
    setAvailableProducts(products);
  }, []);
  
  const handleProductSelect = (e) => {
    const productId = parseInt(e.target.value);
    if (productId) {
      const product = availableProducts.find(p => p.id === productId);
      
      // Check if product is already selected
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
    
    // Simulate API call
    setTimeout(() => {
      const aiResponse = generateAIFeedback(selectedProducts);
      setFeedback(aiResponse);
      setIsLoading(false);
    }, 1500);
  };
  
  return (
    <div className="container-padded py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-serif font-bold mb-2">AI Outfit Feedback</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Get intelligent feedback on your outfit selection for the perfect wedding look. Our AI will analyze your choices and provide style suggestions.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Product Selection */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-medium mb-4">Create Your Outfit</h2>
          
          <div className="mb-6">
            <label htmlFor="weddingRole" className="block text-sm font-medium text-gray-700 mb-1">
              Your Role in the Wedding
            </label>
            <select
              id="weddingRole"
              value={weddingRole}
              onChange={handleRoleChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">Select your role</option>
              {WEDDING_ROLES.map((role, index) => (
                <option key={index} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>
          
          <div className="mb-6">
            <label htmlFor="product" className="block text-sm font-medium text-gray-700 mb-1">
              Add Items to Outfit
            </label>
            <select
              id="product"
              onChange={handleProductSelect}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
              value=""
            >
              <option value="">Select a product</option>
              {availableProducts.map(product => (
                <option key={product.id} value={product.id}>
                  {product.name} - ${product.price.toFixed(2)}
                </option>
              ))}
            </select>
          </div>
          
          <div className="mt-6">
            <h3 className="font-medium mb-2">Selected Items</h3>
            
            {selectedProducts.length > 0 ? (
              <div className="space-y-3">
                {selectedProducts.map(product => (
                  <div key={product.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                    <div className="flex items-center">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded-md mr-3" 
                      />
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-gray-600">${product.price.toFixed(2)}</p>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => handleRemoveProduct(product.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">
                No items added yet. Select products above to build your outfit.
              </p>
            )}
            
            <div className="mt-6">
              <button
                onClick={handleGenerateFeedback}
                disabled={selectedProducts.length === 0 || isLoading}
                className="btn-primary w-full py-3 disabled:opacity-50"
              >
                {isLoading ? 'Analyzing...' : 'Get AI Feedback'}
              </button>
            </div>
          </div>
        </div>
        
        {/* AI Feedback */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-medium mb-4">AI Style Analysis</h2>
          
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-96">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600 mb-4"></div>
              <p className="text-gray-600">Analyzing your outfit selection...</p>
            </div>
          ) : feedback ? (
            <div>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-2xl font-bold">{feedback.score.toFixed(1)}/10</h3>
                  <p className="text-gray-600">Outfit Score</p>
                </div>
                
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className={`h-6 w-6 ${
                        star <= Math.round(feedback.score / 2)
                          ? 'text-yellow-400'
                          : 'text-gray-300'
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium mb-2">Feedback</h3>
                <p className="text-gray-700">{feedback.feedback}</p>
              </div>
              
              <div className="mb-6">
                <h3 className="font-medium mb-2">Suggestions</h3>
                <ul className="space-y-2">
                  {feedback.suggestions.map((suggestion, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="h-5 w-5 text-primary-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium mb-2">Style Coherence</h3>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-primary-600 h-2.5 rounded-full"
                      style={{ width: `${(feedback.analytics.styleCoherence / 10) * 100}%` }}
                    ></div>
                  </div>
                  <p className="mt-1 text-sm text-right text-gray-600">
                    {feedback.analytics.styleCoherence.toFixed(1)}/10
                  </p>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium mb-2">Occasion Match</h3>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-primary-600 h-2.5 rounded-full"
                      style={{ width: `${(feedback.analytics.occasionMatch / 10) * 100}%` }}
                    ></div>
                  </div>
                  <p className="mt-1 text-sm text-right text-gray-600">
                    {feedback.analytics.occasionMatch.toFixed(1)}/10
                  </p>
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-2 gap-4">
                <button className="btn-primary py-3">
                  Add All to Cart
                </button>
                <button className="btn-outline py-3">
                  Modify Outfit
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-96 text-center">
              <svg className="h-16 w-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">AI Style Advisor</h3>
              <p className="text-gray-600 max-w-md">
                Select your wedding role and add items to your outfit, then click "Get AI Feedback" to receive personalized style advice.
              </p>
            </div>
          )}
        </div>
      </div>
      
      {/* How It Works */}
      <div className="mt-12">
        <h2 className="text-2xl font-serif font-bold text-center mb-8">How Our AI Style Advisor Works</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mb-4">
              <span className="text-xl font-bold">1</span>
            </div>
            <h3 className="text-lg font-medium mb-2">Build Your Outfit</h3>
            <p className="text-gray-600">
              Select items you're considering for your wedding role. Mix and match different pieces to create your ideal look.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mb-4">
              <span className="text-xl font-bold">2</span>
            </div>
            <h3 className="text-lg font-medium mb-2">AI Analysis</h3>
            <p className="text-gray-600">
              Our AI analyzes your selections based on color coordination, style coherence, wedding formality, and role appropriateness.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mb-4">
              <span className="text-xl font-bold">3</span>
            </div>
            <h3 className="text-lg font-medium mb-2">Get Suggestions</h3>
            <p className="text-gray-600">
              Receive personalized feedback and suggestions to improve your outfit. Add the perfect ensemble to your cart with confidence.
            </p>
          </div>
        </div>
      </div>
      
      {/* Testimonials */}
      <div className="mt-12 bg-gray-50 rounded-lg p-8">
        <h2 className="text-2xl font-serif font-bold text-center mb-8">What Our Users Say</h2>
        
        <div className="flex overflow-x-auto pb-4 space-x-6">
          <div className="flex-shrink-0 w-80 bg-white p-6 rounded-lg shadow-md">
            <p className="italic text-gray-700 mb-4">
              "The AI suggestions were spot on! I was unsure about my mother-of-the-bride outfit, but the feedback helped me make the perfect choice."
            </p>
            <div className="flex items-center">
              <img 
                src="https://via.placeholder.com/50?text=JD" 
                alt="User"
                className="w-10 h-10 rounded-full mr-3" 
              />
              <div>
                <p className="font-medium">Jane Davis</p>
                <p className="text-sm text-gray-500">Mother of the Bride</p>
              </div>
            </div>
          </div>
          
          <div className="flex-shrink-0 w-80 bg-white p-6 rounded-lg shadow-md">
            <p className="italic text-gray-700 mb-4">
              "As a groom, I was clueless about wedding attire. The AI helped me coordinate with our wedding colors and suggested perfect accessories."
            </p>
            <div className="flex items-center">
              <img 
                src="https://via.placeholder.com/50?text=MS" 
                alt="User"
                className="w-10 h-10 rounded-full mr-3" 
              />
              <div>
                <p className="font-medium">Michael Smith</p>
                <p className="text-sm text-gray-500">Groom</p>
              </div>
            </div>
          </div>
          
          <div className="flex-shrink-0 w-80 bg-white p-6 rounded-lg shadow-md">
            <p className="italic text-gray-700 mb-4">
              "I was able to coordinate outfits for all six bridesmaids using the AI advisor. Everyone looked cohesive yet unique. Absolutely amazing!"
            </p>
            <div className="flex items-center">
              <img 
                src="https://via.placeholder.com/50?text=AR" 
                alt="User"
                className="w-10 h-10 rounded-full mr-3" 
              />
              <div>
                <p className="font-medium">Amanda Reynolds</p>
                <p className="text-sm text-gray-500">Bride</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiFeedback;