import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-neutral-50 border-t border-neutral-200 pt-14 pb-8 text-neutral-500">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 text-sm mb-10">
          {/* About Us */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-neutral-900 tracking-wide">About</h3>
            <p className="mb-3 leading-relaxed text-neutral-500">Avarista is your trusted destination for wedding and occasion fashion. Discover, connect, and celebrate in style with curated collections and seamless shopping.</p>
          </div>
          {/* Shop */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-neutral-900 tracking-wide">Shop</h3>
            <ul className="space-y-2">
              <li><Link to="/stores" className="hover:text-primary-600">Stores</Link></li>
              <li><Link to="/try-on" className="hover:text-primary-600">Virtual Try-On</Link></li>
              <li><Link to="/ai-feedback" className="hover:text-primary-600">AI Suggestions</Link></li>
              <li><Link to="/community-cart" className="hover:text-primary-600">Community Cart</Link></li>
            </ul>
          </div>
          {/* Support */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-neutral-900 tracking-wide">Support</h3>
            <ul className="space-y-2">
              <li><Link to="/contact" className="hover:text-primary-600">Contact</Link></li>
              <li><Link to="/faq" className="hover:text-primary-600">FAQs</Link></li>
              <li><Link to="/returns" className="hover:text-primary-600">Returns</Link></li>
            </ul>
          </div>
          {/* Info */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-neutral-900 tracking-wide">Info</h3>
            <ul className="space-y-2">
              <li><Link to="/privacy" className="hover:text-primary-600">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-primary-600">Terms of Service</Link></li>
            </ul>
          </div>
          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-neutral-900 tracking-wide">Contact</h3>
            <ul className="space-y-2">
              <li><span className="font-semibold">Email:</span> support@avarista.com</li>
              <li><span className="font-semibold">Phone:</span> +91 98765 43210</li>
              <li><span className="font-semibold">Address:</span> Mumbai, India</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-neutral-200 pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-neutral-400">
          <span>&copy; {currentYear} Avarista. All rights reserved.</span>
          <span className="mt-2 md:mt-0">Made with <span className="text-primary-600">♥</span> in India</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;