import React from 'react';
import { useResidency } from '../context/ResidencyContext';
import { CheckCircle2, Info, AlertCircle, Sparkles, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useResidency();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        return (
          <div
            key={toast.id}
            className={`pointer-events-auto p-4 rounded-xl shadow-level-3 border flex items-start gap-3 backdrop-blur-md transition-all duration-300 animate-slide-up ${
              toast.type === 'gold'
                ? 'bg-deep-navy/95 text-white border-warm-gold/50 shadow-gold'
                : toast.type === 'success'
                ? 'bg-emerald-950/95 text-emerald-100 border-emerald-500/40'
                : toast.type === 'error'
                ? 'bg-rose-950/95 text-rose-100 border-rose-500/40'
                : 'bg-white/95 dark:bg-[#1A1D24]/95 text-gray-800 dark:text-gray-100 border-gray-200 dark:border-white/10'
            }`}
          >
            {toast.type === 'gold' && <Sparkles className="w-4 h-4 text-warm-gold flex-shrink-0 mt-0.5" />}
            {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />}
            {toast.type === 'error' && <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />}
            {toast.type === 'info' && <Info className="w-4 h-4 text-warm-gold flex-shrink-0 mt-0.5" />}

            <div className="flex-1 text-xs leading-relaxed font-medium">
              {toast.message}
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="text-gray-400 hover:text-white p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
