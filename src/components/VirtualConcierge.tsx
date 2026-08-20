import React, { useState } from 'react';
import { useResidency } from '../context/ResidencyContext';
import { Compass, X, Send, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

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
      text: 'Namaste & Welcome to TV Residency! I am your 24/7 Virtual Chief Concierge. How may I assist your Kerala stay today?',
    }
  ]);
  const [inputText, setInputText] = useState('');

  if (!isConciergeOpen) return null;

  const quickPrompts = [
    { label: 'Rooms & Suites', query: 'Show me available rooms and suites' },
    { label: 'Private Villas', query: 'Show me private villas' },
    { label: 'Location & Google Maps', query: 'Where is TV Residency located?' },
    { label: 'Parking & Amenities', query: 'What amenities and parking facilities are available?' },
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
      let reply = "I would be delighted to assist with that! Our 24/7 dedicated reception desk at Collegepadi, Kottakkal is at your service directly at 8281628559.";
      let actionLink: { label: string; url: string } | undefined;

      const q = query.toLowerCase();
      if (q.includes('location') || q.includes('map') || q.includes('address') || q.includes('where')) {
        reply = "TV Residency is located at Collegepadi, Kottakkal, Near Ahalya Eye Hospital. You can view our exact location on Google Maps or contact us at 8281628559.";
        actionLink = { label: '📍 View on Google Maps →', url: '/contact' };
      } else if (q.includes('villa') || q.includes('pool')) {
        reply = "We offer 1-room, 2-room, 3-room, and 4-room private villas with natural gardens, private swimming pools, water heaters, high-speed Wi-Fi, and free on-site parking.";
        actionLink = { label: 'Explore Private Villas', url: '/villas' };
      } else if (q.includes('room') || q.includes('suite')) {
        reply = "Our luxury rooms and suites offer handcrafted teak furnishings, water heaters, AC, fast Wi-Fi, and private balconies.";
        actionLink = { label: 'Browse Rooms & Suites', url: '/rooms' };
      } else if (q.includes('phone') || q.includes('call') || q.includes('contact')) {
        reply = "You can call us directly anytime at 8281628559. Our concierge desk is open 24/7.";
        actionLink = { label: 'Contact Details', url: '/contact' };
      } else if (q.includes('amenit') || q.includes('park') || q.includes('wifi') || q.includes('heater')) {
        reply = "All guests enjoy free covered parking on premises, high-speed Wi-Fi, water heaters/geysers in all bathrooms, 24/7 power backup, air conditioning, and room service.";
        actionLink = { label: 'View About & Facilities', url: '/about' };
      } else if (q.includes('dining') || q.includes('restaurant') || q.includes('food')) {
        reply = "TV Residency hosts delicious dining options with 24/7 room service and authentic Kerala delicacies.";
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
              <span>TV Residency Chief Concierge</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            </div>
            <div className="text-[10px] text-warm-gold uppercase tracking-wider">
              24/7 AI Guest Assistance
            </div>
          </div>
        </div>

        <button
          onClick={() => setIsConciergeOpen(false)}
          className="text-gray-400 hover:text-white p-1"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-gray-50/50 dark:bg-white/[0.02]">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed ${
                m.sender === 'user'
                  ? 'bg-deep-navy dark:bg-warm-gold text-white dark:text-primary font-medium rounded-tr-none'
                  : 'bg-white dark:bg-[#1A1D24] text-gray-800 dark:text-gray-200 border border-gray-100 dark:border-white/5 rounded-tl-none shadow-sm'
              }`}
            >
              {m.text}
              {m.actionLink && (
                <div className="mt-2.5 pt-2 border-t border-gray-100 dark:border-white/10">
                  <Link
                    to={m.actionLink.url}
                    onClick={() => setIsConciergeOpen(false)}
                    className="inline-flex items-center gap-1 text-warm-gold font-bold hover:underline"
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
      <div className="p-2 bg-white dark:bg-[#15171C] border-t border-gray-100 dark:border-white/5 flex gap-1.5 overflow-x-auto no-scrollbar">
        {quickPrompts.map((qp, i) => (
          <button
            key={i}
            onClick={() => handleSend(qp.query)}
            className="px-2.5 py-1 bg-gray-50 dark:bg-white/5 hover:bg-warm-gold/15 text-gray-700 dark:text-gray-300 hover:text-warm-gold text-[10px] font-semibold rounded-full border border-gray-200 dark:border-white/10 whitespace-nowrap transition-colors flex-shrink-0"
          >
            {qp.label}
          </button>
        ))}
      </div>

      {/* Input Row */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="p-3 bg-white dark:bg-[#15171C] border-t border-gray-100 dark:border-white/10 flex gap-2"
      >
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Ask concierge about stays, dining, spa..."
          className="flex-1 py-2 px-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-xs text-gray-900 dark:text-white focus:ring-1 focus:ring-warm-gold"
        />
        <button
          type="submit"
          className="w-9 h-9 rounded-xl bg-warm-gold text-primary flex items-center justify-center hover:bg-gold-light transition-all flex-shrink-0"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
