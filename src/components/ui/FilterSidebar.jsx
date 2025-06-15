import { useState } from 'react';
import { ChevronDownIcon, FunnelIcon, XMarkIcon } from '@heroicons/react/24/outline';

const filterOptions = {
  gender: ['Men', 'Women', 'Unisex'],
  price: ['Under $50', '$50-$100', '$100-$200', 'Above $200'],
  occasion: ['Wedding', 'Party', 'Casual', 'Festive'],
  // Add more categories as needed
};

const FilterAccordion = ({ title, children, open, onClick }) => (
  <div className="mb-4 border-b border-neutral-200">
    <button
      className="w-full flex items-center justify-between py-3 text-lg font-semibold text-primary-900 focus:outline-none"
      onClick={onClick}
      type="button"
    >
      {title}
      <ChevronDownIcon className={`w-5 h-5 ml-2 transition-transform ${open ? 'rotate-180' : ''}`} />
    </button>
    <div className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-96' : 'max-h-0'}`}>{open && children}</div>
  </div>
);

const FilterSidebar = ({ onFilterChange, isMobile = false, onClose }) => {
  const [filters, setFilters] = useState({ gender: [], price: '', occasion: [] });
  const [openSections, setOpenSections] = useState({ gender: true, price: false, occasion: false });

  const handleAccordion = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleCheckboxChange = (category, value) => {
    setFilters((prevFilters) => {
      const updatedCategory = prevFilters[category].includes(value)
        ? prevFilters[category].filter((item) => item !== value)
        : [...prevFilters[category], value];
      const updatedFilters = { ...prevFilters, [category]: updatedCategory };
      onFilterChange && onFilterChange(updatedFilters);
      return updatedFilters;
    });
  };

  const handleRadioChange = (category, value) => {
    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters, [category]: value };
      onFilterChange && onFilterChange(updatedFilters);
      return updatedFilters;
    });
  };

  const clearFilters = () => {
    const resetFilters = { gender: [], price: '', occasion: [] };
    setFilters(resetFilters);
    onFilterChange && onFilterChange(resetFilters);
  };

  // Sidebar container classes
  const sidebarClasses = `bg-white rounded-xl shadow-xl p-6 w-full max-w-xs z-30 ${isMobile ? 'fixed top-0 right-0 h-full transition-transform duration-300' : 'sticky top-24'}`;

  return (
    <aside className={sidebarClasses} style={isMobile ? { transform: 'translateX(0)' } : {}}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-primary-900">Filters</h3>
        <button onClick={clearFilters} className="text-accent-500 hover:text-accent-700 text-sm font-semibold">Clear Filters</button>
        {isMobile && (
          <button onClick={onClose} className="ml-2 p-2 rounded hover:bg-accent-100 text-primary-900"><XMarkIcon className="w-6 h-6" /></button>
        )}
      </div>
      <FilterAccordion title="Gender" open={openSections.gender} onClick={() => handleAccordion('gender')}>
        <div className="flex flex-col gap-2 pb-4">
          {filterOptions.gender.map((option) => (
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
      </FilterAccordion>
      <FilterAccordion title="Price" open={openSections.price} onClick={() => handleAccordion('price')}>
        <div className="flex flex-col gap-2 pb-4">
          {filterOptions.price.map((option) => (
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
      </FilterAccordion>
      <FilterAccordion title="Occasion" open={openSections.occasion} onClick={() => handleAccordion('occasion')}>
        <div className="flex flex-col gap-2 pb-4">
          {filterOptions.occasion.map((option) => (
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
      </FilterAccordion>
    </aside>
  );
};

export default FilterSidebar;