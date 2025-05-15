/**
 * Format price with currency symbol
 * @param {number} price - The price to format
 * @param {string} currency - Currency code (default: USD)
 * @returns {string} Formatted price
 */
export const formatPrice = (price, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(price);
};

/**
 * Truncate text to specified length
 * @param {string} text - Text to truncate
 * @param {number} length - Maximum length
 * @returns {string} Truncated text
 */
export const truncateText = (text, length = 100) => {
  if (!text || text.length <= length) return text;
  return `${text.substring(0, length)}...`;
};

/**
 * Calculate distance between two coordinates
 * @param {Object} coord1 - First coordinate { lat, lng }
 * @param {Object} coord2 - Second coordinate { lat, lng }
 * @returns {number} Distance in kilometers
 */
export const calculateDistance = (coord1, coord2) => {
  const R = 6371; // Earth's radius in km
  const dLat = (coord2.lat - coord1.lat) * Math.PI / 180;
  const dLon = (coord2.lng - coord1.lng) * Math.PI / 180;
  
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(coord1.lat * Math.PI / 180) * Math.cos(coord2.lat * Math.PI / 180) * 
          Math.sin(dLon/2) * Math.sin(dLon/2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

/**
 * Generate AI feedback for an outfit
 * @param {Array} products - Array of selected products
 * @returns {Object} Feedback object
 */
export const generateAIFeedback = (products) => {
  // Mock AI feedback logic
  const totalPrice = products.reduce((sum, p) => sum + p.price, 0);
  const itemCount = products.length;
  
  // Randomize score between 6.5 and 9.8
  const score = Math.round((6.5 + Math.random() * 3.3) * 10) / 10;
  
  let feedback;
  if (score >= 9.0) {
    feedback = "This outfit is perfectly coordinated! The color combinations are harmonious and the style is appropriate for a wedding event.";
  } else if (score >= 8.0) {
    feedback = "Great outfit choice! The pieces complement each other well. Consider accessorizing to elevate the look further.";
  } else if (score >= 7.0) {
    feedback = "Good outfit selection, but there might be some color or style inconsistencies. Consider adjusting one or two pieces.";
  } else {
    feedback = "This outfit needs some reconsideration. The colors clash and the styles don't harmonize well.";
  }
  
  const suggestions = [
    "Consider adding a complementary accessory like a belt or jewelry.",
    "Adjust the color palette to be more cohesive.",
    "The formality levels of the pieces are mismatched. Try a more consistent formality.",
    "For wedding events, this style may be too casual/formal.",
    "These items work well for the specified wedding role."
  ];
  
  // Randomly select 2-3 suggestions
  const selectedSuggestions = suggestions
    .sort(() => 0.5 - Math.random())
    .slice(0, Math.floor(2 + Math.random() * 2));
  
  return {
    score,
    feedback,
    suggestions: selectedSuggestions,
    analytics: {
      totalPrice,
      itemCount,
      styleCoherence: Math.round(score * 10) / 10,
      occasionMatch: Math.round((score - 0.5 + Math.random()) * 10) / 10,
    }
  };
};

/**
 * Generate unique ID
 * @returns {string} Unique ID
 */
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};