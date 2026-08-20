import React, { useState } from 'react';
import { REVIEWS } from '../data/residencyData';
import { Star, ChevronLeft, ChevronRight, CheckCircle, MapPin, Quote } from 'lucide-react';

export const ReviewsCarousel: React.FC = () => {
  const [startIndex, setStartIndex] = useState(0);

  const handlePrev = () => {
    setStartIndex((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length);
  };

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % REVIEWS.length);
  };

  // Circular items display for carousel
  const displayedReviews = [
    REVIEWS[startIndex % REVIEWS.length],
    REVIEWS[(startIndex + 1) % REVIEWS.length],
    REVIEWS[(startIndex + 2) % REVIEWS.length],
  ].filter(Boolean);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-surface-bright dark:bg-[#0E0F13] transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div className="max-w-xl">
            <span className="text-xs font-bold text-warm-gold uppercase tracking-[0.25em] block mb-2">
              Guest Experiences
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-primary dark:text-white tracking-tight">
              Reviews from Kerala Guests
            </h2>
            <div className="w-12 h-0.5 bg-warm-gold mt-3 mb-4"></div>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              Read genuine feedback from guests visiting Kottakkal for hospital appointments, family stays, and town visits.
            </p>
          </div>

          {/* Carousel Nav Controls */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 mr-2">
              {REVIEWS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setStartIndex(idx)}
                  className={`h-2 rounded-full transition-all ${
                    startIndex % REVIEWS.length === idx
                      ? 'w-6 bg-warm-gold'
                      : 'w-2 bg-gray-300 dark:bg-white/20 hover:bg-warm-gold/60'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-full border border-gray-300 dark:border-white/15 hover:border-warm-gold hover:text-warm-gold text-gray-700 dark:text-gray-200 flex items-center justify-center transition-colors"
                aria-label="Previous review"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-full border border-gray-300 dark:border-white/15 hover:border-warm-gold hover:text-warm-gold text-gray-700 dark:text-gray-200 flex items-center justify-center transition-colors"
                aria-label="Next review"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Responsive Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white dark:bg-[#15171C] rounded-2xl p-6 sm:p-7 shadow-level-1 hover:shadow-level-2 border border-gray-100 dark:border-white/5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 relative"
            >
              <div className="space-y-3.5">
                
                {/* Top Rating & Quote Icon */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1 text-warm-gold">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-warm-gold text-warm-gold" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-warm-gold/20 flex-shrink-0" />
                </div>

                {/* Review Title */}
                <h3 className="font-serif font-bold text-base text-primary dark:text-white leading-snug">
                  "{rev.title}"
                </h3>

                {/* Review Comment */}
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                  {rev.comment}
                </p>
              </div>

              {/* Author & Stay Details Footer */}
              <div className="pt-5 mt-5 border-t border-gray-100 dark:border-white/5 space-y-2">
                <div className="flex items-center gap-3">
                  {rev.avatar ? (
                    <img
                      src={rev.avatar}
                      alt={rev.author}
                      className="w-10 h-10 rounded-full object-cover border border-warm-gold/40 flex-shrink-0"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-warm-gold text-primary font-bold flex items-center justify-center text-sm flex-shrink-0">
                      {rev.author.charAt(0)}
                    </div>
                  )}

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-xs text-primary dark:text-white truncate">
                        {rev.author}
                      </span>
                      {rev.verified && (
                        <span title="Verified Guest" className="flex items-center">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1 text-[11px] text-gray-500 dark:text-gray-400">
                      <MapPin className="w-3 h-3 text-warm-gold flex-shrink-0" />
                      <span className="truncate">{rev.location}</span>
                    </div>
                  </div>
                </div>

                {/* Stay Type & Date */}
                <div className="flex justify-between items-center text-[10px] text-gray-400 pt-1">
                  <span className="bg-gray-100 dark:bg-white/5 px-2 py-0.5 rounded text-gray-600 dark:text-gray-300 font-medium">
                    {rev.stayType}
                  </span>
                  <span>{rev.date}</span>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* All Reviews Quick Footnote */}
        <div className="mt-8 text-center text-xs text-gray-500 dark:text-gray-400">
          <span>Showing verified experiences from guests in Kozhikode, Malappuram, Kochi, Thrissur, Palakkad & Kannur</span>
        </div>

      </div>
    </section>
  );
};
