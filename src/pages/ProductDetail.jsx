import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { products } from '../data/products';
import { StarIcon, HeartIcon } from '@heroicons/react/24/solid';

const reviewsMock = [
  {
    id: 1,
    user: 'Priya Sharma',
    rating: 5,
    comment: 'Absolutely loved this dress! The quality is amazing and it fit perfectly.',
    date: '2025-05-10',
  },
  {
    id: 2,
    user: 'Amit Verma',
    rating: 4,
    comment: 'Great tuxedo, very comfortable and stylish. Would recommend!',
    date: '2025-04-22',
  },
];

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [reviews, setReviews] = useState(reviewsMock);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const prod = products.find(p => p.id.toString() === productId);
    setProduct(prod);
    setRelated(products.filter(p => p.category === prod?.category && p.id !== prod.id).slice(0, 4));
    setIsLoading(false);
  }, [productId]);

  if (isLoading) {
    return <div className="flex justify-center items-center h-96"><div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600"></div></div>;
  }
  if (!product) {
    return <div className="container-padded py-12 text-center"><h2 className="text-2xl font-serif font-bold mb-4">Product Not Found</h2><Link to="/stores" className="btn-primary">Back to Stores</Link></div>;
  }

  return (
    <div className="container-padded py-10">
      <div className="flex flex-col md:flex-row gap-10">
        <div className="md:w-1/2">
          <img src={product.image.replace('via.placeholder.com/400x600', 'images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80')} alt={product.name} className="w-full rounded-xl shadow-lg object-cover" />
        </div>
        <div className="md:w-1/2">
          <h1 className="text-3xl font-serif font-bold mb-2">{product.name}</h1>
          <div className="flex items-center mb-3">
            <span className="text-xl font-bold text-primary-700 mr-4">${product.price.toFixed(2)}</span>
            <div className="flex items-center">
              {[1,2,3,4,5].map(i => <StarIcon key={i} className={`h-5 w-5 ${i <= 4 ? 'text-yellow-400' : 'text-neutral-300'}`} />)}
              <span className="ml-2 text-sm text-neutral-600">(4.0)</span>
            </div>
          </div>
          <p className="mb-4 text-neutral-700">{product.description}</p>
          <button className="btn-primary mb-4">Add to Cart</button>
          <button className="btn-outline ml-2 mb-4"><HeartIcon className="h-5 w-5 mr-1 text-accent-500 inline" />Wishlist</button>
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Available Colors</h3>
            <div className="flex gap-2">{product.colors.map(color => <span key={color} className="px-3 py-1 rounded-full bg-neutral-100 text-neutral-700 text-xs font-medium">{color}</span>)}</div>
          </div>
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Available Sizes</h3>
            <div className="flex gap-2">{product.sizes.map(size => <span key={size} className="px-3 py-1 rounded-full bg-neutral-100 text-neutral-700 text-xs font-medium">{size}</span>)}</div>
          </div>
        </div>
      </div>
      {/* Reviews */}
      <div className="mt-12">
        <h2 className="text-2xl font-serif font-bold mb-4">Customer Reviews</h2>
        <div className="space-y-4">
          {reviews.map(r => (
            <div key={r.id} className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center mb-2">
                <span className="font-semibold text-neutral-900 mr-2">{r.user}</span>
                <span className="text-xs text-neutral-500">{r.date}</span>
                <div className="flex ml-3">
                  {[1,2,3,4,5].map(i => <StarIcon key={i} className={`h-4 w-4 ${i <= r.rating ? 'text-yellow-400' : 'text-neutral-300'}`} />)}
                </div>
              </div>
              <p className="text-neutral-700">{r.comment}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Related Products */}
      <div className="mt-16">
        <h2 className="text-2xl font-serif font-bold mb-4">Related Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {related.map(prod => (
            <Link key={prod.id} to={`/product/${prod.id}`} className="card group hover:-translate-y-1">
              <img src={prod.image.replace('via.placeholder.com/400x600', 'images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80')} alt={prod.name} className="w-full h-48 object-cover rounded-t-xl" />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-neutral-900 mb-1 line-clamp-1">{prod.name}</h3>
                <span className="text-primary-700 font-bold">${prod.price.toFixed(2)}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
