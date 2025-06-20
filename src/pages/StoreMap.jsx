import React, { useState } from 'react';
// If using Google Maps, install @react-google-maps/api. For Mapbox, use react-map-gl.
// This example uses Google Maps. Replace with Mapbox if needed.
import { GoogleMap, Marker, InfoWindow, useLoadScript } from '@react-google-maps/api';
import stores from '../data/stores';

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
  const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'YOUR_GOOGLE_MAPS_API_KEY';
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });
  const [selectedStore, setSelectedStore] = useState(null);
  if (!import.meta.env.VITE_GOOGLE_MAPS_API_KEY || import.meta.env.VITE_GOOGLE_MAPS_API_KEY === 'YOUR_GOOGLE_MAPS_API_KEY') {
    return <div className="text-red-600 font-bold p-8">Google Maps API key is missing or invalid. Please set VITE_GOOGLE_MAPS_API_KEY in your .env file.</div>;
  }
  if (loadError) return <div>Map cannot be loaded</div>;
  if (!isLoaded) return <div>Loading map...</div>;

  // Use all stores (no filter)
  const filteredStores = stores;

  return (
    <div className="w-full max-w-7xl mx-auto my-8">
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
    </div>
  );
};

export default StoreMap;
