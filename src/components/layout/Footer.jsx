import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-neutral-900 text-white border-t border-neutral-800">
      <div className="container-padded py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Company Info */}
          <div>
            <Link to="/" className="text-3xl font-serif font-bold text-white tracking-tight">Avarista</Link>
            <p className="mt-4 text-neutral-300 text-base max-w-xs">
              Your destination for the latest fashion, local stores, and seamless shopping for every occasion.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-neutral-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/stores" className="text-neutral-300 hover:text-white transition-colors">
                  Find Stores
                </Link>
              </li>
              <li>
                <Link to="/try-on" className="text-neutral-300 hover:text-white transition-colors">
                  Virtual Try-On
                </Link>
              </li>
              <li>
                <Link to="/ai-feedback" className="text-neutral-300 hover:text-white transition-colors">
                  AI Suggestions
                </Link>
              </li>
              <li>
                <Link to="/community-cart" className="text-neutral-300 hover:text-white transition-colors">
                  Community Cart
                </Link>
              </li>
            </ul>
          </div>
          
          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-neutral-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-neutral-300 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-neutral-300 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-neutral-300 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-neutral-300 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
            <form className="flex flex-col gap-3">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="input bg-neutral-800 text-white placeholder-neutral-400 border-neutral-700" 
              />
              <button type="submit" className="btn-primary">
                Subscribe
              </button>
            </form>
            <p className="text-xs text-neutral-500 mt-3">
              &copy; {currentYear} Avarista. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;