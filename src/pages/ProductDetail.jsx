import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { products } from '../data/products';
import { StarIcon, HeartIcon } from '@heroicons/react/24/solid';
import { useCart } from '../contexts/CartContext';
import { useToast } from '../contexts/ToastContext';

const reviewsMock = [
	{
		id: 1,
		user: 'Priya Sharma',
		rating: 5,
		comment:
			'Absolutely loved this dress! The quality is amazing and it fit perfectly.',
		date: '2025-05-10',
	},
	{
		id: 2,
		user: 'Amit Verma',
		rating: 4,
		comment:
			'Great tuxedo, very comfortable and stylish. Would recommend!',
		date: '2025-04-22',
	},
];

const ProductDetail = () => {
	const { productId } = useParams();
	const [product, setProduct] = useState(null);
	const [related, setRelated] = useState([]);
	const [reviews, setReviews] = useState(reviewsMock);
	const [isLoading, setIsLoading] = useState(true);
	const [selectedColor, setSelectedColor] = useState('');
	const [selectedSize, setSelectedSize] = useState('');
	const [isWishlisted, setIsWishlisted] = useState(() => {
		const wishlist = JSON.parse(localStorage.getItem('avarista_wishlist')) || [];
		return wishlist.some(item => item.id.toString() === productId);
	});
	const { addToCart } = useCart();
	const { addToast } = useToast();

	useEffect(() => {
		const prod = products.find((p) => p.id.toString() === productId);
		setProduct(prod);
		setRelated(
			products
				.filter(
					(p) => p.category === prod?.category && p.id !== prod.id
				)
				.slice(0, 4)
		);
		setIsLoading(false);
	}, [productId]);

	if (isLoading) {
		return (
			<div className="flex justify-center items-center h-96">
				<div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600"></div>
			</div>
		);
	}
	if (!product) {
		return (
			<div className="container-padded py-12 text-center">
				<h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
				<Link to="/stores" className="btn-primary">
					Back to Stores
				</Link>
			</div>
		);
	}

	return (
		<main className="container-padded py-14 bg-neutral-50 min-h-screen">
			<div className="flex flex-col md:flex-row gap-16">
				{/* Product Image */}
				<div className="md:w-1/2 flex items-center justify-center bg-white rounded-3xl shadow-card p-10">
					<img
						src={product.image}
						alt={product.name}
						className="w-full max-w-sm rounded-2xl object-contain drop-shadow-xl"
					/>
				</div>
				{/* Product Info */}
				<div className="md:w-1/2 flex flex-col justify-center gap-6">
					<h1 className="text-4xl font-bold mb-2 text-neutral-900 leading-tight">
						{product.name}
					</h1>
					<div className="flex items-center gap-6 mb-2">
						<span className="text-3xl font-bold text-primary-700">
							₹{product.price}
						</span>
						<div className="flex items-center gap-1">
							{[1, 2, 3, 4, 5].map((i) => (
								<StarIcon
									key={i}
									className={`h-5 w-5 ${i <= 4 ? 'text-yellow-400' : 'text-neutral-300'}`}
								/>
							))}
							<span className="ml-2 text-base text-neutral-600">
								(4.0)
							</span>
						</div>
					</div>
					<p className="text-lg text-neutral-700 mb-2 leading-relaxed">
						{product.description}
					</p>
					{/* Color Selector */}
					{product.colors && product.colors.length > 0 && (
						<div className="mb-2">
							<h3 className="font-semibold mb-2">Select Color</h3>
							<div className="flex gap-2 flex-wrap">
								{product.colors.map((color) => (
									<button
										type="button"
										key={color}
										className={`px-3 py-1 rounded-full border text-xs font-medium transition-colors ${selectedColor === color ? 'bg-primary-600 text-white border-primary-600' : 'bg-neutral-100 text-neutral-700 border-neutral-200'}`}
										onClick={() => setSelectedColor(color)}
									>
										{color}
									</button>
								))}
							</div>
						</div>
					)}
					{/* Size Selector */}
					{product.sizes && product.sizes.length > 0 && (
						<div>
							<h3 className="font-semibold mb-2">Select Size</h3>
							<div className="flex gap-2 flex-wrap">
								{product.sizes.map((size) => (
									<button
										type="button"
										key={size}
										className={`px-3 py-1 rounded-full border text-xs font-medium transition-colors ${selectedSize === size ? 'bg-primary-600 text-white border-primary-600' : 'bg-neutral-100 text-neutral-700 border-neutral-200'}`}
										onClick={() => setSelectedSize(size)}
									>
										{size}
									</button>
								))}
							</div>
						</div>
					)}
					<div className="flex gap-3 mb-4 mt-4">
						<button
							disabled={!selectedSize}
							className={`btn-primary px-8 py-3 rounded-full text-lg shadow ${!selectedSize ? 'opacity-50 cursor-not-allowed' : ''}`}
							onClick={() => {
								if (!selectedSize) return;
								addToCart({ ...product, size: selectedSize, color: selectedColor });
								addToast(`${product.name} added to cart!`);
							}}
						>
							Add to Cart
						</button>
						<button
							onClick={() => {
								let wishlist = JSON.parse(localStorage.getItem('avarista_wishlist')) || [];
								wishlist = wishlist.filter(item => item.id !== product.id);
								let updated;
								if (isWishlisted) {
									updated = wishlist;
									addToast(`${product.name} removed from wishlist`);
								} else {
									updated = [...wishlist, { ...product }];
									addToast(`${product.name} added to wishlist`);
								}
								localStorage.setItem('avarista_wishlist', JSON.stringify(updated));
								setIsWishlisted(!isWishlisted);
							}}
							className={`btn-outline px-8 py-3 rounded-full flex items-center gap-2 text-lg ${isWishlisted ? 'bg-accent-50 border-accent-500 text-accent-600' : ''}`}
						>
							<HeartIcon className={`h-5 w-5 ${isWishlisted ? 'text-accent-500' : 'text-neutral-400'}`} />
							{isWishlisted ? 'Wishlisted' : 'Wishlist'}
						</button>
					</div>
					<div className="mb-2">
						<h3 className="font-semibold mb-2">Available Colors</h3>
						<div className="flex gap-2 flex-wrap">
							{product.colors.map((color) => (
								<span
									key={color}
									className="px-3 py-1 rounded-full bg-neutral-100 text-neutral-700 text-xs font-medium border border-neutral-200"
								>
									{color}
								</span>
							))}
						</div>
					</div>
					<div>
						<h3 className="font-semibold mb-2">Available Sizes</h3>
						<div className="flex gap-2 flex-wrap">
							{product.sizes.map((size) => (
								<span
									key={size}
									className="px-3 py-1 rounded-full bg-neutral-100 text-neutral-700 text-xs font-medium border border-neutral-200"
								>
									{size}
								</span>
							))}
						</div>
					</div>
				</div>
			</div>
			{/* Reviews */}
			<section className="mt-20">
				<h2 className="text-2xl font-bold mb-6 text-neutral-900">
					Customer Reviews
				</h2>
				<div className="space-y-6">
					{reviews.map((r) => (
						<div key={r.id} className="bg-white rounded-2xl shadow-card p-6 flex flex-col md:flex-row gap-6 items-start">
							<img src={`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(r.user)}`} alt={r.user} className="w-14 h-14 rounded-full border-2 border-primary-100 shadow mr-4" />
							<div className="flex-1">
								<div className="flex items-center mb-1">
									<span className="font-semibold text-neutral-900 mr-2">
										{r.user}
									</span>
									<span className="text-xs text-neutral-500">
										{r.date}
									</span>
									<div className="flex ml-3">
										{[1, 2, 3, 4, 5].map((i) => (
											<StarIcon
												key={i}
												className={`h-4 w-4 ${
													i <= r.rating
														? 'text-yellow-400'
														: 'text-neutral-300'
												}`}
											/>
										))}
									</div>
								</div>
								<p className="text-neutral-700 text-base mt-1">
									{r.comment}
								</p>
							</div>
						</div>
					))}
				</div>
				{/* Add Review Form */}
				<div className="mt-10 bg-neutral-100 rounded-2xl p-6 max-w-xl mx-auto">
					<h3 className="text-lg font-semibold mb-2">Leave a Review</h3>
					<form className="flex flex-col gap-3" onSubmit={e => {
						e.preventDefault();
						const form = e.target;
						const user = form.user.value.trim() || 'Anonymous';
						const rating = Number(form.rating.value);
						const comment = form.comment.value.trim();
						if (!comment) return;
						const newReview = {
							id: Date.now(),
							user,
							rating,
							comment,
							date: new Date().toISOString().slice(0, 10)
						};
						setReviews(prev => [newReview, ...prev]);
						form.reset();
					}}>
						<div className="flex gap-3 items-center">
							<input name="user" placeholder="Your Name (optional)" className="input flex-1" />
							<select name="rating" className="input w-28" defaultValue={5}>
								{[5,4,3,2,1].map(r => <option key={r} value={r}>{r} Stars</option>)}
							</select>
						</div>
						<textarea name="comment" required placeholder="Write your review..." className="input min-h-[60px]" />
						<button type="submit" className="btn-primary w-full mt-2">Submit Review</button>
					</form>
				</div>
			</section>
			{/* Related Products */}
			<section className="mt-20">
				<h2 className="text-xl font-bold mb-6 text-neutral-900">
					Related Products
				</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
					{related.map((prod) => (
						<Link
							key={prod.id}
							to={`/product/${prod.id}`}
							className="card p-4 flex flex-col items-center hover:shadow-xl transition-shadow"
						>
							<img
								src={prod.image}
								alt={prod.name}
								className="w-32 h-40 object-contain mb-3 rounded-xl bg-neutral-100"
							/>
							<div className="font-semibold text-neutral-900 mb-1">
								{prod.name}
							</div>
							<div className="text-sm text-neutral-500 mb-1">
								{prod.category}
							</div>
							<div className="text-lg font-bold text-primary-700">
								₹{prod.price}
							</div>
						</Link>
					))}
				</div>
			</section>
		</main>
	);
};

export default ProductDetail;
