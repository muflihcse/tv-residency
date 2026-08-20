import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useResidency } from '../context/ResidencyContext';
import { useAuth } from '../context/AuthContext';
import { PROPERTIES } from '../data/residencyData';
import { X, Heart, Trash2, ArrowRight, Bed, Users, AlertCircle, Sparkles } from 'lucide-react';

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WishlistModal: React.FC<WishlistModalProps> = ({ isOpen, onClose }) => {
  const { favorites, toggleFavorite, formatPrice, getAvailableUnits, isFullyBooked } = useResidency();
  const { isAuthenticated, openLoginModal } = useAuth();
  const navigate = useNavigate();

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const favoriteProperties = PROPERTIES.filter(p => favorites.includes(p.id));

  const handleBookNow = (propertyId: string) => {
    onClose();
    if (!isAuthenticated) {
      openLoginModal(`/booking/${propertyId}`);
    } else {
      navigate(`/booking/${propertyId}`);
    }
  };

  return (
    <div className="fixed inset-0 z-[99999] flex justify-end">
      
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 animate-fade-in"
        onClick={onClose}
      />

      {/* Slide-over Drawer / Responsive Panel */}
      <div className="relative w-full max-w-md md:max-w-lg bg-white dark:bg-[#15171C] text-gray-900 dark:text-gray-100 shadow-2xl z-10 flex flex-col h-full overflow-hidden transition-transform duration-300 animate-slide-left border-l border-gray-100 dark:border-white/10">
        
        {/* Header */}
        <div className="p-5 border-b border-gray-100 dark:border-white/10 flex justify-between items-center bg-white/80 dark:bg-[#15171C]/80 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-warm-gold/15 text-warm-gold flex items-center justify-center">
              <Heart className="w-4 h-4 text-warm-gold fill-warm-gold" />
            </div>
            <div>
              <h2 className="font-serif text-lg font-bold text-primary dark:text-white">
                Saved Wishlist
              </h2>
              <span className="text-[11px] text-gray-500 dark:text-gray-400">
                {favoriteProperties.length} {favoriteProperties.length === 1 ? 'Stay' : 'Stays'} saved
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
            aria-label="Close wishlist"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {favoriteProperties.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-soft-beige dark:bg-white/5 flex items-center justify-center text-gray-400">
                <Heart className="w-8 h-8 opacity-40" />
              </div>
              <div className="space-y-1 max-w-xs">
                <h3 className="font-serif text-lg font-bold text-primary dark:text-white">
                  Your Wishlist is Empty
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                  Browse our rooms and villas in Kottakkal and tap the heart icon on any accommodation to save it for later.
                </p>
              </div>
              <div className="pt-2 flex flex-wrap gap-2 justify-center">
                <Link
                  to="/rooms"
                  onClick={onClose}
                  className="px-5 py-2.5 bg-warm-gold text-primary rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-gold-light transition-all shadow-sm"
                >
                  Explore Rooms
                </Link>
                <Link
                  to="/villas"
                  onClick={onClose}
                  className="px-5 py-2.5 bg-deep-navy dark:bg-white/10 text-white rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-primary dark:hover:bg-white/20 transition-all"
                >
                  Explore Villas
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-3.5">
              {favoriteProperties.map((prop) => {
                const availableUnits = getAvailableUnits(prop.id);
                const fullyBooked = isFullyBooked(prop.id);

                return (
                  <div
                    key={prop.id}
                    className="p-3.5 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 flex gap-3.5 relative group hover:border-warm-gold/40 transition-all"
                  >
                    {/* Thumbnail */}
                    <Link
                      to={`/property/${prop.id}`}
                      onClick={onClose}
                      className="w-24 h-24 rounded-xl overflow-hidden bg-black flex-shrink-0 relative block"
                    >
                      <img
                        src={prop.images[0]}
                        alt={prop.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {prop.isAC ? (
                        <span className="absolute bottom-1 left-1 bg-black/75 backdrop-blur-sm text-warm-gold text-[9px] font-bold px-1.5 py-0.5 rounded">
                          AC
                        </span>
                      ) : (
                        <span className="absolute bottom-1 left-1 bg-black/75 backdrop-blur-sm text-gray-200 text-[9px] font-bold px-1.5 py-0.5 rounded">
                          Non-AC
                        </span>
                      )}
                    </Link>

                    {/* Info */}
                    <div className="flex-1 flex flex-col justify-between min-w-0 pr-6">
                      <div>
                        <div className="flex items-center gap-2">
                          <Link
                            to={`/property/${prop.id}`}
                            onClick={onClose}
                            className="font-serif font-bold text-sm text-primary dark:text-white hover:text-warm-gold transition-colors truncate block"
                          >
                            {prop.name}
                          </Link>
                        </div>
                        
                        <div className="flex items-center gap-2 text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">
                          <span className="flex items-center gap-1">
                            <Users className="w-3 h-3 text-warm-gold" />
                            <span>{prop.maxGuests} guests</span>
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Bed className="w-3 h-3 text-warm-gold" />
                            <span>{prop.bedType}</span>
                          </span>
                        </div>

                        {/* Availability Pill */}
                        <div className="mt-1">
                          {fullyBooked ? (
                            <span className="inline-flex items-center gap-1 text-[9px] font-bold text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-950/40 px-2 py-0.5 rounded">
                              <AlertCircle className="w-2.5 h-2.5" />
                              <span>Fully Booked</span>
                            </span>
                          ) : availableUnits === 1 ? (
                            <span className="inline-flex items-center gap-1 text-[9px] font-bold text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/40 px-2 py-0.5 rounded">
                              <Sparkles className="w-2.5 h-2.5" />
                              <span>Only 1 left!</span>
                            </span>
                          ) : (
                            <span className="text-[9px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/40 px-2 py-0.5 rounded">
                              {availableUnits} Units Available
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Price & Action */}
                      <div className="flex justify-between items-baseline pt-2 mt-1 border-t border-gray-200/60 dark:border-white/5">
                        <div className="flex items-baseline gap-1">
                          <span className="font-bold text-sm text-primary dark:text-white">
                            {formatPrice(prop.priceINR)}
                          </span>
                          <span className="text-[10px] text-gray-400">/night</span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <Link
                            to={`/property/${prop.id}`}
                            onClick={onClose}
                            className="px-2.5 py-1 text-[11px] font-semibold text-gray-700 dark:text-gray-300 hover:text-warm-gold transition-colors"
                          >
                            Details
                          </Link>
                          {fullyBooked ? (
                            <button
                              disabled
                              className="px-3 py-1 bg-gray-200 dark:bg-gray-800 text-gray-400 rounded-lg text-[11px] font-bold cursor-not-allowed"
                            >
                              Sold Out
                            </button>
                          ) : (
                            <button
                              onClick={() => handleBookNow(prop.id)}
                              className="px-3 py-1 bg-deep-navy dark:bg-warm-gold text-white dark:text-primary rounded-lg text-[11px] font-bold hover:bg-primary dark:hover:bg-gold-light transition-all flex items-center gap-1 shadow-sm"
                            >
                              <span>Book</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Remove Icon */}
                    <button
                      type="button"
                      onClick={() => toggleFavorite(prop.id)}
                      className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition-colors p-1"
                      title="Remove from wishlist"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer actions */}
        {favoriteProperties.length > 0 && (
          <div className="p-4 border-t border-gray-100 dark:border-white/10 bg-white dark:bg-[#15171C] flex gap-3">
            <Link
              to="/rooms"
              onClick={onClose}
              className="flex-1 py-3 text-center border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-gray-50 dark:hover:bg-white/5 transition-all"
            >
              Browse More
            </Link>
            <Link
              to="/contact"
              onClick={onClose}
              className="flex-1 py-3 text-center bg-warm-gold text-primary rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-gold-light transition-all shadow-md"
            >
              Contact Desk
            </Link>
          </div>
        )}

      </div>
    </div>
  );
};
