import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useResidency } from '../context/ResidencyContext';
import { CURRENCIES } from '../data/residencyData';
import { WishlistModal } from './WishlistModal';
import { 
  Sun, 
  Moon, 
  Heart, 
  User as UserIcon, 
  Menu, 
  X, 
  ChevronDown, 
  LogOut, 
  Calendar, 
  Compass, 
  Sparkles,
  Bookmark
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { 
    darkMode, 
    toggleDarkMode, 
    currency, 
    setCurrencyCode, 
    favorites, 
    toggleConcierge,
    showToast 
  } = useResidency();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
    setCurrencyDropdownOpen(false);
  }, [location.pathname]);

  // Close menus on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        setUserDropdownOpen(false);
        setCurrencyDropdownOpen(false);
        setWishlistOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
    showToast('Signed out successfully', 'info');
    navigate('/');
  };

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Rooms', path: '/rooms' },
    { label: 'Villas', path: '/villas' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-primary text-gray-300 text-xs py-2 px-4 border-b border-white/10 hidden md:block select-none">
        <div className="max-w-7xl mx-auto flex justify-between items-center tracking-wider">
          <div className="flex items-center gap-6">
            <a
              href="https://share.google/n1Z6lQmv4DNvdLZXF"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-warm-gold font-medium hover:text-white transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>TV Residency • Collegepadi, Kottakkal (Near Ahalya Eye Hospital)</span>
            </a>
            <span className="hidden lg:inline text-gray-400">
              Direct Desk: <a href="tel:8281628559" className="text-gray-200 hover:text-warm-gold transition-colors font-mono font-bold">8281628559</a>
            </span>
          </div>

          <div className="flex items-center gap-5">
            <button
              onClick={toggleConcierge}
              className="text-warm-gold hover:text-white transition-colors flex items-center gap-1 font-medium"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>AI Concierge</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'bg-white/95 dark:bg-[#121418]/95 backdrop-blur-md shadow-level-2 py-3.5 border-b border-soft-beige/40 dark:border-white/5'
            : 'bg-white/90 dark:bg-[#121418]/90 backdrop-blur-sm py-4 border-b border-gray-100 dark:border-white/5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded bg-gradient-to-br from-deep-navy via-primary to-deep-navy dark:from-warm-gold/20 dark:to-deep-navy border border-warm-gold/60 flex items-center justify-center shadow-sm group-hover:border-warm-gold transition-all duration-300">
              <span className="font-serif font-bold text-warm-gold text-lg tracking-tighter">TV</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-bold tracking-tight text-primary dark:text-white leading-tight group-hover:text-warm-gold transition-colors">
                TV Residency
              </span>
              <span className="text-[9px] tracking-[0.28em] uppercase text-warm-gold font-semibold -mt-0.5">
                Kottakkal Stays
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm font-medium tracking-wide transition-colors relative py-1.5 ${
                    isActive
                      ? 'text-primary dark:text-white font-semibold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-warm-gold'
                      : 'text-gray-600 dark:text-gray-300 hover:text-warm-gold dark:hover:text-warm-gold'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Right Action Icons & Auth */}
          <div className="flex items-center gap-1 sm:gap-2.5">
            
            {/* Currency Selector (Desktop / Tablet) */}
            <div className="relative hidden md:block">
              <button
                onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors border border-gray-200 dark:border-white/10"
                title="Change Currency"
              >
                <span>{currency.code}</span>
                <ChevronDown className="w-3.5 h-3.5 text-warm-gold" />
              </button>

              {currencyDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setCurrencyDropdownOpen(false)} />
                  <div className="absolute right-0 mt-2 w-44 rounded-lg bg-white dark:bg-[#181A20] shadow-level-3 border border-gray-100 dark:border-white/10 py-1.5 z-20 animate-fade-in">
                    <div className="px-3 py-1 text-[10px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 dark:border-white/5">
                      Select Currency
                    </div>
                    {Object.values(CURRENCIES).map((curr) => (
                      <button
                        key={curr.code}
                        onClick={() => {
                          setCurrencyCode(curr.code);
                          setCurrencyDropdownOpen(false);
                        }}
                        className={`w-full px-3 py-2 text-left text-xs flex justify-between items-center transition-colors ${
                          currency.code === curr.code
                            ? 'bg-soft-beige/40 dark:bg-warm-gold/10 text-warm-gold font-bold'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5'
                        }`}
                      >
                        <span>{curr.name}</span>
                        <span className="font-semibold text-gray-500 dark:text-gray-400">{curr.symbol}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Dark / Light Mode Switcher */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {darkMode ? (
                <Sun className="w-4 h-4 text-warm-gold" />
              ) : (
                <Moon className="w-4 h-4 text-deep-navy" />
              )}
            </button>

            {/* Wishlist Button (Responsive: Desktop, Tablet & Mobile) */}
            <button
              type="button"
              onClick={() => setWishlistOpen(true)}
              className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors relative flex items-center justify-center"
              title="Saved Wishlist Stays"
              aria-label="Open wishlist"
            >
              <Heart className={`w-4 h-4 ${favorites.length > 0 ? 'text-red-500 fill-red-500' : ''}`} />
              {favorites.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-warm-gold text-primary font-bold text-[9px] rounded-full flex items-center justify-center shadow-sm">
                  {favorites.length}
                </span>
              )}
            </button>

            {/* User Account / Auth Experience (Desktop / Tablet) */}
            {isAuthenticated && user ? (
              <div className="relative hidden md:block">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-warm-gold/50 bg-warm-gold/10 text-xs font-semibold text-warm-gold hover:bg-warm-gold/20 transition-all"
                >
                  <div className="w-5 h-5 rounded-full bg-warm-gold text-primary flex items-center justify-center font-bold text-[10px]">
                    {user.name.charAt(0)}
                  </div>
                  <span className="hidden sm:inline">{user.name.split(' ')[0]}</span>
                  <ChevronDown className="w-3 h-3" />
                </button>

                {userDropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setUserDropdownOpen(false)} />
                    <div className="absolute right-0 mt-2 w-60 rounded-xl bg-white dark:bg-[#181A20] shadow-level-3 border border-gray-100 dark:border-white/10 p-3.5 z-20 animate-fade-in">
                      <div className="pb-3 border-b border-gray-100 dark:border-white/5">
                        <p className="text-xs font-bold text-gray-900 dark:text-white">{user.name}</p>
                        <p className="text-[11px] text-gray-500 dark:text-gray-400 font-mono">+91 {user.phone}</p>
                      </div>

                      <div className="py-2 space-y-1">
                        <Link
                          to="/bookings"
                          onClick={() => setUserDropdownOpen(false)}
                          className="w-full flex items-center gap-2 px-2.5 py-2 rounded text-xs font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                        >
                          <Bookmark className="w-3.5 h-3.5 text-warm-gold" />
                          <span>My Bookings</span>
                        </Link>
                      </div>

                      <button
                        onClick={handleLogout}
                        className="w-full pt-2 border-t border-gray-100 dark:border-white/5 text-left flex items-center gap-2 text-xs text-red-600 dark:text-red-400 hover:underline font-semibold"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link
                  to="/login"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-200 hover:text-warm-gold transition-colors"
                >
                  <UserIcon className="w-3.5 h-3.5 text-warm-gold" />
                  <span>Sign In</span>
                </Link>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-800 dark:text-white hover:text-warm-gold hover:bg-gray-100 dark:hover:bg-white/5 transition-colors flex items-center justify-center flex-shrink-0"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Full-Screen Screen Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[9999] lg:hidden bg-white dark:bg-[#121418] flex flex-col justify-between overflow-y-auto animate-fade-in text-left">
          
          {/* Top Bar inside Full Screen */}
          <div className="px-5 py-4 flex justify-between items-center border-b border-gray-100 dark:border-white/10 sticky top-0 bg-white/95 dark:bg-[#121418]/95 backdrop-blur-md z-10">
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded bg-gradient-to-br from-deep-navy via-primary to-deep-navy dark:from-warm-gold/20 dark:to-deep-navy border border-warm-gold/60 flex items-center justify-center shadow-sm">
                <span className="font-serif font-bold text-warm-gold text-lg">TV</span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl font-bold tracking-tight text-primary dark:text-white leading-tight">
                  TV Residency
                </span>
                <span className="text-[8px] tracking-[0.25em] uppercase text-warm-gold font-semibold -mt-0.5">
                  Kottakkal Stays
                </span>
              </div>
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="w-10 h-10 rounded-full flex items-center justify-center text-gray-700 dark:text-gray-200 hover:text-warm-gold hover:bg-gray-100 dark:hover:bg-white/5 transition-colors border border-gray-200 dark:border-white/10"
              aria-label="Close navigation menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-5 flex-1 flex flex-col justify-between space-y-6">
            {/* Navigation Links */}
            <nav className="space-y-1.5">
              {[
                { label: 'Home', path: '/' },
                { label: 'Rooms', path: '/rooms' },
                { label: 'Villas', path: '/villas' },
                { label: 'Offers', path: '/offers' },
                { label: 'About', path: '/about' },
                { label: 'Contact', path: '/contact' },
              ].map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold transition-all ${
                      isActive
                        ? 'bg-soft-beige/70 dark:bg-warm-gold/15 text-primary dark:text-warm-gold border border-warm-gold/30 shadow-sm'
                        : 'text-gray-800 dark:text-gray-200 hover:text-warm-gold hover:bg-gray-50 dark:hover:bg-white/5'
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive ? (
                      <span className="w-2 h-2 rounded-full bg-warm-gold"></span>
                    ) : (
                      <span className="text-gray-400 text-sm">→</span>
                    )}
                  </Link>
                );
              })}

              {/* Wishlist Link inside Mobile Menu */}
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setWishlistOpen(true);
                }}
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold text-gray-800 dark:text-gray-200 hover:text-warm-gold hover:bg-gray-50 dark:hover:bg-white/5 transition-all text-left"
              >
                <div className="flex items-center gap-2.5">
                  <Heart className={`w-5 h-5 ${favorites.length > 0 ? 'text-red-500 fill-red-500' : 'text-warm-gold'}`} />
                  <span>Saved Wishlist</span>
                </div>
                <span className="text-xs font-bold bg-warm-gold text-primary px-2.5 py-0.5 rounded-full">
                  {favorites.length}
                </span>
              </button>
            </nav>

            {/* User / Authentication & CTA */}
            <div className="space-y-3 pt-4 border-t border-gray-100 dark:border-white/10">
              {isAuthenticated && user ? (
                <div className="p-4 bg-warm-gold/10 rounded-2xl border border-warm-gold/30 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-warm-gold text-primary flex items-center justify-center font-bold text-sm">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-900 dark:text-white">{user.name}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 font-mono">+91 {user.phone}</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-warm-gold/20 text-xs">
                    <Link
                      to="/bookings"
                      onClick={() => setMobileMenuOpen(false)}
                      className="font-bold text-primary dark:text-warm-gold hover:underline flex items-center gap-1.5 py-1"
                    >
                      <Bookmark className="w-4 h-4" />
                      <span>My Bookings</span>
                    </Link>

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="text-red-500 hover:underline font-semibold flex items-center gap-1.5 py-1"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-3.5 px-4 border border-warm-gold/50 hover:border-warm-gold text-warm-gold hover:bg-warm-gold hover:text-primary transition-all rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 text-center"
                >
                  <UserIcon className="w-4 h-4" />
                  <span>Sign In / Profile</span>
                </Link>
              )}

              {/* Book Your Stay Primary Button */}
              <Link
                to="/rooms"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-4 bg-warm-gold hover:bg-gold-light text-primary font-bold text-xs uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 shadow-gold text-center"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Your Stay</span>
              </Link>
            </div>

            {/* Bottom Quick Controls & Address */}
            <div className="pt-4 border-t border-gray-100 dark:border-white/10 space-y-3">
              <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-300">
                <button
                  type="button"
                  onClick={toggleDarkMode}
                  className="flex items-center gap-2 hover:text-warm-gold transition-colors font-medium"
                >
                  {darkMode ? <Sun className="w-4 h-4 text-warm-gold" /> : <Moon className="w-4 h-4 text-deep-navy" />}
                  <span>{darkMode ? 'Light Theme' : 'Dark Theme'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    toggleConcierge();
                  }}
                  className="flex items-center gap-1.5 text-warm-gold font-bold hover:underline"
                >
                  <Compass className="w-4 h-4" />
                  <span>AI Concierge</span>
                </button>
              </div>

              <div className="text-center text-[11px] text-gray-500 dark:text-gray-400">
                <span>Collegepadi, Kottakkal • Phone: </span>
                <a href="tel:8281628559" className="text-warm-gold font-bold font-mono">8281628559</a>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* Wishlist Drawer / Responsive Modal */}
      <WishlistModal 
        isOpen={wishlistOpen} 
        onClose={() => setWishlistOpen(false)} 
      />
    </>
  );
};
