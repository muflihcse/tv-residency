import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Home } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[75vh] flex items-center justify-center p-8 text-center bg-background dark:bg-surface-dark transition-colors duration-300">
      <div className="max-w-md space-y-5">
        <div className="w-16 h-16 rounded-full bg-warm-gold/20 text-warm-gold flex items-center justify-center mx-auto shadow-gold">
          <Compass className="w-8 h-8 text-warm-gold animate-spin-slow" />
        </div>
        
        <span className="text-xs font-bold text-warm-gold uppercase tracking-[0.25em] block">
          404 — Page Not Found
        </span>

        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-primary dark:text-white">
          Sanctuary Off The Map
        </h1>

        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
          The page you are looking for has been moved or does not exist. Allow our navigation to guide you back to our coastal collection.
        </p>

        <div className="pt-2 flex flex-wrap justify-center gap-3">
          <Link
            to="/"
            className="px-6 py-3 bg-warm-gold text-primary font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-gold-light transition-all flex items-center gap-2 shadow-sm"
          >
            <Home className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>
          <Link
            to="/rooms"
            className="px-6 py-3 border border-gray-300 dark:border-white/20 text-gray-700 dark:text-gray-200 font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-all"
          >
            Explore Stays
          </Link>
        </div>
      </div>
    </div>
  );
};
