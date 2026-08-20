import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useResidency } from '../context/ResidencyContext';
import { Bookmark, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';

export const MyBookingsPage: React.FC = () => {
  const { user, isAuthenticated, userBookings, cancelBooking } = useAuth();
  const { formatPrice, showToast } = useResidency();

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 text-center bg-background dark:bg-surface-dark">
        <Bookmark className="w-12 h-12 text-warm-gold mb-3 opacity-60" />
        <h2 className="font-serif text-2xl font-bold text-primary dark:text-white mb-2">
          Authentication Required
        </h2>
        <p className="text-xs text-gray-500 mb-6 max-w-sm">
          Please sign in with your TV Residency guest account to view your confirmed reservations.
        </p>
        <Link
          to="/login?redirect=/bookings"
          className="px-6 py-2.5 bg-warm-gold text-primary font-bold text-xs uppercase tracking-wider rounded-xl"
        >
          Sign In Now
        </Link>
      </div>
    );
  }

  const handleCancel = (bookingId: string, ref: string) => {
    if (window.confirm(`Are you sure you want to cancel reservation ${ref}? A 100% refund will be credited under our policy.`)) {
      cancelBooking(bookingId);
      showToast(`Reservation ${ref} has been cancelled. Full refund processed.`, 'info');
    }
  };

  return (
    <div className="min-h-screen bg-background dark:bg-surface-dark py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end pb-6 border-b border-gray-100 dark:border-white/10 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-warm-gold uppercase tracking-[0.25em]">
                Guest Portal
              </span>
              <span className="bg-warm-gold text-primary text-[10px] font-bold px-2 py-0.5 rounded">
                {user.membershipTier} Member
              </span>
            </div>
            <h1 className="font-serif text-3xl font-bold text-primary dark:text-white mt-1">
              My Confirmed Reservations
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Account: {user.name} ({user.email})
            </p>
          </div>

          <Link
            to="/rooms"
            className="px-4 py-2 bg-deep-navy dark:bg-warm-gold text-white dark:text-primary font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-primary dark:hover:bg-gold-light transition-all flex items-center gap-1.5 shadow-sm"
          >
            <span>Book New Sanctuary</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Bookings List */}
        {userBookings.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-[#15171C] rounded-2xl border border-gray-100 dark:border-white/10 p-8">
            <Bookmark className="w-12 h-12 text-warm-gold mx-auto mb-3 opacity-50" />
            <h3 className="font-serif text-xl font-bold text-primary dark:text-white mb-2">
              No Active Stays Yet
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 max-w-sm mx-auto mb-6">
              You have not booked any suites or pool villas yet. Explore our collection to start your coastal escape.
            </p>
            <Link
              to="/rooms"
              className="px-6 py-3 bg-warm-gold text-primary font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-gold-light transition-all"
            >
              Explore Stays
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {userBookings.map((bk) => (
              <div
                key={bk.id}
                className="bg-white dark:bg-[#15171C] rounded-2xl border border-soft-beige/70 dark:border-white/10 overflow-hidden shadow-level-2 flex flex-col md:flex-row"
              >
                {/* Property Image */}
                <div className="md:w-64 h-48 md:h-auto bg-black relative flex-shrink-0">
                  <img
                    src={bk.propertyImage}
                    alt={bk.propertyName}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-sm text-white text-[10px] font-mono px-2 py-1 rounded">
                    Ref: {bk.bookingReference}
                  </div>
                </div>

                {/* Booking Details */}
                <div className="p-6 flex-1 flex flex-col justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex flex-wrap justify-between items-start gap-2">
                      <div>
                        <h3 className="font-serif text-xl font-bold text-primary dark:text-white">
                          {bk.propertyName}
                        </h3>
                        <div className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                          {bk.propertyType === 'villa' ? 'Private Luxury Villa' : 'Deluxe Room / Suite'}
                        </div>
                      </div>

                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 ${
                        bk.status === 'confirmed'
                          ? 'bg-green-100 dark:bg-green-950/40 text-green-700 dark:text-green-400'
                          : 'bg-red-100 dark:bg-red-950/40 text-red-700 dark:text-red-400'
                      }`}>
                        {bk.status === 'confirmed' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                        <span>{bk.status}</span>
                      </span>
                    </div>

                    {/* Dates & Specs */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 py-3 border-y border-gray-100 dark:border-white/5 text-xs text-gray-600 dark:text-gray-300">
                      <div>
                        <span className="text-[10px] text-gray-400 block">Dates:</span>
                        <strong>{bk.checkIn} – {bk.checkOut}</strong>
                        <div className="text-[10px] text-warm-gold">({bk.nights} Nights)</div>
                      </div>
                      <div>
                        <span className="text-[10px] text-gray-400 block">Guests:</span>
                        <strong>{bk.guests.adults} Adults, {bk.guests.children} Children</strong>
                      </div>
                      <div>
                        <span className="text-[10px] text-gray-400 block">Grand Total:</span>
                        <strong className="text-sm text-primary dark:text-white">{formatPrice(bk.pricing.grandTotal)}</strong>
                      </div>
                    </div>

                    {/* Primary Guest & Location Note */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                      <div>
                        Guest: <strong className="text-gray-700 dark:text-gray-200">{bk.primaryGuest.fullName}</strong> ({bk.primaryGuest.email})
                      </div>
                      <a
                        href="https://share.google/n1Z6lQmv4DNvdLZXF"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-warm-gold font-bold hover:underline"
                      >
                        📍 View on Google Maps →
                      </a>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-2 flex justify-between items-center">
                    <Link
                      to={`/property/${bk.propertyId}`}
                      className="text-xs text-warm-gold font-bold hover:underline"
                    >
                      View Property Details →
                    </Link>

                    {bk.status === 'confirmed' && (
                      <button
                        onClick={() => handleCancel(bk.id, bk.bookingReference)}
                        className="text-xs text-red-600 dark:text-red-400 hover:underline font-semibold"
                      >
                        Cancel Reservation
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
