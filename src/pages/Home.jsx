import { useState, useEffect } from 'react';
import HeroSection from '../components/ui/HeroSection';
import FeaturedSection from '../components/ui/FeaturedSection';
import NearbyStoresSection from '../components/ui/NearbyStoresSection';
import { Link } from 'react-router-dom';

const Home = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setIsLoaded(true);
    }, 300);
  }, []);
  
  return (
    <div className={`transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <HeroSection />
      
      <FeaturedSection />
      
      <NearbyStoresSection />
      
      {/* AR/VR Try-On Feature Section */}
      <section className="section">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-serif font-bold mb-4">
              Experience Virtual Try-On
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              See how outfits look on you before visiting the store. Our AR/VR technology lets you visualize different styles, colors, and combinations.
            </p>
            <Link 
              to="/try-on"
              className="btn-primary inline-block"
            >
              Try It Now
            </Link>
          </div>
          
          <div className="rounded-lg overflow-hidden shadow-lg">
            <img 
              src="https://via.placeholder.com/600x400?text=AR/VR+Demo" 
              alt="AR Try-On Experience"
              className="w-full h-auto" 
            />
          </div>
        </div>
      </section>
      
      {/* AI Feedback Section */}
      <section className="section bg-gray-50">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1 rounded-lg overflow-hidden shadow-lg">
            <img 
              src="https://via.placeholder.com/600x400?text=AI+Feedback" 
              alt="AI Feedback System"
              className="w-full h-auto" 
            />
          </div>
          
          <div className="order-1 md:order-2">
            <h2 className="text-3xl font-serif font-bold mb-4">
              Get AI-Powered Style Feedback
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              Not sure if your outfit works? Our AI provides instant feedback on your selections, offering suggestions to perfect your wedding look.
            </p>
            <Link 
              to="/ai-feedback"
              className="btn-primary inline-block"
            >
              Get Feedback
            </Link>
          </div>
        </div>
      </section>
      
      {/* Community Cart Section */}
      <section className="section">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-serif font-bold mb-4">
            Shop Together with Community Cart
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            Planning a wedding is a team effort. Our community cart allows family members to collaborate on purchases in real-time, making group shopping seamless.
          </p>
          <Link 
            to="/community-cart"
            className="btn-wedding inline-block px-8 py-3"
          >
            Create a Community Cart
          </Link>
          
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-6 bg-white rounded-lg shadow-md">
              <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Add Members</h3>
              <p className="text-gray-600">
                Invite family members to join your shopping group.
              </p>
            </div>
            
            <div className="p-6 bg-white rounded-lg shadow-md">
              <div className="w-16 h-16 bg-secondary-100 text-secondary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Shop Together</h3>
              <p className="text-gray-600">
                Browse and add items to your shared cart in real-time.
              </p>
            </div>
            
            <div className="p-6 bg-white rounded-lg shadow-md">
              <div className="w-16 h-16 bg-accent-100 text-accent-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Coordinate Outfits</h3>
              <p className="text-gray-600">
                Ensure everyone's attire complements the wedding theme.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="section bg-gray-50">
        <h2 className="section-title">What Our Customers Say</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <img 
                src="https://via.placeholder.com/60?text=E" 
                alt="Customer"
                className="w-12 h-12 rounded-full mr-4" 
              />
              <div>
                <h4 className="font-medium">Emily & John</h4>
                <p className="text-sm text-gray-500">Bride & Groom</p>
              </div>
            </div>
            <p className="text-gray-700 italic">
              "The community cart feature made it so easy to coordinate outfits with our entire wedding party. Everyone looked perfect on our big day!"
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <img 
                src="https://via.placeholder.com/60?text=S" 
                alt="Customer"
                className="w-12 h-12 rounded-full mr-4" 
              />
              <div>
                <h4 className="font-medium">Sarah Johnson</h4>
                <p className="text-sm text-gray-500">Mother of the Bride</p>
              </div>
            </div>
            <p className="text-gray-700 italic">
              "Being able to try on dresses virtually saved me so much time. I found the perfect mother-of-the-bride dress without visiting dozens of stores."
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <img 
                src="https://via.placeholder.com/60?text=M" 
                alt="Customer"
                className="w-12 h-12 rounded-full mr-4" 
              />
              <div>
                <h4 className="font-medium">Michael & Team</h4>
                <p className="text-sm text-gray-500">Groomsmen</p>
              </div>
            </div>
            <p className="text-gray-700 italic">
              "The AI suggestions were spot on! It helped us coordinate our suits perfectly with the wedding theme, even though we were shopping from different cities."
            </p>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-wedding-burgundy text-white">
        <div className="container-padded text-center">
          <h2 className="text-3xl font-serif font-bold mb-4">
            Ready to Start Shopping for Your Wedding?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Create your account today and discover a new way to shop for wedding attire with your loved ones.
          </p>
          <Link 
            to="/register"
            className="btn bg-white text-wedding-burgundy hover:bg-gray-100 px-8 py-3 text-lg font-medium"
          >
            Get Started Free
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;