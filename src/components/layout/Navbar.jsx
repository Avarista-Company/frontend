import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Bars3Icon, XMarkIcon, ShoppingBagIcon, UserIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { currentUser, logout } = useAuth();
  const location = useLocation();

  const navigation = [
    { name: 'Home', to: '/' },
    { name: 'Stores', to: '/stores' },
    { name: 'Try-On', to: '/try-on' },
    { name: 'AI Suggestions', to: '/ai-feedback' },
    { name: 'Community Cart', to: '/community-cart' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav 
      className={`fixed top-0 w-full z-30 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 shadow-lg backdrop-blur py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container-padded">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-3xl font-serif font-bold text-primary-700 tracking-tight">Avarista</span>
          </Link>
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.to}
                className={`text-base font-medium transition-colors px-2 py-1 rounded-lg hover:text-primary-600 hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-primary-400 ${
                  location.pathname === item.to
                    ? 'text-primary-700 bg-primary-100' : 'text-neutral-700'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/community-cart" className="relative p-2 text-neutral-700 hover:text-primary-600">
              <ShoppingBagIcon className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 bg-accent-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center shadow-md">
                0
              </span>
            </Link>
            {currentUser ? (
              <div className="relative group" tabIndex={0} onBlur={e => setTimeout(() => { document.activeElement !== e.currentTarget && e.currentTarget.classList.remove('show'); }, 100)}>
                <button
                  className="flex items-center space-x-2 focus:outline-none"
                  onClick={e => {
                    const parent = e.currentTarget.parentElement;
                    parent.classList.toggle('show');
                  }}
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <img 
                    src={currentUser.avatar.replace('via.placeholder.com/150', 'images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=100&q=80')} 
                    alt={currentUser.name}
                    className="h-8 w-8 rounded-full object-cover border-2 border-primary-200" 
                  />
                  <span className="text-base font-medium text-neutral-700">{currentUser.name}</span>
                </button>
                <div className="absolute right-0 w-52 mt-2 bg-white rounded-xl shadow-xl py-2 hidden group-hover:block group-focus-within:block show:block">
                  {currentUser.role === 'retailer' && (
                    <Link 
                      to="/retailer-dashboard"
                      className="block px-4 py-2 text-base text-neutral-700 hover:bg-primary-50 rounded-lg"
                    >
                      Dashboard
                    </Link>
                  )}
                  <Link 
                    to="/profile"
                    className="block px-4 py-2 text-base text-neutral-700 hover:bg-primary-50 rounded-lg"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 text-base text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="btn-outline px-5 py-2 text-base">Sign In</Link>
            )}
          </div>
          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg text-neutral-700 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-primary-400"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Open menu"
          >
            {isMenuOpen ? <XMarkIcon className="h-7 w-7" /> : <Bars3Icon className="h-7 w-7" />}
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 shadow-xl backdrop-blur border-t border-neutral-100">
          <div className="container-padded py-4 flex flex-col gap-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.to}
                className={`text-base font-medium px-3 py-2 rounded-lg transition-colors hover:text-primary-600 hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-primary-400 ${
                  location.pathname === item.to
                    ? 'text-primary-700 bg-primary-100' : 'text-neutral-700'
                }`}
                onClick={closeMenu}
              >
                {item.name}
              </Link>
            ))}
            <div className="mt-2">
              {currentUser ? (
                <>
                  <Link to="/profile" className="block px-3 py-2 text-base text-neutral-700 hover:bg-primary-50 rounded-lg" onClick={closeMenu}>Profile</Link>
                  {currentUser.role === 'retailer' && (
                    <Link to="/retailer-dashboard" className="block px-3 py-2 text-base text-neutral-700 hover:bg-primary-50 rounded-lg" onClick={closeMenu}>Dashboard</Link>
                  )}
                  <button onClick={logout} className="block w-full text-left px-3 py-2 text-base text-red-600 hover:bg-red-50 rounded-lg">Logout</button>
                </>
              ) : (
                <Link to="/login" className="btn-outline px-5 py-2 text-base w-full block text-center" onClick={closeMenu}>Sign In</Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;