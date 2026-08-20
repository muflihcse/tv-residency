import React from 'react';
import { AMENITIES_LIST } from '../data/residencyData';

export const AmenitiesGrid: React.FC = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-surface-bright dark:bg-[#0E0F13] transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold text-warm-gold uppercase tracking-[0.25em] block mb-2">
            Essential Inclusions
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-primary dark:text-white tracking-tight">
            Residency Amenities
          </h2>
          <div className="w-16 h-0.5 bg-warm-gold mx-auto mt-3 mb-4"></div>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            Crafted for reliable convenience and complete comfort throughout your stay.
          </p>
        </div>

        {/* 14 Amenities Icon-Based Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {AMENITIES_LIST.map((amenity) => (
            <div
              key={amenity.id}
              className="bg-white dark:bg-[#15171C] p-4 rounded-xl border border-gray-100 dark:border-white/5 hover:border-warm-gold/60 dark:hover:border-warm-gold/60 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center text-center group hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-full bg-soft-beige/60 dark:bg-warm-gold/10 flex items-center justify-center text-warm-gold mb-3 group-hover:bg-warm-gold group-hover:text-primary transition-all duration-300">
                <span className="material-symbols-outlined text-[24px]">
                  {amenity.icon}
                </span>
              </div>
              <span className="text-xs font-semibold text-gray-800 dark:text-gray-200 group-hover:text-warm-gold transition-colors leading-tight">
                {amenity.name}
              </span>
              <span className="text-[10px] text-gray-400 mt-1">
                {amenity.category}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
