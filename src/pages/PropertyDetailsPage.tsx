import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PROPERTIES, REVIEWS } from '../data/residencyData';
import { BookingCard } from '../components/BookingCard';
import { useResidency } from '../context/ResidencyContext';
import { 
  Star, 
  Heart, 
  Share2, 
  MapPin, 
  Check, 
  ChevronLeft, 
  ChevronRight, 
  ShieldCheck, 
  Sparkles, 
  Maximize2, 
  Clock, 
  CheckCircle2, 
  X 
} from 'lucide-react';

export const PropertyDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { isFavorite, toggleFavorite, showToast } = useResidency();

  const property = PROPERTIES.find(p => p.id === id);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [fullscreenGalleryOpen, setFullscreenGalleryOpen] = useState(false);

  if (!property) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 text-center">
        <h2 className="font-serif text-3xl font-bold text-primary dark:text-white mb-3">
          Property Not Found
        </h2>
        <p className="text-xs text-gray-500 mb-6">
          The requested sanctuary residence could not be found in our collection.
        </p>
        <Link
          to="/rooms"
          className="px-6 py-2.5 bg-warm-gold text-primary font-bold text-xs uppercase tracking-wider rounded-xl"
        >
          Explore All Stays
        </Link>
      </div>
    );
  }

  const fav = isFavorite(property.id);
  const propertyReviews = REVIEWS.filter(r => r.propertyId === property.id || !r.propertyId).slice(0, 6);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${property.name} | TV Residency`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Property link copied to clipboard!', 'gold');
    }
  };

  const handlePrevImage = () => {
    setActiveImageIndex(prev => (prev - 1 + property.images.length) % property.images.length);
  };

  const handleNextImage = () => {
    setActiveImageIndex(prev => (prev + 1) % property.images.length);
  };

  return (
    <div className="min-h-screen bg-background dark:bg-surface-dark py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Breadcrumb & Top Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs">
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
            <Link to="/" className="hover:text-warm-gold transition-colors">Home</Link>
            <span>/</span>
            <Link to={property.type === 'villa' ? '/villas' : '/rooms'} className="hover:text-warm-gold transition-colors capitalize">
              {property.type === 'villa' ? 'Private Villas' : 'Rooms & Suites'}
            </Link>
            <span>/</span>
            <span className="text-gray-900 dark:text-white font-semibold truncate max-w-xs">{property.name}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/5 font-semibold text-xs transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share</span>
            </button>
            <button
              onClick={() => toggleFavorite(property.id)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/5 font-semibold text-xs transition-colors"
            >
              <Heart className={`w-3.5 h-3.5 ${fav ? 'text-red-500 fill-red-500' : ''}`} />
              <span>{fav ? 'Saved' : 'Save'}</span>
            </button>
          </div>
        </div>

        {/* Title & Location Header */}
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-serif text-2xl sm:text-4xl font-bold text-primary dark:text-white tracking-tight">
              {property.name}
            </h1>
            {property.badge && (
              <span className="bg-warm-gold text-primary font-bold text-[10px] px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                {property.badge}
              </span>
            )}
          </div>
          
          <div className="flex flex-wrap items-center gap-4 text-xs text-gray-600 dark:text-gray-300">
            <div className="flex items-center gap-1 font-bold text-gray-900 dark:text-white">
              <Star className="w-4 h-4 fill-warm-gold text-warm-gold" />
              <span>{property.rating.toFixed(2)}</span>
              <span className="underline cursor-pointer text-gray-500 font-normal">({property.reviewCount} Verified Reviews)</span>
            </div>
            <span>•</span>
            <a
              href="https://share.google/n1Z6lQmv4DNvdLZXF"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-gray-500 dark:text-gray-400 hover:text-warm-gold transition-colors group"
            >
              <MapPin className="w-3.5 h-3.5 text-warm-gold group-hover:scale-110 transition-transform" />
              <span>{property.address}</span>
              <span className="text-warm-gold font-bold ml-1.5 underline">📍 View on Google Maps →</span>
            </a>
          </div>
        </div>

        {/* Swiper / Interactive Photo Gallery */}
        <div className="space-y-3">
          <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden bg-black shadow-level-3">
            <img
              src={property.images[activeImageIndex] || 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80'}
              alt={`${property.name} preview`}
              className="w-full h-full object-cover transition-all duration-500"
              onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80';
              }}
            />
            
            {/* Prev / Next Carousel Controls */}
            <button
              onClick={handlePrevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-all shadow-md"
              title="Previous photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-all shadow-md"
              title="Next photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* View Fullscreen Button */}
            <button
              onClick={() => setFullscreenGalleryOpen(true)}
              className="absolute bottom-4 right-4 bg-black/75 hover:bg-black text-white px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-md backdrop-blur-sm"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>View All {property.images.length} Photos</span>
            </button>
          </div>

          {/* Thumbnails Strip */}
          <div className="flex gap-3 overflow-x-auto pb-1 no-scrollbar">
            {property.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`relative w-24 sm:w-32 aspect-[16/10] rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all ${
                  activeImageIndex === idx ? 'border-warm-gold scale-105 shadow-md' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img 
                  src={img} 
                  alt={`Thumbnail ${idx + 1}`} 
                  className="w-full h-full object-cover" 
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80';
                  }}
                />
              </button>
            ))}
          </div>
        </div>

        {/* 2-Column Split: Content & Sticky Booking Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start pt-4">
          
          {/* Main Info (8 cols) */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* Quick Specs Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-white dark:bg-[#15171C] border border-gray-100 dark:border-white/5 shadow-sm">
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Dimensions</span>
                <span className="text-sm font-bold text-primary dark:text-white">{property.sqft.toLocaleString()} sqft</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Max Guests</span>
                <span className="text-sm font-bold text-primary dark:text-white">Up to {property.maxGuests} Guests</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Bed Type</span>
                <span className="text-sm font-bold text-primary dark:text-white truncate">{property.bedType}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Pool & Horizon</span>
                <span className="text-sm font-bold text-warm-gold">{property.hasPool ? 'Private Pool' : 'Lagoon Pool Access'}</span>
              </div>
            </div>

            {/* Highlights */}
            <div>
              <h3 className="text-xs font-bold text-warm-gold uppercase tracking-widest mb-3 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                Residency Key Highlights
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {property.highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-2 p-3.5 rounded-xl bg-soft-beige/40 dark:bg-white/5 text-xs font-semibold text-gray-800 dark:text-gray-200 border border-warm-gold/20">
                    <Check className="w-4 h-4 text-warm-gold flex-shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Narrative Description */}
            <div className="space-y-4">
              <h2 className="font-serif text-2xl font-bold text-primary dark:text-white">
                The Sanctuary Experience
              </h2>
              <div className="w-12 h-0.5 bg-warm-gold"></div>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                {property.longDescription}
              </p>
            </div>

            {/* Included Amenities Grid */}
            <div className="space-y-4 pt-6 border-t border-gray-100 dark:border-white/10">
              <h3 className="font-serif text-xl font-bold text-primary dark:text-white">
                In-Villa & Resort Inclusions
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {property.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center gap-2.5 text-xs text-gray-700 dark:text-gray-300">
                    <span className="w-2 h-2 rounded-full bg-warm-gold flex-shrink-0" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* House Rules & Policies */}
            <div className="space-y-4 pt-6 border-t border-gray-100 dark:border-white/10">
              <h3 className="font-serif text-xl font-bold text-primary dark:text-white">
                House Rules & Check-In Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-gray-600 dark:text-gray-300">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-warm-gold" />
                    <span>Check-in: <strong>{property.checkInTime}</strong> | Check-out: <strong>{property.checkOutTime}</strong></span>
                  </div>
                  <div>• Government Photo ID required upon registration</div>
                  <div>• Quiet hours observed after 22:30 in suites</div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold">
                    <ShieldCheck className="w-4 h-4" />
                    <span>{property.cancellationPolicy}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Verified Reviews Section (20+ reviews preview) */}
            <div className="space-y-6 pt-6 border-t border-gray-100 dark:border-white/10">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-primary dark:text-white flex items-center gap-2">
                    <span>Guest Reviews</span>
                    <span className="text-sm font-sans font-bold text-warm-gold bg-warm-gold/10 px-2.5 py-0.5 rounded-full">
                      ★ {property.rating.toFixed(2)}
                    </span>
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Based on {property.reviewCount} verified guest stays at TV Residency
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {propertyReviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="p-5 rounded-2xl bg-white dark:bg-[#15171C] border border-gray-100 dark:border-white/5 space-y-2.5 shadow-sm"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="text-xs font-bold text-primary dark:text-white flex items-center gap-1">
                          <span>{rev.author}</span>
                          <CheckCircle2 className="w-3.5 h-3.5 text-warm-gold" />
                        </div>
                        <div className="text-[10px] text-gray-400">{rev.location} • {rev.stayType}</div>
                      </div>
                      <div className="flex items-center gap-0.5 text-warm-gold">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-warm-gold text-warm-gold" />
                        ))}
                      </div>
                    </div>
                    <div className="text-xs font-bold text-gray-800 dark:text-gray-200">"{rev.title}"</div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-3">
                      {rev.comment}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Sticky Booking Card (4 cols) */}
          <div className="lg:col-span-4">
            <BookingCard property={property} />
          </div>

        </div>

      </div>

      {/* Fullscreen Photo Gallery Modal */}
      {fullscreenGalleryOpen && (
        <div className="fixed inset-0 z-50 bg-black flex flex-col p-4 animate-fade-in">
          <div className="flex justify-between items-center text-white pb-3 border-b border-white/10">
            <div className="font-serif font-bold text-sm">
              {property.name} — Photo {activeImageIndex + 1} of {property.images.length}
            </div>
            <button
              onClick={() => setFullscreenGalleryOpen(false)}
              className="p-2 text-gray-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center relative my-4">
            <img
              src={property.images[activeImageIndex]}
              alt="fullscreen"
              className="max-h-[85vh] max-w-full object-contain"
            />
            <button
              onClick={handlePrevImage}
              className="absolute left-4 w-12 h-12 rounded-full bg-black/60 text-white flex items-center justify-center"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-4 w-12 h-12 rounded-full bg-black/60 text-white flex items-center justify-center"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
