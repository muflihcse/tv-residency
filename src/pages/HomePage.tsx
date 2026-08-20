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
  const featuredRooms = PROPERTIES.filter(p => p.type === 'room').slice(0, 3);
  const featuredVillas = PROPERTIES.filter(p => p.type === 'villa').slice(0, 3);

  return (
    <div className="flex flex-col">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Featured Rooms ("Stay in Comfort") */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-surface-bright dark:bg-[#0E0F13] transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
            <div className="max-w-xl">
              <span className="text-xs font-bold text-warm-gold uppercase tracking-[0.25em] block mb-2">
                Stay in Comfort
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-primary dark:text-white tracking-tight">
                Featured Rooms & Suites
              </h2>
              <div className="w-12 h-0.5 bg-warm-gold mt-3 mb-4"></div>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                Impeccably tailored sanctuaries featuring hand-carved teakwood, marble soaking tubs, and panoramic ocean balconies.
              </p>
            </div>

            <Link
              to="/rooms"
              className="inline-flex items-center gap-2 text-warm-gold font-bold text-xs uppercase tracking-wider hover:text-primary dark:hover:text-white transition-colors"
            >
              <span>View All 6 Luxury Rooms</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredRooms.map((room) => (
              <PropertyCard key={room.id} property={room} />
            ))}
          </div>

        </div>
      </section>

      {/* 3. Featured Villas ("Private Villas") */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background dark:bg-surface-dark transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
            <div className="max-w-xl">
              <span className="text-xs font-bold text-warm-gold uppercase tracking-[0.25em] block mb-2">
                Exclusive Enclaves
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-primary dark:text-white tracking-tight">
                Private Luxury Villas
              </h2>
              <div className="w-12 h-0.5 bg-warm-gold mt-3 mb-4"></div>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                Independent 1-room, 2-room, 3-room, and 4-room private villas with natural garden greenery, water heaters, high-speed Wi-Fi, and free on-site parking.
              </p>
            </div>

            <Link
              to="/villas"
              className="inline-flex items-center gap-2 text-warm-gold font-bold text-xs uppercase tracking-wider hover:text-primary dark:hover:text-white transition-colors"
            >
              <span>View All 6 Private Villas</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredVillas.map((villa) => (
              <VillaCard key={villa.id} villa={villa} />
            ))}
          </div>

        </div>
      </section>

      {/* 4. Amenities Grid (14 items) */}
      <AmenitiesGrid />

      {/* 5. Why Choose TV Residency */}
      <WhyChooseUs />

      {/* 6. Nearby & Explore Area (with map placeholder) */}
      <NearbyExplore />

      {/* 7. Verified Guest Reviews Carousel */}
      <ReviewsCarousel />

      {/* 9. Stay Close to Everything — Official Location Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-surface-bright to-background dark:from-[#0E0F13] dark:to-surface-dark border-t border-gray-100 dark:border-white/5 transition-colors duration-300">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-[#15171C] rounded-2xl p-6 sm:p-10 border-2 border-warm-gold/40 shadow-level-3 flex flex-col md:flex-row justify-between items-center gap-8">
            
            <div className="space-y-2 text-center md:text-left flex-1">
              <span className="text-[10px] font-bold text-warm-gold uppercase tracking-[0.25em] block">
                Stay Close to Everything
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-primary dark:text-white">
                TV Residency
              </h2>
              <div className="space-y-0.5 text-xs sm:text-sm text-gray-700 dark:text-gray-300 font-medium">
                <p>Collegepadi, Kottakkal</p>
                <p className="text-gray-500 dark:text-gray-400">Near Ahalya Eye Hospital</p>
              </div>
              <div className="pt-2 text-xs font-semibold text-gray-600 dark:text-gray-300">
                <span>Contact / Phone: </span>
                <a
                  href="tel:8281628559"
                  className="text-warm-gold hover:underline font-mono font-bold text-sm"
                >
                  8281628559
                </a>
              </div>
            </div>

            <a
              href="https://share.google/n1Z6lQmv4DNvdLZXF"
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3.5 bg-warm-gold hover:bg-gold-light text-primary font-bold text-xs uppercase tracking-wider rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg hover:scale-105 flex-shrink-0"
            >
              <span>📍 View on Google Maps →</span>
            </a>

          </div>
        </div>
      </section>
    </div>
  );
};
