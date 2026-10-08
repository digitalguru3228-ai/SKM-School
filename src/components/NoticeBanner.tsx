import React, { useState, useEffect } from 'react';
import { Bell, ChevronRight, X, ArrowRight } from 'lucide-react';
import { ANNOUNCEMENTS } from '../data/schoolData';
import { api, ApiAnnouncement } from '../services/api';

interface NoticeBannerProps {
  theme?: 'light' | 'dark';
}

export const NoticeBanner: React.FC<NoticeBannerProps> = ({ theme = 'dark' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [liveNotices, setLiveNotices] = useState<ApiAnnouncement[]>([]);

  useEffect(() => {
    let isMounted = true;
    const fetchTicker = async () => {
      try {
        const data = await api.getPublicAnnouncements();
        if (isMounted && data && data.length > 0) {
          setLiveNotices(data);
        }
      } catch (err) {
        console.warn('Notice banner using fallback:', err);
      }
    };
    fetchTicker();
    return () => { isMounted = false; };
  }, []);

  if (!isVisible) return null;

  const notices = liveNotices.length > 0 
    ? liveNotices.map(n => ({ title: n.title, category: n.category }))
    : ANNOUNCEMENTS;

  const currentNotice = notices[currentIndex % notices.length] || { title: 'Welcome to SKM High School Kanodar', category: 'Notice' };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % notices.length);
  };

  const scrollToAnnouncements = () => {
    const el = document.getElementById('announcements');
    if (el) {
      const offsetTop = el.offsetTop - 85;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  const isDark = theme === 'dark';

  return (
    <aside 
      aria-label="Official School Announcements" 
      className={`text-xs py-2 px-4 relative z-50 border-b transition-colors duration-200 ${
        isDark 
          ? 'bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950/80 text-slate-100 border-amber-500/20' 
          : 'bg-gradient-to-r from-slate-900 via-amber-900 to-slate-900 text-white border-amber-600/30 shadow-xs'
      }`}
    >
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        
        {/* Left: Live Ticker Indicator */}
        <div className="flex items-center gap-2.5 shrink-0">
          <span className="flex items-center gap-1.5 bg-amber-500/20 text-amber-300 font-bold px-2.5 py-0.5 rounded-full border border-amber-500/30 tracking-wide uppercase text-[10px]">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping"></span>
            <Bell className="w-3 h-3 text-amber-400" />
            Live Bulletin
          </span>
          <span className="hidden sm:inline-block text-slate-400">|</span>
          <span className="hidden md:inline-block text-amber-200/90 font-medium">
            Sarvoday Kelavani Mandal, Kanodar
          </span>
        </div>

        {/* Center: Cycling Announcement */}
        <div className="flex-1 min-w-[240px] flex items-center justify-start sm:justify-center gap-2 overflow-hidden">
          <span className="bg-amber-500 text-slate-950 font-bold px-1.5 py-0.5 rounded text-[10px] uppercase shrink-0">
            {currentNotice.category}
          </span>
          <button
            onClick={scrollToAnnouncements}
            className="text-left truncate hover:text-amber-300 transition-colors font-medium cursor-pointer text-xs group flex items-center gap-1"
            title={currentNotice.title}
          >
            <span className="truncate">{currentNotice.title}</span>
            <ChevronRight className="w-3 h-3 opacity-70 group-hover:translate-x-0.5 transition-transform shrink-0 text-amber-400" />
          </button>
        </div>

        {/* Right: Quick actions */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handleNext}
            className="text-[11px] text-amber-400/90 hover:text-amber-300 flex items-center gap-1 font-medium transition-colors cursor-pointer"
          >
            <span>Next ({currentIndex + 1}/{notices.length})</span>
          </button>

          <button
            onClick={scrollToAnnouncements}
            className="hidden lg:flex items-center gap-1 text-slate-200 hover:text-white transition-colors bg-white/10 hover:bg-white/20 px-2 py-0.5 rounded border border-white/10 text-[11px] font-semibold"
          >
            <span>All Circulars</span>
            <ArrowRight className="w-3 h-3 text-amber-400" />
          </button>

          <button
            onClick={() => setIsVisible(false)}
            className="text-slate-400 hover:text-white p-0.5 transition-colors cursor-pointer"
            aria-label="Close announcement bar"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </aside>
  );
};
