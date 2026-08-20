import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SPECIAL_OFFERS } from '../data/residencyData';
import { Tag, CheckCircle2, ArrowRight } from 'lucide-react';
import { useResidency } from '../context/ResidencyContext';

export const SpecialOffersSection: React.FC = () => {
  const { showToast } = useResidency();
  const navigate = useNavigate();

  const handleClaimOffer = (code: string, applicableType: string) => {
    showToast(`Promo code "${code}" copied! Applying to stays...`, 'gold');
    if (applicableType === 'villas') {
      navigate('/villas');
    } else {
      navigate('/rooms');
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background dark:bg-surface-dark transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14 gap-6">
          <div className="max-w-xl">
            <span className="text-xs font-bold text-warm-gold uppercase tracking-[0.25em] block mb-2">
              Curated Privileges
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-primary dark:text-white tracking-tight">
              Special Offers & Packages
            </h2>
            <div className="w-12 h-0.5 bg-warm-gold mt-3 mb-4"></div>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              Exclusive seasonal escapes featuring complimentary helicopter transfers, resort credits, and candlelit beach dinners.
            </p>
          </div>

          <Link
            to="/offers"
            className="inline-flex items-center gap-2 text-warm-gold font-bold text-xs uppercase tracking-wider hover:text-primary dark:hover:text-white transition-colors"
          >
            <span>View All 5 Exclusive Packages</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SPECIAL_OFFERS.slice(0, 3).map((offer) => (
            <div
              key={offer.id}
              className="bg-white dark:bg-[#15171C] rounded-2xl overflow-hidden shadow-level-2 border border-soft-beige/60 dark:border-white/10 flex flex-col group hover:shadow-level-3 transition-all duration-500 hover:-translate-y-1.5"
            >
              {/* Image & Discount Badge */}
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

                <div className="absolute bottom-3 left-3.5 right-3.5 flex justify-between items-center text-white">
                  <span className="text-[11px] text-warm-gold font-mono uppercase tracking-widest font-bold">
                    Code: {offer.code}
                  </span>
                  <span className="text-[10px] text-gray-300">Min. {offer.minNights} Nights</span>
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

                {/* Footer and Claim Button */}
                <div className="pt-4 mt-auto border-t border-gray-100 dark:border-white/10 flex justify-between items-center">
                  <span className="text-[10px] text-gray-400">Valid until {offer.validUntil}</span>
                  <button
                    onClick={() => handleClaimOffer(offer.code, offer.applicableType)}
                    className="px-4 py-2 bg-deep-navy dark:bg-warm-gold text-white dark:text-primary rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-primary dark:hover:bg-gold-light transition-all flex items-center gap-1.5 shadow-sm"
                  >
                    <span>Claim Offer</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
