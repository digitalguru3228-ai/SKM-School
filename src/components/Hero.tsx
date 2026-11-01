import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  PlayCircle, 
  ArrowRight, 
  Award, 
  Building2, 
  CheckCircle2, 
  Sparkles,
  Users,
  Compass,
  Cpu,
  BookOpen,
  Bell,
  ShieldCheck
} from 'lucide-react';
import { SCHOOL_INFO } from '../data/schoolData';
import { IMAGES } from '../assets';
import { api, ApiSettings } from '../services/api';

interface HeroProps {
  theme?: 'light' | 'dark';
  onOpenTour: () => void;
  onOpenAdmission: () => void;
}

export const Hero: React.FC<HeroProps> = ({ 
  theme = 'dark',
  onOpenTour, 
  onOpenAdmission
}) => {
  const isDark = theme === 'dark';
  const [settings, setSettings] = useState<ApiSettings | null>(null);

  useEffect(() => {
    api.getPublicSettings()
      .then(data => {
        if (data) setSettings(data);
      })
      .catch(() => {});
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offsetTop = element.offsetTop - 85;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  const estYear = settings?.est_year || SCHOOL_INFO.establishedYear || '1956';
  const trustName = settings?.trust_name || SCHOOL_INFO.trustName || 'Sarvoday Kelavani Mandal, Kanodar';
  const headline = settings?.hero_headline || 'Empowering Minds, Shaping Futures Since 1956';
  const subheadline = settings?.hero_subheadline || 'Providing quality, value-centric, and modern education in Kanodar across Secondary, Higher Secondary Science, and Technical & Vocational Streams.';

  return (
    <section 
      id="home" 
      className={`relative min-h-[85vh] flex items-center justify-center overflow-hidden transition-colors duration-300 pt-8 sm:pt-12 pb-16 sm:pb-24 ${
        isDark 
          ? 'bg-slate-950 text-white' 
          : 'bg-gradient-to-b from-slate-100/90 via-white to-slate-50 text-slate-900'
      }`}
    >
      {/* Background Graphic Grid & Ambient Glows */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Campus Background with Overlay */}
        <div 
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
            isDark ? 'opacity-20 mix-blend-luminosity scale-105' : 'opacity-10 scale-105'
          }`}
          style={{
            backgroundImage: `url('${IMAGES.building}')`
          }}
        />
        
        {/* Gradient Overlays */}
        <div className={`absolute inset-0 ${
          isDark 
            ? 'bg-gradient-to-b from-slate-950/95 via-slate-950/85 to-slate-950' 
            : 'bg-gradient-to-b from-slate-50/95 via-white/85 to-slate-50'
        }`} />

        {/* Ambient Dot Matrix */}
        <div className={`absolute inset-0 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:28px_28px] ${
          isDark ? 'opacity-15' : 'opacity-20'
        }`} />
        
        {/* Ambient colored lighting spheres */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-80 sm:w-[28rem] h-80 sm:h-[28rem] bg-amber-500/15 rounded-full blur-3xl pointer-events-none animate-pulse-subtle" />
        <div className="absolute bottom-1/3 right-1/4 w-80 sm:w-[32rem] h-80 sm:h-[32rem] bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Hero Content */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-5 sm:space-y-6">
            
            {/* Prestige Badge */}
            <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border shadow-md backdrop-blur-md animate-scale-in ${
              isDark 
                ? 'bg-slate-900/90 border-amber-500/40 text-amber-300 shadow-amber-500/10' 
                : 'bg-white border-amber-500/40 text-amber-900 shadow-amber-500/10'
            }`}>
              <span className="flex h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider">
                Est. {estYear} &bull; {trustName}
              </span>
            </div>

            {/* Main Headline with Clamp Typography */}
            <h1 className={`text-[clamp(2rem,4.5vw,3.75rem)] font-extrabold tracking-tight leading-[1.12] ${
              isDark ? 'text-white' : 'text-slate-950'
            }`}>
              {headline}
            </h1>

            {/* Subheadline */}
            <p className={`text-sm sm:text-base md:text-lg font-normal leading-relaxed max-w-2xl ${
              isDark ? 'text-slate-300' : 'text-slate-700'
            }`}>
              {subheadline}
            </p>

            {/* Trust Badges Bar */}
            <div className={`flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm pt-1 ${
              isDark ? 'text-slate-300' : 'text-slate-800'
            }`}>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                <span className="font-semibold">GSEB Board Center {settings?.gseb_center_code ? `(${settings.gseb_center_code})` : ''}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                <span className="font-semibold">A.N. Musa Computer Centre</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                <span className="font-semibold">Modern Science & Physics Labs</span>
              </div>
            </div>

            {/* CTA Group with Touch Targets */}
            <div className="flex flex-wrap items-center gap-3 pt-2 w-full sm:w-auto">
              {/* Primary Button */}
              <button
                onClick={() => scrollToSection('announcements')}
                id="hero-btn-announcements"
                className="shimmer-btn touch-target w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 transition-all cursor-pointer transform hover:-translate-y-0.5 active:scale-95"
              >
                <Bell className="w-4 h-4" />
                <span>View Announcements</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Secondary Button: Video Tour */}
              <button
                onClick={onOpenTour}
                id="hero-btn-video-tour"
                className={`touch-target w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-bold text-sm border shadow-sm transition-all cursor-pointer transform hover:-translate-y-0.5 active:scale-95 ${
                  isDark 
                    ? 'bg-slate-900/90 hover:bg-slate-800 text-slate-200 border-slate-700/80 hover:border-amber-400/50 hover:text-white' 
                    : 'bg-white hover:bg-slate-50 text-slate-900 border-slate-300 hover:border-amber-500'
                }`}
              >
                <PlayCircle className="w-4 h-4 text-amber-500" />
                <span>Watch Campus Tour</span>
              </button>

              {/* Tertiary: Quick Apply */}
              <button
                onClick={onOpenAdmission}
                id="hero-btn-quick-apply"
                className={`touch-target w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-bold text-sm transition-all cursor-pointer active:scale-95 ${
                  isDark 
                    ? 'text-amber-300 hover:text-amber-200 hover:bg-white/5 border border-amber-500/20' 
                    : 'text-amber-900 hover:text-amber-950 bg-amber-50/80 hover:bg-amber-100/90 border border-amber-200 shadow-xs'
                }`}
              >
                <GraduationCap className="w-4 h-4 text-amber-500" />
                <span>Admissions {settings?.academic_year || '2026–27'}</span>
              </button>
            </div>

          </div>

          {/* Right Column: Floating Glassmorphism Cards & Visual Showcase */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0">
            
            {/* Main Visual Image Card with Glass Border */}
            <div className={`relative rounded-3xl overflow-hidden border p-2 shadow-2xl backdrop-blur-xl ${
              isDark 
                ? 'border-amber-500/30 bg-slate-900/60 shadow-slate-950/70' 
                : 'border-slate-200 bg-white/90 shadow-xl'
            }`}>
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] group">
                <img 
                  src={IMAGES.building} 
                  alt="SKM High School & Higher Secondary School Main Campus Building Kanodar" 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                
                <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-slate-950/85 backdrop-blur-md border border-white/10 text-left">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-amber-400 uppercase tracking-wide">
                        Main Campus & Laboratories
                      </p>
                      <p className="text-sm font-semibold text-white">
                        {settings?.school_name || 'SKM High School, Kanodar'}
                      </p>
                    </div>
                    <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      GSEB Center
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Stat Card 1: 70+ Years with smooth subtle float */}
            <div className={`hidden sm:flex absolute -top-6 -left-6 p-4 rounded-2xl border shadow-xl backdrop-blur-md items-center gap-3.5 max-w-xs animate-float-subtle ${
              isDark 
                ? 'bg-slate-900/95 border-amber-500/40 text-white shadow-slate-950/60' 
                : 'bg-white/95 border-slate-200 text-slate-900 shadow-md'
            }`}>
              <div className="w-11 h-11 rounded-xl bg-amber-500/20 flex items-center justify-center border border-amber-500/30 shrink-0">
                <Award className="w-6 h-6 text-amber-500" />
              </div>
              <div className="text-left">
                <p className="text-base font-extrabold leading-tight text-slate-900 dark:text-white tabular-nums">70+ Years</p>
                <p className={`text-xs font-semibold ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>Academic Excellence in Kanodar</p>
              </div>
            </div>

            {/* Floating Stat Card 2: 100% Board Center with smooth subtle float */}
            <div className={`hidden sm:flex absolute -bottom-6 -right-4 p-4 rounded-2xl border shadow-xl backdrop-blur-md items-center gap-3.5 max-w-xs animate-float-reverse ${
              isDark 
                ? 'bg-slate-900/95 border-amber-500/40 text-white shadow-slate-950/60' 
                : 'bg-white/95 border-slate-200 text-slate-900 shadow-md'
            }`}>
              <div className="w-11 h-11 rounded-xl bg-blue-500/20 flex items-center justify-center border border-blue-500/30 shrink-0">
                <Building2 className="w-6 h-6 text-blue-500" />
              </div>
              <div className="text-left">
                <p className="text-base font-extrabold leading-tight text-slate-900 dark:text-white">Board Exam Center</p>
                <p className={`text-xs font-semibold ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>Regional GSEB Assessment Hub</p>
              </div>
            </div>

          </div>

        </div>

        {/* 4 Bottom Key Metrics Grid - Interactive Card Elevates with Tabular Numbers */}
        <div className="mt-12 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5 text-left">
          
          <div className={`interactive-card p-4 sm:p-5 rounded-2xl border backdrop-blur-sm ${
            isDark 
              ? 'bg-slate-900/70 border-slate-800 hover:border-amber-500/40' 
              : 'bg-white border-slate-200 hover:border-amber-500/40 shadow-xs hover:shadow-md'
          }`}>
            <div className="flex items-center gap-3">
              <div className="p-2 sm:p-2.5 rounded-xl bg-amber-500/10 text-amber-500 shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <p className={`text-xl sm:text-2xl md:text-3xl font-extrabold tabular-nums ${isDark ? 'text-white' : 'text-slate-950'}`}>
                  {settings?.hero_stat_1_val || estYear}
                </p>
                <p className={`text-[11px] sm:text-xs font-bold ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  {settings?.hero_stat_1_label || 'Year Established'}
                </p>
              </div>
            </div>
            <p className={`mt-2 text-[11px] sm:text-xs font-medium truncate ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              {settings?.hero_stat_1_sub || `Founded by ${trustName}`}
            </p>
          </div>

          <div className={`interactive-card p-4 sm:p-5 rounded-2xl border backdrop-blur-sm ${
            isDark 
              ? 'bg-slate-900/70 border-slate-800 hover:border-amber-500/40' 
              : 'bg-white border-slate-200 hover:border-amber-500/40 shadow-xs hover:shadow-md'
          }`}>
            <div className="flex items-center gap-3">
              <div className="p-2 sm:p-2.5 rounded-xl bg-amber-500/10 text-amber-500 shrink-0">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <p className={`text-xl sm:text-2xl md:text-3xl font-extrabold tabular-nums ${isDark ? 'text-white' : 'text-slate-950'}`}>
                  {settings?.hero_stat_2_val || '3 Streams'}
                </p>
                <p className={`text-[11px] sm:text-xs font-bold ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  {settings?.hero_stat_2_label || 'Secondary & HS'}
                </p>
              </div>
            </div>
            <p className={`mt-2 text-[11px] sm:text-xs font-medium truncate ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              {settings?.hero_stat_2_sub || 'Science, General & Vocational'}
            </p>
          </div>

          <div className={`interactive-card p-4 sm:p-5 rounded-2xl border backdrop-blur-sm ${
            isDark 
              ? 'bg-slate-900/70 border-slate-800 hover:border-amber-500/40' 
              : 'bg-white border-slate-200 hover:border-amber-500/40 shadow-xs hover:shadow-md'
          }`}>
            <div className="flex items-center gap-3">
              <div className="p-2 sm:p-2.5 rounded-xl bg-amber-500/10 text-amber-500 shrink-0">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <p className={`text-xl sm:text-2xl md:text-3xl font-extrabold tabular-nums ${isDark ? 'text-white' : 'text-slate-950'}`}>
                  {settings?.hero_stat_3_val || '80+ PCs'}
                </p>
                <p className={`text-[11px] sm:text-xs font-bold ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  {settings?.hero_stat_3_label || 'A.N. Musa Lab'}
                </p>
              </div>
            </div>
            <p className={`mt-2 text-[11px] sm:text-xs font-medium truncate ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              {settings?.hero_stat_3_sub || 'Gigabit High-Speed LAN'}
            </p>
          </div>

          <div className={`interactive-card p-4 sm:p-5 rounded-2xl border backdrop-blur-sm ${
            isDark 
              ? 'bg-slate-900/70 border-slate-800 hover:border-amber-500/40' 
              : 'bg-white border-slate-200 hover:border-amber-500/40 shadow-xs hover:shadow-md'
          }`}>
            <div className="flex items-center gap-3">
              <div className="p-2 sm:p-2.5 rounded-xl bg-amber-500/10 text-amber-500 shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <p className={`text-xl sm:text-2xl md:text-3xl font-extrabold tabular-nums ${isDark ? 'text-white' : 'text-slate-950'}`}>
                  {settings?.hero_stat_4_val || '25k+'}
                </p>
                <p className={`text-[11px] sm:text-xs font-bold ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  {settings?.hero_stat_4_label || 'Alumni Worldwide'}
                </p>
              </div>
            </div>
            <p className={`mt-2 text-[11px] sm:text-xs font-medium truncate ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              {settings?.hero_stat_4_sub || 'Medicine, Tech & Civic Leaders'}
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
