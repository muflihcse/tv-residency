import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ResidencyProvider } from './context/ResidencyContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LoginModal } from './components/LoginModal';
import { VirtualConcierge } from './components/VirtualConcierge';
import { ToastContainer } from './components/ToastContainer';

// Pages
import { HomePage } from './pages/HomePage';
import { RoomsPage } from './pages/RoomsPage';
import { VillasPage } from './pages/VillasPage';
import { PropertyDetailsPage } from './pages/PropertyDetailsPage';
import { BookingPage } from './pages/BookingPage';
import { OffersPage } from './pages/OffersPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { LoginPage } from './pages/LoginPage';
import { MyBookingsPage } from './pages/MyBookingsPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Scroll to top helper on route transition
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ResidencyProvider>
          <div className="min-h-screen flex flex-col bg-background dark:bg-surface-dark text-gray-900 dark:text-gray-100 font-sans transition-colors duration-300 antialiased selection:bg-warm-gold/30 selection:text-primary dark:selection:text-white">
            <ScrollToTop />
            
            {/* Sticky Navigation */}
            <Navbar />

            {/* Main Content Area */}
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/rooms" element={<RoomsPage />} />
                <Route path="/villas" element={<VillasPage />} />
                <Route path="/property/:id" element={<PropertyDetailsPage />} />
                <Route path="/booking/:id" element={<BookingPage />} />
                <Route path="/offers" element={<OffersPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/bookings" element={<MyBookingsPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>

            {/* Luxury Footer */}
            <Footer />

            {/* Global Modals & Overlay Widgets */}
            <LoginModal />
            <VirtualConcierge />
            <ToastContainer />
          </div>
        </ResidencyProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
