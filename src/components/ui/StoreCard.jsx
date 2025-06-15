import { Link } from 'react-router-dom';
import { MapPinIcon, StarIcon } from '@heroicons/react/24/solid';

const StoreCard = ({ store }) => {
  return (
    <Link to={`/stores/${store.id}`} className="card group hover:-translate-y-2 focus:ring-2 focus:ring-primary-400">
      <div className="relative h-48 overflow-hidden rounded-xl">
        <img 
          src={store.image} 
          alt={store.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-5">
        <h3 className="text-xl font-semibold text-neutral-900 mb-1 line-clamp-1">{store.name}</h3>
        <div className="flex items-center mb-2">
          <MapPinIcon className="h-4 w-4 text-neutral-400 mr-1" />
          <span className="text-sm text-neutral-500">{store.distance}</span>
        </div>
        <div className="flex items-center mb-3">
          <StarIcon className="h-5 w-5 text-yellow-400 mr-1" />
          <span className="text-sm font-medium text-neutral-800">{store.rating.toFixed(1)}</span>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {store.specialties.slice(0, 3).map((specialty, index) => (
            <span 
              key={index}
              className="text-xs bg-neutral-100 text-neutral-700 px-3 py-1 rounded-full font-medium"
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