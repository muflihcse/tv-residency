import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SPECIAL_OFFERS } from '../data/residencyData';
import { Tag, CheckCircle2, ArrowRight } from 'lucide-react';
import { useResidency } from '../context/ResidencyContext';

export const OffersPage: React.FC = () => {
  const { showToast } = useResidency();
  const navigate = useNavigate();

  const handleApplyOffer = (code: string, applicableType: string) => {
    showToast(`Promo code "${code}" copied! Navigating to available stays...`, 'gold');
    if (applicableType === 'villas') {
      navigate('/villas');
    } else {
      navigate('/rooms');
    }
  };

  return (
    <div className="min-h-screen bg-background dark:bg-surface-dark py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold text-warm-gold uppercase tracking-[0.25em] block mb-2">
            Exclusive Packages
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-primary dark:text-white tracking-tight">
            Special Stays & Privileges
          </h1>
          <div className="w-16 h-0.5 bg-warm-gold mx-auto mt-3 mb-4"></div>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            Enjoy curated seasonal privileges, romantic honeymoon inclusions, and family retreat savings.
          </p>
        </div>

        {/* 5 Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SPECIAL_OFFERS.map((offer) => (
            <div
              key={offer.id}
              className="bg-white dark:bg-[#15171C] rounded-2xl overflow-hidden shadow-level-2 border border-soft-beige/70 dark:border-white/10 flex flex-col group hover:shadow-level-3 transition-all duration-500 hover:-translate-y-1.5"
            >
              {/* Image & Discount Badge */}
              <div className="relative aspect-[16/9] overflow-hidden bg-black">
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                <div className="absolute top-3.5 left-3.5 bg-warm-gold text-primary font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5" />
                  <span>{offer.badge}</span>
                </div>

                <div className="absolute bottom-3 left-3.5 right-3.5 flex justify-between items-center text-white text-xs">
                  <span className="text-[11px] text-warm-gold font-mono uppercase tracking-widest font-bold">
                    Code: {offer.code}
                  </span>
                  <span className="text-[10px] text-gray-300">Min. {offer.minNights} Nights</span>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 flex flex-col flex-1 gap-4">
                <div>
                  <h3 className="font-serif text-xl font-bold text-primary dark:text-white group-hover:text-warm-gold transition-colors">
                    {offer.title}
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 leading-relaxed">
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

                {/* Footer and Claim Button */}
                <div className="pt-4 mt-auto border-t border-gray-100 dark:border-white/10 flex justify-between items-center">
                  <div className="text-[10px] text-gray-400">
                    <div>Valid until:</div>
                    <strong className="text-gray-700 dark:text-gray-300">{offer.validUntil}</strong>
                  </div>

                  <button
                    onClick={() => handleApplyOffer(offer.code, offer.applicableType)}
                    className="px-4 py-2 bg-deep-navy dark:bg-warm-gold text-white dark:text-primary rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-primary dark:hover:bg-gold-light transition-all flex items-center gap-1.5 shadow-sm"
                  >
                    <span>Claim Package</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
