import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PROPERTIES, RESIDENCY_CONTACT, REVIEWS } from '../data/residencyData';
import { BookingCard } from '../components/BookingCard';
import { useResidency } from '../context/ResidencyContext';
import { 
  Heart, 
  Share2, 
  MapPin, 
  Check, 
  ChevronLeft, 
  ChevronRight, 
  ShieldCheck, 
  Maximize2, 
  Clock, 
  X,
  Phone,
  Star,
  CheckCircle,
  Quote
} from 'lucide-react';

export const PropertyDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { isFavorite, toggleFavorite, showToast, getAvailableUnits, isFullyBooked } = useResidency();

  const property = PROPERTIES.find(p => p.id === id);
  const availableUnits = property ? getAvailableUnits(property.id) : 0;
  const fullyBooked = property ? isFullyBooked(property.id) : false;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [fullscreenGalleryOpen, setFullscreenGalleryOpen] = useState(false);

  if (!property) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 text-center">
        <h2 className="font-serif text-3xl font-bold text-primary dark:text-white mb-3">
          Accommodation Not Found
        </h2>
        <p className="text-xs text-gray-500 mb-6">
          The requested room or villa could not be found.
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

  // Relevant Kerala guest reviews for this accommodation or general Kerala guests
  const relatedReviews = REVIEWS.filter(r => r.propertyId === property.id || !r.propertyId);
  const displayReviews = relatedReviews.length > 0 ? relatedReviews : REVIEWS.slice(0, 2);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${property.name} | TV Residency`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Link copied to clipboard!', 'gold');
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
              {property.type === 'villa' ? 'Villas' : 'Rooms'}
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
            {property.isAC ? (
              <span className="bg-deep-navy text-warm-gold font-bold text-[10px] px-3 py-1 rounded-full uppercase tracking-wider">
                AC
              </span>
            ) : (
              <span className="bg-gray-700 text-gray-200 font-bold text-[10px] px-3 py-1 rounded-full uppercase tracking-wider">
                Non-AC
              </span>
            )}
          </div>
          
          <div className="flex flex-wrap items-center gap-4 text-xs text-gray-600 dark:text-gray-300">
            <a
              href={RESIDENCY_CONTACT.googleMapsUrl}
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

        {/* Interactive Photo Gallery */}
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
          <div className="lg:col-span-8 space-y-8">
            
            {/* Real Property Breakdown Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-white dark:bg-[#15171C] border border-gray-100 dark:border-white/5 shadow-sm">
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Climate Type</span>
                <span className="text-sm font-bold text-primary dark:text-white">{property.isAC ? 'Air-Conditioned' : 'Non-AC'}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Guest Capacity</span>
                <span className="text-sm font-bold text-primary dark:text-white">Up to {property.maxGuests} Guests</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Bed Setup</span>
                <span className="text-sm font-bold text-primary dark:text-white truncate">{property.bedType}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Available Units</span>
                <span className={`text-sm font-bold ${fullyBooked ? 'text-red-500 font-semibold' : availableUnits === 1 ? 'text-amber-500' : 'text-warm-gold'}`}>
                  {fullyBooked ? 'Fully Booked' : `${availableUnits} Available`}
                </span>
              </div>
            </div>

            {/* Comprehensive Features Specification Checklist */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#15171C] border border-gray-100 dark:border-white/5 shadow-sm space-y-4">
              <h3 className="font-serif text-lg font-bold text-primary dark:text-white">
                Accommodation Structure & Layout
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <Check className="w-4 h-4 text-warm-gold" />
                  <span>Type: <strong>{property.type === 'villa' ? 'Villa' : 'Room'}</strong></span>
                </div>
                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <Check className="w-4 h-4 text-warm-gold" />
                  <span>Bedrooms: <strong>{property.bedrooms} {property.bedrooms === 1 ? 'Room' : 'Rooms'}</strong></span>
                </div>
                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <Check className="w-4 h-4 text-warm-gold" />
                  <span>Bathroom: <strong>{property.bathrooms} Attached</strong></span>
                </div>
                {property.hasHall && (
                  <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                    <Check className="w-4 h-4 text-warm-gold" />
                    <span>Living Hall: <strong>Included</strong></span>
                  </div>
                )}
                {property.hasKitchen && (
                  <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                    <Check className="w-4 h-4 text-warm-gold" />
                    <span>Kitchen: <strong>{property.hasStove ? 'Kitchen + Stove' : 'Kitchen Area'}</strong></span>
                  </div>
                )}
                {property.hasSitout && (
                  <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                    <Check className="w-4 h-4 text-warm-gold" />
                    <span>Sit-out: <strong>Private Verandah</strong></span>
                  </div>
                )}
              </div>
            </div>

            {/* Narrative Description */}
            <div className="space-y-4">
              <h2 className="font-serif text-2xl font-bold text-primary dark:text-white">
                Accommodation Description
              </h2>
              <div className="w-12 h-0.5 bg-warm-gold"></div>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                {property.longDescription}
              </p>
            </div>

            {/* Confirmed Amenities Grid */}
            <div className="space-y-4 pt-6 border-t border-gray-100 dark:border-white/10">
              <h3 className="font-serif text-xl font-bold text-primary dark:text-white">
                Essential Facilities
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Everything you need for a comfortable and convenient stay.
              </p>
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
                Check-In & Stay Guidelines
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-gray-600 dark:text-gray-300">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-warm-gold" />
                    <span>Check-in: <strong>{property.checkInTime}</strong> | Check-out: <strong>{property.checkOutTime}</strong></span>
                  </div>
                  <div>• Valid Government ID required upon registration</div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold">
                    <ShieldCheck className="w-4 h-4" />
                    <span>{property.cancellationPolicy}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Kerala Guest Reviews for this Property */}
            <div className="space-y-4 pt-6 border-t border-gray-100 dark:border-white/10">
              <div className="flex justify-between items-end">
                <div>
                  <h3 className="font-serif text-xl font-bold text-primary dark:text-white">
                    Feedback from Kerala Guests
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    Real experiences from guests visiting TV Residency in Kottakkal.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {displayReviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="p-5 rounded-2xl bg-white dark:bg-[#15171C] border border-gray-100 dark:border-white/5 shadow-sm space-y-3 relative"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-1 text-warm-gold">
                        {Array.from({ length: rev.rating }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-warm-gold text-warm-gold" />
                        ))}
                      </div>
                      <Quote className="w-5 h-5 text-warm-gold/20 flex-shrink-0" />
                    </div>

                    <h4 className="font-serif font-bold text-sm text-primary dark:text-white">
                      "{rev.title}"
                    </h4>

                    <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                      {rev.comment}
                    </p>

                    <div className="pt-3 border-t border-gray-100 dark:border-white/5 flex items-center justify-between text-xs">
                      <div>
                        <div className="font-bold text-primary dark:text-white flex items-center gap-1">
                          <span>{rev.author}</span>
                          {rev.verified && <CheckCircle className="w-3 h-3 text-emerald-500" />}
                        </div>
                        <div className="text-[11px] text-gray-400 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-warm-gold" />
                          <span>{rev.location}</span>
                        </div>
                      </div>

                      <span className="text-[10px] text-gray-400 font-medium">
                        {rev.date}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct Contact Notice */}
            <div className="p-6 rounded-2xl bg-[#0B1526] border border-warm-gold/30 text-white flex flex-col sm:flex-row justify-between items-center gap-4">
              <div>
                <h4 className="font-serif font-bold text-base text-white">Have questions about this stay?</h4>
                <p className="text-xs text-gray-300 mt-0.5">Contact TV Residency desk for room details, villa options, and booking enquiries.</p>
              </div>
              <a
                href={`tel:${RESIDENCY_CONTACT.phone}`}
                className="px-5 py-2.5 bg-warm-gold text-primary font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-gold-light transition-all flex items-center gap-1.5 flex-shrink-0"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call {RESIDENCY_CONTACT.phone}</span>
              </a>
            </div>

          </div>

          {/* Sticky Booking Card (4 cols) */}
          <div className="lg:col-span-4">
            <BookingCard property={property} />
          </div>

        </div>

      </div>

      {/* Fullscreen Gallery Lightbox */}
      {fullscreenGalleryOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between p-4 sm:p-8 backdrop-blur-md">
          <div className="flex justify-between items-center text-white">
            <span className="text-xs font-serif font-bold tracking-wider">
              {property.name} — Photo {activeImageIndex + 1} of {property.images.length}
            </span>
            <button
              onClick={() => setFullscreenGalleryOpen(false)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="relative max-w-5xl mx-auto w-full aspect-[16/9] flex items-center justify-center">
            <img
              src={property.images[activeImageIndex]}
              alt={property.name}
              className="max-h-full max-w-full object-contain rounded-xl"
            />
            <button
              onClick={handlePrevImage}
              className="absolute left-2 sm:-left-12 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-2 sm:-right-12 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          <div className="flex justify-center gap-2 overflow-x-auto py-2">
            {property.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`w-16 h-12 rounded-lg overflow-hidden border-2 flex-shrink-0 transition-all ${
                  activeImageIndex === idx ? 'border-warm-gold scale-105' : 'border-transparent opacity-50'
                }`}
              >
                <img src={img} alt="thumb" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
