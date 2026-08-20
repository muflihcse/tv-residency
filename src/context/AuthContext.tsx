import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import type { User, Booking } from '../types';
import { auth } from '../firebase';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (phone: string, name?: string, email?: string) => void;
  logout: () => Promise<void>;
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

  // Synchronize state with Firebase onAuthStateChanged
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const phone = firebaseUser.phoneNumber || '';
        const name = firebaseUser.displayName || (phone ? `Guest (${phone.slice(-4)})` : 'Guest');
        const email = firebaseUser.email || '';
        
        const mappedUser: User = {
          id: firebaseUser.uid,
          phone,
          name,
          email,
          joinedDate: firebaseUser.metadata.creationTime
            ? new Date(firebaseUser.metadata.creationTime).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
            : new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        };

        setUser(mappedUser);
        localStorage.setItem('tv_auth_user', JSON.stringify(mappedUser));
      } else {
        // If not logged into Firebase, check if local user exists
        const saved = localStorage.getItem('tv_auth_user');
        if (!saved) {
          setUser(null);
        }
      }
    });

    return () => unsubscribe();
  }, []);

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

  const login = (phone: string, name?: string, email?: string) => {
    const cleanPhone = phone.trim();
    const formattedName = name?.trim() || `Guest (${cleanPhone.slice(-4)})`;
    const newUser: User = {
      id: `usr_${Date.now()}`,
      phone: cleanPhone,
      name: formattedName,
      email: email?.trim() || '',
      joinedDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
    };
    setUser(newUser);
    setIsLoginModalOpen(false);
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.warn('Firebase signOut warning:', error);
    }
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
