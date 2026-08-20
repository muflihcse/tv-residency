import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useResidency } from '../context/ResidencyContext';
import {
  X,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Loader2,
} from 'lucide-react';
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import type { ConfirmationResult } from 'firebase/auth';
import { auth } from '../firebase';

const COUNTRY_CODES = [
  { code: '+91', country: 'India', flag: '🇮🇳' },
  { code: '+971', country: 'UAE', flag: '🇦🇪' },
  { code: '+966', country: 'Saudi Arabia', flag: '🇸🇦' },
  { code: '+974', country: 'Qatar', flag: '🇶🇦' },
  { code: '+968', country: 'Oman', flag: '🇴🇲' },
  { code: '+965', country: 'Kuwait', flag: '🇰🇼' },
  { code: '+44', country: 'UK', flag: '🇬🇧' },
  { code: '+1', country: 'USA', flag: '🇺🇸' },
];

export const LoginModal: React.FC = () => {
  const {
    isLoginModalOpen,
    closeLoginModal,
    login,
    loginRedirectUrl,
  } = useAuth();

  const { showToast } = useResidency();
  const navigate = useNavigate();

  // Mode: 'phone' | 'otp'
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  
  // Phone form state
  const [countryCode, setCountryCode] = useState('+91');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [formattedTargetPhone, setFormattedTargetPhone] = useState('');

  // OTP state
  const [otp, setOtp] = useState('');
  const [countdown, setCountdown] = useState(30);
  const [confirmationResult, setConfirmationResult] =
    useState<ConfirmationResult | null>(null);

  // Loading and error state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [inlineError, setInlineError] = useState<string | null>(null);

  const recaptchaVerifierRef = useRef<RecaptchaVerifier | null>(null);

  // Helper to format phone number to strict E.164 standard
  const getE164PhoneNumber = (selectedCode: string, inputPhone: string): string => {
    let digitsOnly = inputPhone.replace(/\D/g, '');
    const codeDigits = selectedCode.replace(/\D/g, '');
    
    if (digitsOnly.startsWith(codeDigits)) {
      digitsOnly = digitsOnly.slice(codeDigits.length);
    }
    if (digitsOnly.startsWith('0')) {
      digitsOnly = digitsOnly.slice(1);
    }

    return `${selectedCode}${digitsOnly}`;
  };

  // Reset reCAPTCHA verifier and DOM container
  const resetRecaptcha = () => {
    if (recaptchaVerifierRef.current) {
      try {
        recaptchaVerifierRef.current.clear();
      } catch {
        // ignore
      }
      recaptchaVerifierRef.current = null;
    }
    const container = document.getElementById('global-recaptcha-container');
    if (container) {
      container.innerHTML = '';
    }
  };

  // Clean up reCAPTCHA on unmount
  useEffect(() => {
    return () => {
      resetRecaptcha();
    };
  }, []);

  // Countdown timer for OTP resend
  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | undefined;

    if (step === 'otp' && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [step, countdown]);

  if (!isLoginModalOpen) return null;

  // Initialize invisible RecaptchaVerifier
  const getOrCreateRecaptchaVerifier = () => {
    if (recaptchaVerifierRef.current) {
      return recaptchaVerifierRef.current;
    }

    const container = document.getElementById('global-recaptcha-container');
    if (!container) return null;

    container.innerHTML = '';

    try {
      const verifier = new RecaptchaVerifier(
        auth,
        'global-recaptcha-container',
        {
          size: 'invisible',
          callback: () => {
            // reCAPTCHA solved
          },
          'expired-callback': () => {
            setInlineError('Security verification expired. Please try again.');
            resetRecaptcha();
          },
        }
      );
      recaptchaVerifierRef.current = verifier;
      return verifier;
    } catch (err) {
      console.error('Error creating RecaptchaVerifier:', err);
      resetRecaptcha();
      return null;
    }
  };

  const handlePostAuthSuccess = (userPhone: string, userName: string, userEmail: string = '') => {
    login(userPhone || userEmail, userName, userEmail);
    showToast(`Welcome, ${userName}! Signed in successfully.`, 'gold');
    setIsSubmitting(false);
    resetRecaptcha();
    closeLoginModal();

    if (loginRedirectUrl) {
      navigate(loginRedirectUrl);
    }
  };

  // =========================================================
  // 1. GOOGLE SIGN-IN FUNCTIONALITY
  // =========================================================
  const handleGoogleSignIn = async () => {
    setInlineError(null);
    setIsSubmitting(true);

    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });

      const result = await signInWithPopup(auth, provider);
      const firebaseUser = result.user;
      
      const guestName = firebaseUser.displayName || 'Google Guest';
      const guestEmail = firebaseUser.email || '';
      const guestPhone = firebaseUser.phoneNumber || '';

      handlePostAuthSuccess(guestPhone, guestName, guestEmail);
    } catch (error: any) {
      console.error('Google Sign-In Error:', error);
      setIsSubmitting(false);

      let msg = 'Google sign-in was cancelled or failed.';
      if (error?.code === 'auth/popup-closed-by-user') {
        msg = 'Sign-in window was closed before completing.';
      } else if (error?.code === 'auth/operation-not-allowed') {
        msg = 'Google sign-in is not enabled in Firebase Console (Authentication > Sign-in method > Google).';
      } else if (error?.code === 'auth/unauthorized-domain') {
        msg = 'This domain is not in Firebase Authorized domains (Authentication > Settings > Authorized domains).';
      } else if (error?.message) {
        msg = error.message;
      }

      setInlineError(msg);
    }
  };

  // =========================================================
  // 2. PHONE AUTHENTICATION (SMS OTP)
  // =========================================================
  const handleSendPhoneOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setInlineError(null);

    const rawDigits = phone.replace(/\D/g, '');
    if (rawDigits.length < 7) {
      setInlineError('Please enter a valid mobile number.');
      return;
    }

    const e164Number = getE164PhoneNumber(countryCode, phone);
    setIsSubmitting(true);

    try {
      const appVerifier = getOrCreateRecaptchaVerifier();
      if (!appVerifier) {
        throw new Error('reCAPTCHA initialization failed. Please refresh and try again.');
      }

      const result = await signInWithPhoneNumber(auth, e164Number, appVerifier);
      
      setConfirmationResult(result);
      setFormattedTargetPhone(e164Number);
      setStep('otp');
      setOtp('');
      setCountdown(30);

      showToast(`Verification code sent to ${e164Number}`, 'gold');
    } catch (error: any) {
      console.error('Firebase Phone Auth Error:', error);
      resetRecaptcha();

      let msg = 'Unable to send verification code. Please try again.';

      if (error?.code === 'auth/billing-not-enabled') {
        msg = 'Firebase Blaze plan is required for live carrier SMS. If testing, configure test phone numbers in Firebase Console.';
      } else if (error?.code === 'auth/invalid-phone-number') {
        msg = 'The mobile number format is invalid. Please check and try again.';
      } else if (error?.code === 'auth/too-many-requests') {
        msg = 'Too many attempts. Please wait a few minutes before trying again.';
      } else if (error?.code === 'auth/quota-exceeded') {
        msg = 'SMS quota reached for this project. Please check Firebase configuration.';
      } else if (error?.code === 'auth/captcha-check-failed') {
        msg = 'Security verification failed. Please try again.';
      } else if (error?.code === 'auth/operation-not-allowed') {
        msg = 'Phone authentication is not enabled in Firebase Console.';
      } else if (error?.code === 'auth/app-not-authorized' || error?.code === 'auth/unauthorized-domain') {
        msg = 'This domain is not authorized in Firebase Authentication settings.';
      } else if (error?.message && !error.message.includes('reCAPTCHA')) {
        msg = error.message;
      }

      setInlineError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendOtp = async () => {
    if (countdown > 0 || isSubmitting) return;
    setInlineError(null);
    setIsSubmitting(true);

    try {
      const appVerifier = getOrCreateRecaptchaVerifier();
      if (!appVerifier) throw new Error('reCAPTCHA failed');
      const e164Number = formattedTargetPhone || getE164PhoneNumber(countryCode, phone);
      const result = await signInWithPhoneNumber(auth, e164Number, appVerifier);
      setConfirmationResult(result);
      setCountdown(30);
      showToast(`New verification code sent to ${e164Number}`, 'gold');
    } catch (error: any) {
      console.error('Resend OTP error:', error);
      resetRecaptcha();
      setInlineError(error?.message || 'Unable to resend code.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // =========================================================
  // 3. VERIFY OTP
  // =========================================================
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setInlineError(null);

    if (!confirmationResult) {
      setInlineError('Verification session expired. Please request a new code.');
      setStep('phone');
      return;
    }

    if (otp.trim().length !== 6) {
      setInlineError('Please enter the complete 6-digit verification code.');
      return;
    }

    setIsSubmitting(true);

    try {
      const userCredential = await confirmationResult.confirm(otp.trim());
      const firebaseUser = userCredential.user;

      const fullPhone = formattedTargetPhone || firebaseUser.phoneNumber || `${countryCode}${phone}`;
      const guestName = name.trim() || firebaseUser.displayName || `Guest (${fullPhone.slice(-4)})`;

      if (name.trim() && firebaseUser) {
        try {
          await updateProfile(firebaseUser, { displayName: name.trim() });
        } catch (profileErr) {
          console.warn('Could not update Firebase displayName:', profileErr);
        }
      }

      handlePostAuthSuccess(fullPhone, guestName, firebaseUser.email || '');
    } catch (error: any) {
      console.error('Firebase OTP Confirmation Error:', error);

      let msg = 'Invalid verification code. Please check the code and try again.';
      if (error?.code === 'auth/invalid-verification-code') {
        msg = 'Incorrect verification code. Please check your SMS and try again.';
      } else if (error?.code === 'auth/code-expired') {
        msg = 'This verification code has expired. Please request a new one.';
      } else if (error?.code === 'auth/session-expired') {
        msg = 'Verification session expired. Please request a new code.';
      } else if (error?.message) {
        msg = error.message;
      }

      setIsSubmitting(false);
      setInlineError(msg);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      {/* Background click dismiss */}
      <div className="fixed inset-0" onClick={closeLoginModal} />

      {/* Main Centered Premium Card */}
      <div className="relative w-full max-w-[500px] bg-white dark:bg-[#15171C] rounded-[24px] shadow-2xl overflow-hidden border border-gray-100 dark:border-white/10 z-10 my-8">
        
        {/* Top Header Bar with Close X */}
        <div className="relative px-6 sm:px-8 pt-8 pb-4 flex flex-col items-center text-center">
          <button
            onClick={closeLoginModal}
            className="absolute top-5 right-5 text-gray-400 hover:text-gray-900 dark:hover:text-white p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* TV Residency Monogram Emblem */}
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-deep-navy via-primary to-deep-navy border border-warm-gold/50 text-warm-gold font-serif font-bold text-xl flex items-center justify-center shadow-md mb-3">
            TV
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-primary dark:text-white tracking-tight">
            {step === 'otp' ? 'Enter verification code' : 'Log in or sign up'}
          </h2>

          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 max-w-sm mt-1.5 leading-relaxed">
            {step === 'otp'
              ? `We sent a 6-digit verification code to ${formattedTargetPhone || `${countryCode} ${phone}`}`
              : 'Use your mobile number or Google account to securely access your bookings and wishlist.'}
          </p>
        </div>

        {/* Inline Error Banner */}
        {inlineError && (
          <div className="mx-6 sm:mx-8 mb-3 p-3.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/50 text-red-700 dark:text-red-300 text-xs flex items-start gap-2 animate-shake">
            <span className="font-bold flex-shrink-0">⚠️</span>
            <span className="leading-snug">{inlineError}</span>
          </div>
        )}

        <div className="px-6 sm:px-8 pb-8 space-y-4">
          
          {/* ========================================================= */}
          {/* 1. PHONE NUMBER STEP (DEFAULT)                            */}
          {/* ========================================================= */}
          {step === 'phone' && (
            <>
              <form onSubmit={handleSendPhoneOtp} className="space-y-4">
                {/* Optional Name */}
                <div>
                  <label className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider block mb-1">
                    Your Full Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full py-2.5 px-3.5 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-xs text-gray-900 dark:text-white placeholder:text-gray-400 focus:ring-1 focus:ring-warm-gold focus:border-warm-gold"
                  />
                </div>

                {/* Country Code & Phone Input */}
                <div>
                  <label className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider block mb-1">
                    Mobile Number *
                  </label>
                  <div className="flex rounded-xl border border-gray-200 dark:border-white/10 overflow-hidden bg-gray-50 dark:bg-white/5 focus-within:ring-1 focus-within:ring-warm-gold focus-within:border-warm-gold">
                    <div className="relative border-r border-gray-200 dark:border-white/10 bg-gray-100/80 dark:bg-white/10 flex items-center">
                      <select
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                        className="py-2.5 pl-2.5 pr-6 text-xs font-bold text-gray-700 dark:text-gray-200 bg-transparent border-0 appearance-none focus:ring-0 cursor-pointer"
                      >
                        {COUNTRY_CODES.map((c) => (
                          <option
                            key={c.code}
                            value={c.code}
                            className="bg-white dark:bg-[#15171C] text-gray-900 dark:text-white"
                          >
                            {c.flag} {c.code}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="w-3 h-3 text-gray-400 absolute right-1.5 pointer-events-none" />
                    </div>

                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="98765 43210"
                      className="flex-1 py-2.5 px-3.5 bg-transparent border-0 text-xs font-semibold text-gray-900 dark:text-white placeholder:text-gray-400 focus:ring-0"
                    />
                  </div>
                  <p className="text-[10px] text-gray-400 mt-1">
                    A 6-digit verification code will be sent to this number.
                  </p>
                </div>

                {/* Primary Continue Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-deep-navy dark:bg-warm-gold text-white dark:text-primary font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-primary dark:hover:bg-gold-light transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending Code...</span>
                    </>
                  ) : (
                    <>
                      <span>Continue</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              {/* OR DIVIDER */}
              <div className="relative flex items-center justify-center pt-2">
                <div className="border-t border-gray-200 dark:border-white/10 w-full" />
                <span className="bg-white dark:bg-[#15171C] px-3 text-xs text-gray-400 font-medium uppercase tracking-wider">
                  or
                </span>
                <div className="border-t border-gray-200 dark:border-white/10 w-full" />
              </div>

              {/* GOOGLE SIGN IN BUTTON */}
              <div>
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-xs font-bold text-gray-800 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-white/10 transition-all flex items-center justify-center gap-3 shadow-sm disabled:opacity-60 hover:border-warm-gold/50 cursor-pointer"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                    />
                  </svg>
                  <span>Continue with Google</span>
                </button>
              </div>

              {/* Privacy / Terms Notice */}
              <p className="text-[10px] text-center text-gray-400 leading-tight pt-1">
                By continuing, you agree to our Terms & Conditions and Privacy Policy.
              </p>
            </>
          )}

          {/* ========================================================= */}
          {/* 2. 6-DIGIT OTP VERIFICATION STEP                          */}
          {/* ========================================================= */}
          {step === 'otp' && (
            <form onSubmit={handleVerifyOtp} className="space-y-4 pt-1">
              <div>
                <input
                  type="text"
                  required
                  maxLength={6}
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="• • • • • •"
                  className="w-full py-3.5 px-4 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-center text-2xl font-mono tracking-[0.45em] font-bold text-gray-900 dark:text-white focus:ring-1 focus:ring-warm-gold placeholder:tracking-[0.45em]"
                  autoFocus
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || otp.length !== 6}
                className="w-full py-3.5 bg-deep-navy dark:bg-warm-gold text-white dark:text-primary font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-primary dark:hover:bg-gold-light transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Verifying...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Verify & continue</span>
                  </>
                )}
              </button>

              <div className="space-y-2 pt-2 text-center text-xs">
                <div className="text-gray-500 dark:text-gray-400 text-[11px]">
                  <span>Didn't receive code? </span>
                  {countdown > 0 ? (
                    <span className="text-gray-400">Resend in {countdown}s</span>
                  ) : (
                    <button
                      type="button"
                      onClick={handleResendOtp}
                      disabled={isSubmitting}
                      className="text-warm-gold font-bold hover:underline disabled:opacity-50"
                    >
                      Resend code
                    </button>
                  )}
                </div>

                <div>
                  <button
                    type="button"
                    onClick={() => {
                      setStep('phone');
                      setOtp('');
                      resetRecaptcha();
                    }}
                    className="text-gray-500 hover:text-warm-gold text-xs transition-colors font-medium"
                  >
                    ← Change phone number
                  </button>
                </div>
              </div>
            </form>
          )}

        </div>
      </div>
    </div>
  );
};
