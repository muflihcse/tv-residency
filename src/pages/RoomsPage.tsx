import React, { useState, useMemo } from 'react';
import { PROPERTIES } from '../data/residencyData';
import { PropertyCard } from '../components/PropertyCard';
import { useResidency } from '../context/ResidencyContext';
import { Search, SlidersHorizontal, X, Sparkles, Filter } from 'lucide-react';

export const RoomsPage: React.FC = () => {
  const { formatPrice } = useResidency();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [maxPrice, setMaxPrice] = useState(25000);
  const [selectedGuests, setSelectedGuests] = useState<number>(0);
  const [minRating, setMinRating] = useState<number>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'recommended' | 'price-asc' | 'price-desc' | 'rating'>('recommended');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const roomsList = useMemo(() => {
    return PROPERTIES.filter(p => p.type === 'room');
  }, []);

  const filteredRooms = useMemo(() => {
    let result = [...roomsList];

    // Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(r => 
        r.name.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.view.toLowerCase().includes(q) ||
        r.location.toLowerCase().includes(q)
      );
    }

    // Category
    if (selectedCategory !== 'all') {
      result = result.filter(r => r.category === selectedCategory);
    }

    // Max Price
    result = result.filter(r => r.priceINR <= maxPrice);

    // Guests
    if (selectedGuests > 0) {
      result = result.filter(r => r.maxGuests >= selectedGuests);
    }

    // Min Rating
    if (minRating > 0) {
      result = result.filter(r => r.rating >= minRating);
    }

    // Sorting
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.priceINR - b.priceINR);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.priceINR - a.priceINR);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [roomsList, searchQuery, selectedCategory, maxPrice, selectedGuests, minRating, sortBy]);

  const handleReset = () => {
    setSearchQuery('');
    setMaxPrice(25000);
    setSelectedGuests(0);
    setMinRating(0);
    setSelectedCategory('all');
    setSortBy('recommended');
  };

  return (
    <div className="min-h-screen bg-background dark:bg-surface-dark py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-warm-gold uppercase tracking-[0.25em] block mb-2">
            Refined Accommodations
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-primary dark:text-white tracking-tight">
            Rooms & Ocean Suites
          </h1>
          <div className="w-16 h-0.5 bg-warm-gold mx-auto mt-3 mb-4"></div>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            Browse our collection of 6 luxury rooms and suites at TV Residency, Collegepadi, Kottakkal.
          </p>
        </div>

        {/* Top Search & Filter Bar */}
        <div className="bg-white dark:bg-[#15171C] p-4 rounded-2xl shadow-level-2 border border-gray-100 dark:border-white/10 mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
          
          {/* Text Search Input */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by room name, view, or feature..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-xs text-gray-900 dark:text-white placeholder:text-gray-400 focus:ring-1 focus:ring-warm-gold"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Quick Category Buttons & Sort */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="md:hidden flex items-center gap-1.5 px-3 py-2 border border-gray-200 dark:border-white/10 rounded-xl text-xs font-semibold text-gray-700 dark:text-gray-200"
            >
              <Filter className="w-3.5 h-3.5 text-warm-gold" />
              <span>Filters</span>
            </button>

            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-warm-gold hidden sm:inline" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="text-xs font-semibold py-2 px-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-gray-700 dark:text-gray-200 focus:ring-1 focus:ring-warm-gold cursor-pointer"
              >
                <option value="recommended">Featured Order</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated (Stars)</option>
              </select>
            </div>
          </div>
        </div>

        {/* 2-Column Grid: Sidebar Filters + Rooms Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Desktop Filter Sidebar (3 cols) */}
          <aside className={`lg:col-span-3 bg-white dark:bg-[#15171C] rounded-2xl p-6 border border-gray-100 dark:border-white/10 shadow-level-2 space-y-6 ${
            mobileFilterOpen ? 'block' : 'hidden lg:block'
          }`}>
            <div className="flex justify-between items-center pb-4 border-b border-gray-100 dark:border-white/10">
              <span className="font-serif font-bold text-sm text-primary dark:text-white">Filter Rooms</span>
              <button onClick={handleReset} className="text-[11px] text-warm-gold hover:underline font-bold">
                Reset All
              </button>
            </div>

            {/* Category Filter */}
            <div>
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-2">
                Room Category
              </label>
              <div className="space-y-1.5">
                {[
                  { id: 'all', label: 'All Categories' },
                  { id: 'deluxe', label: 'Deluxe Rooms' },
                  { id: 'suite', label: 'Suites & Penthouses' },
                  { id: 'presidential', label: 'Presidential Suites' },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      selectedCategory === cat.id
                        ? 'bg-warm-gold text-primary font-bold'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range Slider */}
            <div>
              <div className="flex justify-between text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                <span>Max Price / Night</span>
                <span className="text-primary dark:text-warm-gold">{formatPrice(maxPrice)}</span>
              </div>
              <input
                type="range"
                min="6000"
                max="25000"
                step="1000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-warm-gold cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                <span>₹6,000</span>
                <span>₹25,000+</span>
              </div>
            </div>

            {/* Minimum Guests */}
            <div>
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-2">
                Guest Capacity
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {[0, 2, 4, 6].map((num) => (
                  <button
                    key={num}
                    onClick={() => setSelectedGuests(num)}
                    className={`py-1.5 rounded-lg text-xs font-bold border transition-all ${
                      selectedGuests === num
                        ? 'bg-deep-navy dark:bg-warm-gold text-white dark:text-primary border-deep-navy dark:border-warm-gold'
                        : 'border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {num === 0 ? 'Any' : `${num}+`}
                  </button>
                ))}
              </div>
            </div>

            {/* Rating Filter */}
            <div>
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-2">
                Guest Rating
              </label>
              <div className="space-y-1">
                {[
                  { val: 0, label: 'All Ratings' },
                  { val: 4.8, label: '★ 4.8 & above' },
                  { val: 4.9, label: '★ 4.9 & above (Exceptional)' },
                ].map((r) => (
                  <button
                    key={r.val}
                    onClick={() => setMinRating(r.val)}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      minRating === r.val
                        ? 'bg-soft-beige/60 dark:bg-warm-gold/20 text-warm-gold font-bold'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5'
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Rooms Grid (9 cols) */}
          <div className="lg:col-span-9 space-y-6">
            <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
              <span>Showing <strong className="text-primary dark:text-white">{filteredRooms.length}</strong> available rooms</span>
            </div>

            {filteredRooms.length === 0 ? (
              <div className="text-center py-20 bg-white dark:bg-[#15171C] rounded-2xl border border-gray-100 dark:border-white/10 p-8">
                <Sparkles className="w-10 h-10 text-warm-gold mx-auto mb-3" />
                <h3 className="font-serif text-lg font-bold text-gray-900 dark:text-white mb-1">
                  No rooms match your filter criteria
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 max-w-sm mx-auto mb-5">
                  Try adjusting your price range or guest count to discover available suites.
                </p>
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 bg-warm-gold text-primary font-bold text-xs rounded-full uppercase tracking-wider hover:bg-gold-light transition-all"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredRooms.map((room) => (
                  <PropertyCard key={room.id} property={room} />
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
