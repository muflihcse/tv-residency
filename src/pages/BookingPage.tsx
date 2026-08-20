import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { PROPERTIES, ADD_ON_PERKS, SPECIAL_OFFERS } from '../data/residencyData';
import { useAuth } from '../context/AuthContext';
import { useResidency } from '../context/ResidencyContext';
import { CalendarPicker } from '../components/CalendarPicker';
import confetti from 'canvas-confetti';
import { 
  Check, 
  ChevronRight, 
  ChevronLeft, 
  Lock, 
  CheckCircle2, 
  Bookmark, 
  Home
} from 'lucide-react';

export const BookingPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user, isAuthenticated, addBooking } = useAuth();
  const { formatPrice, searchFilters, showToast } = useResidency();
  const navigate = useNavigate();

  const property = PROPERTIES.find(p => p.id === id) || PROPERTIES[0];

  // Auth gate check
  useEffect(() => {
    if (!isAuthenticated) {
      showToast('Please sign in to proceed with your booking.', 'info');
      navigate(`/login?redirect=/booking/${property.id}`);
    }
  }, [isAuthenticated, property.id, navigate, showToast]);

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

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
  const [roomsCount, setRoomsCount] = useState(searchFilters.rooms || 1);

  // Add-ons & Promos
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [promoMessage, setPromoMessage] = useState<string>('');

  // Primary Guest Info
  const [guestName, setGuestName] = useState(user?.name || '');
  const [guestEmail, setGuestEmail] = useState(user?.email || '');
  const [guestPhone, setGuestPhone] = useState(user?.phone || '+91 98470 12345');
  const [pillowMenu, setPillowMenu] = useState('Organic Mulberry Silk');
  const [dietaryPrefs, setDietaryPrefs] = useState('None (Omnivore)');
  const [arrivalTime, setArrivalTime] = useState('14:00 - 16:00');
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

  // Addons total
  const addonsTotalINR = useMemo(() => {
    return selectedAddons.reduce((sum, addonId) => {
      const perk = ADD_ON_PERKS.find(p => p.id === addonId);
      return sum + (perk ? perk.priceINR : 0);
    }, 0);
  }, [selectedAddons]);

  // VIP Member discount
  const vipDiscountPercent = user ? (user.membershipTier === 'Platinum' ? 15 : user.membershipTier === 'Gold' ? 10 : 5) : 0;
  const effectiveDiscountPercent = Math.max(appliedDiscount, vipDiscountPercent);

  const subtotalINR = property.priceINR * nights * roomsCount;
  const discountAmountINR = Math.round((subtotalINR * effectiveDiscountPercent) / 100);
  const taxesAndServiceINR = Math.round((subtotalINR - discountAmountINR + addonsTotalINR) * 0.12);
  const grandTotalINR = subtotalINR - discountAmountINR + addonsTotalINR + taxesAndServiceINR;

  const toggleAddon = (addonId: string) => {
    setSelectedAddons(prev =>
      prev.includes(addonId) ? prev.filter(id => id !== addonId) : [...prev, addonId]
    );
  };

  const applyPromo = () => {
    const code = promoCodeInput.trim().toUpperCase();
    const foundOffer = SPECIAL_OFFERS.find(o => o.code.toUpperCase() === code);
    if (foundOffer) {
      setAppliedDiscount(foundOffer.discountPercent);
      setPromoMessage(`✓ Applied "${foundOffer.title}" (${foundOffer.discountPercent}% off)`);
      showToast(`Promo code "${foundOffer.code}" applied!`, 'gold');
    } else if (code === 'VIP15') {
      setAppliedDiscount(15);
      setPromoMessage('✓ VIP Secret Code applied: 15% discount');
      showToast('VIP Secret Code applied!', 'gold');
    } else if (code) {
      setPromoMessage('Invalid or expired promotional code.');
    }
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const refCode = `TVR-${Math.floor(100000 + Math.random() * 900000)}`;
    setConfirmedBookingRef(refCode);

    // Save to user bookings state & localStorage
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
        specialRequests: specialRequests || `Pillow: ${pillowMenu}, Diet: ${dietaryPrefs}`,
        arrivalTime,
      },
      pricing: {
        nightlyRate: property.priceINR,
        subtotal: subtotalINR,
        discount: discountAmountINR,
        promoCodeApplied: appliedDiscount > 0 ? promoCodeInput : undefined,
        addonsTotal: addonsTotalINR,
        taxesAndService: taxesAndServiceINR,
        grandTotal: grandTotalINR,
        currencyCode: 'INR',
      },
      selectedAddons,
    });

    setStep(4);

    // Trigger celebratory confetti
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#D4AF37', '#EED888', '#001F3F', '#FFFFFF']
    });

    showToast(`Sanctuary reserved successfully! Ref #${refCode}`, 'gold');
  };

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-background dark:bg-surface-dark py-10 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        
        {/* Stepper Header */}
        <div className="mb-8 bg-white dark:bg-[#15171C] rounded-2xl p-6 shadow-level-2 border border-soft-beige/70 dark:border-white/10">
          <div className="flex justify-between items-center mb-4">
            <div>
              <span className="text-[10px] font-bold text-warm-gold uppercase tracking-[0.25em] block">
                Step {step} of 4
              </span>
              <h1 className="font-serif text-xl sm:text-2xl font-bold text-primary dark:text-white">
                {step === 1 && 'Review Stays & Travel Dates'}
                {step === 2 && 'Bespoke Curations & Add-ons'}
                {step === 3 && 'Primary Guest Details & Preferences'}
                {step === 4 && 'Sanctuary Booking Confirmed!'}
              </h1>
            </div>
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
              {property.name}
            </span>
          </div>

          {/* Stepper Progress Bar */}
          <div className="w-full bg-gray-100 dark:bg-white/5 h-2 rounded-full overflow-hidden flex">
            <div
              className="bg-warm-gold h-full transition-all duration-500 ease-out"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </div>

        {/* Step Body */}
        <div className="bg-white dark:bg-[#15171C] rounded-2xl p-6 sm:p-8 shadow-level-2 border border-soft-beige/70 dark:border-white/10 space-y-6">
          
          {/* STEP 1: SUMMARY & DATES */}
          {step === 1 && (
            <div className="space-y-6 animate-fade-in">
              {/* Selected Property Preview */}
              <div className="flex flex-col sm:flex-row gap-5 p-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5">
                <img
                  src={property.images[0]}
                  alt={property.name}
                  className="w-full sm:w-44 h-28 rounded-lg object-cover"
                />
                <div className="flex-1 space-y-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-serif text-lg font-bold text-primary dark:text-white">
                      {property.name}
                    </h3>
                    <span className="text-xs font-bold text-warm-gold bg-warm-gold/10 px-2 py-0.5 rounded">
                      ★ {property.rating.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">
                    {property.location} • {property.sqft} sqft
                  </p>
                  <div className="text-xs font-bold text-primary dark:text-white pt-2">
                    {formatPrice(property.priceINR)} <span className="text-[10px] text-gray-400 font-normal">/ night</span>
                  </div>
                </div>
              </div>

              {/* Dates & Guests Controls */}
              <div className="space-y-4 pt-2">
                <div>
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
                    {[1, 2, 3, 4, 6, 8].map((n: number) => (
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
                    {[0, 1, 2, 3, 4].map((n: number) => (
                      <option key={n} value={n}>{n} {n === 1 ? 'Child' : 'Children'}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider block mb-1">
                    Rooms
                  </label>
                  <select
                    value={roomsCount}
                    onChange={(e) => setRoomsCount(Number(e.target.value))}
                    className="w-full py-2.5 px-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-xs text-gray-900 dark:text-white"
                  >
                    {[1, 2, 3, 4].map((n: number) => (
                      <option key={n} value={n}>{n} {n === 1 ? 'Room' : 'Rooms'}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

              {/* Promo Code Input */}
              <div className="pt-3 flex flex-col sm:flex-row gap-3 items-end">
                <div className="flex-1">
                  <label className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider block mb-1">
                    Promotional / VIP Special Code
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. WEEKEND20, COUPLE25, VILLA35"
                    value={promoCodeInput}
                    onChange={(e) => setPromoCodeInput(e.target.value)}
                    className="w-full py-2.5 px-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-xs text-gray-900 dark:text-white uppercase font-mono"
                  />
                </div>
                <button
                  type="button"
                  onClick={applyPromo}
                  className="py-2.5 px-6 bg-gray-100 dark:bg-white/10 hover:bg-warm-gold hover:text-primary font-bold text-xs rounded-xl uppercase tracking-wider transition-colors h-10"
                >
                  Apply Code
                </button>
              </div>

              {promoMessage && (
                <p className={`text-xs font-semibold ${promoMessage.includes('✓') ? 'text-green-600 dark:text-green-400' : 'text-red-500'}`}>
                  {promoMessage}
                </p>
              )}
            </div>
          )}

          {/* STEP 2: BESPOKE ADD-ONS */}
          {step === 2 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h3 className="font-serif text-lg font-bold text-primary dark:text-white">
                  Enhance Your Kerala Sanctuary Stay
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Select bespoke airport chauffeur services and romantic dining curations.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {ADD_ON_PERKS.map((perk) => {
                  const isChecked = selectedAddons.includes(perk.id);
                  return (
                    <div
                      key={perk.id}
                      onClick={() => toggleAddon(perk.id)}
                      className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex items-start justify-between gap-3 ${
                        isChecked
                          ? 'border-warm-gold bg-soft-beige/40 dark:bg-warm-gold/10 shadow-sm'
                          : 'border-gray-200 dark:border-white/10 hover:border-warm-gold/40'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-[20px] text-warm-gold">
                            {perk.icon}
                          </span>
                          <span className="font-serif font-bold text-xs sm:text-sm text-primary dark:text-white">
                            {perk.name}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                          {perk.description}
                        </p>
                        <div className="text-xs font-bold text-warm-gold pt-1">
                          +{formatPrice(perk.priceINR)}
                        </div>
                      </div>

                      <div className={`w-5 h-5 rounded flex items-center justify-center border transition-colors flex-shrink-0 ${
                        isChecked ? 'bg-warm-gold border-warm-gold text-primary' : 'border-gray-300 dark:border-white/20'
                      }`}>
                        {isChecked && <Check className="w-3.5 h-3.5" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: GUEST INFORMATION & IN-VILLA PREFERENCES */}
          {step === 3 && (
            <form id="booking-form" onSubmit={handleConfirmBooking} className="space-y-6 animate-fade-in">
              <div>
                <h3 className="font-serif text-lg font-bold text-primary dark:text-white">
                  Primary Guest Information & Preferences
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Our chief butler will review your preferences prior to arrival.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider block mb-1">
                    Primary Guest Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full py-2.5 px-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-xs text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider block mb-1">
                    Confirmation Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    className="w-full py-2.5 px-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-xs text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider block mb-1">
                    Mobile / WhatsApp Contact *
                  </label>
                  <input
                    type="tel"
                    required
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    className="w-full py-2.5 px-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-xs text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider block mb-1">
                    Expected Arrival Time
                  </label>
                  <select
                    value={arrivalTime}
                    onChange={(e) => setArrivalTime(e.target.value)}
                    className="w-full py-2.5 px-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-xs text-gray-900 dark:text-white"
                  >
                    <option>12:00 - 14:00 (Early Check-In Request)</option>
                    <option>14:00 - 16:00 (Standard Arrival)</option>
                    <option>16:00 - 18:00 (Sunset Arrival)</option>
                    <option>18:00 - 22:00 (Late Evening Arrival)</option>
                  </select>
                </div>
              </div>

              {/* In-Villa Bespoke Preferences */}
              <div className="p-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 space-y-4">
                <div className="text-xs font-bold text-warm-gold uppercase tracking-wider">
                  In-Villa Bespoke Preferences
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] text-gray-500 dark:text-gray-400 block mb-1">
                      Pillow Concierge Selection
                    </label>
                    <select
                      value={pillowMenu}
                      onChange={(e) => setPillowMenu(e.target.value)}
                      className="w-full py-2 px-3 bg-white dark:bg-[#181A20] border border-gray-200 dark:border-white/10 rounded-lg text-xs text-gray-900 dark:text-white"
                    >
                      <option>Organic Mulberry Silk</option>
                      <option>Hungarian White Goose Down</option>
                      <option>Cooling Lavender Infused Memory Foam</option>
                      <option>Buckwheat Natural Ergonomic</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[11px] text-gray-500 dark:text-gray-400 block mb-1">
                      Dietary Requirements
                    </label>
                    <select
                      value={dietaryPrefs}
                      onChange={(e) => setDietaryPrefs(e.target.value)}
                      className="w-full py-2 px-3 bg-white dark:bg-[#181A20] border border-gray-200 dark:border-white/10 rounded-lg text-xs text-gray-900 dark:text-white"
                    >
                      <option>None (Omnivore)</option>
                      <option>Pure Vegetarian (Satvik)</option>
                      <option>Vegan / Plant-Based</option>
                      <option>Gluten-Free Gourmet</option>
                      <option>Halal / Kosher Friendly</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] text-gray-500 dark:text-gray-400 block mb-1">
                    Special Occasions & Notes for Butler Team
                  </label>
                  <textarea
                    rows={2}
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    placeholder="e.g. Honeymoon celebration, airport flight number 6E 1234, extra quiet suite requested..."
                    className="w-full py-2 px-3 bg-white dark:bg-[#181A20] border border-gray-200 dark:border-white/10 rounded-lg text-xs text-gray-900 dark:text-white"
                  />
                </div>
              </div>
            </form>
          )}

          {/* STEP 4: CONFIRMATION SCREEN */}
          {step === 4 && (
            <div className="text-center py-6 space-y-6 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-warm-gold/20 text-warm-gold flex items-center justify-center mx-auto shadow-gold">
                <CheckCircle2 className="w-10 h-10 text-warm-gold" />
              </div>

              <div>
                <span className="text-xs font-bold text-warm-gold uppercase tracking-[0.25em] block mb-1">
                  Sanctuary Reserved
                </span>
                <h2 className="font-serif text-3xl font-bold text-primary dark:text-white">
                  Booking Confirmed, {guestName}!
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-2 max-w-md mx-auto">
                  A comprehensive confirmation dossier and personal butler contact details have been sent to <strong className="text-primary dark:text-white">{guestEmail}</strong>.
                </p>
              </div>

              {/* Reference Box */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-deep-navy to-primary text-white max-w-md mx-auto border border-warm-gold/40 shadow-level-3">
                <div className="text-xs text-gray-300 uppercase tracking-widest mb-1">
                  Booking Reference Number
                </div>
                <div className="font-mono text-2xl font-bold text-warm-gold tracking-widest">
                  {confirmedBookingRef}
                </div>
                <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-3 text-left text-xs text-gray-300">
                  <div>
                    <span className="text-gray-400 block text-[10px]">Property:</span>
                    <strong>{property.name}</strong>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[10px]">Duration:</span>
                    <strong>{nights} Nights ({checkIn} – {checkOut})</strong>
                  </div>
                  <div className="sm:col-span-2 pt-2 border-t border-white/10">
                    <span className="text-gray-400 block text-[10px]">Residency Address & Driving Directions:</span>
                    <strong className="text-white block">TV Residency, Collegepadi, Kottakkal, Near Ahalya Eye Hospital</strong>
                    <a
                      href="https://share.google/n1Z6lQmv4DNvdLZXF"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-warm-gold font-bold text-xs hover:underline mt-1.5"
                    >
                      <span>📍 View on Google Maps →</span>
                    </a>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap justify-center gap-4">
                <Link
                  to="/bookings"
                  className="px-6 py-3 bg-warm-gold text-primary font-bold text-xs uppercase tracking-wider rounded-xl shadow hover:bg-gold-light transition-all flex items-center gap-2"
                >
                  <Bookmark className="w-4 h-4" />
                  <span>View in My Bookings</span>
                </Link>
                <Link
                  to="/"
                  className="px-6 py-3 bg-gray-100 dark:bg-white/10 text-gray-800 dark:text-white font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-gray-200 dark:hover:bg-white/20 transition-all flex items-center gap-2"
                >
                  <Home className="w-4 h-4" />
                  <span>Return to Home</span>
                </Link>
              </div>
            </div>
          )}

          {/* Pricing Breakdown Summary (Steps 1, 2, 3) */}
          {step < 4 && (
            <div className="mt-8 p-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 space-y-2 text-xs">
              <div className="flex justify-between text-gray-600 dark:text-gray-300">
                <span>{property.name} ({nights} {nights === 1 ? 'night' : 'nights'} × {formatPrice(property.priceINR)})</span>
                <span className="font-semibold">{formatPrice(subtotalINR)}</span>
              </div>

              {effectiveDiscountPercent > 0 && (
                <div className="flex justify-between text-green-600 dark:text-green-400">
                  <span>Special Savings ({effectiveDiscountPercent}%)</span>
                  <span>-{formatPrice(discountAmountINR)}</span>
                </div>
              )}

              {addonsTotalINR > 0 && (
                <div className="flex justify-between text-gray-600 dark:text-gray-300">
                  <span>Bespoke Add-Ons ({selectedAddons.length})</span>
                  <span>+{formatPrice(addonsTotalINR)}</span>
                </div>
              )}

              <div className="flex justify-between text-gray-500 dark:text-gray-400">
                <span>Resort Luxury Tax & Valet Fee (12%)</span>
                <span>+{formatPrice(taxesAndServiceINR)}</span>
              </div>

              <div className="pt-2 border-t border-gray-200 dark:border-white/10 flex justify-between items-baseline font-bold text-sm text-primary dark:text-white">
                <span>Estimated Total</span>
                <span className="font-serif text-xl text-warm-gold">{formatPrice(grandTotalINR)}</span>
              </div>
            </div>
          )}

        </div>

        {/* Stepper Footer Controls */}
        {step < 4 && (
          <div className="mt-6 flex justify-between items-center">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(prev => (prev - 1) as any)}
                className="px-5 py-2.5 text-xs font-semibold text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-white flex items-center gap-1.5"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous Step</span>
              </button>
            ) : (
              <Link
                to={`/property/${property.id}`}
                className="text-xs text-gray-500 hover:underline flex items-center gap-1"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Back to Property</span>
              </Link>
            )}

            {step < 3 ? (
              <button
                type="button"
                onClick={() => setStep(prev => (prev + 1) as any)}
                className="px-6 py-3 bg-deep-navy dark:bg-warm-gold text-white dark:text-primary font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-primary dark:hover:bg-gold-light transition-all flex items-center gap-1.5 shadow-sm"
              >
                <span>Continue</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="submit"
                form="booking-form"
                className="px-8 py-3.5 bg-warm-gold text-primary font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-gold-light transition-all flex items-center gap-2 shadow-gold"
              >
                <Lock className="w-4 h-4" />
                <span>Confirm Booking</span>
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
