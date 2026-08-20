import React, { useState } from 'react';
import { useResidency } from '../context/ResidencyContext';
import { Compass, X, Send, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { RESIDENCY_CONTACT } from '../data/residencyData';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  actionLink?: { label: string; url: string };
}

export const VirtualConcierge: React.FC = () => {
  const { isConciergeOpen, setIsConciergeOpen } = useResidency();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm-1',
      sender: 'ai',
      text: 'Namaste & Welcome to TV Residency! How may I assist you with information about our rooms, villas, and facilities in Kottakkal?',
    }
  ]);
  const [inputText, setInputText] = useState('');

  if (!isConciergeOpen) return null;

  const quickPrompts = [
    { label: 'Room Categories & Rates', query: 'Show me available rooms and prices' },
    { label: 'Villa Details', query: 'Tell me about the villas' },
    { label: 'Location & Google Maps', query: 'Where is TV Residency located?' },
    { label: 'Confirmed Facilities', query: 'What amenities and facilities are available?' },
  ];

  const handleSend = (textToSend?: string) => {
    const query = (textToSend || inputText).trim();
    if (!query) return;

    const userMsg: Message = {
      id: `u_${Date.now()}`,
      sender: 'user',
      text: query,
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputText('');

    setTimeout(() => {
      let reply = `I would be happy to assist! You can reach TV Residency directly on ${RESIDENCY_CONTACT.phone} for any enquiries.`;
      let actionLink: { label: string; url: string } | undefined;

      const q = query.toLowerCase();
      if (q.includes('location') || q.includes('map') || q.includes('address') || q.includes('where')) {
        reply = `TV Residency is located at Collegepadi, Kottakkal, Near Ahalya Eye Hospital. You can view our location on Google Maps or contact us directly at ${RESIDENCY_CONTACT.phone}.`;
        actionLink = { label: '📍 View on Google Maps →', url: '/contact' };
      } else if (q.includes('villa')) {
        reply = "TV Residency provides 6 villas in total: 4 AC two-bedroom villas at ₹4,000 / night (with hall, kitchen with stove, 2 rooms, bathroom, and sit-out) and 2 one-room villas at ₹3,000 / night (with room, hall, kitchen, and bathroom).";
        actionLink = { label: 'Explore Villas', url: '/villas' };
      } else if (q.includes('room') || q.includes('price') || q.includes('rate') || q.includes('cost')) {
        reply = "We offer 3 Non-AC Rooms (₹1,000 / night), 3 AC Rooms (₹1,500 / night), and 1 Three-Bed Room (₹1,700 / night). All rooms include essential facilities.";
        actionLink = { label: 'Browse Rooms', url: '/rooms' };
      } else if (q.includes('phone') || q.includes('call') || q.includes('contact')) {
        reply = `You can call TV Residency directly at ${RESIDENCY_CONTACT.phone} for room details, villa availability, and booking enquiries.`;
        actionLink = { label: 'Contact Details', url: '/contact' };
      } else if (q.includes('amenit') || q.includes('facil') || q.includes('park') || q.includes('wifi') || q.includes('hot water')) {
        reply = "Confirmed facilities at TV Residency include Free Wi-Fi, Hot Water facility, Parking, TV in accommodation, and Power Backup.";
        actionLink = { label: 'View Facilities', url: '/about' };
      }

      const aiMsg: Message = {
        id: `ai_${Date.now()}`,
        sender: 'ai',
        text: reply,
        actionLink,
      };

      setMessages(prev => [...prev, aiMsg]);
    }, 450);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 w-full max-w-sm sm:max-w-md bg-white dark:bg-[#15171C] rounded-2xl shadow-2xl border border-soft-beige/80 dark:border-white/10 overflow-hidden flex flex-col h-[520px] animate-fade-in">
      
      {/* Header */}
      <div className="p-4 bg-gradient-to-r from-deep-navy to-primary text-white border-b border-warm-gold/30 flex justify-between items-center">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-warm-gold text-primary flex items-center justify-center font-bold">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <div className="font-serif font-bold text-sm text-white flex items-center gap-1.5">
              <span>TV Residency Assistant</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            </div>
            <div className="text-[10px] text-warm-gold uppercase tracking-wider">
              Property & Booking Guide
            </div>
          </div>
        </div>

        <button
          onClick={() => setIsConciergeOpen(false)}
          className="p-1.5 rounded-full hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-gray-50/50 dark:bg-[#0E0F13]/50">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed ${
                m.sender === 'user'
                  ? 'bg-deep-navy dark:bg-warm-gold text-white dark:text-primary rounded-br-none shadow-sm'
                  : 'bg-white dark:bg-[#1C1F26] text-gray-800 dark:text-gray-200 border border-gray-100 dark:border-white/5 rounded-bl-none shadow-sm'
              }`}
            >
              <p>{m.text}</p>

              {m.actionLink && (
                <div className="mt-2.5 pt-2 border-t border-gray-100 dark:border-white/10">
                  <Link
                    to={m.actionLink.url}
                    onClick={() => setIsConciergeOpen(false)}
                    className="inline-flex items-center gap-1 font-bold text-warm-gold hover:underline text-[11px]"
                  >
                    <span>{m.actionLink.label}</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Prompts */}
      <div className="p-2.5 bg-white dark:bg-[#15171C] border-t border-gray-100 dark:border-white/5 flex gap-1.5 overflow-x-auto no-scrollbar">
        {quickPrompts.map((p, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(p.query)}
            className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 hover:bg-warm-gold hover:text-primary transition-colors flex-shrink-0 border border-gray-200 dark:border-white/10"
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Input Field */}
      <div className="p-3 bg-white dark:bg-[#15171C] border-t border-gray-100 dark:border-white/10 flex gap-2 items-center">
        <input
          type="text"
          placeholder="Ask about rooms, villas, location, or facilities..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          className="flex-1 px-3 py-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-xs text-gray-900 dark:text-white placeholder:text-gray-400 focus:ring-1 focus:ring-warm-gold"
        />
        <button
          onClick={() => handleSend()}
          className="p-2 bg-warm-gold text-primary rounded-xl hover:bg-gold-light transition-colors flex-shrink-0 shadow-sm"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
