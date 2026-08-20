import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Compass, HeartHandshake, Leaf, Building2, Sparkles, MapPin } from 'lucide-react';
import { useResidency } from '../context/ResidencyContext';
import { RESIDENCY_CONTACT } from '../data/residencyData';

export const AboutPage: React.FC = () => {
  const { toggleConcierge } = useResidency();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const values = [
    {
      icon: HeartHandshake,
      title: 'Attentive Hospitality',
      description: 'We believe thoughtful service creates a comfortable, memorable stay. Our team is available 24/7 to assist you.'
    },
    {
      icon: Leaf,
      title: 'Serene Natural Setting',
      description: 'Lush greenery, peaceful garden sit-outs, and clean, thoughtfully maintained spaces.'
    },
    {
      icon: Building2,
      title: 'Architectural Comfort',
      description: 'Blending contemporary Kerala aesthetics with modern room design, private verandahs, and calm interiors.'
    },
    {
      icon: Sparkles,
      title: 'Dedicated 24/7 Guest Care',
      description: 'Round-the-clock front desk assistance, pristine housekeeping, fast check-in, and personalized hospitality support.'
    }
  ];

  const faqs = [
    {
      q: 'What are the check-in and check-out policies?',
      a: 'Standard check-in begins at 14:00 and check-out is until 11:00 AM. Flexible early check-in and late 15:00 check-out are available upon request subject to availability.'
    },
    {
      q: 'Where is TV Residency located and how do I contact you?',
      a: 'TV Residency is located at Collegepadi, Kottakkal, Near Ahalya Eye Hospital. You can reach our 24/7 desk directly at 8281628559 or find us on Google Maps.'
    },
    {
      q: 'Are dietary requirements and custom menus accommodated?',
      a: 'Yes. Our culinary team caters to Vegetarian, Non-Vegetarian, and custom dietary requests with freshly prepared dishes.'
    },
    {
      q: 'Is there a private butler for all residences?',
      a: 'All 6 Private Villas and Presidential Suites include 24/7 dedicated butler service. Deluxe rooms include dedicated on-demand concierge and valet care.'
    },
    {
      q: 'What is the cancellation and refund policy?',
      a: 'Reservations can be modified or cancelled free of charge up to 48 to 72 hours prior to arrival with a 100% refund guarantee.'
    }
  ];

  return (
    <div className="min-h-screen bg-background dark:bg-surface-dark py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-20">
        
        {/* Hero Narrative Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs font-bold text-warm-gold uppercase tracking-[0.25em] block">
              THE CHARACTER OF TV RESIDENCY
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-primary dark:text-white tracking-tight leading-tight">
              Refined Comfort in the Heart of Kottakkal
            </h1>
            <div className="w-16 h-0.5 bg-warm-gold"></div>
            
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
              Designed for those who value comfort, convenience, and a refined stay, TV Residency brings together contemporary spaces, thoughtful amenities, and warm hospitality in a well-connected town setting.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              Located in Collegepadi, Kottakkal, near Ahalya Eye Hospital, TV Residency offers guests the perfect balance of easy access to the town's essentials and a comfortable place to relax, unwind, and feel at home.
            </p>

            {/* Official Address Pill */}
            <div className="p-4 rounded-xl bg-white dark:bg-[#15171C] border border-warm-gold/30 shadow-sm space-y-2">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-warm-gold flex-shrink-0 mt-0.5" />
                <div className="text-xs">
                  <strong className="text-primary dark:text-white block">{RESIDENCY_CONTACT.name}</strong>
                  <span className="text-gray-600 dark:text-gray-300">{RESIDENCY_CONTACT.addressLine1} ({RESIDENCY_CONTACT.landmark})</span>
                </div>
              </div>
              <a
                href={RESIDENCY_CONTACT.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-bold text-warm-gold hover:underline pt-1"
              >
                <span>📍 View on Google Maps →</span>
              </a>
            </div>

            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                to="/rooms"
                className="px-6 py-3 bg-deep-navy dark:bg-warm-gold text-white dark:text-primary rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-primary dark:hover:bg-gold-light transition-all shadow-sm"
              >
                Explore The Residences
              </Link>
              <button
                onClick={toggleConcierge}
                className="px-6 py-3 border border-warm-gold text-warm-gold hover:bg-warm-gold hover:text-primary rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2"
              >
                <Compass className="w-4 h-4" />
                <span>Speak with Concierge</span>
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-level-3 border-2 border-white dark:border-white/10 aspect-[4/3]">
              <img
                src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80"
                alt="TV Residency Architecture & Heritage Estate"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="hidden sm:block absolute -bottom-6 -right-6 bg-deep-navy dark:bg-warm-gold text-white dark:text-primary p-6 rounded-2xl shadow-level-3 max-w-xs border border-warm-gold/40">
              <div className="font-serif text-3xl font-bold mb-1">100%</div>
              <div className="text-xs font-semibold uppercase tracking-wider">
                Carbon Neutral & Solar-Powered Sanctuary
              </div>
            </div>
          </div>
        </div>

        {/* 4 Values Grid */}
        <div className="space-y-10">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold text-warm-gold uppercase tracking-[0.25em] block mb-2">
              Our Core Pillars
            </span>
            <h2 className="font-serif text-3xl font-bold text-primary dark:text-white">
              The TV Residency Service Philosophy
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <div
                  key={v.title}
                  className="bg-white dark:bg-[#15171C] p-7 rounded-2xl border border-soft-beige/70 dark:border-white/5 shadow-sm space-y-3"
                >
                  <div className="w-12 h-12 rounded-xl bg-soft-beige/70 dark:bg-warm-gold/10 flex items-center justify-center text-warm-gold">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif font-bold text-base text-primary dark:text-white">
                    {v.title}
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                    {v.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* FAQs Accordion */}
        <div className="max-w-3xl mx-auto space-y-8 pt-8 border-t border-gray-100 dark:border-white/10">
          <div className="text-center">
            <span className="text-xs font-bold text-warm-gold uppercase tracking-[0.25em] block mb-2">
              Guest Inquiries
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-primary dark:text-white">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3.5">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-white dark:bg-[#15171C] rounded-2xl border border-soft-beige/70 dark:border-white/10 overflow-hidden shadow-sm transition-all"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full px-6 py-4.5 text-left flex justify-between items-center gap-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                  >
                    <span className="font-serif text-sm font-semibold text-primary dark:text-white">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-warm-gold flex-shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed border-t border-gray-100 dark:border-white/5 animate-fade-in">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
