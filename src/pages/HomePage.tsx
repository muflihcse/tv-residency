import React from 'react';
import { Link } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { PropertyCard } from '../components/PropertyCard';
import { VillaCard } from '../components/VillaCard';
import { AmenitiesGrid } from '../components/AmenitiesGrid';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { NearbyExplore } from '../components/NearbyExplore';
import { ReviewsCarousel } from '../components/ReviewsCarousel';
import { PROPERTIES } from '../data/residencyData';
import { ArrowRight } from 'lucide-react';

export const HomePage: React.FC = () => {
  const rooms = PROPERTIES.filter(p => p.type === 'room');
  const villas = PROPERTIES.filter(p => p.type === 'villa');

  return (
    <div className="flex flex-col">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Featured Rooms */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-surface-bright dark:bg-[#0E0F13] transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
            <div className="max-w-xl">
              <span className="text-xs font-bold text-warm-gold uppercase tracking-[0.25em] block mb-2">
                Stay in Comfort
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-primary dark:text-white tracking-tight">
                Featured Rooms
              </h2>
              <div className="w-12 h-0.5 bg-warm-gold mt-3 mb-4"></div>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                Non-AC, AC, and 3-bed room options with essential amenities.
              </p>
            </div>

            <Link
              to="/rooms"
              className="inline-flex items-center gap-2 text-warm-gold font-bold text-xs uppercase tracking-wider hover:text-primary dark:hover:text-white transition-colors"
            >
              <span>View All Rooms</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {rooms.map((room) => (
              <PropertyCard key={room.id} property={room} />
            ))}
          </div>

        </div>
      </section>

      {/* 3. Featured Villas */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background dark:bg-surface-dark transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
            <div className="max-w-xl">
              <span className="text-xs font-bold text-warm-gold uppercase tracking-[0.25em] block mb-2">
                Villa Accommodation
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-primary dark:text-white tracking-tight">
                Featured Villas
              </h2>
              <div className="w-12 h-0.5 bg-warm-gold mt-3 mb-4"></div>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                AC two-bedroom and one-room villas with living hall and kitchen.
              </p>
            </div>

            <Link
              to="/villas"
              className="inline-flex items-center gap-2 text-warm-gold font-bold text-xs uppercase tracking-wider hover:text-primary dark:hover:text-white transition-colors"
            >
              <span>View All Villas</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {villas.map((villa) => (
              <VillaCard key={villa.id} villa={villa} />
            ))}
          </div>

        </div>
      </section>

      {/* 4. Amenities Grid (Essential Facilities) */}
      <AmenitiesGrid />

      {/* 5. Why Choose TV Residency */}
      <WhyChooseUs />

      {/* 6. Nearby & Explore Area (Explore Kottakkal) */}
      <NearbyExplore />

      {/* 7. Verified Guest Reviews Notice */}
      <ReviewsCarousel />
    </div>
  );
};
