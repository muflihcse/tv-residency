import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useResidency } from '../context/ResidencyContext';
import { CalendarPicker } from './CalendarPicker';
import { Search, Users, ChevronDown, Sparkles, Plus, Minus } from 'lucide-react';

interface SearchBoxProps {
  variant?: 'hero' | 'compact';
  defaultType?: 'all' | 'room' | 'villa';
}

export const SearchBox: React.FC<SearchBoxProps> = ({ variant = 'hero', defaultType = 'all' }) => {
  const { searchFilters, updateSearchFilters, showToast } = useResidency();
  const navigate = useNavigate();

  const [checkIn, setCheckIn] = useState(searchFilters.checkIn);
  const [checkOut, setCheckOut] = useState(searchFilters.checkOut);
  const [adults, setAdults] = useState(searchFilters.adults || 2);
  const [childrenCount, setChildrenCount] = useState(searchFilters.children || 0);
  const [rooms, setRooms] = useState(searchFilters.rooms || 1);
  const [guestPickerOpen, setGuestPickerOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSearchFilters({
      destination: 'Collegepadi, Kottakkal',
      checkIn,
      checkOut,
      adults,
      children: childrenCount,
      guests: adults + childrenCount,
      rooms,
      propertyType: defaultType,
    });

    showToast('Searching available stays...', 'gold');

    if (defaultType === 'villa') {
      navigate('/villas');
    } else {
      navigate('/rooms');
    }
  };

  return (
    <div className={`w-full ${variant === 'hero' ? 'max-w-5xl mx-auto' : 'max-w-4xl mx-auto'}`}>
      <form
        onSubmit={handleSearchSubmit}
        className="bg-white/95 dark:bg-[#15171C]/95 backdrop-blur-md p-4 sm:p-6 rounded-2xl shadow-level-3 border border-soft-beige/80 dark:border-white/10"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          
          {/* Check-In and Check-Out Calendar Picker (2 cols) */}
          <div className="md:col-span-2">
            <CalendarPicker
              checkIn={checkIn}
              checkOut={checkOut}
              onDateChange={(newIn, newOut) => {
                setCheckIn(newIn);
                setCheckOut(newOut);
              }}
            />
          </div>

          {/* Guests & Rooms Selector Popover (1 col) */}
          <div className="relative flex flex-col gap-1.5 text-left">
            <label className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-warm-gold" />
              Guests & Rooms
            </label>
            
            <button
              type="button"
              onClick={() => setGuestPickerOpen(!guestPickerOpen)}
              className="w-full text-left py-2.5 px-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-xs font-semibold text-gray-900 dark:text-white flex justify-between items-center focus:ring-1 focus:ring-warm-gold truncate"
            >
              <span>{adults + childrenCount} Guests, {rooms} Room</span>
              <ChevronDown className="w-3.5 h-3.5 text-warm-gold flex-shrink-0" />
            </button>

            {guestPickerOpen && (
              <>
                <div className="fixed inset-0 z-20" onClick={() => setGuestPickerOpen(false)} />
                <div className="absolute top-full right-0 mt-2 w-64 bg-white dark:bg-[#181A20] shadow-level-3 border border-gray-100 dark:border-white/10 rounded-xl p-4 z-30 space-y-4 animate-fade-in">
                  
                  {/* Adults Counter */}
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-xs font-bold text-gray-900 dark:text-white">Adults</div>
                      <div className="text-[10px] text-gray-400">Ages 13 and above</div>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <button
                        type="button"
                        onClick={() => setAdults(Math.max(1, adults - 1))}
                        className="w-7 h-7 rounded-full border border-gray-300 dark:border-white/20 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:border-warm-gold"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-xs font-bold w-4 text-center">{adults}</span>
                      <button
                        type="button"
                        onClick={() => setAdults(Math.min(10, adults + 1))}
                        className="w-7 h-7 rounded-full border border-gray-300 dark:border-white/20 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:border-warm-gold"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Children Counter */}
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-xs font-bold text-gray-900 dark:text-white">Children</div>
                      <div className="text-[10px] text-gray-400">Ages 0 to 12</div>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <button
                        type="button"
                        onClick={() => setChildrenCount(Math.max(0, childrenCount - 1))}
                        className="w-7 h-7 rounded-full border border-gray-300 dark:border-white/20 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:border-warm-gold"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-xs font-bold w-4 text-center">{childrenCount}</span>
                      <button
                        type="button"
                        onClick={() => setChildrenCount(Math.min(6, childrenCount + 1))}
                        className="w-7 h-7 rounded-full border border-gray-300 dark:border-white/20 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:border-warm-gold"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Rooms Counter */}
                  <div className="flex justify-between items-center pt-2 border-t border-gray-100 dark:border-white/5">
                    <div>
                      <div className="text-xs font-bold text-gray-900 dark:text-white">Rooms</div>
                      <div className="text-[10px] text-gray-400">Number of suites/villas</div>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <button
                        type="button"
                        onClick={() => setRooms(Math.max(1, rooms - 1))}
                        className="w-7 h-7 rounded-full border border-gray-300 dark:border-white/20 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:border-warm-gold"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-xs font-bold w-4 text-center">{rooms}</span>
                      <button
                        type="button"
                        onClick={() => setRooms(Math.min(5, rooms + 1))}
                        className="w-7 h-7 rounded-full border border-gray-300 dark:border-white/20 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:border-warm-gold"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setGuestPickerOpen(false)}
                    className="w-full py-2 bg-warm-gold text-primary font-bold text-xs rounded-lg uppercase tracking-wider mt-2"
                  >
                    Done
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Action Button Row */}
        <div className="mt-5 pt-4 border-t border-gray-100 dark:border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-warm-gold" />
              Best Rate Guarantee
            </span>
            <span>•</span>
            <span>Free Cancellation on Most Stays</span>
            <span>•</span>
            <span>No Hidden Taxes</span>
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-3.5 bg-deep-navy dark:bg-warm-gold text-white dark:text-primary font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-primary dark:hover:bg-gold-light transition-all flex items-center justify-center gap-2.5 shadow-md active:scale-[0.99]"
          >
            <Search className="w-4 h-4" />
            <span>Search Stays</span>
          </button>
        </div>
      </form>
    </div>
  );
};
