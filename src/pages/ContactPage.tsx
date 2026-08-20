import React, { useState } from 'react';
import { MapPin, Phone, Mail, Send, Navigation, ExternalLink } from 'lucide-react';
import { useResidency } from '../context/ResidencyContext';
import { RESIDENCY_CONTACT } from '../data/residencyData';

export const ContactPage: React.FC = () => {
  const { showToast } = useResidency();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Room / Villa Booking Enquiry');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      showToast('Enquiry received! We will get back to you shortly.', 'gold');
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    }, 500);
  };

  return (
    <div className="min-h-screen bg-background dark:bg-surface-dark py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold text-warm-gold uppercase tracking-[0.25em] block mb-2">
            Get in Touch
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-primary dark:text-white tracking-tight">
            Contact & Enquiries
          </h1>
          <div className="w-16 h-0.5 bg-warm-gold mx-auto mt-3 mb-4"></div>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            Contact us for availability, room details and booking enquiries.
          </p>
        </div>

        {/* 2-Column Split: Info Cards & Interactive Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Info Side (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Premium Location Card */}
            <div className="bg-white dark:bg-[#15171C] p-6 sm:p-8 rounded-2xl border-2 border-warm-gold/40 hover:border-warm-gold shadow-level-2 space-y-6 transition-all">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-bold text-warm-gold uppercase tracking-widest block mb-1">
                    Property Location
                  </span>
                  <h2 className="font-serif text-2xl font-bold text-primary dark:text-white">
                    {RESIDENCY_CONTACT.name}
                  </h2>
                </div>
                <div className="w-10 h-10 rounded-full bg-warm-gold/20 flex items-center justify-center text-warm-gold">
                  <Navigation className="w-5 h-5" />
                </div>
              </div>

              {/* Clickable Address Block */}
              <a
                href={RESIDENCY_CONTACT.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 rounded-xl bg-soft-beige/40 dark:bg-white/5 border border-warm-gold/30 hover:border-warm-gold hover:shadow-md transition-all group"
              >
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-warm-gold flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                  <div className="space-y-0.5">
                    <strong className="text-sm text-primary dark:text-white block group-hover:text-warm-gold transition-colors">
                      {RESIDENCY_CONTACT.addressLine1}
                    </strong>
                    <p className="text-xs text-gray-600 dark:text-gray-300 font-medium">
                      {RESIDENCY_CONTACT.landmark}
                    </p>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400 pt-1">
                      {RESIDENCY_CONTACT.fullAddress}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-warm-gold/20 flex items-center justify-between text-xs font-bold text-warm-gold group-hover:text-primary dark:group-hover:text-white transition-colors">
                  <span>📍 View on Google Maps →</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </div>
              </a>

              {/* Prominent View on Google Maps Button */}
              <a
                href={RESIDENCY_CONTACT.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 bg-gradient-to-r from-deep-navy to-primary hover:from-primary hover:to-deep-navy dark:from-warm-gold dark:to-gold-light text-white dark:text-primary rounded-xl font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all text-center"
              >
                <span>📍 View on Google Maps →</span>
              </a>

              {/* Contact Details List */}
              <div className="space-y-4 pt-2 border-t border-gray-100 dark:border-white/5 text-xs sm:text-sm">
                <div className="flex items-center gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-warm-gold/15 text-warm-gold flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-primary dark:text-white block">Contact Number</span>
                    <a href={`tel:${RESIDENCY_CONTACT.phone}`} className="text-warm-gold hover:underline font-mono font-bold text-base">
                      {RESIDENCY_CONTACT.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-warm-gold/15 text-warm-gold flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-primary dark:text-white block">Email Enquiry</span>
                    <a href={`mailto:${RESIDENCY_CONTACT.email}`} className="text-warm-gold hover:underline">
                      {RESIDENCY_CONTACT.email}
                    </a>
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* Form Side (7 cols) */}
          <div className="lg:col-span-7 bg-white dark:bg-[#15171C] p-6 sm:p-10 rounded-2xl border border-gray-100 dark:border-white/10 shadow-level-2">
            <h3 className="font-serif text-2xl font-bold text-primary dark:text-white mb-2">
              Send an Enquiry
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">
              Contact us for availability, room details and booking enquiries.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider block mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-xs text-gray-900 dark:text-white placeholder:text-gray-400 focus:ring-1 focus:ring-warm-gold"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider block mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-xs text-gray-900 dark:text-white placeholder:text-gray-400 focus:ring-1 focus:ring-warm-gold"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider block mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-xs text-gray-900 dark:text-white placeholder:text-gray-400 focus:ring-1 focus:ring-warm-gold"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider block mb-1">
                  Accommodation Interest
                </label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-xs text-gray-900 dark:text-white focus:ring-1 focus:ring-warm-gold"
                >
                  <option value="Non-AC Room (₹1,000 / night)">Non-AC Room (₹1,000 / night)</option>
                  <option value="AC Room (₹1,500 / night)">AC Room (₹1,500 / night)</option>
                  <option value="Three-Bed Room (₹1,700 / night)">Three-Bed Room (₹1,700 / night)</option>
                  <option value="AC Two-Bedroom Villa (₹4,000 / night)">AC Two-Bedroom Villa (₹4,000 / night)</option>
                  <option value="One-Room Villa (₹3,000 / night)">One-Room Villa (₹3,000 / night)</option>
                  <option value="General Enquiry">General Enquiry</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider block mb-1">
                  Message / Requirements
                </label>
                <textarea
                  rows={4}
                  placeholder="Please mention dates, number of guests, or special requirements..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-xs text-gray-900 dark:text-white placeholder:text-gray-400 focus:ring-1 focus:ring-warm-gold"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-deep-navy dark:bg-warm-gold text-white dark:text-primary rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-primary dark:hover:bg-gold-light transition-all shadow-md flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSubmitting ? 'Sending Enquiry...' : 'Submit Enquiry'}</span>
              </button>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
};
