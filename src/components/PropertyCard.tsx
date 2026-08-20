import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import type { Property } from '../types';
import { useResidency } from '../context/ResidencyContext';
import { useAuth } from '../context/AuthContext';
import { Star, Heart, Users, Bed, ArrowRight, Check } from 'lucide-react';

interface PropertyCardProps {
  property: Property;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const { formatPrice, isFavorite, toggleFavorite } = useResidency();
  const { isAuthenticated, openLoginModal } = useAuth();
  const navigate = useNavigate();

  const fav = isFavorite(property.id);

  const handleReserveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (!isAuthenticated) {
      openLoginModal(`/booking/${property.id}`);
    } else {
      navigate(`/booking/${property.id}`);
    }
  };

  return (
    <article className="bg-white dark:bg-[#15171C] rounded-2xl overflow-hidden shadow-level-2 hover:shadow-level-3 border border-gray-100 dark:border-white/10 flex flex-col group transition-all duration-500 hover:-translate-y-1.5">
      
      {/* Image Container */}
      <Link to={`/property/${property.id}`} className="relative aspect-[16/10] overflow-hidden bg-gray-100 dark:bg-gray-800 block">
        <img
          src={property.images[0] || 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80'}
          alt={property.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80';
          }}
        />

        {/* Top Badges */}
        <div className="absolute top-3.5 left-3.5 flex flex-wrap gap-2">
          {property.badge && (
            <span className="bg-white/95 dark:bg-black/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-primary dark:text-warm-gold uppercase tracking-wider shadow-sm border border-warm-gold/30">
              {property.badge}
            </span>
          )}
        </div>

        {/* Favorite Heart Button */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleFavorite(property.id);
          }}
          className="absolute top-3.5 right-3.5 w-9 h-9 rounded-full bg-white/90 dark:bg-black/80 backdrop-blur-md flex items-center justify-center text-gray-700 dark:text-gray-200 hover:text-red-500 hover:scale-110 transition-all shadow-sm z-10"
          title={fav ? 'Remove from favorites' : 'Save to favorites'}
        >
          <Heart className={`w-4 h-4 ${fav ? 'text-red-500 fill-red-500' : ''}`} />
        </button>

        {/* Location pill on bottom left */}
        <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-md text-[11px] text-white font-medium">
          {property.location.split(',')[0]}
        </div>
      </Link>

      {/* Card Content */}
      <div className="p-5 sm:p-6 flex flex-col flex-1 gap-3.5">
        
        {/* Title & Rating */}
        <div className="flex justify-between items-start gap-2">
          <div>
            <Link to={`/property/${property.id}`}>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-primary dark:text-white group-hover:text-warm-gold transition-colors line-clamp-1">
                {property.name}
              </h3>
            </Link>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-1">
              {property.tagline}
            </p>
          </div>

          <div className="flex items-center gap-1 bg-soft-beige/60 dark:bg-white/10 px-2 py-1 rounded-md flex-shrink-0">
            <Star className="w-3.5 h-3.5 fill-warm-gold text-warm-gold" />
            <span className="text-xs font-bold text-gray-900 dark:text-white">{property.rating.toFixed(2)}</span>
            <span className="text-[10px] text-gray-500 dark:text-gray-400">({property.reviewCount})</span>
          </div>
        </div>

        {/* Specs Pill Row */}
        <div className="flex flex-wrap items-center gap-3 py-2 border-y border-gray-100 dark:border-white/5 text-xs text-gray-600 dark:text-gray-300">
          <span className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-warm-gold" />
            <span>Up to {property.maxGuests} Guests</span>
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <Bed className="w-3.5 h-3.5 text-warm-gold" />
            <span>{property.bedType}</span>
          </span>
          <span>•</span>
          <span>{property.sqft} sqft</span>
        </div>

        {/* Short Description */}
        <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
          {property.description}
        </p>

        {/* Key Highlight tags */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {property.highlights.slice(0, 3).map((hl, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1 text-[10px] font-semibold text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-white/5 px-2 py-0.5 rounded"
            >
              <Check className="w-3 h-3 text-warm-gold" />
              <span>{hl}</span>
            </span>
          ))}
        </div>

        {/* Footer with Price & Actions */}
        <div className="pt-4 mt-auto border-t border-gray-100 dark:border-white/10 flex justify-between items-end gap-2">
          <div>
            <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Price per night</span>
            <div className="flex items-baseline gap-1.5">
              <span className="font-sans font-bold text-xl text-primary dark:text-white">
                {formatPrice(property.priceINR)}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">/night</span>
            </div>
            {property.originalPriceINR && (
              <span className="text-[11px] text-gray-400 line-through block">
                {formatPrice(property.originalPriceINR)}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Link
              to={`/property/${property.id}`}
              className="h-9 px-3.5 border border-gray-300 dark:border-white/20 text-gray-700 dark:text-gray-200 rounded-lg text-xs font-semibold hover:bg-gray-100 dark:hover:bg-white/10 transition-colors flex items-center justify-center"
            >
              Details
            </Link>
            <button
              onClick={handleReserveClick}
              className="h-9 px-4 bg-deep-navy dark:bg-warm-gold text-white dark:text-primary rounded-lg text-xs font-bold hover:bg-primary dark:hover:bg-gold-light transition-all shadow-sm flex items-center gap-1"
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
