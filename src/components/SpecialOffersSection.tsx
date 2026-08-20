import React from 'react';
import { Link } from 'react-router-dom';
import { SPECIAL_OFFERS, RESIDENCY_CONTACT } from '../data/residencyData';
import { Tag, CheckCircle2, Phone, ArrowRight } from 'lucide-react';

export const SpecialOffersSection: React.FC = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background dark:bg-surface-dark transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14 gap-6">
          <div className="max-w-xl">
            <span className="text-xs font-bold text-warm-gold uppercase tracking-[0.25em] block mb-2">
              Direct Desk Benefits
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-primary dark:text-white tracking-tight">
              Direct Booking & Enquiries
            </h2>
            <div className="w-12 h-0.5 bg-warm-gold mt-3 mb-4"></div>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              Contact us directly for real-time room availability, villa enquiries, and transparent pricing in Kottakkal.
            </p>
          </div>

          <Link
            to="/contact"
            className="inline-flex items-center gap-2 text-warm-gold font-bold text-xs uppercase tracking-wider hover:text-primary dark:hover:text-white transition-colors"
          >
            <span>Contact Front Desk</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {SPECIAL_OFFERS.map((offer) => (
            <div
              key={offer.id}
              className="bg-white dark:bg-[#15171C] rounded-2xl overflow-hidden shadow-level-2 border border-soft-beige/60 dark:border-white/10 flex flex-col group hover:shadow-level-3 transition-all duration-500 hover:-translate-y-1.5"
            >
              {/* Image & Badge */}
              <div className="relative aspect-[16/9] overflow-hidden bg-black">
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                <div className="absolute top-3.5 left-3.5 bg-warm-gold text-primary font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5" />
                  <span>{offer.badge}</span>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 flex flex-col flex-1 gap-3.5">
                <h3 className="font-serif text-lg font-bold text-primary dark:text-white group-hover:text-warm-gold transition-colors">
                  {offer.title}
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
                  {offer.description}
                </p>

                {/* Included Perks */}
                <div className="space-y-1.5 pt-2 border-t border-gray-100 dark:border-white/5">
                  {offer.perks.slice(0, 3).map((perk, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-[11px] text-gray-700 dark:text-gray-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-warm-gold flex-shrink-0 mt-0.5" />
                      <span className="truncate">{perk}</span>
                    </div>
                  ))}
                </div>

                {/* Footer and Call Button */}
                <div className="pt-4 mt-auto border-t border-gray-100 dark:border-white/10 flex justify-between items-center">
                  <span className="text-[10px] text-gray-400">TV Residency Kottakkal</span>
                  <a
                    href={`tel:${RESIDENCY_CONTACT.phone}`}
                    className="px-4 py-2 bg-warm-gold text-primary rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-gold-light transition-all flex items-center gap-1.5 shadow-sm"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call Desk</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
