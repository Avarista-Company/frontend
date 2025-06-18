import React, { useState } from 'react';
// If using Google Maps, install @react-google-maps/api. For Mapbox, use react-map-gl.
// This example uses Google Maps. Replace with Mapbox if needed.
import { GoogleMap, Marker, InfoWindow, useLoadScript } from '@react-google-maps/api';
import stores from '../data/stores';
import StoreCard from '../components/ui/StoreCard';

const mapContainerStyle = {
  width: '100%',
  height: '60vh',
  borderRadius: '2rem',
  boxShadow: '0 8px 32px 0 rgba(30,41,59,0.10)'
};
const center = { lat: 28.6139, lng: 77.2090 }; // Example: New Delhi
const options = {
  disableDefaultUI: true,
  zoomControl: true,
  styles: [
    // Custom map style for a clean, premium look
    { elementType: 'geometry', stylers: [{ color: '#f5f5f5' }] },
    { elementType: 'labels.text.fill', stylers: [{ color: '#23272a' }] },
    { elementType: 'labels.text.stroke', stylers: [{ color: '#fff' }] },
    // ...add more for branding
  ]
};

const StoreMap = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'YOUR_GOOGLE_MAPS_API_KEY', // Replace with env var
  });
  const [selectedStore, setSelectedStore] = useState(null);
  const [filter, setFilter] = useState('');

  if (loadError) return <div>Map cannot be loaded</div>;
  if (!isLoaded) return <div>Loading map...</div>;

  // Filter stores by name/category
  const filteredStores = stores.filter(store =>
    store.name.toLowerCase().includes(filter.toLowerCase()) ||
    (store.category && store.category.toLowerCase().includes(filter.toLowerCase()))
  );

  return (
    <div className="w-full max-w-7xl mx-auto my-8">
      {/* Floating Filter/Search Panel */}
      <div className="absolute z-10 left-1/2 -translate-x-1/2 top-6 bg-white/90 rounded-2xl shadow-lg px-6 py-3 flex gap-4 items-center backdrop-blur-md">
        <input
          type="text"
          placeholder="Search stores or category..."
          className="input w-64"
          value={filter}
          onChange={e => setFilter(e.target.value)}
        />
        {/* Add more filters (distance, etc.) here */}
      </div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={12}
        center={center}
        options={options}
      >
        {filteredStores.map(store => (
          <Marker
            key={store.id}
            position={{ lat: store.lat, lng: store.lng }}
            icon={{
              url: '/images/logo.png', // Use your branded pin icon
              scaledSize: { width: 40, height: 40 }
            }}
            onClick={() => setSelectedStore(store)}
          />
        ))}
        {selectedStore && (
          <InfoWindow
            position={{ lat: selectedStore.lat, lng: selectedStore.lng }}
            onCloseClick={() => setSelectedStore(null)}
          >
            <div className="rounded-xl bg-white shadow-lg p-4 w-64">
              <img src={selectedStore.image} alt={selectedStore.name} className="w-full h-28 object-cover rounded-lg mb-2" />
              <div className="font-bold text-lg mb-1">{selectedStore.name}</div>
              <div className="text-sm text-neutral-500 mb-2">{selectedStore.category}</div>
              <button className="btn btn-primary w-full">View Store</button>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
      {/* Bottom Sheet: Horizontal scroll of nearby stores */}
      <div className="fixed bottom-0 left-0 w-full bg-white/95 shadow-2xl rounded-t-3xl px-6 py-4 flex gap-6 overflow-x-auto z-20">
        {filteredStores.slice(0, 8).map(store => (
          <div key={store.id} className="min-w-[260px] max-w-[300px]">
            <StoreCard store={store} onClick={() => setSelectedStore(store)} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoreMap;
