import { Link } from 'react-router-dom';
import { MapPinIcon, StarIcon } from '@heroicons/react/24/solid';
import { HeartIcon as HeartIconOutline, HeartIcon as HeartIconSolid } from '@heroicons/react/24/outline';
import { useAuth } from '../../contexts/AuthContext';

const StoreCard = ({ store }) => {
  const { currentUser, likeStore, unlikeStore } = useAuth();
  const isLiked = currentUser?.likedStores?.includes(store.id);
  return (
    <Link
      to={`/stores/${store.id}`}
      className="card group hover:-translate-y-1 focus:ring-2 focus:ring-primary-400 flex flex-col h-full relative"
    >
      <div className="relative w-full aspect-[4/3] overflow-hidden rounded-2xl bg-neutral-100 flex items-center justify-center">
        <img
          src={store.image}
          alt={store.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        {/* Heart icon on hover */}
        {currentUser && (
          <button
            className="absolute top-3 right-3 z-10 bg-white/80 rounded-full p-2 shadow transition-opacity duration-200 opacity-0 group-hover:opacity-100"
            onClick={e => {
              e.preventDefault();
              isLiked ? unlikeStore(store.id) : likeStore(store.id);
            }}
            aria-label={isLiked ? 'Unlike store' : 'Like store'}
          >
            {isLiked ? (
              <HeartIconSolid className="h-6 w-6 text-red-500" />
            ) : (
              <HeartIconOutline className="h-6 w-6 text-neutral-400" />
            )}
          </button>
        )}
      </div>
      <div className="flex-1 flex flex-col p-5 gap-2">
        <h3 className="text-lg font-semibold text-neutral-900 mb-1 line-clamp-1">{store.name}</h3>
        <div className="flex items-center gap-2 text-neutral-500 text-sm mb-1">
          <MapPinIcon className="h-4 w-4 text-neutral-400" />
          <span>{store.distance}</span>
        </div>
        <div className="flex items-center gap-2 mb-2">
          <StarIcon className="h-5 w-5 text-yellow-400" />
          <span className="text-sm font-medium text-neutral-800">{store.rating.toFixed(1)}</span>
        </div>
        <div className="flex flex-wrap gap-2 mt-auto">
          {store.specialties.slice(0, 3).map((specialty, index) => (
            <span
              key={index}
              className="text-xs bg-neutral-100 text-neutral-700 px-3 py-1 rounded-full font-medium border border-neutral-200"
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