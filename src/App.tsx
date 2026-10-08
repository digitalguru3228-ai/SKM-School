import React, { useState, useEffect } from 'react';
import { api, AdminUser } from './services/api';
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { NoticeBanner } from './components/NoticeBanner';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AnnouncementsSection } from './components/AnnouncementsSection';
import { ManagementMessage } from './components/ManagementMessage';
import { LegacyTimeline } from './components/LegacyTimeline';
import { AcademicsSection } from './components/AcademicsSection';
import { TeachersSection } from './components/TeachersSection';
import { AchievementsSection } from './components/AchievementsSection';
import { FacilitiesSection } from './components/FacilitiesSection';
import { MissionVision } from './components/MissionVision';
import { CampusLifeGallery } from './components/CampusLifeGallery';
import { AdmissionSection } from './components/AdmissionSection';
import { FaqSection } from './components/FaqSection';
import { ContactAndMap } from './components/ContactAndMap';
import { Footer } from './components/Footer';
import { VideoTourModal } from './components/VideoTourModal';
import { GraduationCap, ArrowUp, Sun, Moon, Shield } from 'lucide-react';

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isVideoTourOpen, setIsVideoTourOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  
  // Routing & Admin CMS Auth state
  const [isAdminRoute, setIsAdminRoute] = useState<boolean>(() => {
    return window.location.pathname.startsWith('/admin') || window.location.hash.startsWith('#admin');
  });
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // Initialize theme from system/localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('skm_theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('skm_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Check auth session on startup
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await api.getCurrentUser();
        setCurrentUser(user);
      } catch (err) {
        console.warn('Session check failed:', err);
      } finally {
        setIsCheckingAuth(false);
      }
    };
    checkAuth();
  }, []);

  // Listen to browser URL changes for #admin or /admin
  useEffect(() => {
    const handleLocation = () => {
      const isAdm = window.location.pathname.startsWith('/admin') || window.location.hash.startsWith('#admin');
      setIsAdminRoute(isAdm);
    };

    window.addEventListener('popstate', handleLocation);
    window.addEventListener('hashchange', handleLocation);
    return () => {
      window.removeEventListener('popstate', handleLocation);
      window.removeEventListener('hashchange', handleLocation);
    };
  }, []);

  // Monitor scroll for back to top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const handleOpenAdmission = () => {
    const el = document.getElementById('admissions');
    if (el) {
      const offsetTop = el.offsetTop - 85;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  const handleOpenTour = () => {
    setIsVideoTourOpen(true);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const navigateToAdmin = () => {
    window.location.hash = '#admin';
    setIsAdminRoute(true);
  };

  const navigateToPublic = () => {
    window.location.hash = '';
    setIsAdminRoute(false);
  };

  const handleLogout = async () => {
    await api.logout();
    setCurrentUser(null);
  };

  const isDark = theme === 'dark';

  /* ==========================================================================
     ADMIN PANEL VIEW
     ========================================================================== */
  if (isAdminRoute) {
    if (isCheckingAuth) {
      return (
        <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-sm font-semibold">Verifying Staff Session...</p>
          </div>
        </div>
      );
    }

    if (!currentUser) {
      return (
        <AdminLogin
          onLoginSuccess={(user) => setCurrentUser(user)}
          onBackToSite={navigateToPublic}
          isDark={isDark}
        />
      );
    }

    return (
      <AdminDashboard
        currentUser={currentUser}
        onLogout={handleLogout}
        onViewPublicSite={navigateToPublic}
        isDark={isDark}
        toggleTheme={toggleTheme}
      />
    );
  }

  /* ==========================================================================
     PUBLIC INSTITUTIONAL WEBSITE VIEW
     ========================================================================== */
  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${
      isDark 
        ? 'bg-slate-950 text-slate-100 selection:bg-amber-500 selection:text-slate-950' 
        : 'bg-slate-50 text-slate-900 selection:bg-amber-400 selection:text-slate-950'
    }`}>
      
      {/* Top Official Notice Ticker */}
      <NoticeBanner theme={theme} />

      {/* Main Sticky Institutional Header */}
      <Header 
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenAdmission={handleOpenAdmission}
        onOpenTour={handleOpenTour}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero 
          theme={theme}
          onOpenTour={handleOpenTour}
          onOpenAdmission={handleOpenAdmission}
        />

        {/* 2. Official Circulars & Announcements Section */}
        <AnnouncementsSection theme={theme} />

        {/* 3. President & Sarvoday Kelavani Mandal Management Message */}
        <ManagementMessage theme={theme} />

        {/* 4. Interactive Vertical History & Legacy Timeline (1956 to Present) */}
        <LegacyTimeline theme={theme} />

        {/* 5. Academic Programs, Curriculum & Streams */}
        <AcademicsSection 
          theme={theme}
          onOpenAdmission={handleOpenAdmission}
        />

        {/* 6. Dedicated Faculty & Teachers Information Section */}
        <TeachersSection theme={theme} />

        {/* 7. Institutional Honors, Results & Achievements Section */}
        <AchievementsSection theme={theme} />

        {/* 8. Campus Infrastructure & Facilities */}
        <FacilitiesSection theme={theme} />

        {/* 9. Mission, Vision & 3 Core Values */}
        <MissionVision theme={theme} />

        {/* 10. Student Life & Campus Gallery */}
        <CampusLifeGallery theme={theme} />

        {/* 11. Admissions & Application Form */}
        <AdmissionSection theme={theme} />

        {/* 12. Parent Guidance & FAQs */}
        <FaqSection theme={theme} />

        {/* 13. Location, Interactive Map & Contact Administration */}
        <ContactAndMap theme={theme} />
      </main>

      {/* Institutional Footer */}
      <Footer 
        theme={theme}
        onOpenAdmission={handleOpenAdmission}
      />

      {/* Floating Quick Action Drawer on Mobile/Desktop */}
      <aside aria-label="Quick Access Bar" className="fixed bottom-5 right-5 z-40 flex items-center gap-2 pointer-events-none">
        
        {/* Back to Top */}
        {showBackToTop && (
          <button
            onClick={scrollToTop}
            aria-label="Scroll back to top"
            className="pointer-events-auto p-2.5 rounded-full bg-slate-800/90 dark:bg-slate-800/90 text-amber-400 hover:text-white hover:bg-slate-700 shadow-xl border border-slate-700 transition-all cursor-pointer animate-in fade-in"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        )}

        {/* Theme Quick Switcher Pill & Staff Portal Link */}
        <div className="pointer-events-auto flex items-center gap-1.5 p-1 rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200 dark:border-amber-500/40 shadow-2xl">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl text-slate-700 dark:text-amber-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            title={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>

          <button
            onClick={navigateToAdmin}
            id="staff-cms-btn"
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            title="School Staff CMS Login"
          >
            <Shield className="w-4 h-4 text-amber-500" />
          </button>

          <button
            onClick={handleOpenAdmission}
            id="floating-admission-btn"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-bold shadow-md transition-all cursor-pointer"
            title="Apply for Admission 2026-27"
          >
            <GraduationCap className="w-4 h-4" />
            <span className="hidden sm:inline">Apply 2026–27</span>
          </button>
        </div>

      </aside>

      {/* Video Tour Virtual Modal */}
      <VideoTourModal 
        isOpen={isVideoTourOpen}
        onClose={() => setIsVideoTourOpen(false)}
      />

    </div>
  );
}
