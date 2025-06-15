import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import StoreCard from '../components/ui/StoreCard';
import FilterSidebar from '../components/ui/FilterSidebar';
import { stores as allStores } from '../data/stores';
import { MagnifyingGlassIcon, AdjustmentsHorizontalIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

const sortOptions = [
  { label: 'Best Match', value: 'best' },
  { label: 'Rating: High to Low', value: 'rating' },
  { label: 'Distance: Near to Far', value: 'distance' },
  { label: 'Name: A-Z', value: 'name' },
];

const StoreExplorer = () => {
  const [stores, setStores] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // desktop sidebar
  const [sortBy, setSortBy] = useState('best');

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

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    // Sorting logic here
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
        <h1 className="text-3xl font-serif font-bold mb-2">Find Stores Near You</h1>
        <p className="text-lg text-gray-600">
          Discover local stores specializing in fashion for every occasion.
        </p>
      </div>
      {/* Search, Sort, and Filter Controls */}
      <div className="flex flex-col md:flex-row items-center mb-8 gap-4">
        <div className="w-full md:w-auto flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search for stores, specialties..."
            className="pl-10 pr-4 py-2 border border-neutral-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary-400"
          />
        </div>
        <div className="w-full md:w-auto flex items-center gap-2">
          <label htmlFor="sortBy" className="text-sm font-medium text-neutral-700 mr-2">Sort By:</label>
          <select
            id="sortBy"
            value={sortBy}
            onChange={handleSortChange}
            className="border border-neutral-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-400"
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
        <button
          onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
          className="flex items-center px-4 py-2 bg-neutral-100 rounded-lg md:hidden"
        >
          <AdjustmentsHorizontalIcon className="h-5 w-5 mr-2" />
          Filters
        </button>
      </div>
      <div className="flex flex-col md:flex-row">
        {/* Collapsible Sidebar Filters - Desktop */}
        <div className="hidden md:block md:w-1/4 lg:w-1/5 pr-8">
          <button
            className="mb-4 flex items-center gap-2 text-primary-600 hover:underline focus:outline-none"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <ChevronDownIcon className={`h-5 w-5 transition-transform ${isSidebarOpen ? 'rotate-0' : '-rotate-90'}`} />
            {isSidebarOpen ? 'Hide Filters' : 'Show Filters'}
          </button>
          {isSidebarOpen && <FilterSidebar onFilterChange={handleFilterChange} />}
        </div>
        {/* Sidebar Filters - Mobile Modal */}
        <div className={`fixed inset-0 bg-neutral-900 bg-opacity-60 z-40 md:hidden transition-opacity duration-300 ${
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
                  className="text-neutral-500 hover:text-neutral-700"
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
              <svg className="h-16 w-16 text-neutral-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-lg font-medium text-neutral-900 mb-1">No stores found</h3>
              <p className="text-neutral-500">
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