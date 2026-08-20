import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useResidency } from '../context/ResidencyContext';
import { Sparkles, UserCheck, ArrowLeft } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const { showToast } = useResidency();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectUrl = searchParams.get('redirect') || '/';

  const [email, setEmail] = useState('guest.vip@tvresidency.com');
  const [password, setPassword] = useState('luxury2026');
  const [name, setName] = useState('Julian Sterling');
  const [tier, setTier] = useState<'Silver' | 'Gold' | 'Platinum'>('Gold');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      showToast('Please enter your email and password.', 'error');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      login(email, name, tier);
      setIsSubmitting(false);
      showToast(`Welcome back, ${name || email.split('@')[0]}! ${tier} VIP Privileges active.`, 'gold');
      navigate(redirectUrl);
    }, 400);
  };

  const handleGuestContinue = () => {
    showToast('Browsing as Guest. Note: Authentication is required when reserving stays.', 'info');
    navigate('/');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-background dark:bg-surface-dark transition-colors duration-300">
      <div className="w-full max-w-md space-y-8 bg-white dark:bg-[#15171C] p-8 rounded-2xl shadow-level-3 border border-soft-beige/80 dark:border-white/10">
        
        {/* Brand Logo & Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-deep-navy via-primary to-deep-navy border border-warm-gold text-warm-gold font-serif font-bold text-xl flex items-center justify-center mx-auto shadow-sm">
            TV
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-primary dark:text-white">
            Sign In to TV Residency
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Access member rates, manage your bookings, and reserve private villas.
          </p>
        </div>

        {/* Notice for booking redirect */}
        {redirectUrl.includes('/booking/') && (
          <div className="p-3 bg-soft-beige/60 dark:bg-warm-gold/10 rounded-xl border border-warm-gold/30 text-xs text-gray-800 dark:text-gray-200 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-warm-gold flex-shrink-0" />
            <span>Please sign in to proceed with your booking reservation.</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider block mb-1">
              Guest Name (Optional)
            </label>
            <input
              type="text"
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

          <div>
            <label className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider block mb-1.5">
              Select Membership Tier
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['Silver', 'Gold', 'Platinum'] as const).map((t) => (
                <button
                  type="button"
                  key={t}
                  onClick={() => setTier(t)}
                  className={`py-1.5 px-2 rounded-lg text-xs font-bold uppercase tracking-wider border transition-all ${
                    tier === t
                      ? 'bg-warm-gold text-primary border-warm-gold shadow-sm'
                      : 'bg-gray-50 dark:bg-white/5 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-white/10'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 space-y-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-deep-navy dark:bg-warm-gold text-white dark:text-primary font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-primary dark:hover:bg-gold-light transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <UserCheck className="w-4 h-4" />
              <span>{isSubmitting ? 'Signing In...' : 'Sign In & Access Bookings'}</span>
            </button>

            <button
              type="button"
              onClick={handleGuestContinue}
              className="w-full py-2.5 text-xs font-semibold text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-white transition-colors"
            >
              Continue as Guest (Browsing Only)
            </button>
          </div>
        </form>

        <div className="text-center pt-2">
          <Link to="/" className="text-xs text-gray-400 hover:text-warm-gold inline-flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Homepage</span>
          </Link>
        </div>

      </div>
    </div>
  );
};
