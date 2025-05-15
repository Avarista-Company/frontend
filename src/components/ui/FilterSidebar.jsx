import { useState } from 'react';

const FilterSidebar = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    gender: [],
    price: '',
    occasion: [],
  });
  
  const handleCheckboxChange = (category, value) => {
    setFilters(prevFilters => {
      const updatedCategory = prevFilters[category].includes(value)
        ? prevFilters[category].filter(item => item !== value)
        : [...prevFilters[category], value];
      
      const updatedFilters = {
        ...prevFilters,
        [category]: updatedCategory
      };
      
      // Call parent callback
      if (onFilterChange) {
        onFilterChange(updatedFilters);
      }
      
      return updatedFilters;
    });
  };
  
  const handleRadioChange = (category, value) => {
    setFilters(prevFilters => {
      const updatedFilters = {
        ...prevFilters,
        [category]: value
      };
      
      // Call parent callback
      if (onFilterChange) {
        onFilterChange(updatedFilters);
      }
      
      return updatedFilters;
    });
  };
  
  const clearFilters = () => {
    const resetFilters = {
      gender: [],
      price: '',
      occasion: [],
    };
    
    setFilters(resetFilters);
    
    // Call parent callback
    if (onFilterChange) {
      onFilterChange(resetFilters);
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">Filters</h3>
        <button
          onClick={clearFilters}
          className="text-sm text-primary-600 hover:text-primary-800"
        >
          Clear All
        </button>
      </div>
      
      {/* Gender Filter */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold mb-2">Gender</h4>
        <div className="space-y-2">
          {['Men', 'Women', 'Boys', 'Girls', 'Unisex'].map(gender => (
            <label key={gender} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.gender.includes(gender)}
                onChange={() => handleCheckboxChange('gender', gender)}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500 mr-2"
              />
              <span className="text-sm text-gray-700">{gender}</span>
            </label>
          ))}
        </div>
      </div>
      
      {/* Price Filter */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold mb-2">Price Range</h4>
        <div className="space-y-2">
          {[
            { label: 'Under $100', value: 'under-100' },
            { label: '$100 - $300', value: '100-300' },
            { label: '$300 - $500', value: '300-500' },
            { label: '$500 - $1000', value: '500-1000' },
            { label: 'Over $1000', value: 'over-1000' },
          ].map(option => (
            <label key={option.value} className="flex items-center">
              <input
                type="radio"
                name="priceRange"
                checked={filters.price === option.value}
                onChange={() => handleRadioChange('price', option.value)}
                className="border-gray-300 text-primary-600 focus:ring-primary-500 mr-2"
              />
              <span className="text-sm text-gray-700">{option.label}</span>
            </label>
          ))}
        </div>
      </div>
      
      {/* Occasion Filter */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold mb-2">Occasion</h4>
        <div className="space-y-2">
          {[
            'Wedding',
            'Rehearsal Dinner',
            'Engagement Party',
            'Bridal Shower',
            'Reception',
            'Formal',
            'Casual'
          ].map(occasion => (
            <label key={occasion} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.occasion.includes(occasion)}
                onChange={() => handleCheckboxChange('occasion', occasion)}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500 mr-2"
              />
              <span className="text-sm text-gray-700">{occasion}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;