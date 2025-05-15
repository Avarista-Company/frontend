import { Link } from 'react-router-dom';
import { MapPinIcon, StarIcon } from '@heroicons/react/24/solid';

const StoreCard = ({ store }) => {
  return (
    <Link to={`/stores/${store.id}`} className="card group hover:-translate-y-1">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={store.image} 
          alt={store.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-900 mb-1">{store.name}</h3>
        
        <div className="flex items-center mb-2">
          <MapPinIcon className="h-4 w-4 text-gray-500 mr-1" />
          <span className="text-sm text-gray-500">{store.distance}</span>
        </div>
        
        <div className="flex items-center mb-3">
          <StarIcon className="h-5 w-5 text-yellow-400 mr-1" />
          <span className="text-sm font-medium">{store.rating.toFixed(1)}</span>
        </div>
        
        <div className="flex flex-wrap gap-1 mt-2">
          {store.specialties.slice(0, 3).map((specialty, index) => (
            <span 
              key={index}
              className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
            >
              {specialty}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default StoreCard;