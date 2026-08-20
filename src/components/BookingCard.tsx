import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Property } from '../types';
import { useResidency } from '../context/ResidencyContext';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, Sparkles, Lock, ArrowRight } from 'lucide-react';

interface BookingCardProps {
  property: Property;
}

export const BookingCard: React.FC<BookingCardProps> = ({ property }) => {
  const { formatPrice, searchFilters, updateSearchFilters } = useResidency();
  const { isAuthenticated, openLoginModal } = useAuth();
  const navigate = useNavigate();

  const [checkIn, setCheckIn] = useState(searchFilters.checkIn);
  const [checkOut, setCheckOut] = useState(searchFilters.checkOut);
  const [adults, setAdults] = useState(searchFilters.adults || 2);
  const [childrenCount, setChildrenCount] = useState(searchFilters.children || 0);

  // Nights calculation
  const nights = useMemo(() => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = end.getTime() - start.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  }, [checkIn, checkOut]);

  const subtotalINR = property.priceINR * nights;
  const taxesAndServiceINR = Math.round(subtotalINR * 0.12); // 12% luxury tax & service
  const grandTotalINR = subtotalINR + taxesAndServiceINR;

  const handleReserveClick = (e: React.FormEvent) => {
    e.preventDefault();
    updateSearchFilters({
      checkIn,
      checkOut,
      adults,
      children: childrenCount,
      guests: adults + childrenCount,
    });

    if (!isAuthenticated) {
      openLoginModal(`/booking/${property.id}`);
    } else {
      navigate(`/booking/${property.id}`);
    }
  };

  return (
    <div className="bg-white dark:bg-[#15171C] rounded-2xl p-6 shadow-level-3 border border-soft-beige/80 dark:border-white/10 sticky top-24">
      
      {/* Nightly Rate Header */}
      <div className="flex justify-between items-baseline pb-5 border-b border-gray-100 dark:border-white/10">
        <div>
          <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Nightly Residence Rate</span>
          <div className="flex items-baseline gap-1.5">
            <span className="font-sans font-bold text-2xl sm:text-3xl text-primary dark:text-white">
              {formatPrice(property.priceINR)}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">/night</span>
          </div>
        </div>

        <div className="text-right">
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-warm-gold bg-warm-gold/10 px-2.5 py-1 rounded-full">
            ★ {property.rating.toFixed(2)}
          </span>
          <span className="text-[10px] text-gray-400 block mt-0.5">{property.reviewCount} Reviews</span>
        </div>
      </div>

      {/* Booking Form */}
      <form onSubmit={handleReserveClick} className="mt-5 space-y-4">
        
        {/* Date Inputs Box */}
        <div className="grid grid-cols-2 rounded-xl border border-gray-200 dark:border-white/10 overflow-hidden bg-gray-50/50 dark:bg-white/5">
          <div className="p-3 border-r border-gray-200 dark:border-white/10">
            <label className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider block">
              Check-in
            </label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              required
              className="w-full bg-transparent text-xs font-semibold text-gray-900 dark:text-white p-0 border-0 focus:ring-0 cursor-pointer"
            />
          </div>
          <div className="p-3">
            <label className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider block">
              Check-out
            </label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              required
              className="w-full bg-transparent text-xs font-semibold text-gray-900 dark:text-white p-0 border-0 focus:ring-0 cursor-pointer"
            />
          </div>
        </div>

        {/* Guests Dropdown */}
        <div className="p-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50/50 dark:bg-white/5">
          <label className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider block mb-1">
            Guests Selection
          </label>
          <div className="grid grid-cols-2 gap-2">
            <select
              value={adults}
              onChange={(e) => setAdults(Number(e.target.value))}
              className="w-full py-1.5 px-2 bg-white dark:bg-[#181A20] border border-gray-200 dark:border-white/10 rounded-lg text-xs font-semibold text-gray-900 dark:text-white"
            >
              {[1, 2, 3, 4, 6, 8].map(n => (
                <option key={n} value={n}>{n} {n === 1 ? 'Adult' : 'Adults'}</option>
              ))}
            </select>
            <select
              value={childrenCount}
              onChange={(e) => setChildrenCount(Number(e.target.value))}
              className="w-full py-1.5 px-2 bg-white dark:bg-[#181A20] border border-gray-200 dark:border-white/10 rounded-lg text-xs font-semibold text-gray-900 dark:text-white"
            >
              {[0, 1, 2, 3, 4].map(n => (
                <option key={n} value={n}>{n} {n === 1 ? 'Child' : 'Children'}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Primary Reserve Button */}
        <button
          type="submit"
          className="w-full py-3.5 bg-deep-navy dark:bg-warm-gold text-white dark:text-primary font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-primary dark:hover:bg-gold-light transition-all shadow-md active:scale-[0.99] flex items-center justify-center gap-2"
        >
          {!isAuthenticated && <Lock className="w-3.5 h-3.5 text-warm-gold dark:text-primary" />}
          <span>{isAuthenticated ? 'Reserve Now' : 'Sign In to Reserve'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <p className="text-[11px] text-center text-gray-500 dark:text-gray-400">
          You won’t be charged yet • Mock Checkout Prototype
        </p>

        {/* Pricing Calculation Breakdown */}
        <div className="pt-4 border-t border-gray-100 dark:border-white/10 space-y-2 text-xs">
          <div className="flex justify-between text-gray-600 dark:text-gray-300">
            <span className="underline decoration-dotted">
              {formatPrice(property.priceINR)} × {nights} {nights === 1 ? 'night' : 'nights'}
            </span>
            <span className="font-semibold text-gray-900 dark:text-white">{formatPrice(subtotalINR)}</span>
          </div>

          <div className="flex justify-between text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1 underline decoration-dotted">
              Resort luxury tax & service (12%)
            </span>
            <span>+{formatPrice(taxesAndServiceINR)}</span>
          </div>

          <div className="pt-3 border-t border-gray-100 dark:border-white/10 flex justify-between items-baseline font-bold text-sm text-primary dark:text-white">
            <span>Estimated Total</span>
            <span className="font-serif text-xl text-warm-gold">{formatPrice(grandTotalINR)}</span>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="pt-3 border-t border-gray-100 dark:border-white/5 space-y-2 text-[11px] text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0" />
            <span>{property.cancellationPolicy}</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-warm-gold flex-shrink-0" />
            <span>Complimentary High-Speed Wi-Fi & Breakfast included</span>
          </div>
        </div>

      </form>
    </div>
  );
};
