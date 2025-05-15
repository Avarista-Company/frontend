import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { StarIcon, MapPinIcon, PhoneIcon, ClockIcon } from '@heroicons/react/24/solid';
import { HeartIcon, ShareIcon } from '@heroicons/react/24/outline';
import ProductCard from '../components/ui/ProductCard';
import { stores } from '../data/stores';
import { products } from '../data/products';

const StoreDetail = () => {
  const { storeId } = useParams();
  const [store, setStore] = useState(null);
  const [storeProducts, setStoreProducts] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // In a real app, this would fetch from an API
    const storeData = stores.find(s => s.id.toString() === storeId);
    const filteredProducts = products.filter(p => p.storeId.toString() === storeId);
    
    // Simulate API call
    setTimeout(() => {
      setStore(storeData);
      setStoreProducts(filteredProducts);
      setIsLoading(false);
    }, 500);
  }, [storeId]);
  
  const filterProducts = (category) => {
    setActiveTab(category);
  };
  
  const filteredProducts = activeTab === 'all' 
    ? storeProducts 
    : storeProducts.filter(p => p.category.toLowerCase() === activeTab.toLowerCase());
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600"></div>
      </div>
    );
  }
  
  if (!store) {
    return (
      <div className="container-padded py-12 text-center">
        <h2 className="text-2xl font-serif font-bold mb-4">Store Not Found</h2>
        <p className="text-gray-600 mb-6">The store you're looking for doesn't exist or has been removed.</p>
        <Link to="/stores" className="btn-primary">
          Back to Stores
        </Link>
      </div>
    );
  }
  
  return (
    <div>
      {/* Store Header */}
      <div className="relative h-64 md:h-96 bg-gray-200">
        <img 
          src={store.image} 
          alt={store.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="container-padded">
            <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2">{store.name}</h1>
            
            <div className="flex items-center flex-wrap gap-4">
              <div className="flex items-center">
                <StarIcon className="h-5 w-5 text-yellow-400 mr-1" />
                <span className="font-medium">{store.rating.toFixed(1)}</span>
              </div>
              
              <div className="flex items-center">
                <MapPinIcon className="h-5 w-5 mr-1" />
                <span>{store.address}</span>
              </div>
              
              <div className="flex items-center">
                <ClockIcon className="h-5 w-5 mr-1" />
                <span>Open until 8:00 PM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Store Content */}
      <div className="container-padded py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Store Info */}
          <div className="md:w-1/3 lg:w-1/4">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-lg font-medium mb-4">About {store.name}</h3>
              <p className="text-gray-700 mb-4">{store.description}</p>
              
              <h4 className="font-medium text-gray-900 mb-2">Specialties</h4>
              <div className="flex flex-wrap gap-2 mb-4">
                {store.specialties.map((specialty, index) => (
                  <span 
                    key={index}
                    className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
              
              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="flex justify-between">
                  <button className="flex items-center text-gray-700 hover:text-primary-600">
                    <PhoneIcon className="h-5 w-5 mr-2" />
                    <span>Contact</span>
                  </button>
                  
                  <button className="flex items-center text-gray-700 hover:text-primary-600">
                    <ShareIcon className="h-5 w-5 mr-2" />
                    <span>Share</span>
                  </button>
                  
                  <button className="flex items-center text-gray-700 hover:text-accent-600">
                    <HeartIcon className="h-5 w-5 mr-2" />
                    <span>Save</span>
                  </button>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-medium mb-4">Store Hours</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Monday</span>
                  <span className="font-medium">10:00 AM - 8:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tuesday</span>
                  <span className="font-medium">10:00 AM - 8:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Wednesday</span>
                  <span className="font-medium">10:00 AM - 8:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Thursday</span>
                  <span className="font-medium">10:00 AM - 8:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Friday</span>
                  <span className="font-medium">10:00 AM - 9:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Saturday</span>
                  <span className="font-medium">9:00 AM - 9:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sunday</span>
                  <span className="font-medium">11:00 AM - 6:00 PM</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Products */}
          <div className="md:w-2/3 lg:w-3/4">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-serif font-bold">Products</h2>
                
                <div className="flex space-x-2">
                  <button 
                    onClick={() => filterProducts('all')} 
                    className={`px-4 py-2 rounded-md ${
                      activeTab === 'all' 
                        ? 'bg-primary-600 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    All
                  </button>
                  <button 
                    onClick={() => filterProducts('bridal')} 
                    className={`px-4 py-2 rounded-md ${
                      activeTab === 'bridal' 
                        ? 'bg-primary-600 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Bridal
                  </button>
                  <button 
                    onClick={() => filterProducts('groom')} 
                    className={`px-4 py-2 rounded-md ${
                      activeTab === 'groom' 
                        ? 'bg-primary-600 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Groom
                  </button>
                  <button 
                    onClick={() => filterProducts('accessories')} 
                    className={`px-4 py-2 rounded-md ${
                      activeTab === 'accessories' 
                        ? 'bg-primary-600 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Accessories
                  </button>
                </div>
              </div>
            </div>
            
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                <svg className="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-1">No products found</h3>
                <p className="text-gray-500">
                  No products match your current selection.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreDetail;