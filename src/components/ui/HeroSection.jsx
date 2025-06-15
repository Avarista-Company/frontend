import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div className="relative h-[70vh] min-h-[400px] flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1500&q=80" 
          alt="Shop the Latest Fashion" 
          className="w-full h-full object-cover"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 to-neutral-900/30"></div>
      </div>
      
      {/* Content */}
      <div className="container-padded relative z-10 text-white">
        <div className="max-w-2xl">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-5 drop-shadow-lg">
            Discover Fashion for Every Occasion
          </h1>
          
          <p className="text-lg md:text-xl opacity-90 mb-10">
            Shop the latest trends, explore local stores, and enjoy a seamless shopping experience for weddings, parties, and everyday style.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Link 
              to="/stores" 
              className="btn-primary px-8 py-3 text-lg shadow-lg hover:shadow-xl"
            >
              Explore Stores
            </Link>
            
            <Link 
              to="/try-on" 
              className="btn-outline bg-white text-neutral-900 border-transparent px-8 py-3 text-lg shadow-lg hover:shadow-xl"
            >
              Virtual Try-On
            </Link>
          </div>
          
          <div className="mt-12 flex items-center space-x-8">
            <div className="flex items-center">
              <svg className="h-6 w-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Local Stores</span>
            </div>
            
            <div className="flex items-center">
              <svg className="h-6 w-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Virtual Try-On</span>
            </div>
            
            <div className="flex items-center">
              <svg className="h-6 w-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Community Cart</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;