import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { StarIcon, MapPinIcon, PhoneIcon, ClockIcon } from '@heroicons/react/24/solid';
import { HeartIcon, ShareIcon } from '@heroicons/react/24/outline';
import ProductCard from '../components/ui/ProductCard';
import { stores } from '../data/stores';
import { products } from '../data/products';

const StoreDetail = () => {
  const { storeId } = useParams();
  const [store, setStore] = useState(null);
  const [storeProducts, setStoreProducts] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storeData = stores.find(s => s.id.toString() === storeId);
    const filteredProducts = products.filter(p => p.storeId?.toString() === storeId);
    setTimeout(() => {
      setStore(storeData);
      setStoreProducts(filteredProducts);
      setIsLoading(false);
    }, 500);
  }, [storeId]);

  const filterProducts = (category) => setActiveTab(category);
  const filteredProducts = activeTab === 'all'
    ? storeProducts
    : storeProducts.filter(p => p.category.toLowerCase() === activeTab.toLowerCase());

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600"></div>
      </div>
    );
  }
  if (!store) {
    return (
      <div className="container-padded py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Store Not Found</h2>
        <p className="text-neutral-500 mb-6">The store you're looking for doesn't exist or has been removed.</p>
        <Link to="/stores" className="btn-primary">Back to Stores</Link>
      </div>
    );
  }

  return (
    <main className="bg-neutral-50 min-h-screen">
      {/* Store Hero/Header */}
      <section className="relative h-64 md:h-96 bg-neutral-100 flex items-end rounded-b-3xl overflow-hidden shadow-sm">
        <img src={store.image} alt={store.name} className="absolute inset-0 w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 pb-8 flex flex-col gap-4">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow mb-2">{store.name}</h1>
              <div className="flex flex-wrap items-center gap-4 text-white/90 text-sm">
                <span className="flex items-center gap-1"><StarIcon className="h-5 w-5 text-yellow-400" /><span className="font-medium">{store.rating.toFixed(1)}</span></span>
                <span className="flex items-center gap-1"><MapPinIcon className="h-5 w-5" /><span>{store.address}</span></span>
                <span className="flex items-center gap-1"><PhoneIcon className="h-5 w-5" /><span>Contact</span></span>
                <span className="flex items-center gap-1"><ShareIcon className="h-5 w-5" /><span>Share</span></span>
              </div>
            </div>
            <div className="flex gap-2 mt-2 md:mt-0">
              <button className="btn-primary px-6 py-2 rounded-full shadow-sm">Follow</button>
              <button className="btn-outline px-6 py-2 rounded-full">Message</button>
            </div>
          </div>
        </div>
      </section>
      {/* Store Info & Products */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <div className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div>
            <div className="flex flex-wrap gap-2 mb-3">
              {store.specialties.map((specialty, i) => (
                <span key={i} className="text-xs bg-neutral-100 text-neutral-700 px-3 py-1 rounded-full border border-neutral-200">{specialty}</span>
              ))}
            </div>
            <p className="text-neutral-600 text-lg max-w-2xl mb-2 leading-relaxed">{store.description}</p>
          </div>
        </div>
        {/* Product Tabs */}
        <div className="mb-10 flex gap-2 flex-wrap">
          <button onClick={() => filterProducts('all')} className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${activeTab === 'all' ? 'bg-primary-600 text-white shadow' : 'bg-neutral-100 text-neutral-700 hover:bg-primary-50'}`}>All</button>
          {[...new Set(storeProducts.map(p => p.category))].map(cat => (
            <button key={cat} onClick={() => filterProducts(cat)} className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${activeTab === cat ? 'bg-primary-600 text-white shadow' : 'bg-neutral-100 text-neutral-700 hover:bg-primary-50'}`}>{cat}</button>
          ))}
        </div>
        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => <ProductCard key={product.id} product={product} />)
          ) : (
            <div className="col-span-full text-center text-neutral-400 py-12">No products found in this category.</div>
          )}
        </div>
      </section>
    </main>
  );
};

export default StoreDetail;