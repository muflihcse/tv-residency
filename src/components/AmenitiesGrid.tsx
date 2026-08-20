import React from 'react';
import { Wifi, Droplets, Car, Tv, Zap } from 'lucide-react';

export const AmenitiesGrid: React.FC = () => {
  const facilities = [
    {
      id: 'wifi',
      name: 'Free Wi-Fi',
      icon: Wifi,
      description: 'Reliable internet access to keep you connected throughout your stay.'
    },
    {
      id: 'hotwater',
      name: 'Hot Water',
      icon: Droplets,
      description: 'Hot water facility available for your comfort and convenience.'
    },
    {
      id: 'parking',
      name: 'Parking',
      icon: Car,
      description: 'Convenient parking facility available on the property.'
    },
    {
      id: 'tv',
      name: 'TV',
      icon: Tv,
      description: 'TV provided in the accommodation for entertainment.'
    },
    {
      id: 'powerbackup',
      name: 'Power Backup',
      icon: Zap,
      description: 'Backup power available for an uninterrupted, comfortable stay.'
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-surface-bright dark:bg-[#0E0F13] transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold text-warm-gold uppercase tracking-[0.25em] block mb-2">
            Confirmed Amenities
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-primary dark:text-white tracking-tight">
            Essential Facilities
          </h2>
          <div className="w-16 h-0.5 bg-warm-gold mx-auto mt-3 mb-4"></div>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            Everything you need for a comfortable and convenient stay.
          </p>
        </div>

        {/* 5 Verified Facilities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {facilities.map((fac) => {
            const Icon = fac.icon;
            return (
              <div
                key={fac.id}
                className="bg-white dark:bg-[#15171C] p-6 rounded-2xl border border-gray-100 dark:border-white/5 hover:border-warm-gold/60 shadow-level-1 hover:shadow-level-2 transition-all duration-300 flex flex-col items-center text-center group hover:-translate-y-1"
              >
                <div className="w-14 h-14 rounded-2xl bg-soft-beige/60 dark:bg-warm-gold/10 flex items-center justify-center text-warm-gold mb-4 group-hover:bg-warm-gold group-hover:text-primary transition-all duration-300 shadow-sm">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-serif font-bold text-primary dark:text-white mb-2 group-hover:text-warm-gold transition-colors">
                  {fac.name}
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                  {fac.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
