import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import type { Property } from '../types';
import { useResidency } from '../context/ResidencyContext';
import { useAuth } from '../context/AuthContext';
import { Heart, Users, Home, Check, ArrowRight, AlertCircle } from 'lucide-react';

interface VillaCardProps {
  villa: Property;
}

export const VillaCard: React.FC<VillaCardProps> = ({ villa }) => {
  const { formatPrice, isFavorite, toggleFavorite, getAvailableUnits, isFullyBooked } = useResidency();
  const { isAuthenticated, openLoginModal } = useAuth();
  const navigate = useNavigate();

  const fav = isFavorite(villa.id);
  const availableUnits = getAvailableUnits(villa.id);
  const fullyBooked = isFullyBooked(villa.id);

  const handleReserveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (fullyBooked) return;

    if (!isAuthenticated) {
      openLoginModal(`/booking/${villa.id}`);
    } else {
      navigate(`/booking/${villa.id}`);
    }
  };

  return (
    <article className={`bg-white dark:bg-[#15171C] rounded-2xl overflow-hidden shadow-level-2 hover:shadow-level-3 border flex flex-col group transition-all duration-500 hover:-translate-y-1.5 ${
      fullyBooked ? 'border-red-300 dark:border-red-900/40 opacity-90' : 'border-soft-beige/60 dark:border-white/10'
    }`}>
      
      {/* Image Container with Luxury Overlay */}
      <Link to={`/property/${villa.id}`} className="relative aspect-[16/10] overflow-hidden bg-gray-900 block">
        <img
          src={villa.images[0] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'}
          alt={villa.name}
          className={`w-full h-full object-cover transition-transform duration-700 ease-out ${
            fullyBooked ? 'grayscale-[30%] group-hover:scale-100' : 'group-hover:scale-105'
          }`}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80';
          }}
        />

        {/* Ambient Gradient on Image */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

        {/* Top Badges */}
        <div className="absolute top-3.5 left-3.5 flex flex-wrap gap-2">
          {fullyBooked ? (
            <span className="bg-red-600 text-white backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-md flex items-center gap-1 animate-pulse">
              <AlertCircle className="w-3 h-3" />
              <span>Fully Booked</span>
            </span>
          ) : availableUnits === 1 ? (
            <span className="bg-amber-500 text-primary backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm">
              Only 1 Villa Left!
            </span>
          ) : (
            <span className="bg-white/95 dark:bg-black/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-primary dark:text-warm-gold uppercase tracking-wider shadow-sm border border-warm-gold/30">
              {availableUnits} Available
            </span>
          )}

          {villa.isAC ? (
            <span className="bg-deep-navy/90 text-warm-gold text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-sm">
              AC Villa
            </span>
          ) : (
            <span className="bg-gray-800/90 text-gray-200 text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-sm">
              Standard Villa
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleFavorite(villa.id);
          }}
          className="absolute top-3.5 right-3.5 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md text-white hover:text-red-400 hover:scale-110 transition-all flex items-center justify-center z-10"
          title={fav ? 'Remove from favorites' : 'Save to favorites'}
        >
          <Heart className={`w-4 h-4 ${fav ? 'text-red-500 fill-red-500' : ''}`} />
        </button>

        {/* Bottom Specs Overlay */}
        <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center text-white text-xs">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-md text-[11px]">
              <Home className="w-3.5 h-3.5 text-warm-gold" />
              <span>{villa.bedrooms} {villa.bedrooms === 1 ? 'Room' : 'Rooms'}</span>
            </span>
            <span className="flex items-center gap-1 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-md text-[11px]">
              <Users className="w-3.5 h-3.5 text-warm-gold" />
              <span>Up to {villa.maxGuests} Guests</span>
            </span>
          </div>
        </div>
      </Link>

      {/* Villa Card Content */}
      <div className="p-6 flex flex-col flex-1 gap-4">
        
        {/* Title and Tagline */}
        <div>
          <Link to={`/property/${villa.id}`}>
            <h3 className="font-serif text-xl font-bold text-primary dark:text-white group-hover:text-warm-gold transition-colors line-clamp-1">
              {villa.name}
            </h3>
          </Link>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-1">
            {villa.tagline}
          </p>
        </div>

        {/* Short Description */}
        <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
          {villa.description}
        </p>

        {/* Key Features Breakdown */}
        <div className="grid grid-cols-2 gap-2 pt-1 text-[11px] text-gray-700 dark:text-gray-300">
          {villa.highlights.map((item, i) => (
            <div key={i} className="flex items-center gap-1.5 truncate">
              <Check className="w-3 h-3 text-warm-gold flex-shrink-0" />
              <span className="truncate">{item}</span>
            </div>
          ))}
        </div>

        {/* Price & Action Row */}
        <div className="pt-4 mt-auto border-t border-gray-100 dark:border-white/10 flex justify-between items-end gap-2">
          <div>
            <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Price per night</span>
            <div className="flex items-baseline gap-1.5">
              <span className="font-sans font-bold text-xl text-primary dark:text-white">
                {formatPrice(villa.priceINR)}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">/night</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to={`/property/${villa.id}`}
              className="h-9 px-3.5 border border-deep-navy dark:border-white/30 text-deep-navy dark:text-white rounded-lg text-xs font-bold hover:bg-deep-navy hover:text-white dark:hover:bg-white/10 transition-colors flex items-center justify-center"
            >
              Details
            </Link>

            {fullyBooked ? (
              <button
                disabled
                className="h-9 px-4 bg-gray-300 dark:bg-gray-800 text-gray-500 dark:text-gray-400 rounded-lg text-xs font-bold cursor-not-allowed shadow-none flex items-center gap-1"
                title="This villa is fully booked"
              >
                <span>Full Booked</span>
              </button>
            ) : (
              <button
                onClick={handleReserveClick}
                className="h-9 px-4 bg-deep-navy dark:bg-warm-gold text-white dark:text-primary rounded-lg text-xs font-bold hover:bg-primary dark:hover:bg-gold-light transition-all shadow-sm flex items-center gap-1"
              >
                <span>Reserve</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

      </div>
    </article>
  );
};
