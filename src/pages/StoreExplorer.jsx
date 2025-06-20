import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import StoreCard from '../components/ui/StoreCard';
import FilterSidebar from '../components/ui/FilterSidebar';
import { stores as allStores } from '../data/stores';
import { products as allProducts } from '../data/products';
import { MagnifyingGlassIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';
import { Spinner, Skeleton } from '../components/common/Loading';
import StoreMap from './StoreMap';

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
  const [sortBy, setSortBy] = useState('best');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef();

  useEffect(() => {
    setStores(allStores);
  }, []);

  useEffect(() => {
    if (searchTerm.length > 0) {
      const productMatches = allProducts.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      ).map(p => ({ type: 'product', label: p.name, id: p.id }));
      const categoryMatches = Array.from(new Set(allProducts.map(p => p.category)))
        .filter(cat => cat.toLowerCase().includes(searchTerm.toLowerCase()))
        .map(cat => ({ type: 'category', label: cat }));
      setSuggestions([...productMatches, ...categoryMatches]);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
    setHighlightedIndex(-1);
  }, [searchTerm]);

  const handleFilterChange = (filters) => setActiveFilters(filters);
  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const handleSortChange = (e) => setSortBy(e.target.value);
  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion.label);
    setShowSuggestions(false);
    if (suggestion.type === 'product') {
      window.location.href = `/product/${suggestion.id}`;
    }
  };
  const handleKeyDown = (e) => {
    if (!showSuggestions) return;
    if (e.key === 'ArrowDown') {
      setHighlightedIndex(i => Math.min(i + 1, suggestions.length - 1));
    } else if (e.key === 'ArrowUp') {
      setHighlightedIndex(i => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && highlightedIndex >= 0) {
      handleSuggestionClick(suggestions[highlightedIndex]);
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  const filteredStores = stores.filter(store =>
    store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    store.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    store.specialties.some(specialty =>
      specialty.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  if (stores.length === 0) {
    return <Spinner className="h-96" />;
  }

  return (
    <main className="w-full min-h-screen bg-white flex flex-col items-center">
      <section className="w-full max-w-7xl mx-auto px-2 py-5">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-neutral-900 text-center">Explore Local Stores</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 mb-8">
          <div className="w-full md:w-1/2 relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
            <input
              ref={inputRef}
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              onFocus={() => setShowSuggestions(suggestions.length > 0)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
              onKeyDown={handleKeyDown}
              placeholder="Search for stores, products, categories..."
              className="pl-10 pr-4 py-2 border border-neutral-200 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-primary-400 bg-neutral-50"
              autoComplete="off"
            />
            {showSuggestions && suggestions.length > 0 && (
              <ul className="absolute z-20 left-0 right-0 bg-white border border-neutral-200 rounded shadow-lg mt-1 max-h-60 overflow-y-auto">
                {suggestions.map((s, i) => (
                  <li
                    key={s.type + s.label + s.id}
                    className={`px-4 py-2 cursor-pointer flex items-center gap-2 ${highlightedIndex === i ? 'bg-primary-50 text-primary-700' : ''}`}
                    onMouseDown={() => handleSuggestionClick(s)}
                    onMouseEnter={() => setHighlightedIndex(i)}
                  >
                    <span className="font-semibold text-primary-600">
                      {s.type === 'product' ? 'Product:' : 'Category:'}
                    </span>
                    <span>{s.label}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="w-full md:w-auto flex items-center gap-2">
            <label htmlFor="sortBy" className="text-sm font-medium text-neutral-700 mr-2">Sort By:</label>
            <select
              id="sortBy"
              value={sortBy}
              onChange={handleSortChange}
              className="input w-40"
            >
              {sortOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <button
              className="md:hidden btn-outline px-3 py-2 flex items-center gap-2"
              onClick={() => setIsMobileFilterOpen(true)}
            >
              <AdjustmentsHorizontalIcon className="h-5 w-5" /> Filters
            </button>
          </div>
        </div>
        {/* Map-based store discovery */}
        <div className="mb-12">
          <StoreMap />
        </div>
        {/* Store Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredStores.length > 0 ? (
            filteredStores.map(store => (
              <StoreCard key={store.id} store={store} />
            ))
          ) : (
            [...Array(8)].map((_, i) => (
              <div key={i} className="card p-4">
                <Skeleton height="h-48" />
                <Skeleton height="h-6" className="mt-4 w-3/4" />
                <Skeleton height="h-4" className="mt-2 w-1/2" />
              </div>
            ))
          )}
        </div>
      </section>
    </main>
  );
};

export default StoreExplorer;