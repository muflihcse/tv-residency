import React from 'react';
import { Link } from 'react-router-dom';
import { SearchBox } from './SearchBox';
import { Sparkles, ChevronRight } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[92vh] w-full flex items-center justify-center pt-10 pb-36 md:pb-28">
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2000&q=85"
          alt="TV Residency Luxury Hotel & Private Villas"
          className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000 ease-out"
        />
        {/* Ambient Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-deep-navy/40 to-black/60"></div>
        <div className="absolute inset-0 bg-radial-at-c from-transparent via-black/25 to-black/75"></div>
      </div>

      {/* Hero Typography & Search Box */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-[-4vh]">
        
        {/* Small Eyebrow */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-warm-gold/40 text-warm-gold text-[11px] font-bold uppercase tracking-[0.25em] mb-6 shadow-sm">
          <Sparkles className="w-3.5 h-3.5" />
          <span>WELCOME TO TV RESIDENCY</span>
        </div>

        {/* Main Heading */}
        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-white font-bold tracking-tight mb-5 drop-shadow-2xl max-w-4xl mx-auto leading-[1.12]">
          Your Perfect Stay <span className="italic font-normal text-warm-gold">Starts Here</span>
        </h1>

        {/* Supporting Text */}
        <p className="text-base sm:text-lg md:text-xl text-gray-200 font-light max-w-2xl mx-auto mb-10 drop-shadow-md leading-relaxed">
          Discover elegant rooms, private villas and memorable stays designed around you.
        </p>

        {/* Interactive Search Panel */}
        <div className="mb-8">
          <SearchBox variant="hero" />
        </div>

        {/* Secondary Links & Quick Filters */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-200">
          <Link
            to="/rooms"
            className="flex items-center gap-1.5 text-white hover:text-warm-gold font-medium transition-colors border-b border-white/30 hover:border-warm-gold pb-0.5"
          >
            <span>Explore our rooms & suites</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
          <span className="text-gray-400 hidden sm:inline">•</span>
          <Link
            to="/villas"
            className="flex items-center gap-1.5 text-warm-gold hover:text-white font-semibold transition-colors border-b border-warm-gold pb-0.5"
          >
            <span>Discover private pool villas</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
