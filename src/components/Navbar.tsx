import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useResidency } from '../context/ResidencyContext';
import { CURRENCIES } from '../data/residencyData';
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
  const { user, isAuthenticated, logout, openLoginModal } = useAuth();
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
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
    setCurrencyDropdownOpen(false);
  }, [location.pathname]);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        setUserDropdownOpen(false);
        setCurrencyDropdownOpen(false);
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
      {/* Top Luxury Announcement Bar */}
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
            {isAuthenticated && user ? (
              <span className="flex items-center gap-1.5 text-warm-gold font-medium">
                <span className="w-2 h-2 rounded-full bg-warm-gold animate-pulse"></span>
                <span>{user.membershipTier} Member Privileges Active</span>
              </span>
            ) : (
              <button
                onClick={() => openLoginModal()}
                className="hover:text-warm-gold transition-colors flex items-center gap-1 text-gray-300 uppercase tracking-widest text-[11px]"
              >
                Sign In to Unlock Member Rates & Booking
              </button>
            )}

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
          
          {/* Brand Minimal Luxury Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            {/* Monogram Crest */}
            <div className="w-10 h-10 rounded bg-gradient-to-br from-deep-navy via-primary to-deep-navy dark:from-warm-gold/20 dark:to-deep-navy border border-warm-gold/60 flex items-center justify-center shadow-sm group-hover:border-warm-gold transition-all duration-300">
              <span className="font-serif font-bold text-warm-gold text-lg tracking-tighter">TV</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-bold tracking-tight text-primary dark:text-white leading-tight group-hover:text-warm-gold transition-colors">
                TV Residency
              </span>
              <span className="text-[9px] tracking-[0.28em] uppercase text-warm-gold font-semibold -mt-0.5">
                Refined Kerala Luxury
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
          <div className="flex items-center gap-2.5 sm:gap-3.5">
            
            {/* Currency Selector */}
            <div className="relative">
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

            {/* Wishlist Link */}
            <Link
              to="/rooms"
              className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors relative"
              title="Saved Residences"
            >
              <Heart className={`w-4 h-4 ${favorites.length > 0 ? 'text-red-500 fill-red-500' : ''}`} />
              {favorites.length > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-warm-gold text-primary font-bold text-[9px] rounded-full flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </Link>

            {/* User Account / Auth Experience */}
            {isAuthenticated && user ? (
              <div className="relative">
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
                        <p className="text-[11px] text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
                        <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-warm-gold text-primary">
                          <Sparkles className="w-3 h-3" />
                          <span>{user.membershipTier} VIP Tier</span>
                        </div>
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
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-200 hover:text-warm-gold transition-colors"
                >
                  <UserIcon className="w-3.5 h-3.5 text-warm-gold" />
                  <span>Sign In</span>
                </Link>
                <Link
                  to="/rooms"
                  className="hidden sm:inline-flex bg-deep-navy dark:bg-warm-gold text-white dark:text-primary font-semibold text-xs px-4 py-2.5 rounded hover:bg-primary dark:hover:bg-gold-light transition-all shadow-sm items-center gap-1.5"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Explore Stays</span>
                </Link>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-gray-800 dark:text-white hover:text-warm-gold transition-colors"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Overlay Drawer */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex flex-col justify-start">
            {/* Backdrop overlay (click outside to close) */}
            <div 
              className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
              onClick={() => setMobileMenuOpen(false)} 
              aria-hidden="true"
            />

            {/* Slide-Down Menu Content */}
            <div 
              className="relative w-full max-h-[90vh] overflow-y-auto bg-white dark:bg-[#121418] border-b border-warm-gold/30 shadow-level-3 p-5 z-10 animate-fade-in flex flex-col text-left"
            >
              {/* Header with TV Monogram Logo & Close (X) Button */}
              <div className="flex justify-between items-center pb-4 border-b border-gray-100 dark:border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded bg-gradient-to-br from-deep-navy via-primary to-deep-navy dark:from-warm-gold/20 dark:to-deep-navy border border-warm-gold/60 flex items-center justify-center shadow-sm">
                    <span className="font-serif font-bold text-warm-gold text-sm">TV</span>
                  </div>
                  <div>
                    <span className="font-serif text-lg font-bold text-primary dark:text-white block leading-tight">
                      TV Residency
                    </span>
                    <span className="text-[8px] tracking-[0.25em] uppercase text-warm-gold font-semibold block">
                      Collegepadi, Kottakkal
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-full text-gray-500 dark:text-gray-300 hover:text-warm-gold hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
                  aria-label="Close navigation menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Navigation Links Grid */}
              <nav className="py-4 space-y-1">
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
                      className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-soft-beige/60 dark:bg-warm-gold/15 text-primary dark:text-warm-gold font-bold'
                          : 'text-gray-800 dark:text-gray-200 hover:text-warm-gold hover:bg-gray-50 dark:hover:bg-white/5'
                      }`}
                    >
                      <span>{item.label}</span>
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-warm-gold"></span>}
                    </Link>
                  );
                })}
              </nav>

              {/* User / Authentication Actions */}
              <div className="pt-3 pb-2 border-t border-gray-100 dark:border-white/10 space-y-3">
                {isAuthenticated && user ? (
                  <div className="p-3.5 bg-warm-gold/10 rounded-xl border border-warm-gold/30 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-warm-gold text-primary flex items-center justify-center font-bold text-xs">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <div className="text-xs font-bold text-gray-900 dark:text-white">{user.name}</div>
                          <div className="text-[10px] text-gray-500 dark:text-gray-400">{user.email}</div>
                        </div>
                      </div>
                      <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-warm-gold text-primary uppercase tracking-wider">
                        {user.membershipTier}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-warm-gold/20 text-xs">
                      <Link
                        to="/bookings"
                        onClick={() => setMobileMenuOpen(false)}
                        className="font-bold text-primary dark:text-warm-gold hover:underline flex items-center gap-1"
                      >
                        <Bookmark className="w-3.5 h-3.5" />
                        <span>My Bookings</span>
                      </Link>

                      <button
                        type="button"
                        onClick={handleLogout}
                        className="text-red-500 hover:underline font-semibold flex items-center gap-1"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full py-2.5 px-3.5 border border-warm-gold/50 hover:border-warm-gold text-warm-gold hover:bg-warm-gold hover:text-primary transition-all rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 text-center"
                  >
                    <UserIcon className="w-4 h-4" />
                    <span>Sign In / Profile</span>
                  </Link>
                )}

                {/* Book Your Stay CTA */}
                <Link
                  to="/rooms"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-3 bg-deep-navy dark:bg-warm-gold text-white dark:text-primary font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-primary dark:hover:bg-gold-light transition-all flex items-center justify-center gap-2 shadow-md text-center"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Your Stay</span>
                </Link>
              </div>

              {/* Footer Quick Controls */}
              <div className="pt-3 border-t border-gray-100 dark:border-white/10 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                <button
                  type="button"
                  onClick={toggleDarkMode}
                  className="flex items-center gap-1.5 hover:text-warm-gold transition-colors"
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
                  className="flex items-center gap-1 text-warm-gold font-semibold hover:underline"
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span>Ask Concierge</span>
                </button>
              </div>

            </div>
          </div>
        )}
      </header>
    </>
  );
};
