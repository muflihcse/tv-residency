import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, HeartHandshake, Building2, MapPin, CheckCircle2, Phone } from 'lucide-react';
import { RESIDENCY_CONTACT } from '../data/residencyData';

export const AboutPage: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const values = [
    {
      icon: HeartHandshake,
      title: 'Comfortable Hospitality',
      description: 'A comfortable stay supported by attentive service and a welcoming, respectful atmosphere in Kottakkal.'
    },
    {
      icon: Building2,
      title: 'Rooms & Villas Options',
      description: 'Choice of Non-AC, AC, and three-bed rooms along with spacious AC two-bedroom villas and one-room villas.'
    },
    {
      icon: MapPin,
      title: 'Convenient Town Location',
      description: 'Located in Collegepadi, Kottakkal, immediately near Ahalya Eye Hospital with convenient town connectivity.'
    },
    {
      icon: CheckCircle2,
      title: 'Essential Facilities',
      description: 'Equipped with Wi-Fi, hot water facility, parking, TV, and power backup for peace of mind.'
    }
  ];

  const faqs = [
    {
      q: 'Where is TV Residency located and how do I contact you?',
      a: 'TV Residency is located at Collegepadi, Kottakkal, Near Ahalya Eye Hospital. You can reach our front desk directly at 8281628559 or find us on Google Maps.'
    },
    {
      q: 'What room categories and prices are available?',
      a: 'We offer Non-AC Rooms (₹1,000 / night, 3 rooms), AC Rooms (₹1,500 / night, 3 rooms), and a Three-Bed Room (₹1,700 / night, 1 room).'
    },
    {
      q: 'What villa accommodation and rates are available?',
      a: 'We have 6 villas in total: 4 AC two-bedroom villas at ₹4,000 / night (featuring a hall, kitchen with stove, 2 rooms, bathroom, and sit-out) and 2 one-room villas at ₹3,000 / night (featuring one room, hall, kitchen, and bathroom).'
    },
    {
      q: 'What are the confirmed amenities provided?',
      a: 'TV Residency provides Free Wi-Fi, Hot Water facility, Parking, TV, and Power Backup.'
    },
    {
      q: 'What are the check-in and check-out timings?',
      a: 'Standard check-in begins from 12:00 PM and check-out is until 11:00 AM. Valid government ID is required at check-in.'
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
                Explore Rooms & Villas
              </Link>
              <a
                href={`tel:${RESIDENCY_CONTACT.phone}`}
                className="px-6 py-3 border border-warm-gold text-warm-gold hover:bg-warm-gold hover:text-primary rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>Call {RESIDENCY_CONTACT.phone}</span>
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-level-3 border-2 border-white dark:border-white/10 aspect-[4/3]">
              <img
                src="https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80"
                alt="TV Residency Kottakkal Accommodation"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="hidden sm:block absolute -bottom-6 -right-6 bg-deep-navy dark:bg-warm-gold text-white dark:text-primary p-6 rounded-2xl shadow-level-3 max-w-xs border border-warm-gold/40">
              <div className="font-serif text-2xl font-bold mb-1">TV Residency</div>
              <div className="text-xs font-semibold uppercase tracking-wider">
                Collegepadi, Kottakkal
              </div>
            </div>
          </div>
        </div>

        {/* 4 Values Grid */}
        <div className="space-y-10">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold text-warm-gold uppercase tracking-[0.25em] block mb-2">
              Our Core Values
            </span>
            <h2 className="font-serif text-3xl font-bold text-primary dark:text-white">
              Why Guests Choose TV Residency
            </h2>
            <div className="w-16 h-0.5 bg-warm-gold mx-auto mt-3"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-white dark:bg-[#15171C] border border-gray-100 dark:border-white/5 shadow-sm space-y-3"
                >
                  <div className="w-12 h-12 rounded-xl bg-warm-gold/10 text-warm-gold flex items-center justify-center">
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
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center">
            <span className="text-xs font-bold text-warm-gold uppercase tracking-[0.25em] block mb-2">
              Common Enquiries
            </span>
            <h2 className="font-serif text-3xl font-bold text-primary dark:text-white">
              Frequently Asked Questions
            </h2>
            <div className="w-16 h-0.5 bg-warm-gold mx-auto mt-3"></div>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-[#15171C] border border-gray-100 dark:border-white/5 rounded-xl overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                  className="w-full p-4 text-left flex justify-between items-center gap-4 text-xs sm:text-sm font-bold text-primary dark:text-white"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-warm-gold transition-transform duration-300 flex-shrink-0 ${
                    openFaqIndex === idx ? 'rotate-180' : ''
                  }`} />
                </button>
                {openFaqIndex === idx && (
                  <div className="px-4 pb-4 text-xs text-gray-600 dark:text-gray-300 border-t border-gray-50 dark:border-white/5 pt-3 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
