import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import StoreCard from '../components/ui/StoreCard';
import FilterSidebar from '../components/ui/FilterSidebar';
import { stores as allStores } from '../data/stores';
import { MagnifyingGlassIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';

const StoreExplorer = () => {
  const [stores, setStores] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState({});
  
  useEffect(() => {
    // In a real app, this would fetch from an API
    setStores(allStores);
  }, []);
  
  const handleFilterChange = (filters) => {
    setActiveFilters(filters);
    // In a real app, this would apply the filters to the data
  };
  
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  const filteredStores = stores.filter(store => 
    store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    store.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    store.specialties.some(specialty => 
      specialty.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );
  
  return (
    <div className="container-padded py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold mb-2">Find Wedding Stores Near You</h1>
        <p className="text-lg text-gray-600">
          Discover local stores specializing in wedding attire for your big day.
        </p>
      </div>
      
      {/* Search and Filter Controls */}
      <div className="flex flex-col md:flex-row items-center mb-8">
        <div className="w-full md:w-auto flex-1 relative mb-4 md:mb-0 md:mr-4">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search for stores, specialties..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
        
        <button
          onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
          className="flex items-center px-4 py-2 bg-gray-100 rounded-md md:hidden"
        >
          <AdjustmentsHorizontalIcon className="h-5 w-5 mr-2" />
          Filters
        </button>
      </div>
      
      <div className="flex flex-col md:flex-row">
        {/* Sidebar Filters - Desktop */}
        <div className="hidden md:block md:w-1/4 lg:w-1/5 pr-8">
          <FilterSidebar onFilterChange={handleFilterChange} />
        </div>
        
        {/* Sidebar Filters - Mobile */}
        <div className={`fixed inset-0 bg-gray-800 bg-opacity-75 z-40 md:hidden transition-opacity duration-300 ${
          isMobileFilterOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}>
          <div className={`fixed right-0 top-0 h-full bg-white w-4/5 max-w-xs z-50 transform transition-transform duration-300 ease-in-out ${
            isMobileFilterOpen ? 'translate-x-0' : 'translate-x-full'
          }`}>
            <div className="p-4">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-medium">Filters</h3>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <FilterSidebar onFilterChange={handleFilterChange} />
            </div>
          </div>
        </div>
        
        {/* Store Listings */}
        <div className="w-full md:w-3/4 lg:w-4/5">
          {filteredStores.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStores.map(store => (
                <StoreCard key={store.id} store={store} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <svg className="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-1">No stores found</h3>
              <p className="text-gray-500">
                Try adjusting your search or filters to find what you're looking for.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoreExplorer;