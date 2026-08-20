import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Currency, SearchFilterState, Property } from '../types';
import { CURRENCIES, PROPERTIES } from '../data/residencyData';

export interface ToastNotification {
  id: string;
  message: string;
  type: 'info' | 'success' | 'gold' | 'error';
}

interface ResidencyContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
  currency: Currency;
  setCurrencyCode: (code: string) => void;
  formatPrice: (inrAmount: number) => string;
  rawConvert: (inrAmount: number) => number;
  
  // Search State
  searchFilters: SearchFilterState;
  setSearchFilters: React.Dispatch<React.SetStateAction<SearchFilterState>>;
  updateSearchFilters: (partial: Partial<SearchFilterState>) => void;
  resetSearchFilters: () => void;
  
  // Favorites / Wishlist
  favorites: string[];
  toggleFavorite: (propertyId: string) => void;
  isFavorite: (propertyId: string) => boolean;

  // Selected Gallery Modal
  galleryProperty: Property | null;
  openGallery: (property: Property) => void;
  closeGallery: () => void;

  // Virtual Concierge Assistant
  isConciergeOpen: boolean;
  setIsConciergeOpen: (open: boolean) => void;
  toggleConcierge: () => void;

  // Toast System
  toasts: ToastNotification[];
  showToast: (message: string, type?: 'info' | 'success' | 'gold' | 'error') => void;
  removeToast: (id: string) => void;
}

const getInitialDates = () => {
  const today = new Date();
  const in2Days = new Date(today);
  in2Days.setDate(today.getDate() + 2);
  const in5Days = new Date(today);
  in5Days.setDate(today.getDate() + 5);
  return {
    checkIn: in2Days.toISOString().split('T')[0],
    checkOut: in5Days.toISOString().split('T')[0],
  };
};

const defaultSearchFilters: SearchFilterState = {
  destination: 'Collegepadi, Kottakkal',
  checkIn: getInitialDates().checkIn,
  checkOut: getInitialDates().checkOut,
  guests: 2,
  adults: 2,
  children: 0,
  rooms: 1,
  propertyType: 'all',
  priceRange: [5000, 40000],
  minRating: 0,
  selectedAmenities: [],
  sortBy: 'recommended',
};

const ResidencyContext = createContext<ResidencyContextType | undefined>(undefined);

export const ResidencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('tv_theme') === 'dark';
  });

  const [currencyCode, setCurrencyCodeState] = useState<string>(() => {
    return localStorage.getItem('tv_currency') || 'INR';
  });

  const [searchFilters, setSearchFilters] = useState<SearchFilterState>(() => {
    try {
      const saved = localStorage.getItem('tv_search_filters');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.destination && parsed.destination.includes('Kovalam')) {
          parsed.destination = 'Collegepadi, Kottakkal';
        }
        const todayStr = new Date().toISOString().split('T')[0];
        if (!parsed.checkIn || parsed.checkIn < todayStr) {
          const fresh = getInitialDates();
          parsed.checkIn = fresh.checkIn;
          parsed.checkOut = fresh.checkOut;
        } else if (!parsed.checkOut || parsed.checkOut <= parsed.checkIn) {
          const nextDay = new Date(parsed.checkIn);
          nextDay.setDate(nextDay.getDate() + 1);
          parsed.checkOut = nextDay.toISOString().split('T')[0];
        }
        return { ...defaultSearchFilters, ...parsed };
      }
      return defaultSearchFilters;
    } catch {
      return defaultSearchFilters;
    }
  });

  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('tv_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [galleryProperty, setGalleryProperty] = useState<Property | null>(null);
  const [isConciergeOpen, setIsConciergeOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('tv_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('tv_theme', 'light');
    }
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('tv_search_filters', JSON.stringify(searchFilters));
  }, [searchFilters]);

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  const setCurrencyCode = (code: string) => {
    if (CURRENCIES[code]) {
      setCurrencyCodeState(code);
      localStorage.setItem('tv_currency', code);
      showToast(`Currency changed to ${CURRENCIES[code].name} (${CURRENCIES[code].symbol})`, 'gold');
    }
  };

  const currency = CURRENCIES[currencyCode] || CURRENCIES.INR;

  const rawConvert = (inrAmount: number): number => {
    return Math.round(inrAmount * currency.rateAgainstINR);
  };

  const formatPrice = (inrAmount: number): string => {
    const converted = Math.round(inrAmount * currency.rateAgainstINR);
    return `${currency.symbol}${converted.toLocaleString('en-IN')}`;
  };

  const updateSearchFilters = (partial: Partial<SearchFilterState>) => {
    setSearchFilters(prev => ({ ...prev, ...partial }));
  };

  const resetSearchFilters = () => {
    setSearchFilters(defaultSearchFilters);
  };

  const toggleFavorite = (propertyId: string) => {
    setFavorites(prev => {
      const exists = prev.includes(propertyId);
      const updated = exists ? prev.filter(id => id !== propertyId) : [...prev, propertyId];
      localStorage.setItem('tv_favorites', JSON.stringify(updated));
      const property = PROPERTIES.find(p => p.id === propertyId);
      const name = property ? property.name : 'Property';
      if (exists) {
        showToast(`Removed "${name}" from saved list`, 'info');
      } else {
        showToast(`Added "${name}" to your wishlist`, 'gold');
      }
      return updated;
    });
  };

  const isFavorite = (propertyId: string) => favorites.includes(propertyId);

  const openGallery = (property: Property) => setGalleryProperty(property);
  const closeGallery = () => setGalleryProperty(null);

  const toggleConcierge = () => setIsConciergeOpen(prev => !prev);

  const showToast = (message: string, type: 'info' | 'success' | 'gold' | 'error' = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return (
    <ResidencyContext.Provider
      value={{
        darkMode,
        toggleDarkMode,
        currency,
        setCurrencyCode,
        formatPrice,
        rawConvert,
        searchFilters,
        setSearchFilters,
        updateSearchFilters,
        resetSearchFilters,
        favorites,
        toggleFavorite,
        isFavorite,
        galleryProperty,
        openGallery,
        closeGallery,
        isConciergeOpen,
        setIsConciergeOpen,
        toggleConcierge,
        toasts,
        showToast,
        removeToast,
      }}
    >
      {children}
    </ResidencyContext.Provider>
  );
};

export const useResidency = (): ResidencyContextType => {
  const context = useContext(ResidencyContext);
  if (!context) {
    throw new Error('useResidency must be used within a ResidencyProvider');
  }
  return context;
};
