import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User, Booking } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, name?: string, tier?: 'Silver' | 'Gold' | 'Platinum') => void;
  logout: () => void;
  userBookings: Booking[];
  addBooking: (booking: Omit<Booking, 'id' | 'createdAt' | 'status'>) => Booking;
  cancelBooking: (bookingId: string) => void;
  isLoginModalOpen: boolean;
  openLoginModal: (redirectUrl?: string) => void;
  closeLoginModal: () => void;
  loginRedirectUrl: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('tv_auth_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [userBookings, setUserBookings] = useState<Booking[]>(() => {
    try {
      const saved = localStorage.getItem('tv_user_bookings');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [loginRedirectUrl, setLoginRedirectUrl] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      localStorage.setItem('tv_auth_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('tv_auth_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('tv_user_bookings', JSON.stringify(userBookings));
  }, [userBookings]);

  const login = (email: string, name?: string, tier: 'Silver' | 'Gold' | 'Platinum' = 'Gold') => {
    const formattedName = name?.trim() || email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    const newUser: User = {
      id: `usr_${Date.now()}`,
      name: formattedName,
      email,
      phone: '+91 98470 12345',
      membershipTier: tier,
      joinedDate: 'Joined 2026',
    };
    setUser(newUser);
    setIsLoginModalOpen(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('tv_auth_user');
  };

  const addBooking = (bookingData: Omit<Booking, 'id' | 'createdAt' | 'status'>): Booking => {
    const newBooking: Booking = {
      ...bookingData,
      id: `bk_${Date.now()}`,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    };
    setUserBookings(prev => [newBooking, ...prev]);
    return newBooking;
  };

  const cancelBooking = (bookingId: string) => {
    setUserBookings(prev =>
      prev.map(b => (b.id === bookingId ? { ...b, status: 'cancelled' } : b))
    );
  };

  const openLoginModal = (redirectUrl?: string) => {
    if (redirectUrl) {
      setLoginRedirectUrl(redirectUrl);
    }
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
    setLoginRedirectUrl(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        userBookings,
        addBooking,
        cancelBooking,
        isLoginModalOpen,
        openLoginModal,
        closeLoginModal,
        loginRedirectUrl,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
