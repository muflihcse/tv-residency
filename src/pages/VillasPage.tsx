import React, { useState, useMemo } from 'react';
import { PROPERTIES, RESIDENCY_CONTACT } from '../data/residencyData';
import { VillaCard } from '../components/VillaCard';
import { Search, Phone, Check } from 'lucide-react';

export const VillasPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');

  const villasList = useMemo(() => {
    return PROPERTIES.filter(p => p.type === 'villa');
  }, []);

  const filteredVillas = useMemo(() => {
    let result = [...villasList];

    // Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(v => 
        v.name.toLowerCase().includes(q) ||
        v.description.toLowerCase().includes(q) ||
        v.location.toLowerCase().includes(q)
      );
    }

    // Selected Type
    if (selectedType !== 'all') {
      result = result.filter(v => v.id === selectedType);
    }

    return result;
  }, [villasList, searchQuery, selectedType]);

  return (
    <div className="min-h-screen bg-background dark:bg-surface-dark py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-warm-gold uppercase tracking-[0.25em] block mb-2">
            Independent Living
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-primary dark:text-white tracking-tight">
            Villas at TV Residency
          </h1>
          <div className="w-16 h-0.5 bg-warm-gold mx-auto mt-3 mb-4"></div>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            6 villas available: AC two-bedroom and one-room villas with hall and kitchen.
          </p>
        </div>

        {/* Top Search & Filter Bar */}
        <div className="bg-white dark:bg-[#15171C] p-4 rounded-2xl shadow-level-2 border border-gray-100 dark:border-white/10 mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
          
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search villas by name or features..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-xs text-gray-900 dark:text-white placeholder:text-gray-400 focus:ring-1 focus:ring-warm-gold"
            />
          </div>

          {/* Villa Type Filter Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setSelectedType('all')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedType === 'all'
                  ? 'bg-deep-navy dark:bg-warm-gold text-white dark:text-primary shadow-sm'
                  : 'border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:border-warm-gold'
              }`}
            >
              All 6 Villas
            </button>
            <button
              onClick={() => setSelectedType('ac-two-bedroom-villa')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedType === 'ac-two-bedroom-villa'
                  ? 'bg-deep-navy dark:bg-warm-gold text-white dark:text-primary shadow-sm'
                  : 'border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:border-warm-gold'
              }`}
            >
              AC 2-Bedroom Villas (₹4,000 / night)
            </button>
            <button
              onClick={() => setSelectedType('one-room-villa')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedType === 'one-room-villa'
                  ? 'bg-deep-navy dark:bg-warm-gold text-white dark:text-primary shadow-sm'
                  : 'border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:border-warm-gold'
              }`}
            >
              One-Room Villas (₹3,000 / night)
            </button>
          </div>
        </div>

        {/* 2-Column Grid: Sidebar Features + Villas Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Information Sidebar (3 cols) */}
          <aside className="lg:col-span-4 bg-white dark:bg-[#15171C] rounded-2xl p-6 border border-gray-100 dark:border-white/10 shadow-level-2 space-y-6">
            <div>
              <span className="font-serif font-bold text-base text-primary dark:text-white block mb-2">
                Villa Features & Details
              </span>
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                Enjoy spacious accommodation with dedicated living and kitchen spaces in Kottakkal.
              </p>
            </div>

            <div className="space-y-3 pt-3 border-t border-gray-100 dark:border-white/10 text-xs">
              <div className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                <Check className="w-4 h-4 text-warm-gold flex-shrink-0 mt-0.5" />
                <span><strong>AC Two-Bedroom Villas (4 Units):</strong> Hall, kitchen with stove, 2 rooms, bathroom, and sit-out.</span>
              </div>
              <div className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                <Check className="w-4 h-4 text-warm-gold flex-shrink-0 mt-0.5" />
                <span><strong>One-Room Villas (2 Units):</strong> One room, hall, kitchen, and bathroom.</span>
              </div>
              <div className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                <Check className="w-4 h-4 text-warm-gold flex-shrink-0 mt-0.5" />
                <span><strong>Confirmed Facilities:</strong> Wi-Fi, hot water, parking, TV, and power backup.</span>
              </div>
            </div>

            {/* Direct Contact Desk Box */}
            <div className="p-4 rounded-xl bg-soft-beige/60 dark:bg-white/5 border border-warm-gold/30 text-center space-y-2">
              <span className="text-[11px] font-bold text-warm-gold uppercase tracking-wider block">
                Villa Pricing & Availability
              </span>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Contact us directly for villa pricing and customized stay bookings.
              </p>
              <a
                href={`tel:${RESIDENCY_CONTACT.phone}`}
                className="w-full py-2.5 bg-warm-gold text-primary font-bold text-xs rounded-lg uppercase tracking-wider flex items-center justify-center gap-1.5 hover:bg-gold-light transition-colors shadow-sm"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call {RESIDENCY_CONTACT.phone}</span>
              </a>
            </div>
          </aside>

          {/* Villas Grid (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
              <span>Showing <strong className="text-primary dark:text-white">{filteredVillas.length}</strong> villa options</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredVillas.map((villa) => (
                <VillaCard key={villa.id} villa={villa} />
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
