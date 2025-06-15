import { useRef, useEffect } from 'react';

const testimonials = [
  {
    name: 'Priya Sharma',
    location: 'Delhi',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    rating: 5,
    text: 'The AI suggestions were spot on! Helped us coordinate our suits perfectly with the wedding theme.'
  },
  {
    name: 'Amit Verma',
    location: 'Bangalore',
    avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
    rating: 4,
    text: 'Great tuxedo, very comfortable and stylish. Would recommend!'
  },
  {
    name: 'Sonal Patel',
    location: 'Ahmedabad',
    avatar: '',
    rating: 5,
    text: 'Loved the bridesmaid dresses! The fit and color were perfect for our group.'
  },
  {
    name: 'Rahul Singh',
    location: 'Lucknow',
    avatar: '',
    rating: 4,
    text: 'Quick delivery and excellent customer support. Will shop again.'
  },
  {
    name: 'Meera Joshi',
    location: 'Pune',
    avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
    rating: 5,
    text: 'The virtual try-on made shopping so much easier for my family!'
  },
  {
    name: 'Vikram Rao',
    location: 'Hyderabad',
    avatar: '',
    rating: 5,
    text: 'Amazing quality and great prices. Highly recommended.'
  },
];

const getInitials = (name) => name.split(' ').map(n => n[0]).join('').toUpperCase();

const TestimonialCarousel = () => {
  const carouselRef = useRef(null);
  let intervalRef = useRef(null);

  useEffect(() => {
    const carousel = carouselRef.current;
    let isHovered = false;
    const scroll = () => {
      if (!isHovered && carousel) {
        carousel.scrollLeft += 1;
        if (carousel.scrollLeft >= carousel.scrollWidth / 2) {
          carousel.scrollLeft = 0;
        }
      }
    };
    intervalRef.current = setInterval(scroll, 20);
    carousel.addEventListener('mouseenter', () => { isHovered = true; });
    carousel.addEventListener('mouseleave', () => { isHovered = false; });
    return () => {
      clearInterval(intervalRef.current);
      carousel.removeEventListener('mouseenter', () => { isHovered = true; });
      carousel.removeEventListener('mouseleave', () => { isHovered = false; });
    };
  }, []);

  // Duplicate testimonials for seamless loop
  const items = [...testimonials, ...testimonials];

  return (
    <section className="py-20 bg-accent-50">
      <div className="container-padded mx-auto">
        <h2 className="text-3xl font-bold text-primary-900 mb-8 text-center tracking-tight">What Our Customers Say</h2>
        <div
          ref={carouselRef}
          className="flex gap-6 overflow-x-auto no-scrollbar py-4 px-2 rounded-xl bg-white shadow-card relative"
          style={{scrollBehavior: 'smooth', minHeight: 220}}
        >
          {items.map((review, idx) => (
            <div
              key={idx}
              className="min-w-[320px] max-w-xs bg-white border border-accent-100 rounded-xl shadow-card p-6 flex flex-col items-center mx-2 transition-transform hover:scale-105"
            >
              {review.avatar ? (
                <img src={review.avatar} alt={review.name} className="w-14 h-14 rounded-full mb-3 object-cover border-2 border-accent-300" />
              ) : (
                <div className="w-14 h-14 rounded-full bg-accent-200 flex items-center justify-center text-xl font-bold text-accent-700 mb-3 border-2 border-accent-300">
                  {getInitials(review.name)}
                </div>
              )}
              <div className="flex items-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className={`w-5 h-5 ${i < review.rating ? 'text-accent-400' : 'text-accent-100'}`} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.454a1 1 0 00-1.175 0l-3.38 2.454c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z"/></svg>
                ))}
              </div>
              <p className="text-primary-900 text-base text-center mb-2 font-medium">{review.text}</p>
              <span className="text-accent-700 font-semibold text-sm mt-1">{review.name}{review.location && `, ${review.location}`}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
