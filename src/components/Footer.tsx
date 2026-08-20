import React from 'react';
import { Link } from 'react-router-dom';
import { RESIDENCY_CONTACT } from '../data/residencyData';
import { MapPin, Phone, Mail, Globe } from 'lucide-react';

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
                  Rooms & Villas in Kottakkal
                </span>
              </div>
            </Link>

            <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
              TV Residency, Collegepadi, Kottakkal, Near Ahalya Eye Hospital. Comfortable rooms and spacious villas with essential amenities in Kottakkal.
            </p>

            <div className="flex items-center gap-3 text-warm-gold pt-2">
              <a 
                href={RESIDENCY_CONTACT.googleMapsUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-warm-gold hover:text-primary flex items-center justify-center transition-colors"
                title="Google Maps Location"
              >
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Accommodation Options */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-white uppercase tracking-wider block font-serif">
              Accommodations
            </span>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>
                <Link to="/rooms" className="hover:text-warm-gold transition-colors">Non-AC Room</Link>
              </li>
              <li>
                <Link to="/rooms" className="hover:text-warm-gold transition-colors">AC Room</Link>
              </li>
              <li>
                <Link to="/rooms" className="hover:text-warm-gold transition-colors">Three-Bed Room</Link>
              </li>
              <li>
                <Link to="/villas" className="hover:text-warm-gold transition-colors">AC Two-Bedroom Villa</Link>
              </li>
              <li>
                <Link to="/villas" className="hover:text-warm-gold transition-colors">One-Room Villa</Link>
              </li>
            </ul>
          </div>

          {/* Essential Facilities */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-white uppercase tracking-wider block font-serif">
              Essential Facilities
            </span>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>
                <span className="text-gray-300">Free Wi-Fi</span>
              </li>
              <li>
                <span className="text-gray-300">Hot Water Facility</span>
              </li>
              <li>
                <span className="text-gray-300">Parking Facility</span>
              </li>
              <li>
                <span className="text-gray-300">TV in Accommodation</span>
              </li>
              <li>
                <span className="text-gray-300">Power Backup</span>
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

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© 2026 TV Residency, Kottakkal. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/about" className="hover:text-warm-gold transition-colors">About Us</Link>
            <Link to="/rooms" className="hover:text-warm-gold transition-colors">Rooms</Link>
            <Link to="/villas" className="hover:text-warm-gold transition-colors">Villas</Link>
            <Link to="/contact" className="hover:text-warm-gold transition-colors">Contact</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};
