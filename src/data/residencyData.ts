import type { Property, Review, SpecialOffer, NearbyPlace, Currency } from '../types';

export const RESIDENCY_CONTACT = {
  name: 'TV Residency',
  addressLine1: 'Collegepadi, Kottakkal',
  landmark: 'Near Ahalya Eye Hospital',
  fullAddress: 'TV Residency, Collegepadi, Kottakkal, Near Ahalya Eye Hospital',
  phone: '8281628559',
  phoneFormatted: '+91 8281628559',
  email: 'info@tvresidency.com',
  googleMapsUrl: 'https://share.google/n1Z6lQmv4DNvdLZXF',
};

export const CURRENCIES: Record<string, Currency> = {
  INR: { code: 'INR', symbol: '₹', rateAgainstINR: 1, name: 'Indian Rupee' },
  USD: { code: 'USD', symbol: '$', rateAgainstINR: 0.012, name: 'US Dollar' },
  EUR: { code: 'EUR', symbol: '€', rateAgainstINR: 0.011, name: 'Euro' },
  AED: { code: 'AED', symbol: 'AED ', rateAgainstINR: 0.044, name: 'UAE Dirham' },
  GBP: { code: 'GBP', symbol: '£', rateAgainstINR: 0.0095, name: 'British Pound' },
};

export const PROPERTIES: Property[] = [
  // --- ROOMS (Real Inventory) ---
  {
    id: 'non-ac-room',
    name: 'Non-AC Room',
    type: 'room',
    category: 'non-ac',
    tagline: 'Simple & Affordable Stay in Kottakkal',
    description: 'Comfortable non-AC accommodation suitable for guests looking for a simple and affordable stay in Kottakkal.',
    longDescription: 'Comfortable non-AC accommodation suitable for guests looking for a simple and affordable stay in Kottakkal. Located in Collegepadi, Kottakkal, near Ahalya Eye Hospital, providing essential facilities for a restful visit.',
    priceINR: 1000,
    inventoryCount: 3,
    isAC: false,
    hasHall: false,
    hasKitchen: false,
    hasStove: false,
    hasSitout: false,
    location: 'Collegepadi, Kottakkal',
    address: 'TV Residency, Collegepadi, Kottakkal, Near Ahalya Eye Hospital',
    maxGuests: 2,
    adults: 2,
    children: 1,
    bedrooms: 1,
    bathrooms: 1,
    bedType: '1 Double Bed',
    hasPool: false,
    featured: true,
    badge: '3 Rooms Available',
    images: [
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: [
      'Free Wi-Fi',
      'Hot Water',
      'Parking',
      'TV',
      'Power Backup'
    ],
    facilities: [
      'Hot Water',
      'Parking',
      'Free Wi-Fi',
      'TV',
      'Power Backup'
    ],
    houseRules: [
      'Check-in: From 12:00 PM',
      'Check-out: Until 11:00 AM',
      'Valid Government ID required at check-in'
    ],
    cancellationPolicy: 'Contact reception for cancellation and booking policies.',
    checkInTime: '12:00 PM',
    checkOutTime: '11:00 AM',
    highlights: ['Non-AC', 'Double Bed', 'Attached Bathroom', 'Free Wi-Fi', 'Hot Water']
  },
  {
    id: 'ac-room',
    name: 'AC Room',
    type: 'room',
    category: 'ac',
    tagline: 'Air-Conditioned Comfort in Kottakkal',
    description: 'Comfortable air-conditioned accommodation with essential facilities for a convenient stay in Kottakkal.',
    longDescription: 'Comfortable air-conditioned accommodation with essential facilities for a convenient stay in Kottakkal. Situated in Collegepadi near Ahalya Eye Hospital, featuring AC climate comfort, attached bathroom with hot water, TV, Wi-Fi, parking, and power backup.',
    priceINR: 1500,
    inventoryCount: 3,
    isAC: true,
    hasHall: false,
    hasKitchen: false,
    hasStove: false,
    hasSitout: false,
    location: 'Collegepadi, Kottakkal',
    address: 'TV Residency, Collegepadi, Kottakkal, Near Ahalya Eye Hospital',
    maxGuests: 2,
    adults: 2,
    children: 1,
    bedrooms: 1,
    bathrooms: 1,
    bedType: '1 King / Double Bed',
    hasPool: false,
    featured: true,
    badge: '3 Rooms Available',
    images: [
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: [
      'Air Conditioning',
      'Free Wi-Fi',
      'Hot Water',
      'Parking',
      'TV',
      'Power Backup'
    ],
    facilities: [
      'Air Conditioning',
      'Hot Water',
      'Parking',
      'Free Wi-Fi',
      'TV',
      'Power Backup'
    ],
    houseRules: [
      'Check-in: From 12:00 PM',
      'Check-out: Until 11:00 AM',
      'Valid Government ID required at check-in'
    ],
    cancellationPolicy: 'Contact reception for cancellation and booking policies.',
    checkInTime: '12:00 PM',
    checkOutTime: '11:00 AM',
    highlights: ['Air Conditioning', 'Attached Bathroom', 'Free Wi-Fi', 'Hot Water', 'Power Backup']
  },
  {
    id: 'three-bed-room',
    name: 'Three-Bed Room',
    type: 'room',
    category: 'triple',
    tagline: 'Triple Bed Room for Families & Groups',
    description: 'Suitable for guests who need accommodation with three beds.',
    longDescription: 'Suitable for guests who need accommodation with three beds. Offers spacious layout, clean attached bathroom with hot water facility, TV, Wi-Fi connectivity, parking, and power backup in Collegepadi, Kottakkal.',
    priceINR: 1700,
    inventoryCount: 1,
    isAC: true,
    hasHall: false,
    hasKitchen: false,
    hasStove: false,
    hasSitout: false,
    location: 'Collegepadi, Kottakkal',
    address: 'TV Residency, Collegepadi, Kottakkal, Near Ahalya Eye Hospital',
    maxGuests: 4,
    adults: 3,
    children: 1,
    bedrooms: 1,
    bathrooms: 1,
    bedType: '3 Beds',
    hasPool: false,
    featured: true,
    badge: '1 Room Available',
    images: [
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: [
      'Air Conditioning',
      'Free Wi-Fi',
      'Hot Water',
      'Parking',
      'TV',
      'Power Backup'
    ],
    facilities: [
      '3 Beds Configuration',
      'Hot Water',
      'Parking',
      'Free Wi-Fi',
      'TV',
      'Power Backup'
    ],
    houseRules: [
      'Check-in: From 12:00 PM',
      'Check-out: Until 11:00 AM',
      'Valid Government ID required at check-in'
    ],
    cancellationPolicy: 'Contact reception for cancellation and booking policies.',
    checkInTime: '12:00 PM',
    checkOutTime: '11:00 AM',
    highlights: ['3 Separate Beds', 'Spacious Layout', 'Hot Water', 'Free Wi-Fi', 'Power Backup']
  },

  // --- VILLAS (Real Inventory - 6 Total Villas) ---
  {
    id: 'ac-two-bedroom-villa',
    name: 'AC Two-Bedroom Villa',
    type: 'villa',
    category: 'ac-villa',
    tagline: 'Hall + Kitchen + Stove + 2 Rooms + Bathroom + Sit-out',
    description: 'Spacious AC villa with a hall, kitchen with stove, two rooms, bathroom and sit-out.',
    longDescription: 'Spacious AC villa with a hall, kitchen with stove, two rooms, bathroom and sit-out. Designed for families and groups who require additional living space and practical cooking facilities during their stay in Collegepadi, Kottakkal.',
    priceINR: 4000,
    isPriceContactBased: false,
    inventoryCount: 4,
    isAC: true,
    hasHall: true,
    hasKitchen: true,
    hasStove: true,
    hasSitout: true,
    location: 'Collegepadi, Kottakkal',
    address: 'TV Residency, Collegepadi, Kottakkal, Near Ahalya Eye Hospital',
    maxGuests: 6,
    adults: 4,
    children: 2,
    bedrooms: 2,
    bathrooms: 1,
    bedType: '2 Double Bedrooms',
    hasPool: false,
    featured: true,
    badge: '4 AC Villas Available',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: [
      'Air Conditioning',
      'Living Hall',
      'Kitchen with Stove',
      'Sit-out Verandah',
      'Free Wi-Fi',
      'Hot Water',
      'Parking',
      'TV',
      'Power Backup'
    ],
    facilities: [
      'Hall / Living Space',
      'Kitchen with Cooking Stove',
      '2 Separate Bedrooms',
      'Private Sit-out',
      'Hot Water',
      'Parking',
      'Free Wi-Fi',
      'TV',
      'Power Backup'
    ],
    houseRules: [
      'Check-in: From 12:00 PM',
      'Check-out: Until 11:00 AM',
      'Kitchen usage guidelines apply',
      'Valid Government ID required at check-in'
    ],
    cancellationPolicy: 'Contact reception for cancellation and booking policies.',
    checkInTime: '12:00 PM',
    checkOutTime: '11:00 AM',
    highlights: ['AC Bedrooms', 'Living Hall', 'Kitchen with Stove', '2 Rooms', 'Sit-out', 'Parking']
  },
  {
    id: 'one-room-villa',
    name: 'One-Room Villa',
    type: 'villa',
    category: 'villa',
    tagline: 'Room + Hall + Kitchen + Bathroom',
    description: 'Simple and practical villa accommodation featuring one room, hall, kitchen, and bathroom.',
    longDescription: 'Simple and practical villa accommodation featuring one room, hall, kitchen, and bathroom. Provides the independence and convenience of a dedicated living hall and kitchen space in Kottakkal.',
    priceINR: 3000,
    isPriceContactBased: false,
    inventoryCount: 2,
    isAC: false,
    hasHall: true,
    hasKitchen: true,
    hasStove: false,
    hasSitout: false,
    location: 'Collegepadi, Kottakkal',
    address: 'TV Residency, Collegepadi, Kottakkal, Near Ahalya Eye Hospital',
    maxGuests: 3,
    adults: 2,
    children: 1,
    bedrooms: 1,
    bathrooms: 1,
    bedType: '1 Double Bedroom',
    hasPool: false,
    featured: true,
    badge: '2 Villas Available',
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: [
      'Living Hall',
      'Kitchen Area',
      'Free Wi-Fi',
      'Hot Water',
      'Parking',
      'TV',
      'Power Backup'
    ],
    facilities: [
      'Living Hall',
      'Kitchen Area',
      'Attached Bathroom',
      'Hot Water',
      'Parking',
      'Free Wi-Fi',
      'TV',
      'Power Backup'
    ],
    houseRules: [
      'Check-in: From 12:00 PM',
      'Check-out: Until 11:00 AM',
      'Valid Government ID required at check-in'
    ],
    cancellationPolicy: 'Contact reception for cancellation and booking policies.',
    checkInTime: '12:00 PM',
    checkOutTime: '11:00 AM',
    highlights: ['Dedicated Hall', 'Kitchen Area', '1 Room', 'Hot Water', 'Parking', 'Free Wi-Fi']
  }
];

export const AMENITIES_LIST = [
  { id: 'wifi', name: 'Free Wi-Fi', icon: 'Wifi', description: 'Stay connected throughout your visit.' },
  { id: 'hotwater', name: 'Hot Water', icon: 'Droplets', description: 'Hot water facility available for guests.' },
  { id: 'parking', name: 'Parking', icon: 'Car', description: 'Parking facility available for guests.' },
  { id: 'tv', name: 'TV', icon: 'Tv', description: 'TV available in the accommodation.' },
  { id: 'powerbackup', name: 'Power Backup', icon: 'Zap', description: 'Power backup available for added convenience.' }
];

export const NEARBY_PLACES: NearbyPlace[] = [
  {
    id: 'ahalya-eye-hospital',
    name: 'Ahalya Eye Hospital',
    category: 'health',
    distance: 'Adjacent (0.1 km)',
    travelTime: '1 min walk',
    description: 'Prominent eye hospital located immediately next to TV Residency in Collegepadi, Kottakkal.',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'kottakkal-town',
    name: 'Kottakkal Town Centre',
    category: 'town',
    distance: '1.0 km',
    travelTime: '3 mins drive',
    description: 'Central town area with shops, pharmacies, essential services, and local transport.',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'arya-vaidya-sala',
    name: 'Arya Vaidya Sala Complex',
    category: 'culture',
    distance: '1.5 km',
    travelTime: '4 mins drive',
    description: 'Celebrated traditional Ayurvedic healthcare institution in Kottakkal.',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'malappuram-gateway',
    name: 'Malappuram Road Connection',
    category: 'transport',
    distance: '11 km',
    travelTime: '18 mins drive',
    description: 'Direct highway route connecting to Malappuram district headquarters.',
    image: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=600&q=80'
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Harikrishnan Nair',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
    location: 'Kozhikode, Kerala',
    rating: 5,
    date: 'February 2026',
    title: 'Very convenient stay for hospital visit',
    comment: 'We stayed in the 2-bedroom AC villa with our family when visiting Ahalya Eye Hospital in Collegepadi. Having the kitchen with stove and the spacious hall was very helpful for cooking light food for my parents. Clean rooms, hot water, and good parking facility.',
    stayType: 'AC Two-Bedroom Villa Stay',
    verified: true,
    propertyId: 'ac-two-bedroom-villa'
  },
  {
    id: 'rev-2',
    author: 'Muhammed Shafeeq',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
    location: 'Malappuram, Kerala',
    rating: 5,
    date: 'January 2026',
    title: 'Affordable, neat and calm place',
    comment: 'Neat and clean AC room in Collegepadi. The staff was very helpful and the hot water and Wi-Fi worked smoothly. Great value at ₹1,500/night with parking right on premises.',
    stayType: 'AC Room Stay',
    verified: true,
    propertyId: 'ac-room'
  },
  {
    id: 'rev-3',
    author: 'Anjali Menon',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
    location: 'Kochi, Kerala',
    rating: 5,
    date: 'January 2026',
    title: 'Perfect 3-bed setup for family trip',
    comment: 'We booked the three-bed room while visiting Kottakkal. The room was spacious with three separate comfortable beds, power backup, and continuous hot water. Very peaceful and easily accessible from the main town.',
    stayType: 'Three-Bed Room Stay',
    verified: true,
    propertyId: 'three-bed-room'
  },
  {
    id: 'rev-4',
    author: 'Sujith Kumar',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&q=80',
    location: 'Thrissur, Kerala',
    rating: 5,
    date: 'December 2025',
    title: 'Comfortable villa with dedicated hall & kitchen',
    comment: 'Booked the 1-room villa for 3 days. Having our own hall and kitchen area made our stay very comfortable and private. Peaceful location in Collegepadi near Ahalya hospital.',
    stayType: 'One-Room Villa Stay',
    verified: true,
    propertyId: 'one-room-villa'
  },
  {
    id: 'rev-5',
    author: 'Pradeep Varma',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=120&q=80',
    location: 'Palakkad, Kerala',
    rating: 5,
    date: 'February 2026',
    title: 'Honest pricing and clean rooms',
    comment: 'For ₹1,000, the Non-AC room was extremely clean and well maintained. TV, hot water, and Wi-Fi all available. Exactly as described on the website without any hidden charges.',
    stayType: 'Non-AC Room Stay',
    verified: true,
    propertyId: 'non-ac-room'
  },
  {
    id: 'rev-6',
    author: 'Fathima Rasheed',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80',
    location: 'Kannur, Kerala',
    rating: 5,
    date: 'January 2026',
    title: 'Spacious sit-out and family friendly',
    comment: 'The sit-out verandah and 2 AC bedrooms were wonderful for our family. Safe parking for our vehicle and peaceful neighborhood in Kottakkal. Highly recommended for family stays.',
    stayType: 'AC Two-Bedroom Villa Stay',
    verified: true,
    propertyId: 'ac-two-bedroom-villa'
  }
];

export const SPECIAL_OFFERS: SpecialOffer[] = [
  {
    id: 'direct-booking',
    title: 'Direct Booking Enquiry',
    code: 'DIRECT',
    badge: 'Direct Rates',
    description: 'Contact us directly on 8281628559 for real-time room availability, villa enquiries, and transparent pricing without booking middleman fees.',
    perks: [
      'Direct contact with TV Residency desk',
      'Clear availability confirmation',
      'Assistance with room & villa selection'
    ],
    validUntil: 'Always Active',
    minNights: 1,
    applicableType: 'all',
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=80'
  }
];

export const ADD_ON_PERKS: { id: string; name: string; priceINR: number; description: string; icon: string }[] = [];


