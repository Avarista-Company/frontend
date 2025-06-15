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
    if (onFilterChange) {
      onFilterChange(resetFilters);
    }
  };

  return (
    <aside className="bg-white rounded-xl shadow-lg p-6 mb-8 w-full max-w-xs">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-neutral-900">Filters</h3>
        <button onClick={clearFilters} className="text-primary-600 hover:underline text-sm font-medium">Clear</button>
      </div>
      <div className="mb-6">
        <h4 className="font-semibold text-neutral-800 mb-2">Gender</h4>
        <div className="flex flex-col gap-2">
          {['Men', 'Women', 'Unisex'].map(option => (
            <label key={option} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.gender.includes(option)}
                onChange={() => handleCheckboxChange('gender', option)}
                className="accent-primary-600 rounded focus:ring-primary-400"
              />
              <span className="text-neutral-700">{option}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="mb-6">
        <h4 className="font-semibold text-neutral-800 mb-2">Price</h4>
        <div className="flex flex-col gap-2">
          {['Under $50', '$50-$100', '$100-$200', 'Above $200'].map(option => (
            <label key={option} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="price"
                checked={filters.price === option}
                onChange={() => handleRadioChange('price', option)}
                className="accent-primary-600 rounded focus:ring-primary-400"
              />
              <span className="text-neutral-700">{option}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="mb-2">
        <h4 className="font-semibold text-neutral-800 mb-2">Occasion</h4>
        <div className="flex flex-col gap-2">
          {['Wedding', 'Party', 'Casual', 'Festive'].map(option => (
            <label key={option} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.occasion.includes(option)}
                onChange={() => handleCheckboxChange('occasion', option)}
                className="accent-primary-600 rounded focus:ring-primary-400"
              />
              <span className="text-neutral-700">{option}</span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default FilterSidebar;