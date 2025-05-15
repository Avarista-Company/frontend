import { useState, useEffect } from 'react';
import StoreCard from './StoreCard';
import { stores as allStores } from '../../data/stores';

const NearbyStoresSection = () => {
  const [nearbyStores, setNearbyStores] = useState([]);
  
  useEffect(() => {
    // In real app, this would use geolocation to find nearby stores
    // For demo, just use all stores
    setNearbyStores(allStores);
  }, []);
  
  return (
    <section className="section bg-gray-50">
      <h2 className="section-title">Nearby Wedding Stores</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {nearbyStores.map(store => (
          <StoreCard key={store.id} store={store} />
        ))}
      </div>
    </section>
  );
};

export default NearbyStoresSection;