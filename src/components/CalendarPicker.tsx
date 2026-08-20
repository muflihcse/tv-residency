import React, { useState, useEffect, useRef } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Check, Edit3 } from 'lucide-react';

interface CalendarPickerProps {
  checkIn: string; // ISO date 'YYYY-MM-DD'
  checkOut: string; // ISO date 'YYYY-MM-DD'
  onDateChange: (checkIn: string, checkOut: string) => void;
  className?: string;
}

export const CalendarPicker: React.FC<CalendarPickerProps> = ({
  checkIn,
  checkOut,
  onDateChange,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'checkIn' | 'checkOut'>('checkIn');
  const [viewMode, setViewMode] = useState<'calendar' | 'manual'>('calendar');
  
  // Current displayed month in calendar
  const initialDate = checkIn ? new Date(checkIn) : new Date();
  const [currentMonth, setCurrentMonth] = useState(new Date(initialDate.getFullYear(), initialDate.getMonth(), 1));

  // Manual typing states
  const [manualCheckIn, setManualCheckIn] = useState(checkIn);
  const [manualCheckOut, setManualCheckOut] = useState(checkOut);
  const [manualError, setManualError] = useState('');

  const containerRef = useRef<HTMLDivElement>(null);

  // Sync external props
  useEffect(() => {
    setManualCheckIn(checkIn);
    setManualCheckOut(checkOut);
  }, [checkIn, checkOut]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Helper to format ISO YYYY-MM-DD to friendly string
  const formatFriendly = (isoDate: string) => {
    if (!isoDate) return 'Select Date';
    try {
      const [y, m, d] = isoDate.split('-').map(Number);
      const date = new Date(y, m - 1, d);
      return date.toLocaleDateString('en-US', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    } catch {
      return isoDate;
    }
  };

  // Helper to get total nights
  const getNights = () => {
    if (!checkIn || !checkOut) return 1;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 1;
  };

  // Month navigation
  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  // Generate days grid for currentMonth
  const generateDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    // First day of month (0 = Sun, 1 = Mon...)
    const firstDayIndex = new Date(year, month, 1).getDay();
    // Total days in month
    const totalDays = new Date(year, month + 1, 0).getDate();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const days = [];

    // Empty blank cells for preceding days
    for (let i = 0; i < firstDayIndex; i++) {
      days.push({ day: 0, dateString: '', isBlank: true, isPast: false, isDisabled: true });
    }

    // Days of current month
    for (let d = 1; d <= totalDays; d++) {
      const dateObj = new Date(year, month, d);
      const mm = String(month + 1).padStart(2, '0');
      const dd = String(d).padStart(2, '0');
      const dateString = `${year}-${mm}-${dd}`;
      const isPast = dateObj < today;
      
      // Disabled if past OR if selecting check-out and date is on or before check-in
      const isDisabled = isPast || (activeTab === 'checkOut' && Boolean(checkIn) && dateString <= checkIn);

      days.push({
        day: d,
        dateString,
        isBlank: false,
        isPast,
        isDisabled,
      });
    }

    return days;
  };

  // Handle Day Click
  const handleDateClick = (dateString: string) => {
    if (!dateString) return;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selected = new Date(dateString);

    // Never allow past dates
    if (selected < today) return;

    if (activeTab === 'checkIn') {
      const currentOut = new Date(checkOut);

      // If selected checkIn is on or after existing checkOut, adjust checkOut to selected + 1 day
      if (selected >= currentOut) {
        const nextDay = new Date(selected);
        nextDay.setDate(nextDay.getDate() + 1);
        const nextDayStr = nextDay.toISOString().split('T')[0];
        onDateChange(dateString, nextDayStr);
        setManualCheckIn(dateString);
        setManualCheckOut(nextDayStr);
      } else {
        onDateChange(dateString, checkOut);
        setManualCheckIn(dateString);
      }
      // Switch to pick Check-out next
      setActiveTab('checkOut');
    } else {
      // Selecting Check-Out
      const currentIn = new Date(checkIn);

      // Check-out MUST be strictly after Check-in
      if (selected <= currentIn) {
        // If clicked on or before check-in, treat as new check-in and pick next day as checkout
        const nextDay = new Date(selected);
        nextDay.setDate(nextDay.getDate() + 1);
        const nextDayStr = nextDay.toISOString().split('T')[0];
        onDateChange(dateString, nextDayStr);
        setManualCheckIn(dateString);
        setManualCheckOut(nextDayStr);
        setActiveTab('checkOut');
      } else {
        onDateChange(checkIn, dateString);
        setManualCheckOut(dateString);
      }
    }
  };

  // Quick Preset Handlers
  const applyPreset = (nightsCount: number) => {
    const today = new Date();
    const startStr = today.toISOString().split('T')[0];
    const end = new Date(today);
    end.setDate(end.getDate() + nightsCount);
    const endStr = end.toISOString().split('T')[0];

    onDateChange(startStr, endStr);
    setManualCheckIn(startStr);
    setManualCheckOut(endStr);
    setActiveTab('checkIn');
  };

  const applyWeekendPreset = () => {
    const today = new Date();
    const day = today.getDay();
    const daysUntilFriday = (5 - day + 7) % 7 || 7;
    
    const friday = new Date(today);
    friday.setDate(today.getDate() + daysUntilFriday);
    
    const sunday = new Date(friday);
    sunday.setDate(friday.getDate() + 2);

    const startStr = friday.toISOString().split('T')[0];
    const endStr = sunday.toISOString().split('T')[0];

    onDateChange(startStr, endStr);
    setManualCheckIn(startStr);
    setManualCheckOut(endStr);
    setActiveTab('checkIn');
  };

  // Manual typing apply
  const handleManualApply = () => {
    setManualError('');
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(manualCheckIn) || !regex.test(manualCheckOut)) {
      setManualError('Please use YYYY-MM-DD format (e.g. 2026-08-25)');
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const start = new Date(manualCheckIn);
    const end = new Date(manualCheckOut);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      setManualError('Invalid date entered.');
      return;
    }

    if (start < today) {
      setManualError('Check-in date cannot be in the past.');
      return;
    }

    if (end <= start) {
      setManualError('Check-out date must be strictly after Check-in date.');
      return;
    }

    onDateChange(manualCheckIn, manualCheckOut);
    setIsOpen(false);
  };

  const todayDate = new Date();
  todayDate.setHours(0, 0, 0, 0);
  const isCurrentMonthOrPast = 
    currentMonth.getFullYear() < todayDate.getFullYear() ||
    (currentMonth.getFullYear() === todayDate.getFullYear() && currentMonth.getMonth() <= todayDate.getMonth());

  const daysGrid = generateDays();
  const monthName = currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* 2-Column Search Display Triggers (Check-in & Check-out) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        
        {/* Check-In Field */}
        <div className="flex flex-col gap-1.5 text-left">
          <label className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
            <CalendarIcon className="w-3.5 h-3.5 text-warm-gold" />
            Check-in Date
          </label>
          <button
            type="button"
            onClick={() => {
              setActiveTab('checkIn');
              setIsOpen(true);
            }}
            className={`w-full py-2.5 px-3 bg-gray-50 dark:bg-white/5 border rounded-xl text-xs font-semibold text-gray-900 dark:text-white flex items-center justify-between transition-all focus:ring-1 focus:ring-warm-gold ${
              isOpen && activeTab === 'checkIn'
                ? 'border-warm-gold ring-1 ring-warm-gold/50 shadow-sm'
                : 'border-gray-200 dark:border-white/10 hover:border-warm-gold/60'
            }`}
          >
            <span className="truncate">{formatFriendly(checkIn)}</span>
            <span className="text-[10px] text-warm-gold font-bold px-1.5 py-0.5 rounded bg-warm-gold/10">
              In
            </span>
          </button>
        </div>

        {/* Check-Out Field */}
        <div className="flex flex-col gap-1.5 text-left">
          <label className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
            <CalendarIcon className="w-3.5 h-3.5 text-warm-gold" />
            Check-out Date
          </label>
          <button
            type="button"
            onClick={() => {
              setActiveTab('checkOut');
              setIsOpen(true);
            }}
            className={`w-full py-2.5 px-3 bg-gray-50 dark:bg-white/5 border rounded-xl text-xs font-semibold text-gray-900 dark:text-white flex items-center justify-between transition-all focus:ring-1 focus:ring-warm-gold ${
              isOpen && activeTab === 'checkOut'
                ? 'border-warm-gold ring-1 ring-warm-gold/50 shadow-sm'
                : 'border-gray-200 dark:border-white/10 hover:border-warm-gold/60'
            }`}
          >
            <span className="truncate">{formatFriendly(checkOut)}</span>
            <span className="text-[10px] text-warm-gold font-bold px-1.5 py-0.5 rounded bg-warm-gold/10">
              {getNights()} {getNights() === 1 ? 'Nt' : 'Nts'}
            </span>
          </button>
        </div>
      </div>

      {/* Interactive Luxury Popover Calendar */}
      {isOpen && (
        <div className="absolute top-full left-0 sm:left-auto right-0 sm:right-auto mt-3 w-[92vw] sm:w-96 bg-white dark:bg-[#15171C] border border-warm-gold/40 shadow-2xl rounded-2xl p-5 z-50 animate-fade-in text-gray-900 dark:text-white">
          
          {/* Header Tabs: Check-in vs Check-out Selection */}
          <div className="flex justify-between items-center pb-3 border-b border-gray-100 dark:border-white/10 gap-2">
            <div className="flex gap-1.5">
              <button
                type="button"
                onClick={() => setActiveTab('checkIn')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'checkIn'
                    ? 'bg-warm-gold text-primary shadow-sm'
                    : 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 hover:text-white'
                }`}
              >
                1. Check-in
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('checkOut')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'checkOut'
                    ? 'bg-warm-gold text-primary shadow-sm'
                    : 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 hover:text-white'
                }`}
              >
                2. Check-out
              </button>
            </div>

            {/* Mode Switcher: Calendar vs Type Manually */}
            <button
              type="button"
              onClick={() => setViewMode(viewMode === 'calendar' ? 'manual' : 'calendar')}
              className="text-[11px] font-bold text-warm-gold hover:underline flex items-center gap-1"
            >
              <Edit3 className="w-3 h-3" />
              <span>{viewMode === 'calendar' ? 'Type Manually' : 'View Calendar'}</span>
            </button>
          </div>

          {/* Mode 1: Interactive Visual Calendar Grid */}
          {viewMode === 'calendar' ? (
            <div className="py-3 space-y-3">
              
              {/* Month Navigation */}
              <div className="flex justify-between items-center px-1">
                <button
                  type="button"
                  disabled={isCurrentMonthOrPast}
                  onClick={prevMonth}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                    isCurrentMonthOrPast
                      ? 'bg-gray-100/40 dark:bg-white/5 text-gray-300 dark:text-gray-600 opacity-40 cursor-not-allowed'
                      : 'bg-gray-100 dark:bg-white/5 hover:bg-warm-gold hover:text-primary text-gray-700 dark:text-gray-200'
                  }`}
                  title={isCurrentMonthOrPast ? 'Cannot view past months' : 'Previous Month'}
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="font-serif font-bold text-sm text-primary dark:text-warm-gold">
                  {monthName}
                </span>
                <button
                  type="button"
                  onClick={nextMonth}
                  className="w-8 h-8 rounded-full bg-gray-100 dark:bg-white/5 hover:bg-warm-gold hover:text-primary flex items-center justify-center transition-colors"
                  title="Next Month"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Weekday Labels */}
              <div className="grid grid-cols-7 text-center text-[10px] font-bold text-gray-400 uppercase tracking-wider py-1">
                <span>Su</span>
                <span>Mo</span>
                <span>Tu</span>
                <span>We</span>
                <span>Th</span>
                <span>Fr</span>
                <span>Sa</span>
              </div>

              {/* Days Grid */}
              <div className="grid grid-cols-7 gap-1 text-center text-xs">
                {daysGrid.map((item, idx) => {
                  if (item.isBlank) {
                    return <div key={`blank_${idx}`} className="h-8" />;
                  }

                  const isCheckIn = item.dateString === checkIn;
                  const isCheckOut = item.dateString === checkOut;
                  const inRange =
                    checkIn &&
                    checkOut &&
                    item.dateString > checkIn &&
                    item.dateString < checkOut;

                  let cellClass = 'hover:bg-warm-gold/20 text-gray-700 dark:text-gray-200';

                  if (item.isDisabled) {
                    cellClass = 'text-gray-300 dark:text-gray-600 opacity-30 cursor-not-allowed line-through';
                  } else if (isCheckIn || isCheckOut) {
                    cellClass = 'bg-warm-gold text-primary font-bold shadow-sm rounded-lg scale-105';
                  } else if (inRange) {
                    cellClass = 'bg-warm-gold/20 text-warm-gold font-semibold rounded-none';
                  }

                  return (
                    <button
                      type="button"
                      key={item.dateString}
                      disabled={item.isDisabled}
                      onClick={() => handleDateClick(item.dateString)}
                      className={`h-8 w-full flex items-center justify-center rounded-lg text-xs transition-all ${cellClass}`}
                    >
                      {item.day}
                    </button>
                  );
                })}
              </div>

              {/* Selection Summary Pill */}
              <div className="flex justify-between items-center text-[11px] pt-2 border-t border-gray-100 dark:border-white/10 text-gray-500 dark:text-gray-400">
                <span>Selected: <strong className="text-primary dark:text-warm-gold">{getNights()} Night{getNights() > 1 ? 's' : ''}</strong></span>
                <span className="text-[10px] text-gray-400">{checkIn} → {checkOut}</span>
              </div>
            </div>
          ) : (
            /* Mode 2: Manual Direct Typing */
            <div className="py-4 space-y-4 text-left">
              <div className="text-xs text-gray-600 dark:text-gray-300">
                Enter your desired stay dates in <strong>YYYY-MM-DD</strong> format:
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                    Check-in Date (YYYY-MM-DD)
                  </label>
                  <input
                    type="text"
                    value={manualCheckIn}
                    onChange={(e) => setManualCheckIn(e.target.value)}
                    placeholder="2026-08-25"
                    className="w-full py-2 px-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-xs font-mono focus:ring-1 focus:ring-warm-gold text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                    Check-out Date (YYYY-MM-DD)
                  </label>
                  <input
                    type="text"
                    value={manualCheckOut}
                    onChange={(e) => setManualCheckOut(e.target.value)}
                    placeholder="2026-08-28"
                    className="w-full py-2 px-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-xs font-mono focus:ring-1 focus:ring-warm-gold text-gray-900 dark:text-white"
                  />
                </div>

                {manualError && (
                  <p className="text-[11px] text-red-500 font-medium">{manualError}</p>
                )}

                <button
                  type="button"
                  onClick={handleManualApply}
                  className="w-full py-2.5 bg-warm-gold text-primary font-bold text-xs rounded-xl hover:bg-gold-light transition-all flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Apply Typed Dates</span>
                </button>
              </div>
            </div>
          )}

          {/* Quick Presets Row */}
          <div className="pt-3 border-t border-gray-100 dark:border-white/10">
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 text-left">
              Quick Stay Presets
            </div>
            <div className="grid grid-cols-3 gap-1.5 text-[11px]">
              <button
                type="button"
                onClick={() => applyPreset(1)}
                className="py-1.5 px-2 rounded-lg bg-gray-50 dark:bg-white/5 hover:bg-warm-gold/20 text-gray-700 dark:text-gray-200 hover:text-warm-gold font-semibold transition-colors text-center truncate"
              >
                1 Night
              </button>
              <button
                type="button"
                onClick={applyWeekendPreset}
                className="py-1.5 px-2 rounded-lg bg-gray-50 dark:bg-white/5 hover:bg-warm-gold/20 text-gray-700 dark:text-gray-200 hover:text-warm-gold font-semibold transition-colors text-center truncate"
              >
                Weekend (2N)
              </button>
              <button
                type="button"
                onClick={() => applyPreset(3)}
                className="py-1.5 px-2 rounded-lg bg-gray-50 dark:bg-white/5 hover:bg-warm-gold/20 text-gray-700 dark:text-gray-200 hover:text-warm-gold font-semibold transition-colors text-center truncate"
              >
                3 Nights
              </button>
            </div>

            {/* Done / Confirm Button */}
            <div className="mt-3 flex justify-end">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-4 py-1.5 bg-deep-navy dark:bg-warm-gold text-white dark:text-primary font-bold text-xs rounded-lg hover:bg-primary dark:hover:bg-gold-light transition-all"
              >
                Done
              </button>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};
