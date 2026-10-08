import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  Phone, 
  GraduationCap, 
  MapPin, 
  ChevronRight, 
  Shield, 
  BookOpen, 
  Sun, 
  Moon, 
  Bell, 
  Users, 
  Trophy 
} from 'lucide-react';
import { SchoolLogo } from './SchoolLogo';
import { SCHOOL_INFO } from '../data/schoolData';

interface HeaderProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onOpenAdmission: () => void;
  onOpenTour: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  theme,
  onToggleTheme,
  onOpenAdmission,
  onOpenTour
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const isDark = theme === 'dark';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Section spy
      const sections = [
        'home', 
        'announcements', 
        'legacy', 
        'academics', 
        'teachers', 
        'achievements', 
        'facilities', 
        'gallery', 
        'admissions', 
        'contact'
      ];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140 && rect.bottom >= 140) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'Announcements', href: '#announcements', id: 'announcements' },
    { name: 'Legacy', href: '#legacy', id: 'legacy' },
    { name: 'Academics', href: '#academics', id: 'academics' },
    { name: 'Faculty', href: '#teachers', id: 'teachers' },
    { name: 'Achievements', href: '#achievements', id: 'achievements' },
    { name: 'Facilities', href: '#facilities', id: 'facilities' },
    { name: 'Gallery', href: '#gallery', id: 'gallery' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      const offsetTop = (target as HTMLElement).offsetTop - 85;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      <nav 
        aria-label="Main Navigation"
        className={`w-full transition-all duration-300 border-b ${
          isDark 
            ? isScrolled 
              ? 'bg-slate-950/95 backdrop-blur-md border-slate-800 shadow-xl shadow-slate-950/40 py-2.5' 
              : 'bg-slate-950/90 backdrop-blur-sm border-slate-800/80 py-3.5'
            : isScrolled 
              ? 'bg-white/95 backdrop-blur-md border-slate-200 shadow-md shadow-slate-900/5 py-2.5' 
              : 'bg-white/90 backdrop-blur-sm border-slate-200 py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
          
          {/* Brand Logo & Name */}
          <a 
            href="#home" 
            onClick={(e) => scrollToSection(e, '#home')}
            className="flex items-center gap-3 group text-left focus:outline-none shrink-0"
            id="nav-brand-link"
          >
            <SchoolLogo size="md" className="group-hover:scale-105 transition-transform shrink-0" />
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className={`text-base sm:text-lg font-extrabold tracking-tight transition-colors ${
                  isDark 
                    ? 'text-white group-hover:text-amber-400' 
                    : 'text-slate-900 group-hover:text-amber-600'
                }`}>
                  SKM High School
                </span>
                <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[10px] font-semibold bg-amber-500/20 text-amber-600 dark:text-amber-300 border border-amber-500/30">
                  Kanodar
                </span>
              </div>
              <span className={`text-[11px] sm:text-xs font-medium ${isDark ? 'text-slate-300' : 'text-slate-500'}`}>
                Est. 1956 &bull; Sarvoday Kelavani Mandal
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  id={`nav-link-${link.id}`}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all duration-200 ${
                    isActive
                      ? isDark
                        ? 'text-amber-400 bg-amber-500/15 border border-amber-500/30 shadow-xs'
                        : 'text-amber-700 bg-amber-100/70 border border-amber-300 shadow-xs'
                      : isDark
                        ? 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </div>

          {/* Right Action CTAs: Theme Toggle + Admissions */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            
            {/* Theme Toggle Button */}
            <button
              onClick={onToggleTheme}
              id="header-theme-toggle-btn"
              className={`p-2 rounded-xl border transition-all cursor-pointer flex items-center gap-1.5 text-xs font-semibold ${
                isDark
                  ? 'bg-slate-900 hover:bg-slate-800 text-amber-400 border-slate-700 hover:border-amber-400/50'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-200'
              }`}
              title={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
              aria-label={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
            >
              {isDark ? (
                <>
                  <Sun className="w-4 h-4 text-amber-400 animate-spin-slow" />
                  <span className="hidden xl:inline text-xs font-bold text-slate-200">Light</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-indigo-600" />
                  <span className="hidden xl:inline text-xs font-bold text-slate-800">Dark</span>
                </>
              )}
            </button>

            {/* Apply for Admission (Gold Accent) */}
            <button
              onClick={onOpenAdmission}
              id="header-btn-apply"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 shadow-md shadow-amber-500/20 hover:shadow-amber-500/30 transition-all cursor-pointer active:scale-98"
            >
              <GraduationCap className="w-4 h-4 text-slate-950" />
              <span>Admissions 2026–27</span>
            </button>

            {/* Mobile Menu Hamburger */}
            <div className="flex lg:hidden items-center gap-1.5">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                id="mobile-menu-toggle-btn"
                className={`p-2 rounded-xl border transition-colors focus:outline-none ${
                  isDark
                    ? 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white'
                    : 'bg-slate-100 border-slate-200 text-slate-700 hover:text-slate-900'
                }`}
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className={`lg:hidden border-t px-4 pt-3 pb-6 space-y-3 shadow-2xl animate-in slide-in-from-top-2 duration-200 ${
            isDark ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200'
          }`}>
            <div className="grid grid-cols-1 gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium ${
                    activeSection === link.id
                      ? isDark 
                        ? 'bg-amber-500/15 text-amber-400 font-semibold' 
                        : 'bg-amber-100 text-amber-800 font-semibold'
                      : isDark
                        ? 'text-slate-300 hover:bg-slate-900 hover:text-white'
                        : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <span>{link.name}</span>
                  <ChevronRight className="w-4 h-4 opacity-50" />
                </a>
              ))}
            </div>

            <div className={`pt-3 border-t flex flex-col gap-2.5 ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmission();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold text-sm shadow-md"
              >
                <GraduationCap className="w-4 h-4" />
                <span>Apply for Admission (2026–27)</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenTour();
                }}
                className={`w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl text-xs font-semibold border ${
                  isDark 
                    ? 'bg-slate-900 text-slate-300 hover:text-white border-slate-800' 
                    : 'bg-slate-100 text-slate-700 hover:text-slate-900 border-slate-200'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5 text-amber-500" />
                <span>Watch Virtual Campus Tour</span>
              </button>

              <div className={`mt-2 pt-2 text-[11px] flex items-center justify-between ${
                isDark ? 'text-slate-400 border-t border-slate-900' : 'text-slate-500 border-t border-slate-100'
              }`}>
                <span className="flex items-center gap-1">
                  <Phone className="w-3 h-3 text-amber-500" /> {SCHOOL_INFO.phone}
                </span>
                <span className="flex items-center gap-1">
                  <Shield className="w-3 h-3 text-emerald-500" /> GSEB Affiliated
                </span>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
