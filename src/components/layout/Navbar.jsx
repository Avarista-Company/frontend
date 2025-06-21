import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { Bars3Icon, XMarkIcon, ShoppingBagIcon, UserIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import '../../pages/HomeAnimations.css'; // Import the CSS for the animated background

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [navHover, setNavHover] = useState(false);
  const { currentUser, logout } = useAuth();
  const { cart } = useCart();
  const location = useLocation();

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

  return (
    <header
      className={`header-animated-bg${navHover ? ' nav-hover' : ''}`}
      onMouseEnter={() => setNavHover(true)}
      onMouseLeave={() => setNavHover(false)}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 md:py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-bold text-2xl tracking-tight logo-text">
          <img src="/images/logo.png" alt="Avarista Logo" className="h-10 w-10 object-contain logo-img" />
          <span className="logo-text">Avarista</span>
        </Link>
        {/* Search bar (always visible, responsive, between logo and nav) */}
        <form className="flex items-center gap-2 flex-1 max-w-xs mx-4" role="search" onSubmit={e => e.preventDefault()}>
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-3 py-2 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary-400 text-base"
            style={{ fontFamily: 'Inter, sans-serif' }}
          />
          <button type="submit" className="p-2 rounded-lg text-neutral-700 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-primary-400" aria-label="Search">
            <MagnifyingGlassIcon className="h-6 w-6" />
          </button>
        </form>
        {/* Desktop Nav */}
        <div className="hidden md:flex gap-8">
          {navigation.map((item) => (
            <div key={item.name} className="relative nav-item-parent group">
              <Link
                to={item.to}
                className={`text-base font-medium px-2 py-1 rounded-lg transition nav-link${location.pathname === item.to ? ' active' : ''}${item.name.toLowerCase().includes('community') ? ' community-link' : ''}`}
              >
                {item.name}
              </Link>
              {/* Dropdown menu */}
              <div className="nav-dropdown">
                {navDropdowns[item.name]?.map((drop) => (
                  <Link
                    key={drop.label}
                    to={drop.to}
                    className="block px-4 py-2 text-base rounded-lg hover:bg-primary-50 transition"
                  >
                    {drop.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
        {/* Actions */}
        <div className="hidden md:flex items-center gap-4">
          {/* Single Cart Icon for Individual Cart */}
          <Link to="/cart" className="relative p-2 rounded-lg hover:bg-neutral-100 transition" aria-label="Cart">
            <ShoppingBagIcon className="h-6 w-6 text-primary-600" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center shadow">{cartCount}</span>
            )}
          </Link>
          {currentUser ? (
            <div className="relative group" tabIndex={0}>
              <button className="flex items-center gap-2 focus:outline-none" aria-haspopup="true" aria-expanded="false">
                <img src={currentUser.avatar.replace('via.placeholder.com/150', 'images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=100&q=80')} alt={currentUser.name} className="h-8 w-8 rounded-full object-cover border-2 border-primary-200" />
                <span className="text-base font-medium user-name">{currentUser.name}</span>
              </button>
              <div className="absolute right-0 w-52 mt-2 bg-white rounded-xl shadow-xl py-2 hidden group-hover:block group-focus-within:block show:block">
                {currentUser.role === 'retailer' && (
                  <Link to="/retailer-dashboard" className="block px-4 py-2 text-base text-neutral-700 hover:bg-primary-50 rounded-lg">Dashboard</Link>
                )}
                <Link to="/profile" className="block px-4 py-2 text-base text-neutral-700 hover:bg-primary-50 rounded-lg">Profile</Link>
                <button onClick={logout} className="block w-full text-left px-4 py-2 text-base text-red-600 hover:bg-red-50 rounded-lg">Logout</button>
              </div>
            </div>
          ) : (
            <Link to="/login" className="btn-outline px-5 py-2 text-base">Sign In</Link>
          )}
        </div>
        {/* Mobile Menu Button (hamburger) */}
        <button className="md:hidden p-2 rounded-lg text-neutral-700 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-primary-400" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Open menu">
          {isMenuOpen ? <XMarkIcon className="h-7 w-7" /> : <Bars3Icon className="h-7 w-7" />}
        </button>
      </nav>
      {/* Mobile Menu (no search input here) */}
      {isMenuOpen && (
        <div className="mobile-menu md:hidden">
          <div className="max-w-7xl mx-auto py-4 flex flex-col gap-3 px-4">
            {/* Cart Icon for Individual Cart (Mobile) */}
            <Link to="/cart" className="relative p-2 rounded-lg hover:bg-neutral-100 transition self-start mb-2" aria-label="Cart">
              <ShoppingBagIcon className="h-6 w-6 text-primary-600" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center shadow">{cartCount}</span>
              )}
            </Link>
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.to}
                className={`text-base font-medium px-3 py-2 rounded-lg transition hover:bg-neutral-100 hover:text-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-400 ${location.pathname === item.to ? 'text-primary-700 bg-primary-50' : 'text-neutral-700'}`}
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
    </header>
  );
};

export default Navbar;