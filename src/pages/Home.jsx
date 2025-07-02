import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./MainPageStyles.css";
import AnimatedHeroSection from "../components/AnimatedHeroSection";

const Home = () => {
  // Back to Top Button logic
  useEffect(() => {
    const handleScroll = () => {
      const backToTop = document.querySelector(".back-to-top");
      if (window.pageYOffset > 300) {
        backToTop?.classList.add("show");
      } else {
        backToTop?.classList.remove("show");
      }
    };
    window.addEventListener("scroll", handleScroll);
    const btn = document.querySelector(".back-to-top");
    btn?.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      btn?.removeEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    };
  }, []);

  return (
    <>
      {/* Header (navbar) remains unchanged */}
      <AnimatedHeroSection />
      <section class="hero">
        <div class="container hero-content">
          <h1 class="hero-title">Elevate Your Style</h1>
          <p class="hero-text">
            Discover the latest fashion trends and premium quality clothing for
            every occasion. Free shipping within the city on orders over $50.
          </p>
          <button class="hero-button">Explore Collection</button>
        </div>
      </section>

      {/* Features Bar */}
      <div className="features-bar">
        <div className="container features-container">
          <div className="feature">
            <div className="feature-icon">
              <i className="fas fa-shipping-fast"></i>
            </div>
            <div className="feature-text">Free Shipping Over $50</div>
          </div>
          <div className="feature">
            <div className="feature-icon">
              <i className="fas fa-undo"></i>
            </div>
            <div className="feature-text">30-Day Returns</div>
          </div>
          <div className="feature">
            <div className="feature-icon">
              <i className="fas fa-shield-alt"></i>
            </div>
            <div className="feature-text">Secure Payment</div>
          </div>
          <div className="feature">
            <div className="feature-icon">
              <i className="fas fa-headset"></i>
            </div>
            <div className="feature-text">24/7 Support</div>
          </div>
        </div>
      </div>

      {/* Men's Collection */}
      <section className="section container">
        <div className="section-header">
          <h2 className="section-title">Men's Collection</h2>
          <p className="section-subtitle">
            Explore our handpicked selection for men
          </p>
        </div>
        <div className="product-grid">
          <div className="product-item">
            <div className="product-image">
              <span className="product-tag">New</span>
              <img src="/api/placeholder/400/500" alt="White Shirt" />
              <div className="product-actions">
                <div className="action-icon">
                  <i className="far fa-heart"></i>
                </div>
                <div className="action-icon">
                  <i className="fas fa-shopping-cart"></i>
                </div>
                <div className="action-icon">
                  <i className="fas fa-search"></i>
                </div>
              </div>
            </div>
            <div className="product-info">
              <h3 className="product-title">Premium White Shirt</h3>
              <div className="product-rating">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="far fa-star"></i>
              </div>
              <div className="product-price">$49.99</div>
            </div>
          </div>
          <div className="product-item">
            <div className="product-image">
              <img src="/api/placeholder/400/500" alt="Blue Jeans" />
              <div className="product-actions">
                <div className="action-icon">
                  <i className="far fa-heart"></i>
                </div>
                <div className="action-icon">
                  <i className="fas fa-shopping-cart"></i>
                </div>
                <div className="action-icon">
                  <i className="fas fa-search"></i>
                </div>
              </div>
            </div>
            <div className="product-info">
              <h3 className="product-title">Slim Fit Blue Jeans</h3>
              <div className="product-rating">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star-half-alt"></i>
              </div>
              <div className="product-price">$59.99</div>
            </div>
          </div>
          <div className="product-item">
            <div className="product-image">
              <span className="product-tag">Sale</span>
              <img src="/api/placeholder/400/500" alt="Black T-Shirt" />
              <div className="product-actions">
                <div className="action-icon">
                  <i className="far fa-heart"></i>
                </div>
                <div className="action-icon">
                  <i className="fas fa-shopping-cart"></i>
                </div>
                <div className="action-icon">
                  <i className="fas fa-search"></i>
                </div>
              </div>
            </div>
            <div className="product-info">
              <h3 className="product-title">Essential Black T-Shirt</h3>
              <div className="product-rating">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </div>
              <div className="product-price">$24.99</div>
            </div>
          </div>
          <div className="product-item">
            <div className="product-image">
              <img src="/api/placeholder/400/500" alt="Maroon Sweater" />
              <div className="product-actions">
                <div className="action-icon">
                  <i className="far fa-heart"></i>
                </div>
                <div className="action-icon">
                  <i className="fas fa-shopping-cart"></i>
                </div>
                <div className="action-icon">
                  <i className="fas fa-search"></i>
                </div>
              </div>
            </div>
            <div className="product-info">
              <h3 className="product-title">Maroon Cashmere Sweater</h3>
              <div className="product-rating">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="far fa-star"></i>
              </div>
              <div className="product-price">$79.99</div>
            </div>
          </div>
        </div>
      </section>

      {/* Women's Collection */}
      <section className="section container">
        <div className="section-header">
          <h2 className="section-title">Women's Collection</h2>
          <p className="section-subtitle">
            Discover elegance in every piece
          </p>
        </div>
        <div className="product-grid">
          <div className="product-item">
            <div className="product-image">
              <span className="product-tag">Trending</span>
              <img src="/api/placeholder/400/500" alt="Midi Dress" />
              <div className="product-actions">
                <div className="action-icon">
                  <i className="far fa-heart"></i>
                </div>
                <div className="action-icon">
                  <i className="fas fa-shopping-cart"></i>
                </div>
                <div className="action-icon">
                  <i className="fas fa-search"></i>
                </div>
              </div>
            </div>
            <div className="product-info">
              <h3 className="product-title">Elegant Midi Dress</h3>
              <div className="product-rating">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star-half-alt"></i>
              </div>
              <div className="product-price">$69.99</div>
            </div>
          </div>
          <div className="product-item">
            <div className="product-image">
              <img src="/api/placeholder/400/500" alt="Blue Jeans" />
              <div className="product-actions">
                <div className="action-icon">
                  <i className="far fa-heart"></i>
                </div>
                <div className="action-icon">
                  <i className="fas fa-shopping-cart"></i>
                </div>
                <div className="action-icon">
                  <i className="fas fa-search"></i>
                </div>
              </div>
            </div>
            <div className="product-info">
              <h3 className="product-title">High-Waist Skinny Jeans</h3>
              <div className="product-rating">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="far fa-star"></i>
              </div>
              <div className="product-price">$54.99</div>
            </div>
          </div>
          <div className="product-item">
            <div className="product-image">
              <span className="product-tag">Sale</span>
              <img src="/api/placeholder/400/500" alt="Black Dress" />
              <div className="product-actions">
                <div className="action-icon">
                  <i className="far fa-heart"></i>
                </div>
                <div className="action-icon">
                  <i className="fas fa-shopping-cart"></i>
                </div>
                <div className="action-icon">
                  <i className="fas fa-search"></i>
                </div>
              </div>
            </div>
            <div className="product-info">
              <h3 className="product-title">Classic Black Dress</h3>
              <div className="product-rating">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </div>
              <div className="product-price">$89.99</div>
            </div>
          </div>
          <div className="product-item">
            <div className="product-image">
              <img src="/api/placeholder/400/500" alt="Beige Top" />
              <div className="product-actions">
                <div className="action-icon">
                  <i className="far fa-heart"></i>
                </div>
                <div className="action-icon">
                  <i className="fas fa-shopping-cart"></i>
                </div>
                <div className="action-icon">
                  <i className="fas fa-search"></i>
                </div>
              </div>
            </div>
            <div className="product-info">
              <h3 className="product-title">Beige Silk Blouse</h3>
              <div className="product-rating">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star-half-alt"></i>
                <i className="far fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star-half-alt"></i>
                <i className="far fa-star"></i>
              </div>
              <div className="product-price">$64.99</div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="section container">
        <div className="section-header">
          <h2 className="section-title">Shop By Category</h2>
          <p className="section-subtitle">Find your perfect style</p>
        </div>
        <div className="categories">
          <div className="category">
            <div className="category-image">
              <img src="/api/placeholder/400/500" alt="Men's Fashion" />
            </div>
            <div className="category-overlay">
              <h3 className="category-title">Men's Fashion</h3>
              <p>Classic and modern styles for every occasion</p>
              <a href="#" className="category-button">
                Discover Now
              </a>
            </div>
          </div>
          <div className="category">
            <div className="category-image">
              <img src="/api/placeholder/400/500" alt="Women's Fashion" />
            </div>
            <div className="category-overlay">
              <h3 className="category-title">Women's Fashion</h3>
              <p>Elegance and comfort combined</p>
              <a href="#" className="category-button">
                Discover Now
              </a>
            </div>
          </div>
          <div className="category">
            <div className="category-image">
              <img src="/api/placeholder/400/500" alt="Accessories" />
            </div>
            <div className="category-overlay">
              <h3 className="category-title">Accessories</h3>
              <p>Complete your look with our premium accessories</p>
              <a href="#" className="category-button">
                Discover Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Store Locations */}
      <section className="section container">
        <div className="section-header">
          <h2 className="section-title">Visit Our Stores</h2>
          <p className="section-subtitle">Experience Avarista in person</p>
        </div>
        <div className="store-grid">
          <div className="store-item">
            <div className="store-image">
              <img src="/api/placeholder/400/300" alt="New York Store" />
            </div>
            <div className="store-overlay">
              <h3 className="store-title">New York</h3>
              <p className="store-address">
                123 Fashion Avenue, New York, NY 10001
              </p>
            </div>
          </div>
          <div className="store-item">
            <div className="store-image">
              <img src="/api/placeholder/400/300" alt="Los Angeles Store" />
            </div>
            <div className="store-overlay">
              <h3 className="store-title">Los Angeles</h3>
              <p className="store-address">
                456 Style Boulevard, Los Angeles, CA 90001
              </p>
            </div>
          </div>
          <div className="store-item">
            <div className="store-image">
              <img src="/api/placeholder/400/300" alt="Chicago Store" />
            </div>
            <div className="store-overlay">
              <h3 className="store-title">Chicago</h3>
              <p className="store-address">
                789 Trend Street, Chicago, IL 60007
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">What Our Customers Say</h2>
            <p className="section-subtitle">
              Read testimonials from our satisfied customers
            </p>
          </div>
          <div className="testimonial-slider">
            <div className="testimonial-item">
              <div className="testimonial-text">
                "I've been shopping at Avarista for years now. Their clothing
                quality is exceptional and the customer service is always
                outstanding. Highly recommend for anyone looking for premium
                fashion items."
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">
                  <img src="/api/placeholder/60/60" alt="Sarah Johnson" />
                </div>
                <div className="author-info">
                  <div className="author-name">Sarah Johnson</div>
                  <div className="author-position">Loyal Customer</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter">
        <div className="container">
          <h2 className="newsletter-title">Subscribe to Our Newsletter</h2>
          <p className="newsletter-text">
            Stay updated with our latest collections, exclusive offers, and fashion
            tips straight to your inbox.
          </p>
          <form className="newsletter-form">
            <input
              type="email"
              className="newsletter-input"
              placeholder="Enter your email address"
            />
            <button type="submit" className="newsletter-button">
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Navigation Links */}
    
      {/* Footer */}
     
      {/* Back to Top Button */}
      <div className="back-to-top">
        <i className="fas fa-arrow-up"></i>
      </div>
    </>
  );
};

export default Home;