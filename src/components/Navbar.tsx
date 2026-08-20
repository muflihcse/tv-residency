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

  const handleLogout = () => {
    logout();
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

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white dark:bg-[#121418] border-t border-gray-100 dark:border-white/10 px-4 pt-4 pb-6 space-y-4 shadow-level-3 animate-fade-in">
            <div className="grid grid-cols-2 gap-2 pb-3 border-b border-gray-100 dark:border-white/10">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="py-2.5 px-3 text-sm font-medium text-gray-800 dark:text-gray-200 hover:text-warm-gold rounded-md hover:bg-gray-50 dark:hover:bg-white/5"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="flex flex-col gap-3 pt-2">
              {isAuthenticated && user ? (
                <div className="p-3 bg-warm-gold/10 rounded-xl border border-warm-gold/30 flex justify-between items-center">
                  <div>
                    <div className="text-xs font-bold text-gray-900 dark:text-white">{user.name}</div>
                    <div className="text-[11px] text-warm-gold font-semibold">{user.membershipTier} Member Tier</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Link to="/bookings" className="text-xs font-bold text-primary dark:text-warm-gold underline">
                      My Bookings
                    </Link>
                    <button onClick={handleLogout} className="text-xs text-red-500 underline font-medium">
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="w-full py-3 border border-warm-gold text-warm-gold text-xs font-bold rounded-lg uppercase tracking-wider text-center"
                >
                  Sign In / Create Account
                </Link>
              )}

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  toggleConcierge();
                }}
                className="w-full py-2.5 bg-gray-100 dark:bg-white/5 text-gray-800 dark:text-gray-200 text-xs font-semibold rounded-lg flex items-center justify-center gap-2"
              >
                <Compass className="w-4 h-4 text-warm-gold" />
                <span>Ask AI Concierge</span>
              </button>

              <Link
                to="/rooms"
                className="w-full py-3 bg-deep-navy dark:bg-warm-gold text-white dark:text-primary font-bold text-xs uppercase tracking-wider rounded-lg shadow text-center"
              >
                Search Available Stays
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
