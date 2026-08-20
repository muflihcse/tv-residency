import React from 'react';
import { Tag, Bed, HeartHandshake, Zap } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const cards = [
    {
      icon: Tag,
      title: 'Best Rates Guaranteed',
      subtitle: 'Direct Booking Privileges',
      description: 'Enjoy guaranteed lowest rates with zero hidden booking commissions, complimentary breakfast, and priority category upgrades.'
    },
    {
      icon: Bed,
      title: 'Comfortable Stays',
      subtitle: 'Restorative Coastal Living',
      description: 'Bespoke goose-down bedding, acoustic architectural insulation, Italian marble tubs, and 24-hour climate control.'
    },
    {
      icon: HeartHandshake,
      title: 'Trusted Hospitality',
      subtitle: 'Attentive Kerala Care',
      description: 'Experience anticipatory, discreet service from dedicated staff, front desk team, and attentive hospitality personnel.'
    },
    {
      icon: Zap,
      title: 'Easy & Fast Booking',
      subtitle: 'Friction-Free Reservation',
      description: 'Book your sanctuary in 3 intuitive steps with flexible 48-hour cancellation policies and instant confirmation dossiers.'
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background dark:bg-surface-dark transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold text-warm-gold uppercase tracking-[0.25em] block mb-2">
            The Sovereign Standard
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-primary dark:text-white tracking-tight">
            Why Choose TV Residency
          </h2>
          <div className="w-16 h-0.5 bg-warm-gold mx-auto mt-3 mb-4"></div>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            Engineered for discerning travelers who demand uncompromising comfort, privacy, and authentic luxury.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className="bg-white dark:bg-[#15171C] p-7 rounded-2xl border border-soft-beige/70 dark:border-white/5 hover:border-warm-gold/50 shadow-level-1 hover:shadow-level-3 transition-all duration-300 hover:-translate-y-1 flex flex-col group"
              >
                <div className="w-14 h-14 rounded-2xl bg-soft-beige/70 dark:bg-warm-gold/10 flex items-center justify-center text-warm-gold mb-5 group-hover:bg-warm-gold group-hover:text-primary transition-all duration-300 shadow-sm">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-[10px] font-bold text-warm-gold uppercase tracking-wider mb-1">
                  {card.subtitle}
                </div>
                <h3 className="font-serif text-lg font-bold text-primary dark:text-white mb-2 group-hover:text-warm-gold transition-colors">
                  {card.title}
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
