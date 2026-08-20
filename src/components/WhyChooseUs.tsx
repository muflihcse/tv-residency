import React from 'react';
import { BedDouble, MapPin, Home, CheckCircle2 } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const cards = [
    {
      icon: BedDouble,
      title: 'Comfortable Accommodation',
      description: 'Choose from AC, non-AC and three-bed room options.'
    },
    {
      icon: MapPin,
      title: 'Convenient Town Location',
      description: 'Located in Collegepadi, Kottakkal, near Ahalya Eye Hospital.'
    },
    {
      icon: Home,
      title: 'Rooms & Villas',
      description: 'Choose accommodation according to your group and stay requirements.'
    },
    {
      icon: CheckCircle2,
      title: 'Essential Facilities',
      description: 'Wi-Fi, hot water, parking, TV and power backup.'
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background dark:bg-surface-dark transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Container with Deep Navy & Subtle Gold Accent */}
        <div className="p-6 sm:p-10 lg:p-12 rounded-3xl bg-[#0B1526] border border-warm-gold/30 shadow-level-2 text-white">
          
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
            <span className="text-xs font-bold text-warm-gold uppercase tracking-[0.25em] block mb-2">
              WHY CHOOSE TV RESIDENCY
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
              Comfort, Convenience & Hospitality
            </h2>
            <div className="w-16 h-0.5 bg-warm-gold mx-auto mt-3 mb-4"></div>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              Essential amenities, practical room options, and a central location in Kottakkal.
            </p>
          </div>

          {/* 4 Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {cards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.title}
                  className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-warm-gold/40 transition-all duration-300 flex flex-col group"
                >
                  <div className="w-12 h-12 rounded-xl bg-warm-gold/15 flex items-center justify-center text-warm-gold mb-4 group-hover:bg-warm-gold group-hover:text-primary transition-all duration-300">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-base sm:text-lg font-bold text-white mb-2.5">
                    {card.title}
                  </h3>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    {card.description}
                  </p>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
