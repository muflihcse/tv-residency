import React from 'react';
import { Link } from 'react-router-dom';
import { SearchBox } from './SearchBox';
import { ChevronRight, MapPin } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[85vh] w-full flex items-center justify-center pt-8 pb-28 md:pb-20">
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=2000&q=85"
          alt="TV Residency Kottakkal"
          className="w-full h-full object-cover object-center scale-105"
        />
        {/* Ambient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-deep-navy/60 to-black/75"></div>
      </div>

      {/* Hero Typography & Search Box */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Location Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-warm-gold/40 text-warm-gold text-[11px] font-bold uppercase tracking-[0.2em] mb-5 shadow-sm">
          <MapPin className="w-3.5 h-3.5" />
          <span>Collegepadi, Kottakkal</span>
        </div>

        {/* Main Heading — Clean & Standard Modern Typography */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl text-white font-extrabold tracking-tight mb-4 drop-shadow-md max-w-4xl mx-auto leading-tight font-serif">
          Your Perfect Stay <span className="text-warm-gold">Starts Here</span>
        </h1>

        {/* Supporting Text */}
        <p className="text-xs sm:text-sm md:text-base text-gray-200 font-normal max-w-xl mx-auto mb-8 drop-shadow-sm leading-relaxed">
          Discover elegant rooms, private villas, and memorable stays designed around you.
        </p>

        {/* Interactive Search Panel */}
        <div className="mb-6">
          <SearchBox variant="hero" />
        </div>

        {/* Quick Links */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-gray-200">
          <Link
            to="/rooms"
            className="flex items-center gap-1 text-white hover:text-warm-gold transition-colors"
          >
            <span>Rooms from ₹1,000</span>
            <ChevronRight className="w-3.5 h-3.5 text-warm-gold" />
          </Link>
          <span className="text-gray-500 hidden sm:inline">•</span>
          <Link
            to="/villas"
            className="flex items-center gap-1 text-warm-gold hover:text-white transition-colors"
          >
            <span>Villas from ₹3,000</span>
            <ChevronRight className="w-3.5 h-3.5 text-warm-gold" />
          </Link>
        </div>
      </div>
    </section>
  );
};
