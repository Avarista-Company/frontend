import { useState, useEffect, useRef } from 'react';
import HeroSection from '../components/ui/HeroSection';
import FeaturedSection from '../components/ui/FeaturedSection';
import NearbyStoresSection from '../components/ui/NearbyStoresSection';
import { Link } from 'react-router-dom';
import { Skeleton } from '../components/common/Loading';
import TestimonialCarousel from '../components/ui/TestimonialCarousel';
import './HomeAnimations.css';

const Home = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const sectionRefs = useRef([]);
  const cardRefs = useRef([]);

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 300);
  }, []);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.2 }
    );
    sectionRefs.current.forEach(ref => ref && observer.observe(ref));
    cardRefs.current.forEach(ref => ref && observer.observe(ref));
    return () => {
      sectionRefs.current.forEach(ref => ref && observer.unobserve(ref));
      cardRefs.current.forEach(ref => ref && observer.unobserve(ref));
    };
  }, []);

  return (
    <main className={`transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      {/* Hero Section */}
      <section ref={el => (sectionRefs.current[0] = el)} className="section-animate py-20 md:py-28 bg-white text-center flex flex-col items-center justify-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight text-neutral-900 leading-tight">Effortless Fashion for Every Occasion</h1>
        <p className="text-lg md:text-xl text-neutral-500 mb-8 max-w-2xl mx-auto">Discover, try, and shop the best local styles. Minimal, timeless, and made for you.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/stores" className="btn-primary text-lg px-8 py-3 rounded-full">Shop Stores</Link>
          <Link to="/try-on" className="btn-outline text-lg px-8 py-3 rounded-full">Virtual Try-On</Link>
        </div>
      </section>

      {/* Featured Products Section */}
      <section ref={el => (sectionRefs.current[1] = el)} className="section-animate-right section">
        {isLoaded ? <FeaturedSection /> : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="card p-4">
                <Skeleton height="h-48" />
                <Skeleton height="h-6" className="mt-4 w-3/4" />
                <Skeleton height="h-4" className="mt-2 w-1/2" />
                <Skeleton height="h-4" className="mt-2 w-1/3" />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Nearby Stores Section */}
      <NearbyStoresSection />

      {/* Try-On Feature Section */}
      <section className="section grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-neutral-900">Experience Virtual Try-On</h2>
          <p className="text-lg text-neutral-500 mb-6">See how outfits look on you before visiting the store. Our AR/VR technology lets you visualize different styles, colors, and combinations.</p>
          <Link to="/try-on" className="btn-primary inline-block px-8 py-3 rounded-full">Try It Now</Link>
        </div>
        <div className="rounded-2xl overflow-hidden shadow-card bg-neutral-100 flex items-center justify-center">
          <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80" alt="AR Try-On Experience" className="w-full h-auto object-contain" />
        </div>
      </section>

      {/* AI Feedback Section */}
      <section className="section bg-neutral-50 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="rounded-2xl overflow-hidden shadow-card bg-neutral-100 flex items-center justify-center order-2 md:order-1">
          <img src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80" alt="AI Feedback System" className="w-full h-auto object-contain" />
        </div>
        <div className="order-1 md:order-2">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-neutral-900">Get AI-Powered Outfit Suggestions</h2>
          <p className="text-lg text-neutral-500 mb-6">Let our AI recommend the best styles for you based on your preferences and body type.</p>
          <Link to="/ai-feedback" className="btn-outline inline-block px-8 py-3 rounded-full">Try AI Suggestions</Link>
        </div>
      </section>

      {/* Community Cart Section */}
      <section className="section">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-neutral-900">Shop Together with Community Cart</h2>
          <p className="text-lg text-neutral-500 mb-8">Planning a wedding is a team effort. Our community cart allows family members to collaborate on purchases in real-time, making group shopping seamless.</p>
          <Link to="/community-cart" className="btn-primary inline-block px-8 py-3 rounded-full">Create a Community Cart</Link>
        </div>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-2xl shadow-card flex flex-col items-center">
            <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mb-4">
              <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-neutral-900">Add Members</h3>
            <p className="text-neutral-500 text-center">Invite family members to join your shopping group.</p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow-card flex flex-col items-center">
            <div className="w-16 h-16 bg-secondary-100 text-secondary-600 rounded-full flex items-center justify-center mb-4">
              <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 20 20"><path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" /></svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-neutral-900">Shop Together</h3>
            <p className="text-neutral-500 text-center">Browse and add items to your shared cart in real-time.</p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow-card flex flex-col items-center">
            <div className="w-16 h-16 bg-accent-100 text-accent-600 rounded-full flex items-center justify-center mb-4">
              <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-neutral-900">Coordinate Outfits</h3>
            <p className="text-neutral-500 text-center">Ensure everyone's attire complements the wedding theme.</p>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <TestimonialCarousel />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-accent-50 text-primary-900 relative">
        <div className="container-padded text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Ready to Start Shopping for Your Wedding?</h2>
          <p className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto">Create your account today and discover a new way to shop for wedding attire with your loved ones.</p>
          <Link to="/register" className="inline-block btn-primary px-10 py-4 text-xl font-semibold rounded-full shadow-lg transition-all duration-200 border-2 border-primary-200">Get Started Free</Link>
        </div>
      </section>
    </main>
  );
};

export default Home;