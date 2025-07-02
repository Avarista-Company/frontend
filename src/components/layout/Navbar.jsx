import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import '../../pages/HomeAnimations.css'; // Import the CSS for the animated background
import '../../pages/MainPageStyles.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [navHover, setNavHover] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const { cart } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  const navigation = [
    { name: 'Home', to: '/' },
    { name: 'Stores', to: '/stores' },
    { name: 'Try-On', to: '/try-on' },
    { name: 'AI Suggestions', to: '/ai-feedback' },
    { name: 'Community Cart', to: '/community-cart' },
  ];

  // Example dropdowns for each nav item (customize as needed)
  const navDropdowns = {
    Home: [
      { label: 'Overview', to: '/' },
      { label: 'Featured', to: '/#featured' },
    ],
    Stores: [
      { label: 'All Stores', to: '/stores' },
      { label: 'Nearby', to: '/stores#nearby' },
    ],
    'Try-On': [
      { label: 'Virtual Try-On', to: '/try-on' },
      { label: 'AR/VR Models', to: '/try-on#ar-vr' },
    ],
    'AI Suggestions': [
      { label: 'Get Suggestions', to: '/ai-feedback' },
      { label: 'How It Works', to: '/ai-feedback#how' },
    ],
    'Community Cart': [
      { label: 'Create Cart', to: '/community-cart' },
      { label: 'How It Works', to: '/community-cart#how' },
    ],
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  // Calculate total cart items
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Handler for logout: clear user and redirect
  const handleLogout = () => {
    if (typeof logout === 'function') logout(); // clear user from context
    setDropdownOpen(false);
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="container header-inner" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <Link to="/about_us" className="logo" style={{ display: 'flex', alignItems: 'center', fontWeight: 700, fontSize: 28, letterSpacing: 1 }}>
          Avari<span>sta</span>
        </Link>
        {/* Main nav links (centered) */}
        <nav style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <ul className="hidden md:flex items-center space-x-4" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {navigation.map((item) => (
              <li key={item.name} className="relative nav-item-parent group" style={{ display: 'flex', alignItems: 'center' }}>
                <Link
                  to={item.to}
                  className={`text-base font-medium px-2 py-1 rounded-lg transition nav-link hover:text-black focus:outline-none focus:ring-0${location.pathname === item.to ? ' active' : ''}${item.name.toLowerCase().includes('community') ? ' community-link' : ''}`}
                >
                  {item.name}
                </Link>
                {/* Dropdown menu */}
                <div className="nav-dropdown">
                  {navDropdowns[item.name]?.map((drop) => (
                    <Link
                      key={drop.label}
                      to={drop.to}
                      className="block px-4 py-2 text-base rounded-lg transition hover:text-black focus:outline-none focus:ring-0"
                    >
                      {drop.label}
                    </Link>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </nav>
        {/* Icon bar (search, heart, user, cart) */}
        <div className="nav-icons" style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div className="icon">
            <i className="fas fa-search"></i>
          </div>
          <div className="icon">
            <i className="far fa-heart"></i>
          </div>
          {/* <div className="icon">
            <i className="far fa-user"></i>
          </div> */}
          <div className="icon">
            <i className="fas fa-shopping-bag"></i>
          </div>
          {/* Avatar only, rightmost, with dropdown on click and improved logic for auth */}
          {(currentUser && currentUser.name && currentUser.avatar) ? (
            <div className="relative ml-4" style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
              <button
                className="flex items-center focus:outline-none"
                aria-haspopup="true"
                aria-expanded={dropdownOpen ? 'true' : 'false'}
                onClick={() => setDropdownOpen((open) => !open)}
                onBlur={() => setDropdownOpen(false)}
                style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
              >
                <img src={currentUser.avatar.replace('via.placeholder.com/150', 'images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=100&q=80')} alt={currentUser.name} className="h-8 w-8 rounded-full object-cover border-2 border-primary-200" />
              </button>
              {dropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-xl py-2 z-50 animate-fadeIn"
                  style={{ minWidth: 160, border: '1px solid #eee', boxShadow: '0 8px 24px rgba(0,0,0,0.12)' }}
                  tabIndex={-1}
                  onMouseDown={e => e.preventDefault()}
                >
                  <button
                    className="block w-full text-left px-4 py-2 text-base text-neutral-700 hover:bg-primary-50 rounded-lg focus:outline-none focus:ring-0 transition"
                    onClick={() => { setDropdownOpen(false); navigate('/profile'); }}
                  >
                    <i className="far fa-user mr-2"></i> Profile
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 text-base"
                    style={{ color: '#d11b1b' }}
                    onClick={handleLogout}
                  >
                    <i className="fas fa-sign-out-alt mr-2"></i> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="btn-outline px-5 py-2 text-base ml-4">Sign In</Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;