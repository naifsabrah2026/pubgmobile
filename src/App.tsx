import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import NewsTicker from './components/NewsTicker';
import LoadingScreen from './components/LoadingScreen';
import Home from './pages/Home';
import Accounts from './pages/Accounts';
import Terms from './pages/Terms';
import Admin from './pages/Admin';

const AppContent: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [pageName, setPageName] = useState('الرئيسية');
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    
    // Set page name based on route
    const pageNames: { [key: string]: string } = {
      '/': 'الرئيسية',
      '/accounts': 'حسابات PUBG',
      '/terms': 'شروط المتجر',
      '/admin': 'لوحة الإدارة'
    };
    
    setPageName(pageNames[location.pathname] || 'صفحة غير معروفة');
    
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  if (loading) {
    return <LoadingScreen pageName={pageName} />;
  }

  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black" dir="rtl">
      {!isAdminPage && (
        <>
          <Header />
          <NewsTicker />
        </>
      )}
      
      <main className={!isAdminPage ? 'pb-8' : ''}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/accounts" element={<Accounts />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </AnimatePresence>
      </main>
      
      {!isAdminPage && <Footer />}
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;