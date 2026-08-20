import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useResidency } from '../context/ResidencyContext';
import { X, Lock, Sparkles, UserCheck } from 'lucide-react';

export const LoginModal: React.FC = () => {
  const { isLoginModalOpen, closeLoginModal, login, loginRedirectUrl } = useAuth();
  const { showToast } = useResidency();
  const navigate = useNavigate();

  const [email, setEmail] = useState('guest.vip@tvresidency.com');
  const [password, setPassword] = useState('luxury2026');
  const [name, setName] = useState('Julian Sterling');
  const [selectedTier, setSelectedTier] = useState<'Silver' | 'Gold' | 'Platinum'>('Gold');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isLoginModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      showToast('Please enter your email and password.', 'error');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      login(email, name, selectedTier);
      setIsSubmitting(false);
      showToast(`Welcome, ${name || email.split('@')[0]}! ${selectedTier} VIP Privileges active.`, 'gold');
      
      if (loginRedirectUrl) {
        navigate(loginRedirectUrl);
      }
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
      <div className="fixed inset-0" onClick={closeLoginModal} />

      <div className="relative w-full max-w-md bg-white dark:bg-[#15171C] rounded-2xl shadow-2xl overflow-hidden border border-soft-beige/80 dark:border-white/10 z-10">
        
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-deep-navy to-primary text-white border-b border-warm-gold/30 flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-warm-gold/20 flex items-center justify-center text-warm-gold border border-warm-gold/40">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-white">
                Sign In to TV Residency
              </h3>
              <p className="text-xs text-warm-gold font-medium">
                Authentication Required for Reservations
              </p>
            </div>
          </div>

          <button
            onClick={closeLoginModal}
            className="text-gray-400 hover:text-white p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Notice Pill */}
        <div className="bg-soft-beige/60 dark:bg-warm-gold/10 px-6 py-2.5 border-b border-warm-gold/20 text-xs text-gray-700 dark:text-gray-200 flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-warm-gold flex-shrink-0" />
          <span>Please sign in to proceed with your booking & member benefits.</span>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider block mb-1">
              Guest Full Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Julian Sterling"
              className="w-full py-2.5 px-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-xs text-gray-900 dark:text-white focus:ring-1 focus:ring-warm-gold"
            />
          </div>

          <div>
            <label className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider block mb-1">
              Email Address *
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. julian@sovereign.com"
              className="w-full py-2.5 px-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-xs text-gray-900 dark:text-white focus:ring-1 focus:ring-warm-gold"
            />
          </div>

          <div>
            <label className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider block mb-1">
              Password *
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full py-2.5 px-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-xs text-gray-900 dark:text-white focus:ring-1 focus:ring-warm-gold"
            />
          </div>

          {/* Membership Tier Picker */}
          <div>
            <label className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider block mb-1.5">
              Select VIP Member Tier
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['Silver', 'Gold', 'Platinum'] as const).map((tier) => (
                <button
                  type="button"
                  key={tier}
                  onClick={() => setSelectedTier(tier)}
                  className={`py-1.5 px-2 rounded-lg text-xs font-bold uppercase tracking-wider border transition-all ${
                    selectedTier === tier
                      ? 'bg-warm-gold text-primary border-warm-gold shadow-sm'
                      : 'bg-gray-50 dark:bg-white/5 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-white/10'
                  }`}
                >
                  {tier}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 flex flex-col gap-2.5">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-deep-navy dark:bg-warm-gold text-white dark:text-primary font-bold text-xs uppercase tracking-widest rounded-xl shadow hover:bg-primary dark:hover:bg-gold-light transition-all flex items-center justify-center gap-2"
            >
              <UserCheck className="w-4 h-4" />
              <span>{isSubmitting ? 'Signing In...' : 'Sign In & Continue Booking'}</span>
            </button>

            <button
              type="button"
              onClick={closeLoginModal}
              className="w-full py-2.5 text-xs font-semibold text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white transition-colors"
            >
              Continue Browsing as Guest
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
