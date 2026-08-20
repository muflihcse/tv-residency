import React from 'react';
import { Tag, CheckCircle2, Phone, ArrowRight } from 'lucide-react';
import { SPECIAL_OFFERS, RESIDENCY_CONTACT } from '../data/residencyData';
import { Link } from 'react-router-dom';

export const OffersPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background dark:bg-surface-dark py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold text-warm-gold uppercase tracking-[0.25em] block mb-2">
            Direct Stay Benefits
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-primary dark:text-white tracking-tight">
            Direct Booking & Enquiries
          </h1>
          <div className="w-16 h-0.5 bg-warm-gold mx-auto mt-3 mb-4"></div>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            Connect directly with TV Residency for transparent pricing and direct room and villa reservations in Kottakkal.
          </p>
        </div>

        {/* Offers Grid */}
        <div className="max-w-3xl mx-auto">
          {SPECIAL_OFFERS.map((offer) => (
            <div
              key={offer.id}
              className="bg-white dark:bg-[#15171C] rounded-2xl overflow-hidden shadow-level-2 border border-soft-beige/70 dark:border-white/10 flex flex-col md:flex-row group hover:shadow-level-3 transition-all duration-500"
            >
              {/* Image */}
              <div className="relative md:w-2/5 overflow-hidden bg-black aspect-[16/10] md:aspect-auto">
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-3.5 left-3.5 bg-warm-gold text-primary font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5" />
                  <span>{offer.badge}</span>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 md:p-8 flex flex-col flex-1 gap-4">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-primary dark:text-white group-hover:text-warm-gold transition-colors">
                    {offer.title}
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-2 leading-relaxed">
                    {offer.description}
                  </p>
                </div>

                {/* Included Perks */}
                <div className="space-y-2 pt-2 border-t border-gray-100 dark:border-white/5 flex-1">
                  {offer.perks.map((perk, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-gray-700 dark:text-gray-300">
                      <CheckCircle2 className="w-4 h-4 text-warm-gold flex-shrink-0 mt-0.5" />
                      <span>{perk}</span>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="pt-4 mt-auto border-t border-gray-100 dark:border-white/10 flex flex-wrap justify-between items-center gap-3">
                  <a
                    href={`tel:${RESIDENCY_CONTACT.phone}`}
                    className="px-5 py-2.5 bg-warm-gold text-primary rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-gold-light transition-all flex items-center gap-1.5 shadow-sm"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call {RESIDENCY_CONTACT.phone}</span>
                  </a>

                  <Link
                    to="/rooms"
                    className="px-5 py-2.5 bg-deep-navy dark:bg-white/10 text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-primary dark:hover:bg-white/20 transition-all flex items-center gap-1.5"
                  >
                    <span>View All Rooms</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
