import React, { useState, useEffect } from 'react';
import { Bell, ChevronRight, X, ArrowRight, Volume2 } from 'lucide-react';
import { ANNOUNCEMENTS } from '../data/schoolData';
import { api, ApiAnnouncement } from '../services/api';

interface NoticeBannerProps {
  theme?: 'light' | 'dark';
}

export const NoticeBanner: React.FC<NoticeBannerProps> = ({ theme = 'dark' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [liveNotices, setLiveNotices] = useState<ApiAnnouncement[]>([]);
  const [isTransitioning, setIsTransitioning] = useState(false);

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

  // Auto rotate bulletin every 6 seconds
  useEffect(() => {
    if (!isVisible) return;
    const timer = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex(prev => (prev + 1) % (liveNotices.length > 0 ? liveNotices.length : ANNOUNCEMENTS.length));
        setIsTransitioning(false);
      }, 200);
    }, 6000);
    return () => clearInterval(timer);
  }, [isVisible, liveNotices]);

  if (!isVisible) return null;

  const notices = liveNotices.length > 0 
    ? liveNotices.map(n => ({ title: n.title, category: n.category }))
    : ANNOUNCEMENTS;

  const currentNotice = notices[currentIndex % notices.length] || { title: 'Welcome to SKM High School Kanodar', category: 'Notice' };

  const handleNext = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % notices.length);
      setIsTransitioning(false);
    }, 150);
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
      className={`text-xs py-1.5 sm:py-2 px-3 sm:px-4 relative z-50 border-b transition-colors duration-200 ${
        isDark 
          ? 'bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950/80 text-slate-100 border-amber-500/20' 
          : 'bg-gradient-to-r from-slate-900 via-amber-950 to-slate-900 text-white border-amber-600/30 shadow-xs'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-3">
        
        {/* Left: Live Ticker Indicator */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="flex items-center gap-1.5 bg-amber-500/20 text-amber-300 font-bold px-2 sm:px-2.5 py-0.5 rounded-full border border-amber-500/30 tracking-wider uppercase text-[10px]">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping"></span>
            <Bell className="w-3 h-3 text-amber-400" />
            <span className="hidden xs:inline">Live Bulletin</span>
          </span>
          <span className="hidden md:inline-block text-slate-400">|</span>
          <span className="hidden md:inline-block text-amber-200/90 font-medium text-[11px]">
            Sarvoday Kelavani Mandal
          </span>
        </div>

        {/* Center: Cycling Announcement with smooth fade transition */}
        <div className="flex-1 min-w-0 flex items-center justify-start sm:justify-center gap-2 overflow-hidden px-1">
          <span className="bg-amber-500 text-slate-950 font-bold px-1.5 py-0.5 rounded text-[10px] uppercase shrink-0">
            {currentNotice.category}
          </span>
          <button
            onClick={scrollToAnnouncements}
            className={`text-left truncate hover:text-amber-300 transition-all font-medium cursor-pointer text-xs group flex items-center gap-1 min-w-0 ${
              isTransitioning ? 'opacity-0 -translate-y-1' : 'opacity-100 translate-y-0'
            }`}
            title={currentNotice.title}
          >
            <span className="truncate">{currentNotice.title}</span>
            <ChevronRight className="w-3 h-3 opacity-70 group-hover:translate-x-0.5 transition-transform shrink-0 text-amber-400" />
          </button>
        </div>

        {/* Right: Quick actions */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          <button
            onClick={handleNext}
            className="touch-target text-[11px] text-amber-300/90 hover:text-amber-200 px-2 py-1 rounded hover:bg-white/10 font-medium transition-colors cursor-pointer"
            title="Next Announcement"
            aria-label="Next Announcement"
          >
            <span>{currentIndex + 1}/{notices.length}</span>
          </button>

          <button
            onClick={scrollToAnnouncements}
            className="hidden lg:flex items-center gap-1 text-slate-200 hover:text-white transition-colors bg-white/10 hover:bg-white/20 px-2.5 py-1 rounded-lg border border-white/10 text-[11px] font-semibold"
          >
            <span>All Circulars</span>
            <ArrowRight className="w-3 h-3 text-amber-400" />
          </button>

          <button
            onClick={() => setIsVisible(false)}
            className="touch-target text-slate-400 hover:text-white p-1 rounded hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Dismiss bulletin bar"
            title="Dismiss bulletin"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </aside>
  );
};
