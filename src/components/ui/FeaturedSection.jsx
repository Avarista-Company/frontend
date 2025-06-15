import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { products as allProducts } from '../../data/products';

const FeaturedSection = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  
  useEffect(() => {
    // Filter featured products
    const featured = allProducts.filter(product => product.featured);
    setFeaturedProducts(featured);
  }, []);
  
  return (
    <section className="section">
      <h2 className="section-title">Featured Products</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {featuredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedSection;