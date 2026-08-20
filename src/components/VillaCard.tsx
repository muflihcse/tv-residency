import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import type { Property } from '../types';
import { useResidency } from '../context/ResidencyContext';
import { useAuth } from '../context/AuthContext';
import { Star, Heart, Users, ArrowRight, Waves, Home } from 'lucide-react';

interface VillaCardProps {
  villa: Property;
}

export const VillaCard: React.FC<VillaCardProps> = ({ villa }) => {
  const { formatPrice, isFavorite, toggleFavorite } = useResidency();
  const { isAuthenticated, openLoginModal } = useAuth();
  const navigate = useNavigate();

  const fav = isFavorite(villa.id);

  const handleReserveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (!isAuthenticated) {
      openLoginModal(`/booking/${villa.id}`);
    } else {
      navigate(`/booking/${villa.id}`);
    }
  };

  return (
    <article className="bg-white dark:bg-[#15171C] rounded-2xl overflow-hidden shadow-level-2 hover:shadow-level-3 border border-soft-beige/60 dark:border-white/10 flex flex-col group transition-all duration-500 hover:-translate-y-1.5">
      
      {/* Image Container with Luxury Overlay */}
      <Link to={`/property/${villa.id}`} className="relative aspect-[16/10] overflow-hidden bg-gray-900 block">
        <img
          src={villa.images[0] || 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80'}
          alt={villa.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80';
          }}
        />

        {/* Ambient Gradient on Image */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

        {/* Pool Indicator Badge */}
        {villa.hasPool && (
          <div className="absolute top-3.5 left-3.5 bg-gradient-to-r from-deep-navy to-primary text-warm-gold border border-warm-gold/50 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-md flex items-center gap-1.5 backdrop-blur-md">
            <Waves className="w-3.5 h-3.5" />
            <span>{villa.poolType || 'Private Pool'}</span>
          </div>
        )}

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
              <span>{villa.bedrooms} {villa.bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}</span>
            </span>
            <span className="flex items-center gap-1 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-md text-[11px]">
              <Users className="w-3.5 h-3.5 text-warm-gold" />
              <span>Up to {villa.maxGuests}</span>
            </span>
          </div>
          <span className="text-[11px] font-medium bg-warm-gold/90 text-primary px-2 py-0.5 rounded font-bold">
            {villa.sqft} sqft
          </span>
        </div>
      </Link>

      {/* Villa Card Content */}
      <div className="p-6 flex flex-col flex-1 gap-4">
        
        {/* Title and Rating */}
        <div className="flex justify-between items-start gap-2">
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

          <div className="flex items-center gap-1 bg-warm-gold/15 dark:bg-warm-gold/20 px-2.5 py-1 rounded-lg flex-shrink-0">
            <Star className="w-3.5 h-3.5 fill-warm-gold text-warm-gold" />
            <span className="text-xs font-bold text-primary dark:text-warm-gold">{villa.rating.toFixed(2)}</span>
            <span className="text-[10px] text-gray-500 dark:text-gray-400">({villa.reviewCount})</span>
          </div>
        </div>

        {/* Short Description */}
        <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
          {villa.description}
        </p>

        {/* Key Amenities Grid */}
        <div className="grid grid-cols-2 gap-2 pt-1 text-[11px] text-gray-700 dark:text-gray-300">
          {villa.amenities.slice(0, 4).map((amenity, i) => (
            <div key={i} className="flex items-center gap-1.5 truncate">
              <span className="w-1.5 h-1.5 rounded-full bg-warm-gold flex-shrink-0" />
              <span className="truncate">{amenity}</span>
            </div>
          ))}
        </div>

        {/* Price & Action Row */}
        <div className="pt-4 mt-auto border-t border-gray-100 dark:border-white/10 flex justify-between items-end gap-2">
          <div>
            <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Exclusive Villa Rate</span>
            <div className="flex items-baseline gap-1.5">
              <span className="font-sans font-bold text-2xl text-primary dark:text-white">
                {formatPrice(villa.priceINR)}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">/night</span>
            </div>
            {villa.originalPriceINR && (
              <span className="text-[11px] text-gray-400 line-through block">
                {formatPrice(villa.originalPriceINR)}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Link
              to={`/property/${villa.id}`}
              className="h-10 px-4 border border-deep-navy dark:border-white/30 text-deep-navy dark:text-white rounded-lg text-xs font-bold hover:bg-deep-navy hover:text-white dark:hover:bg-white/10 transition-colors flex items-center justify-center"
            >
              View Villa
            </Link>
            <button
              onClick={handleReserveClick}
              className="h-10 px-4 bg-warm-gold text-primary rounded-lg text-xs font-bold hover:bg-gold-light transition-all shadow-sm flex items-center gap-1.5"
            >
              <span>Reserve</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </article>
  );
};
