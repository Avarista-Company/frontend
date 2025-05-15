import { useState, useEffect } from 'react';
import { useToast } from '../contexts/ToastContext';
import { products } from '../data/products';
import { AR_VR_MODELS } from '../utils/constants';

const TryOn = () => {
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const { addToast } = useToast();
  
  useEffect(() => {
    // In a real app, this would fetch from an API
    setAllProducts(products);
  }, []);
  
  const handleModelSelect = (model) => {
    setSelectedModel(model);
    setIsLoading(true);
    
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };
  
  const handleProductSelect = (e) => {
    const productId = parseInt(e.target.value);
    if (productId) {
      const product = allProducts.find(p => p.id === productId);
      setSelectedProduct(product);
      setIsLoading(true);
      
      // Simulate loading
      setTimeout(() => {
        setIsLoading(false);
        addToast('Virtual try-on complete!', 'success');
      }, 1500);
    } else {
      setSelectedProduct(null);
    }
  };
  
  return (
    <div className="container-padded py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-serif font-bold mb-2">Virtual Try-On Experience</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          See how clothing items will look before making a purchase. Select a model and choose an outfit to visualize it in AR/VR.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Model Selection */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-medium mb-4">Select a Model</h2>
          <div className="grid grid-cols-2 gap-4">
            {AR_VR_MODELS.map((model) => (
              <div 
                key={model.id}
                onClick={() => handleModelSelect(model)}
                className={`cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                  selectedModel?.id === model.id
                    ? 'border-primary-600 shadow-md scale-105'
                    : 'border-transparent hover:border-gray-300'
                }`}
              >
                <img 
                  src={model.image} 
                  alt={model.name}
                  className="w-full h-48 object-cover" 
                />
                <div className="p-2 text-center">
                  <p className="font-medium">{model.name}</p>
                </div>
              </div>
            ))}
          </div>
          
          {selectedModel && (
            <div className="mt-6">
              <h3 className="font-medium mb-2">Selected: {selectedModel.name}</h3>
              
              <div className="mb-4">
                <label htmlFor="product" className="block text-sm font-medium text-gray-700 mb-1">
                  Choose an Outfit
                </label>
                <select
                  id="product"
                  value={selectedProduct?.id || ''}
                  onChange={handleProductSelect}
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">Select an outfit</option>
                  {allProducts
                    .filter(p => p.gender.toLowerCase().includes(selectedModel.gender.toLowerCase()))
                    .map(product => (
                      <option key={product.id} value={product.id}>
                        {product.name} - ${product.price.toFixed(2)}
                      </option>
                    ))
                  }
                </select>
              </div>
              
              {selectedProduct && (
                <div className="p-4 bg-gray-50 rounded-md">
                  <h4 className="font-medium mb-2">{selectedProduct.name}</h4>
                  <p className="text-sm text-gray-600 mb-2">{selectedProduct.description}</p>
                  <p className="font-medium text-primary-600">${selectedProduct.price.toFixed(2)}</p>
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* AR/VR Viewer */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6 h-full">
            <h2 className="text-xl font-medium mb-4">AR/VR Viewer</h2>
            
            {isLoading ? (
              <div className="flex flex-col items-center justify-center h-96">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600 mb-4"></div>
                <p className="text-gray-600">Loading AR/VR experience...</p>
              </div>
            ) : selectedModel && selectedProduct ? (
              <div className="flex flex-col h-full">
                <div className="relative flex-grow bg-gray-100 rounded-lg overflow-hidden">
                  {/* Simulated AR/VR view */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img 
                      src={selectedModel.image} 
                      alt="AR/VR Preview"
                      className="h-full object-contain" 
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <img 
                        src={selectedProduct.image}
                        alt={selectedProduct.name}
                        className="h-3/4 object-contain opacity-90 rounded-lg"
                      />
                    </div>
                  </div>
                  
                  {/* AR/VR Controls (placeholders) */}
                  <div className="absolute bottom-4 left-4 right-4 flex justify-center space-x-4">
                    <button className="p-2 bg-white rounded-full shadow">
                      <svg className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                    
                    <button className="p-2 bg-white rounded-full shadow">
                      <svg className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    </button>
                    
                    <button className="p-2 bg-white rounded-full shadow">
                      <svg className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </button>
                    
                    <button className="p-2 bg-white rounded-full shadow">
                      <svg className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <button className="btn-primary py-3">
                    Add to Cart
                  </button>
                  <button className="btn-outline py-3">
                    Try Another Item
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-96 text-center">
                <svg className="h-16 w-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-2">AR/VR Experience</h3>
                <p className="text-gray-600 max-w-md">
                  Select a model and an outfit from the panel on the left to see how the clothes will look in our virtual try-on experience.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Additional Features */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mb-4">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium mb-2">Upload Your Photo</h3>
          <p className="text-gray-600 mb-4">
            For a more personalized experience, upload your own photo to see how the outfits look on you.
          </p>
          <button className="btn-outline w-full">
            Upload Photo
          </button>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="w-12 h-12 bg-secondary-100 text-secondary-600 rounded-full flex items-center justify-center mb-4">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium mb-2">Mix & Match</h3>
          <p className="text-gray-600 mb-4">
            Combine different items to create complete outfits. See how various pieces work together.
          </p>
          <button className="btn-outline w-full">
            Open Outfit Builder
          </button>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="w-12 h-12 bg-accent-100 text-accent-600 rounded-full flex items-center justify-center mb-4">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium mb-2">Share with Family</h3>
          <p className="text-gray-600 mb-4">
            Share your virtual try-on with family members to get their feedback and opinions.
          </p>
          <button className="btn-outline w-full">
            Share Experience
          </button>
        </div>
      </div>
    </div>
  );
};

export default TryOn;