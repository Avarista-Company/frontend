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
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container-padded">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-serif font-bold text-wedding-burgundy">Avarista</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.to}
                className={`text-sm font-medium transition-colors hover:text-primary-600 ${
                  location.pathname === item.to
                    ? 'text-primary-600 border-b-2 border-primary-600'
                    : 'text-gray-700'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
          
          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/community-cart" className="relative p-2 text-gray-700 hover:text-primary-600">
              <ShoppingBagIcon className="h-6 w-6" />
              <span className="absolute top-0 right-0 bg-accent-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </Link>
            
            {currentUser ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 focus:outline-none">
                  <img 
                    src={currentUser.avatar} 
                    alt={currentUser.name}
                    className="h-8 w-8 rounded-full object-cover" 
                  />
                  <span className="text-sm font-medium text-gray-700">{currentUser.name}</span>
                </button>
                
                <div className="absolute right-0 w-48 mt-2 bg-white rounded-md shadow-lg py-1 hidden group-hover:block">
                  {currentUser.role === 'retailer' && (
                    <Link 
                      to="/retailer-dashboard"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Dashboard
                    </Link>
                  )}
                  <Link 
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                  <button 
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link 
                to="/login"
                className="flex items-center space-x-1 text-sm font-medium text-gray-700 hover:text-primary-600"
              >
                <UserIcon className="h-5 w-5" />
                <span>Login</span>
              </Link>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-gray-900 focus:outline-none"
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute w-full bg-white shadow-md transition-all duration-300 overflow-hidden ${
          isMenuOpen ? 'max-h-screen pt-4 pb-6' : 'max-h-0'
        }`}
      >
        <div className="container-padded flex flex-col space-y-4">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.to}
              className={`text-base font-medium py-2 ${
                location.pathname === item.to
                  ? 'text-primary-600'
                  : 'text-gray-700'
              }`}
              onClick={closeMenu}
            >
              {item.name}
            </Link>
          ))}
          
          <div className="pt-4 border-t border-gray-200">
            {currentUser ? (
              <>
                <div className="flex items-center space-x-3 mb-4">
                  <img 
                    src={currentUser.avatar} 
                    alt={currentUser.name}
                    className="h-10 w-10 rounded-full object-cover" 
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{currentUser.name}</p>
                    <p className="text-xs text-gray-500">{currentUser.email}</p>
                  </div>
                </div>
                
                {currentUser.role === 'retailer' && (
                  <Link 
                    to="/retailer-dashboard"
                    className="block py-2 text-base font-medium text-gray-700"
                    onClick={closeMenu}
                  >
                    Retailer Dashboard
                  </Link>
                )}
                
                <Link 
                  to="/profile"
                  className="block py-2 text-base font-medium text-gray-700"
                  onClick={closeMenu}
                >
                  Profile
                </Link>
                
                <button 
                  onClick={() => {
                    logout();
                    closeMenu();
                  }}
                  className="block w-full text-left py-2 text-base font-medium text-gray-700"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link 
                to="/login"
                className="flex items-center space-x-2 py-2 text-base font-medium text-gray-700"
                onClick={closeMenu}
              >
                <UserIcon className="h-5 w-5" />
                <span>Login / Register</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;