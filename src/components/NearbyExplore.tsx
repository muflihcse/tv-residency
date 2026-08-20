import React, { useState } from 'react';
import { NEARBY_PLACES, RESIDENCY_CONTACT } from '../data/residencyData';
import { MapPin, Navigation, Clock } from 'lucide-react';

export const NearbyExplore: React.FC = () => {
  const [selectedPlaceId, setSelectedPlaceId] = useState<string>(NEARBY_PLACES[0].id);

  const activePlace = NEARBY_PLACES.find(p => p.id === selectedPlaceId) || NEARBY_PLACES[0];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-surface-bright dark:bg-[#0E0F13] transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold text-warm-gold uppercase tracking-[0.25em] block mb-2">
            Town Location & Landmarks
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-primary dark:text-white tracking-tight">
            Explore Kottakkal
          </h2>
          <div className="w-16 h-0.5 bg-warm-gold mx-auto mt-3 mb-4"></div>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            TV Residency is located at Collegepadi, Kottakkal, near Ahalya Eye Hospital, giving guests convenient access to the town and nearby essentials.
          </p>
        </div>

        {/* 2-Column Split: Map Placeholder & Places Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Map Card (5 cols - static on mobile, sticky only on desktop) */}
          <div className="lg:col-span-5 bg-white dark:bg-[#15171C] rounded-2xl p-4 sm:p-6 border border-soft-beige/80 dark:border-white/10 shadow-level-2 static lg:sticky lg:top-24">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="font-serif text-base sm:text-lg font-bold text-primary dark:text-white">
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
                  <div className="text-[10px] text-gray-300">Nearby Location:</div>
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
                  <div className="text-gray-300 text-[10px]">Approximate Travel:</div>
                  <strong className="text-white">{activePlace.travelTime}</strong>
                </div>
                <a
                  href={RESIDENCY_CONTACT.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-warm-gold text-primary font-bold text-[11px] rounded uppercase tracking-wider hover:bg-gold-light transition-all"
                >
                  View Route
                </a>
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
            {NEARBY_PLACES.map((place) => {
              const isSelected = selectedPlaceId === place.id;
              return (
                <div
                  key={place.id}
                  onClick={() => setSelectedPlaceId(place.id)}
                  className={`p-3.5 sm:p-4 rounded-xl border transition-all cursor-pointer flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-center ${
                    isSelected
                      ? 'bg-white dark:bg-[#181A20] border-warm-gold shadow-md ring-1 ring-warm-gold/40'
                      : 'bg-white/80 dark:bg-[#15171C]/80 border-gray-100 dark:border-white/5 hover:border-warm-gold/50'
                  }`}
                >
                  <div className="relative w-full sm:w-28 h-28 sm:h-20 rounded-lg overflow-hidden flex-shrink-0 bg-gray-900">
                    <img
                      src={place.image}
                      alt={place.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <span className="absolute bottom-1 right-1 bg-black/75 text-[9px] font-bold text-white px-1.5 py-0.5 rounded">
                      {place.distance}
                    </span>
                  </div>

                  <div className="flex-1 text-left space-y-1">
                    <div className="flex justify-between items-start">
                      <h4 className="font-serif font-bold text-sm text-primary dark:text-white">
                        {place.name}
                      </h4>
                      <span className="text-xs text-warm-gold font-bold">
                        {place.distance}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                      {place.description}
                    </p>
                    <div className="flex items-center gap-2 text-[11px] text-gray-500 dark:text-gray-400 pt-1">
                      <Clock className="w-3 h-3 text-warm-gold" />
                      <span>{place.travelTime}</span>
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
