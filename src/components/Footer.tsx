import React from 'react';
import { Link } from 'react-router-dom';
import { RESIDENCY_CONTACT } from '../data/residencyData';
import { MapPin, Phone, Mail, Globe, Share2, Compass } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-primary text-gray-300 border-t border-white/10 pt-16 pb-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main 4-Column Footer Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded bg-gradient-to-br from-deep-navy via-primary to-deep-navy border border-warm-gold flex items-center justify-center shadow-sm">
                <span className="font-serif font-bold text-warm-gold text-lg">TV</span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold tracking-tight text-white leading-tight">
                  TV Residency
                </span>
                <span className="text-[9px] tracking-[0.28em] uppercase text-warm-gold font-semibold -mt-0.5">
                  Refined Kerala Luxury
                </span>
              </div>
            </Link>

            <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
              TV Residency, Collegepadi, Kottakkal, Near Ahalya Eye Hospital. A premier hotel and residency offering elegant luxury rooms, private villas, and exceptional 24/7 hospitality.
            </p>

            <div className="flex items-center gap-3 text-warm-gold pt-2">
              <a href="#" className="w-8 h-8 rounded-full bg-white/5 hover:bg-warm-gold hover:text-primary flex items-center justify-center transition-colors">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/5 hover:bg-warm-gold hover:text-primary flex items-center justify-center transition-colors">
                <Share2 className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/5 hover:bg-warm-gold hover:text-primary flex items-center justify-center transition-colors">
                <Compass className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Explore Links */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-white uppercase tracking-wider block font-serif">
              The Residences
            </span>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>
                <Link to="/rooms" className="hover:text-warm-gold transition-colors">Executive Heritage Rooms</Link>
              </li>
              <li>
                <Link to="/rooms" className="hover:text-warm-gold transition-colors">Deluxe Horizon Suites</Link>
              </li>
              <li>
                <Link to="/rooms" className="hover:text-warm-gold transition-colors">Grand Presidential Suites</Link>
              </li>
              <li>
                <Link to="/villas" className="hover:text-warm-gold transition-colors">Single Room Villas (1 Room)</Link>
              </li>
              <li>
                <Link to="/villas" className="hover:text-warm-gold transition-colors">2-Room Executive Villas</Link>
              </li>
              <li>
                <Link to="/villas" className="hover:text-warm-gold transition-colors">3 & 4-Room Family Villas</Link>
              </li>
            </ul>
          </div>

          {/* Guest Amenities */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-white uppercase tracking-wider block font-serif">
              Residency Amenities
            </span>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>
                <span className="text-gray-300">Free Covered & Valet Parking</span>
              </li>
              <li>
                <span className="text-gray-300">High-Speed Wi-Fi in All Rooms</span>
              </li>
              <li>
                <span className="text-gray-300">Water Heater / Geyser in All Baths</span>
              </li>
              <li>
                <span className="text-gray-300">24/7 Power Backup & Security</span>
              </li>
              <li>
                <Link to="/about" className="hover:text-warm-gold transition-colors">24/7 Concierge & Front Desk</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-warm-gold transition-colors">Frequently Asked Questions</Link>
              </li>
            </ul>
          </div>

          {/* Contact & Address */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-white uppercase tracking-wider block font-serif">
              Residency Location
            </span>
            <div className="space-y-3 text-xs text-gray-400">
              <a
                href={RESIDENCY_CONTACT.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 group hover:text-white transition-colors block"
              >
                <MapPin className="w-4 h-4 text-warm-gold flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <div>
                  <strong className="text-white block group-hover:text-warm-gold transition-colors">{RESIDENCY_CONTACT.name}</strong>
                  <span>{RESIDENCY_CONTACT.addressLine1}</span>
                  <span className="block text-gray-400">{RESIDENCY_CONTACT.landmark}</span>
                </div>
              </a>

              <a
                href={RESIDENCY_CONTACT.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-warm-gold hover:text-white transition-colors"
              >
                <span>📍 View on Google Maps →</span>
              </a>

              <div className="flex items-center gap-2 pt-1 border-t border-white/5">
                <Phone className="w-3.5 h-3.5 text-warm-gold flex-shrink-0" />
                <a href={`tel:${RESIDENCY_CONTACT.phone}`} className="hover:text-warm-gold font-mono font-bold text-gray-200">
                  {RESIDENCY_CONTACT.phone}
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-warm-gold flex-shrink-0" />
                <a href={`mailto:${RESIDENCY_CONTACT.email}`} className="hover:text-warm-gold">
                  {RESIDENCY_CONTACT.email}
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Legal & Credits */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-gray-500">
          <div>
            © {new Date().getFullYear()} TV Residency Luxury Resort & Enclave. All rights reserved.
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gray-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-400 transition-colors">Terms of Hospitality</a>
            <a href="#" className="hover:text-gray-400 transition-colors">Best Rate Guarantee</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
