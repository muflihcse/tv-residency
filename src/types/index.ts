export type PropertyType = 'room' | 'villa';

export interface Property {
  id: string;
  name: string;
  type: PropertyType;
  category: 'deluxe' | 'suite' | 'villa' | 'presidential' | 'heritage';
  tagline: string;
  description: string;
  longDescription: string;
  priceINR: number;
  originalPriceINR?: number;
  rating: number;
  reviewCount: number;
  location: string;
  address: string;
  maxGuests: number;
  adults: number;
  children: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  bedType: string;
  hasPool: boolean;
  poolType?: string;
  view: string;
  featured: boolean;
  badge?: string;
  images: string[];
  amenities: string[];
  facilities: string[];
  houseRules: string[];
  cancellationPolicy: string;
  checkInTime: string;
  checkOutTime: string;
  highlights: string[];
}

export interface Review {
  id: string;
  propertyId?: string;
  author: string;
  avatar?: string;
  location: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  stayType: string;
  verified: boolean;
}

export interface SpecialOffer {
  id: string;
  title: string;
  code: string;
  badge: string;
  discountPercent: number;
  description: string;
  perks: string[];
  validUntil: string;
  minNights: number;
  applicableType: 'all' | 'rooms' | 'villas';
  image: string;
}

export interface NearbyPlace {
  id: string;
  name: string;
  category: 'beach' | 'culture' | 'dining' | 'nature' | 'transport';
  distance: string;
  travelTime: string;
  description: string;
  image: string;
  rating: number;
}

export interface Currency {
  code: string;
  symbol: string;
  rateAgainstINR: number;
  name: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  membershipTier: 'Silver' | 'Gold' | 'Platinum';
  joinedDate: string;
}

export interface Booking {
  id: string;
  bookingReference: string;
  userId: string;
  propertyId: string;
  propertyName: string;
  propertyType: PropertyType;
  propertyImage: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  guests: {
    adults: number;
    children: number;
    rooms: number;
  };
  primaryGuest: {
    fullName: string;
    email: string;
    phone: string;
    specialRequests?: string;
    arrivalTime?: string;
  };
  pricing: {
    nightlyRate: number;
    subtotal: number;
    discount: number;
    promoCodeApplied?: string;
    addonsTotal: number;
    taxesAndService: number;
    grandTotal: number;
    currencyCode: string;
  };
  selectedAddons: string[];
  status: 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface SearchFilterState {
  destination: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  adults: number;
  children: number;
  rooms: number;
  propertyType?: 'all' | 'room' | 'villa';
  priceRange: [number, number];
  minRating: number;
  selectedAmenities: string[];
  sortBy: 'recommended' | 'price-asc' | 'price-desc' | 'rating';
}
