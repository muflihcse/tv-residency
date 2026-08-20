import React, { useState } from 'react';
import { REVIEWS } from '../data/residencyData';
import { Star, Quote, ChevronLeft, ChevronRight, CheckCircle2, Award, Sparkles, ShieldCheck } from 'lucide-react';

export const ReviewsCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const total = REVIEWS.length;

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 3 >= total ? 0 : prev + 3));
  };

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 3 < 0 ? Math.max(0, total - 3) : prev - 3));
  };

  const visibleReviews = REVIEWS.slice(currentIndex, currentIndex + 3);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-surface-bright dark:bg-[#0E0F13] transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-14 gap-6">
          <div className="max-w-xl">
            <span className="text-xs font-bold text-warm-gold uppercase tracking-[0.25em] block mb-2">
              Verified Guest Impressions
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-primary dark:text-white tracking-tight">
              Loved by Discerning Travelers
            </h2>
            <div className="w-12 h-0.5 bg-warm-gold mt-3 mb-4"></div>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              Over 20+ verified guest reviews across our private coastal suites and pool villas.
            </p>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={prevReview}
              className="w-10 h-10 rounded-full border border-gray-300 dark:border-white/20 flex items-center justify-center text-gray-700 dark:text-gray-200 hover:border-warm-gold hover:text-warm-gold transition-colors"
              title="Previous reviews"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextReview}
              className="w-10 h-10 rounded-full border border-gray-300 dark:border-white/20 flex items-center justify-center text-gray-700 dark:text-gray-200 hover:border-warm-gold hover:text-warm-gold transition-colors"
              title="Next reviews"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 3 Visible Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {visibleReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white dark:bg-[#15171C] rounded-2xl p-7 shadow-level-2 border border-soft-beige/70 dark:border-white/10 flex flex-col justify-between relative group hover:shadow-level-3 transition-all duration-300 hover:-translate-y-1"
            >
              <Quote className="w-10 h-10 text-warm-gold/15 absolute top-6 right-6 pointer-events-none" />

              <div>
                {/* Rating */}
                <div className="flex items-center gap-1 text-warm-gold mb-3">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-warm-gold text-warm-gold" />
                  ))}
                </div>

                <h3 className="font-serif text-base font-bold text-primary dark:text-white mb-2 italic line-clamp-2">
                  "{rev.title}"
                </h3>

                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed mb-6 line-clamp-4">
                  {rev.comment}
                </p>
              </div>

              {/* Author Footer */}
              <div className="pt-4 border-t border-gray-100 dark:border-white/5 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-primary dark:text-white flex items-center gap-1.5">
                    <span>{rev.author}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-warm-gold flex-shrink-0" />
                  </div>
                  <div className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">
                    {rev.location} • <span className="text-warm-gold font-medium">{rev.stayType}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dynamic Theme-Blended Accolades Bar */}
        <div className="mt-12 p-3 sm:p-4 bg-gradient-to-r from-[#0B1526] via-[#101E36] to-[#0B1526] rounded-2xl border border-warm-gold/40 shadow-level-2 backdrop-blur-md">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4">
            
            <div className="flex items-center justify-center gap-2.5 p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-warm-gold/50 transition-all duration-300 group cursor-default">
              <div className="w-7 h-7 rounded-lg bg-warm-gold/20 flex items-center justify-center text-warm-gold flex-shrink-0 group-hover:scale-110 group-hover:bg-warm-gold group-hover:text-primary transition-all">
                <Award className="w-4 h-4" />
              </div>
              <div className="text-left">
                <span className="text-[10px] sm:text-[11px] font-bold text-white tracking-wider block uppercase group-hover:text-warm-gold transition-colors">
                  Forbes Travel Guide
                </span>
                <span className="text-[9px] text-warm-gold font-semibold uppercase tracking-widest block">
                  5★ Classification
                </span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2.5 p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-warm-gold/50 transition-all duration-300 group cursor-default">
              <div className="w-7 h-7 rounded-lg bg-warm-gold/20 flex items-center justify-center text-warm-gold flex-shrink-0 group-hover:scale-110 group-hover:bg-warm-gold group-hover:text-primary transition-all">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="text-left">
                <span className="text-[10px] sm:text-[11px] font-bold text-white tracking-wider block uppercase group-hover:text-warm-gold transition-colors">
                  Condé Nast Traveler
                </span>
                <span className="text-[9px] text-warm-gold font-semibold uppercase tracking-widest block">
                  Gold List Honoree
                </span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2.5 p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-warm-gold/50 transition-all duration-300 group cursor-default">
              <div className="w-7 h-7 rounded-lg bg-warm-gold/20 flex items-center justify-center text-warm-gold flex-shrink-0 group-hover:scale-110 group-hover:bg-warm-gold group-hover:text-primary transition-all">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="text-left">
                <span className="text-[10px] sm:text-[11px] font-bold text-white tracking-wider block uppercase group-hover:text-warm-gold transition-colors">
                  Architectural Digest
                </span>
                <span className="text-[9px] text-warm-gold font-semibold uppercase tracking-widest block">
                  India Top Stays
                </span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2.5 p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-warm-gold/50 transition-all duration-300 group cursor-default">
              <div className="w-7 h-7 rounded-lg bg-warm-gold/20 flex items-center justify-center text-warm-gold flex-shrink-0 group-hover:scale-110 group-hover:bg-warm-gold group-hover:text-primary transition-all">
                <Star className="w-4 h-4 fill-warm-gold" />
              </div>
              <div className="text-left">
                <span className="text-[10px] sm:text-[11px] font-bold text-white tracking-wider block uppercase group-hover:text-warm-gold transition-colors">
                  Kerala Tourism
                </span>
                <span className="text-[9px] text-warm-gold font-semibold uppercase tracking-widest block">
                  Diamond Award
                </span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
