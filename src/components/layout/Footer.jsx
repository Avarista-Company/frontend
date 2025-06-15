import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-primary-900 text-white border-t border-primary-800 pt-14 pb-8">
      <div className="container-padded max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 text-sm">
          {/* About Us */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-accent-400 tracking-wide">About Us</h3>
            <p className="text-neutral-200 mb-3 leading-relaxed">Avarista is your trusted destination for wedding and occasion fashion. Discover, connect, and celebrate in style with curated collections and seamless shopping.</p>
            <div className="flex gap-3 mt-4">
              <a href="https://instagram.com" aria-label="Instagram" className="hover:text-accent-400 transition">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm4.25 3.25a5.25 5.25 0 1 1 0 10.5 5.25 5.25 0 0 1 0-10.5zm0 1.5a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5zm5.25.75a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                </svg>
              </a>
              <a href="https://facebook.com" aria-label="Facebook" className="hover:text-accent-400 transition">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17 2.1A4.9 4.9 0 0 1 21.9 7v10A4.9 4.9 0 0 1 17 21.9H7A4.9 4.9 0 0 1 2.1 17V7A4.9 4.9 0 0 1 7 2.1h10zm-2.5 4.4h-1.5c-.6 0-.9.3-.9.9v1.2h2.4l-.3 2.3h-2.1v6.1h-2.5v-6.1H7.5V8.6h1.1V7.6c0-1.3.8-2.1 2.1-2.1h1.8v2z"/>
                </svg>
              </a>
              <a href="https://twitter.com" aria-label="Twitter" className="hover:text-accent-400 transition">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.59-2.47.7a4.3 4.3 0 0 0 1.88-2.37 8.59 8.59 0 0 1-2.72 1.04A4.28 4.28 0 0 0 11.5 9.03c0 .34.04.67.1.99A12.13 12.13 0 0 1 3.1 4.9a4.28 4.28 0 0 0 1.32 5.7c-.7-.02-1.36-.21-1.94-.53v.05a4.28 4.28 0 0 0 3.43 4.2c-.33.09-.68.14-1.04.14-.25 0-.5-.02-.74-.07a4.29 4.29 0 0 0 4 2.98A8.6 8.6 0 0 1 2 19.54a12.13 12.13 0 0 0 6.56 1.92c7.88 0 12.2-6.53 12.2-12.2 0-.19 0-.37-.01-.56A8.7 8.7 0 0 0 24 4.59a8.5 8.5 0 0 1-2.54.7z"/>
                </svg>
              </a>
            </div>
          </div>
          {/* Customer Support */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-accent-400 tracking-wide">Customer Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="hover:text-accent-400">Contact Us</Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-accent-400">FAQs</Link>
              </li>
              <li>
                <Link to="/stores" className="hover:text-accent-400">Find a Store</Link>
              </li>
              <li>
                <Link to="/community-cart" className="hover:text-accent-400">Community Cart</Link>
              </li>
            </ul>
          </div>
          {/* Policies */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-accent-400 tracking-wide">Policies</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="hover:text-accent-400">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-accent-400">Terms of Service</Link>
              </li>
              <li>
                <Link to="/returns" className="hover:text-accent-400">Returns & Refunds</Link>
              </li>
              <li>
                <Link to="/shipping" className="hover:text-accent-400">Shipping Info</Link>
              </li>
            </ul>
          </div>
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-accent-400 tracking-wide">Contact Info</h3>
            <ul className="space-y-2 text-neutral-200">
              <li>
                <span className="font-semibold">Email:</span> support@avarista.com
              </li>
              <li>
                <span className="font-semibold">Phone:</span> +91 98765 43210
              </li>
              <li>
                <span className="font-semibold">Hours:</span> 10am – 7pm IST
              </li>
              <li>
                <span className="font-semibold">Address:</span> Mumbai, India
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-primary-800 pt-6 flex flex-col md:flex-row items-center justify-between text-neutral-400 text-xs">
          <span>&copy; {currentYear} Avarista. All rights reserved.</span>
          <span className="mt-2 md:mt-0">Made with <span className="text-accent-400">♥</span> in India</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;