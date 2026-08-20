import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { PROPERTIES, RESIDENCY_CONTACT } from '../data/residencyData';
import { useAuth } from '../context/AuthContext';
import { useResidency } from '../context/ResidencyContext';
import { CalendarPicker } from '../components/CalendarPicker';
import confetti from 'canvas-confetti';
import { 
  ChevronRight, 
  ChevronLeft, 
  Lock, 
  CheckCircle2, 
  Bookmark, 
  Home,
  ShieldCheck,
  AlertCircle,
  Sparkles
} from 'lucide-react';

export const BookingPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user, isAuthenticated, addBooking } = useAuth();
  const { formatPrice, searchFilters, showToast, getAvailableUnits, isFullyBooked } = useResidency();
  const navigate = useNavigate();

  const property = PROPERTIES.find(p => p.id === id) || PROPERTIES[0];
  const availableUnits = getAvailableUnits(property.id);
  const fullyBooked = isFullyBooked(property.id);

  // Auth gate check
  useEffect(() => {
    if (!isAuthenticated) {
      showToast('Please sign in to proceed with your booking.', 'info');
      navigate(`/login?redirect=/booking/${property.id}`);
    }
  }, [isAuthenticated, property.id, navigate, showToast]);

  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Dates & Guests
  const [checkIn, setCheckIn] = useState(() => {
    const todayStr = new Date().toISOString().split('T')[0];
    if (searchFilters.checkIn && searchFilters.checkIn >= todayStr) {
      return searchFilters.checkIn;
    }
    return todayStr;
  });

  const [checkOut, setCheckOut] = useState(() => {
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    const initialIn = (searchFilters.checkIn && searchFilters.checkIn >= todayStr) ? searchFilters.checkIn : todayStr;
    
    if (searchFilters.checkOut && searchFilters.checkOut > initialIn) {
      return searchFilters.checkOut;
    }
    const nextDay = new Date(initialIn);
    nextDay.setDate(nextDay.getDate() + 2);
    return nextDay.toISOString().split('T')[0];
  });
  const [adults, setAdults] = useState(searchFilters.adults || 2);
  const [childrenCount, setChildrenCount] = useState(searchFilters.children || 0);
  const [roomsCount, setRoomsCount] = useState(1);

  // Ensure roomsCount doesn't exceed available units
  useEffect(() => {
    if (availableUnits > 0 && roomsCount > availableUnits) {
      setRoomsCount(availableUnits);
    }
  }, [availableUnits, roomsCount]);

  // Primary Guest Info
  const [guestName, setGuestName] = useState(user?.name || '');
  const [guestEmail, setGuestEmail] = useState(user?.email || '');
  const [guestPhone, setGuestPhone] = useState(user?.phone || '');
  const [specialRequests, setSpecialRequests] = useState('');

  // Confirmed booking reference
  const [confirmedBookingRef, setConfirmedBookingRef] = useState('');

  // Calculate nights
  const nights = useMemo(() => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = end.getTime() - start.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  }, [checkIn, checkOut]);

  const subtotalINR = property.priceINR * nights * roomsCount;
  const grandTotalINR = subtotalINR;

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (fullyBooked) {
      showToast('Sorry, this accommodation is fully booked.', 'error');
      return;
    }

    const refCode = `TVR-${Math.floor(100000 + Math.random() * 900000)}`;
    setConfirmedBookingRef(refCode);

    // Save to user bookings state & localStorage (reduces real-time inventory)
    addBooking({
      bookingReference: refCode,
      userId: user?.id || 'guest',
      propertyId: property.id,
      propertyName: property.name,
      propertyType: property.type,
      propertyImage: property.images[0],
      checkIn,
      checkOut,
      nights,
      guests: {
        adults,
        children: childrenCount,
        rooms: roomsCount,
      },
      primaryGuest: {
        fullName: guestName,
        email: guestEmail,
        phone: guestPhone,
        specialRequests,
      },
      pricing: {
        nightlyRate: property.priceINR,
        subtotal: subtotalINR,
        discount: 0,
        addonsTotal: 0,
        taxesAndService: 0,
        grandTotal: grandTotalINR,
        currencyCode: 'INR',
      },
      selectedAddons: [],
    });

    setStep(3);

    // Fire celebratory confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#0A192F', '#F4E8C1']
      });
    } catch {
      // safe fallback
    }
  };

  // If fully booked, show clear informative page
  if (fullyBooked && step !== 3) {
    return (
      <div className="min-h-screen bg-background dark:bg-surface-dark py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
        <div className="max-w-2xl mx-auto bg-white dark:bg-[#15171C] rounded-2xl p-8 shadow-level-3 border border-red-200 dark:border-red-900/40 text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-red-100 dark:bg-red-950/50 text-red-600 mx-auto flex items-center justify-center">
            <AlertCircle className="w-8 h-8" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-red-600 uppercase tracking-[0.25em] block mb-1">
              Fully Booked / Not Available
            </span>
            <h1 className="font-serif text-3xl font-bold text-primary dark:text-white">
              {property.name} is Currently Sold Out
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 max-w-md mx-auto">
              All units for this accommodation are currently occupied. Please choose another room or villa, or contact our desk for future dates.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Link
              to="/rooms"
              className="px-6 py-3 bg-warm-gold text-primary rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-gold-light transition-all shadow-md"
            >
              Browse Available Rooms
            </Link>
            <Link
              to="/villas"
              className="px-6 py-3 bg-deep-navy dark:bg-white/10 text-white rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-primary dark:hover:bg-white/20 transition-all"
            >
              Browse Available Villas
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background dark:bg-surface-dark py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Step Indicator */}
        <div className="max-w-xl mx-auto">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-gray-400">
            <span className={step >= 1 ? 'text-warm-gold' : ''}>1. Stay Dates</span>
            <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
            <span className={step >= 2 ? 'text-warm-gold' : ''}>2. Guest Details</span>
            <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
            <span className={step >= 3 ? 'text-warm-gold' : ''}>3. Confirmation</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-white/10 h-1.5 rounded-full mt-3 overflow-hidden">
            <div 
              className="bg-warm-gold h-full transition-all duration-500 rounded-full"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>

        {/* STEP 3: CONFIRMATION SUCCESS VIEW */}
        {step === 3 ? (
          <div className="max-w-2xl mx-auto bg-white dark:bg-[#15171C] rounded-3xl p-8 sm:p-12 shadow-level-3 border-2 border-warm-gold/50 text-center space-y-6 animate-scale-in">
            <div className="w-20 h-20 rounded-full bg-warm-gold/20 text-warm-gold mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-bold text-warm-gold uppercase tracking-[0.25em] block mb-1">
                Booking Confirmed
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-primary dark:text-white">
                Thank You, {guestName}!
              </h1>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-2">
                Your reservation at TV Residency, Collegepadi, Kottakkal has been successfully confirmed.
              </p>
            </div>

            {/* Booking Details Card */}
            <div className="p-6 rounded-2xl bg-soft-beige/40 dark:bg-white/5 border border-warm-gold/30 text-left space-y-3 text-xs">
              <div className="flex justify-between border-b border-gray-100 dark:border-white/10 pb-2">
                <span className="text-gray-500">Booking Reference:</span>
                <strong className="font-mono text-warm-gold text-sm font-bold">{confirmedBookingRef}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Accommodation:</span>
                <strong className="text-primary dark:text-white">{property.name}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Units Booked:</span>
                <strong className="text-primary dark:text-white">{roomsCount} {roomsCount === 1 ? 'Unit' : 'Units'}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Stay Duration:</span>
                <strong className="text-primary dark:text-white">{checkIn} to {checkOut} ({nights} {nights === 1 ? 'night' : 'nights'})</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Total Price:</span>
                <strong className="text-warm-gold text-sm font-bold">{formatPrice(grandTotalINR)}</strong>
              </div>
              <div className="flex justify-between pt-2 border-t border-gray-100 dark:border-white/10">
                <span className="text-gray-500">Property Desk:</span>
                <strong className="text-primary dark:text-white">{RESIDENCY_CONTACT.phone}</strong>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Link
                to="/bookings"
                className="px-6 py-3 bg-deep-navy dark:bg-warm-gold text-white dark:text-primary rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-primary dark:hover:bg-gold-light transition-all flex items-center gap-2"
              >
                <Bookmark className="w-4 h-4" />
                <span>View My Bookings</span>
              </Link>
              <Link
                to="/"
                className="px-6 py-3 border border-gray-300 dark:border-white/20 text-gray-700 dark:text-gray-300 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-gray-50 dark:hover:bg-white/5 transition-all flex items-center gap-2"
              >
                <Home className="w-4 h-4" />
                <span>Return to Home</span>
              </Link>
            </div>
          </div>
        ) : (
          /* 2-Column Split: Steps & Summary Card */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Steps Box (7 cols) */}
            <div className="lg:col-span-7 bg-white dark:bg-[#15171C] p-6 sm:p-8 rounded-2xl shadow-level-2 border border-gray-100 dark:border-white/10 space-y-8">
              
              {/* STEP 1: DATES & GUESTS */}
              {step === 1 && (
                <div className="space-y-6 animate-fade-in">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h2 className="font-serif text-2xl font-bold text-primary dark:text-white">
                        Select Stay Dates & Occupancy
                      </h2>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Choose your arrival and departure dates in Collegepadi, Kottakkal.
                      </p>
                    </div>

                    <div className="text-right flex-shrink-0">
                      {availableUnits === 1 ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-100 dark:bg-amber-950/50 dark:text-amber-300 px-2.5 py-1 rounded-full">
                          <Sparkles className="w-3 h-3" />
                          <span>Only 1 unit remaining!</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-warm-gold bg-warm-gold/10 px-2.5 py-1 rounded-full">
                          {availableUnits} Units Available
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-gray-50/50 dark:bg-white/5 border border-gray-100 dark:border-white/10">
                    <CalendarPicker
                      checkIn={checkIn}
                      checkOut={checkOut}
                      onDateChange={(newIn, newOut) => {
                        setCheckIn(newIn);
                        setCheckOut(newOut);
                      }}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider block mb-1">
                        Adults
                      </label>
                      <select
                        value={adults}
                        onChange={(e) => setAdults(Number(e.target.value))}
                        className="w-full py-2.5 px-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-xs text-gray-900 dark:text-white"
                      >
                        {[1, 2, 3, 4, 6].map(n => (
                          <option key={n} value={n}>{n} {n === 1 ? 'Adult' : 'Adults'}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider block mb-1">
                        Children
                      </label>
                      <select
                        value={childrenCount}
                        onChange={(e) => setChildrenCount(Number(e.target.value))}
                        className="w-full py-2.5 px-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-xs text-gray-900 dark:text-white"
                      >
                        {[0, 1, 2, 3].map(n => (
                          <option key={n} value={n}>{n} {n === 1 ? 'Child' : 'Children'}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider block mb-1">
                        Units / Rooms to Book
                      </label>
                      <select
                        value={roomsCount}
                        onChange={(e) => setRoomsCount(Number(e.target.value))}
                        className="w-full py-2.5 px-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-xs text-gray-900 dark:text-white"
                      >
                        {Array.from({ length: Math.max(1, Math.min(availableUnits, 4)) }, (_, i) => i + 1).map(n => (
                          <option key={n} value={n}>{n} {n === 1 ? 'Unit' : 'Units'}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: GUEST DETAILS */}
              {step === 2 && (
                <form id="booking-form" onSubmit={handleConfirmBooking} className="space-y-6 animate-fade-in">
                  <div>
                    <h2 className="font-serif text-2xl font-bold text-primary dark:text-white">
                      Guest Information & Requests
                    </h2>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Please enter your contact details to register your booking.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider block mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-xs text-gray-900 dark:text-white focus:ring-1 focus:ring-warm-gold"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider block mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={guestPhone}
                        onChange={(e) => setGuestPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-xs text-gray-900 dark:text-white focus:ring-1 focus:ring-warm-gold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider block mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-xs text-gray-900 dark:text-white focus:ring-1 focus:ring-warm-gold"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider block mb-1">
                      Special Requests / Notes
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Any specific check-in requirements or arrival details..."
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-xs text-gray-900 dark:text-white focus:ring-1 focus:ring-warm-gold"
                    />
                  </div>
                </form>
              )}

              {/* Navigation Button Footer */}
              <div className="pt-6 border-t border-gray-100 dark:border-white/10 flex justify-between items-center">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex items-center gap-1 text-xs font-bold text-gray-600 dark:text-gray-300 hover:text-warm-gold transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Back to Dates</span>
                  </button>
                ) : (
                  <div />
                )}

                {step === 1 && (
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-6 py-3 bg-deep-navy dark:bg-warm-gold text-white dark:text-primary rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-primary dark:hover:bg-gold-light transition-all flex items-center gap-2 shadow-md"
                  >
                    <span>Proceed to Guest Details</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}

                {step === 2 && (
                  <button
                    type="submit"
                    form="booking-form"
                    className="px-8 py-3.5 bg-deep-navy dark:bg-warm-gold text-white dark:text-primary rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-primary dark:hover:bg-gold-light transition-all flex items-center gap-2 shadow-md"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>Confirm Reservation</span>
                  </button>
                )}
              </div>

            </div>

            {/* Right Summary Sidebar (5 cols) */}
            <div className="lg:col-span-5 bg-white dark:bg-[#15171C] rounded-2xl p-6 shadow-level-2 border border-gray-100 dark:border-white/10 space-y-6 sticky top-24">
              <div className="flex gap-4 items-center">
                <img
                  src={property.images[0]}
                  alt={property.name}
                  className="w-20 h-20 rounded-xl object-cover"
                />
                <div>
                  <span className="text-[10px] font-bold text-warm-gold uppercase tracking-wider block">
                    {property.type === 'villa' ? 'Villa Accommodation' : (property.isAC ? 'AC Room' : 'Non-AC Room')}
                  </span>
                  <h3 className="font-serif font-bold text-base text-primary dark:text-white">
                    {property.name}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {property.location}
                  </p>
                </div>
              </div>

              <div className="space-y-2.5 pt-4 border-t border-gray-100 dark:border-white/10 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-500">Check-in:</span>
                  <strong className="text-primary dark:text-white">{checkIn}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Check-out:</span>
                  <strong className="text-primary dark:text-white">{checkOut}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Nights:</span>
                  <strong className="text-primary dark:text-white">{nights} {nights === 1 ? 'night' : 'nights'}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Units Selected:</span>
                  <strong className="text-primary dark:text-white">{roomsCount} {roomsCount === 1 ? 'Unit' : 'Units'}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Occupancy:</span>
                  <strong className="text-primary dark:text-white">{adults} Adults {childrenCount > 0 ? `, ${childrenCount} Children` : ''}</strong>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2 pt-4 border-t border-gray-100 dark:border-white/10 text-xs">
                <div className="flex justify-between text-gray-600 dark:text-gray-300">
                  <span>{formatPrice(property.priceINR)} × {nights} nights × {roomsCount} {roomsCount === 1 ? 'unit' : 'units'}</span>
                  <span className="font-bold text-primary dark:text-white">{formatPrice(subtotalINR)}</span>
                </div>
                <div className="pt-3 border-t border-gray-100 dark:border-white/10 flex justify-between items-baseline">
                  <span className="font-bold text-sm text-primary dark:text-white">Total Amount</span>
                  <span className="font-serif text-2xl font-bold text-warm-gold">{formatPrice(grandTotalINR)}</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-soft-beige/40 dark:bg-white/5 border border-warm-gold/20 text-[11px] text-gray-600 dark:text-gray-400 space-y-1.5">
                <div className="flex items-center gap-1.5 font-bold text-primary dark:text-white">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Verified TV Residency Rates</span>
                </div>
                <p>Wi-Fi, hot water, parking, and power backup are included. No hidden service charges.</p>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
