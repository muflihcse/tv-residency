import React, { useState } from 'react';
import { NEARBY_PLACES, RESIDENCY_CONTACT } from '../data/residencyData';
import { MapPin, Navigation, Star, Clock } from 'lucide-react';
import { useResidency } from '../context/ResidencyContext';

export const NearbyExplore: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPlaceId, setSelectedPlaceId] = useState<string>(NEARBY_PLACES[0].id);
  const { showToast } = useResidency();

  const categories = [
    { id: 'all', label: 'All Places' },
    { id: 'beach', label: 'Beaches & Piers' },
    { id: 'culture', label: 'Heritage & Temples' },
    { id: 'nature', label: 'Backwaters & Lagoons' },
    { id: 'dining', label: 'Shopping & Dining' },
    { id: 'transport', label: 'Airport & Travel' },
  ];

  const filteredPlaces = selectedCategory === 'all'
    ? NEARBY_PLACES
    : NEARBY_PLACES.filter(p => p.category === selectedCategory);

  const activePlace = NEARBY_PLACES.find(p => p.id === selectedPlaceId) || NEARBY_PLACES[0];

  const handleGetDirections = (name: string) => {
    showToast(`Private chauffeur route to "${name}" loaded. Concierge ready.`, 'gold');
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-surface-bright dark:bg-[#0E0F13] transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold text-warm-gold uppercase tracking-[0.25em] block mb-2">
            Prime Coastal Location
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-primary dark:text-white tracking-tight">
            Explore Nearby Attractions
          </h2>
          <div className="w-16 h-0.5 bg-warm-gold mx-auto mt-3 mb-4"></div>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            Immerse yourself in pristine crescent beaches, ancient Dravidian palaces, and tranquil backwaters just minutes away.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                selectedCategory === cat.id
                  ? 'bg-deep-navy dark:bg-warm-gold text-white dark:text-primary shadow-sm scale-105'
                  : 'bg-white dark:bg-white/5 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-white/10 hover:border-warm-gold'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* 2-Column Split: Map Placeholder & Places Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Map-Style Luxury Interactive Placeholder (5 cols) */}
          <div className="lg:col-span-5 bg-white dark:bg-[#15171C] rounded-2xl p-6 border border-soft-beige/80 dark:border-white/10 shadow-level-2 sticky top-24">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="font-serif text-lg font-bold text-primary dark:text-white">
                  {RESIDENCY_CONTACT.name}
                </h3>
                <span className="text-xs text-warm-gold font-medium">{RESIDENCY_CONTACT.addressLine1} ({RESIDENCY_CONTACT.landmark})</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-warm-gold/20 flex items-center justify-center text-warm-gold">
                <Navigation className="w-4 h-4" />
              </div>
            </div>

            {/* Stylized Illustrated Map Graphic */}
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-gradient-to-br from-deep-navy via-[#0A2D54] to-primary border border-warm-gold/30 p-4 flex flex-col justify-between text-white shadow-inner">
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:16px_16px]"></div>
              
              {/* Selected Destination badge */}
              <div className="relative z-10 flex justify-between items-start">
                <div className="bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/20 text-xs">
                  <div className="text-[10px] text-gray-300">Selected Destination:</div>
                  <strong className="text-warm-gold">{activePlace.name}</strong>
                </div>
                <span className="bg-warm-gold text-primary text-[10px] font-bold px-2 py-1 rounded">
                  {activePlace.distance}
                </span>
              </div>

              {/* Center TV Monogram Pin */}
              <div className="relative z-10 self-center text-center">
                <a
                  href={RESIDENCY_CONTACT.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-warm-gold text-primary mx-auto flex items-center justify-center font-bold text-sm shadow-gold animate-bounce block hover:scale-110 transition-transform"
                  title="Open in Google Maps"
                >
                  <MapPin className="w-6 h-6 fill-primary" />
                </a>
                <span className="text-xs font-serif font-bold text-white mt-1 block drop-shadow">
                  {RESIDENCY_CONTACT.name}
                </span>
                <span className="text-[10px] text-gray-300 block">
                  {RESIDENCY_CONTACT.addressLine1}
                </span>
              </div>

              {/* Map footer info */}
              <div className="relative z-10 bg-black/60 backdrop-blur-md p-3 rounded-lg flex justify-between items-center text-xs">
                <div>
                  <div className="text-gray-300 text-[10px]">Estimated Chauffeur Travel:</div>
                  <strong className="text-white">{activePlace.travelTime}</strong>
                </div>
                <button
                  onClick={() => handleGetDirections(activePlace.name)}
                  className="px-3 py-1.5 bg-warm-gold text-primary font-bold text-[11px] rounded uppercase tracking-wider hover:bg-gold-light transition-all"
                >
                  Get Route
                </button>
              </div>
            </div>

            {/* Official Google Maps Button */}
            <div className="mt-4 space-y-2">
              <a
                href={RESIDENCY_CONTACT.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-warm-gold text-primary rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 hover:bg-gold-light transition-all shadow-sm text-center"
              >
                <span>📍 View on Google Maps →</span>
              </a>
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                {RESIDENCY_CONTACT.fullAddress} • Phone: <a href={`tel:${RESIDENCY_CONTACT.phone}`} className="text-warm-gold font-bold">{RESIDENCY_CONTACT.phone}</a>
              </p>
            </div>
          </div>

          {/* Places List Grid (7 cols) */}
          <div className="lg:col-span-7 space-y-3.5">
            {filteredPlaces.map((place) => {
              const isSelected = selectedPlaceId === place.id;
              return (
                <div
                  key={place.id}
                  onClick={() => setSelectedPlaceId(place.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col sm:flex-row gap-4 items-center ${
                    isSelected
                      ? 'bg-white dark:bg-[#181A20] border-warm-gold shadow-md'
                      : 'bg-white/80 dark:bg-[#15171C]/80 border-gray-100 dark:border-white/5 hover:border-warm-gold/50'
                  }`}
                >
                  <div className="relative w-full sm:w-28 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-gray-900">
                    <img src={place.image} alt={place.name} className="w-full h-full object-cover" loading="lazy" />
                    <span className="absolute bottom-1 right-1 bg-black/70 text-[9px] text-white px-1.5 py-0.5 rounded">
                      {place.distance}
                    </span>
                  </div>

                  <div className="flex-1 text-left space-y-1">
                    <div className="flex justify-between items-start">
                      <h4 className="font-serif font-bold text-sm text-primary dark:text-white">
                        {place.name}
                      </h4>
                      <div className="flex items-center gap-1 text-xs text-warm-gold font-bold">
                        <Star className="w-3.5 h-3.5 fill-warm-gold" />
                        <span>{place.rating}</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                      {place.description}
                    </p>
                    <div className="flex items-center gap-3 text-[11px] text-gray-500 dark:text-gray-400 pt-1">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-warm-gold" />
                        {place.travelTime}
                      </span>
                      <span>•</span>
                      <span className="capitalize">{place.category}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
