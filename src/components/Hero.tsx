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
  Trophy
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
      className={`relative min-h-[85vh] flex items-center justify-center overflow-hidden transition-colors duration-300 pt-10 pb-20 ${
        isDark 
          ? 'bg-slate-950 text-white' 
          : 'bg-gradient-to-b from-slate-100 via-white to-slate-50 text-slate-900'
      }`}
    >
      {/* Background Graphic Grid & Ambient Glows */}
      <div className="absolute inset-0 z-0">
        {/* Campus Background with Overlay */}
        <div 
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ${
            isDark ? 'opacity-25 mix-blend-luminosity scale-105' : 'opacity-10 scale-105'
          }`}
          style={{
            backgroundImage: `url('${IMAGES.building}')`
          }}
        />
        
        {/* Gradient Overlays */}
        <div className={`absolute inset-0 ${
          isDark 
            ? 'bg-gradient-to-b from-slate-950/90 via-slate-950/80 to-slate-950' 
            : 'bg-gradient-to-b from-slate-50/90 via-white/80 to-slate-50'
        }`} />

        <div className={`absolute inset-0 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:32px_32px] ${
          isDark ? 'opacity-15' : 'opacity-25'
        }`} />
        
        {/* Ambient colored lighting spheres */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/4 w-[28rem] h-[28rem] bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Hero Content */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
            
            {/* Prestige Badge */}
            <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border shadow-lg backdrop-blur-md ${
              isDark 
                ? 'bg-slate-900/90 border-amber-500/40 text-amber-300 shadow-amber-500/10' 
                : 'bg-white border-amber-500/50 text-amber-900 shadow-sm'
            }`}>
              <span className="flex h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider">
                Est. {estYear} &bull; {trustName}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.14] ${
              isDark ? 'text-white' : 'text-slate-950'
            }`}>
              {headline}
            </h1>

            {/* Subheadline */}
            <p className={`text-base sm:text-lg md:text-xl font-normal leading-relaxed max-w-2xl ${
              isDark ? 'text-slate-300' : 'text-slate-700'
            }`}>
              {subheadline}
            </p>

            {/* Trust Badges Bar */}
            <div className={`flex flex-wrap items-center gap-4 text-xs sm:text-sm pt-1 ${
              isDark ? 'text-slate-300' : 'text-slate-800'
            }`}>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-amber-600 dark:text-amber-500 shrink-0" />
                <span className="font-semibold">GSEB Board Center {settings?.gseb_center_code ? `(${settings.gseb_center_code})` : ''}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-amber-600 dark:text-amber-500 shrink-0" />
                <span className="font-semibold">A.N. Musa Computer Centre</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-amber-600 dark:text-amber-500 shrink-0" />
                <span className="font-semibold">Home Science & Physics Labs</span>
              </div>
            </div>

            {/* CTA Group */}
            <div className="flex flex-wrap items-center gap-3.5 pt-3 w-full sm:w-auto">
              {/* Primary Button */}
              <button
                onClick={() => scrollToSection('announcements')}
                id="hero-btn-announcements"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 transition-all cursor-pointer transform hover:-translate-y-0.5"
              >
                <Bell className="w-4 h-4" />
                <span>View Announcements</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Secondary Button: Video Tour */}
              <button
                onClick={onOpenTour}
                id="hero-btn-video-tour"
                className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-bold text-sm border shadow-md transition-all cursor-pointer transform hover:-translate-y-0.5 ${
                  isDark 
                    ? 'bg-slate-900/80 hover:bg-slate-800 text-slate-200 border-slate-700/80 hover:border-amber-400/50 hover:text-white' 
                    : 'bg-white hover:bg-slate-50 text-slate-900 border-slate-300 hover:border-amber-500'
                }`}
              >
                <PlayCircle className="w-4 h-4 text-amber-600 dark:text-amber-500" />
                <span>Watch Campus Tour</span>
              </button>

              {/* Tertiary: Quick Apply */}
              <button
                onClick={onOpenAdmission}
                id="hero-btn-quick-apply"
                className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-bold text-sm transition-all cursor-pointer ${
                  isDark 
                    ? 'text-amber-300 hover:text-amber-200 hover:bg-white/5' 
                    : 'text-amber-800 hover:text-amber-900 bg-amber-50 hover:bg-amber-100/80 border border-amber-200'
                }`}
              >
                <GraduationCap className="w-4 h-4" />
                <span>Admissions {settings?.academic_year || '2026–27'}</span>
              </button>
            </div>

          </div>

          {/* Right Column: Floating Glassmorphism Cards & Visual Showcase */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0">
            
            {/* Main Visual Image Card with Glass Border */}
            <div className={`relative rounded-2xl overflow-hidden border p-2 shadow-2xl backdrop-blur-xl ${
              isDark 
                ? 'border-amber-500/30 bg-slate-900/60 shadow-slate-950/60' 
                : 'border-slate-200 bg-white/90 shadow-xl'
            }`}>
              <div className="relative rounded-xl overflow-hidden aspect-[4/3]">
                <img 
                  src={IMAGES.building} 
                  alt="SKM High School & Higher Secondary School Main Campus Building Kanodar" 
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
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
                    <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-medium">
                      GSEB Verified
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Stat Card 1: 70+ Years */}
            <div className={`sm:absolute -top-6 -left-6 mt-4 sm:mt-0 p-4 rounded-2xl border shadow-xl backdrop-blur-md flex items-center gap-3.5 max-w-xs transform hover:-translate-y-1 transition-transform ${
              isDark 
                ? 'bg-slate-900/90 border-amber-500/40 text-white shadow-slate-950/50' 
                : 'bg-white border-slate-200 text-slate-900 shadow-md'
            }`}>
              <div className="w-11 h-11 rounded-xl bg-amber-500/20 flex items-center justify-center border border-amber-500/30 shrink-0">
                <Award className="w-6 h-6 text-amber-600 dark:text-amber-500" />
              </div>
              <div className="text-left">
                <p className="text-base font-extrabold leading-tight text-slate-900 dark:text-white">70+ Years</p>
                <p className={`text-xs font-semibold ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>Academic Excellence in Kanodar</p>
              </div>
            </div>

            {/* Floating Stat Card 2: 100% Board Center */}
            <div className={`sm:absolute -bottom-6 -right-4 mt-4 sm:mt-0 p-4 rounded-2xl border shadow-xl backdrop-blur-md flex items-center gap-3.5 max-w-xs transform hover:-translate-y-1 transition-transform ${
              isDark 
                ? 'bg-slate-900/90 border-amber-500/40 text-white shadow-slate-950/50' 
                : 'bg-white border-slate-200 text-slate-900 shadow-md'
            }`}>
              <div className="w-11 h-11 rounded-xl bg-blue-500/20 flex items-center justify-center border border-blue-500/30 shrink-0">
                <Building2 className="w-6 h-6 text-blue-600 dark:text-blue-500" />
              </div>
              <div className="text-left">
                <p className="text-base font-extrabold leading-tight text-slate-900 dark:text-white">Board Exam Center</p>
                <p className={`text-xs font-semibold ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>Regional GSEB Assessment Hub</p>
              </div>
            </div>

          </div>

        </div>

        {/* 4 Bottom Key Metrics Grid - Dynamic & Controlled by Admin Settings */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-left">
          
          <div className={`p-5 rounded-2xl border transition-colors backdrop-blur-sm ${
            isDark 
              ? 'bg-slate-900/70 border-slate-800 hover:border-amber-500/40' 
              : 'bg-white border-slate-200 hover:border-amber-500/50 shadow-xs'
          }`}>
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-500">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <p className={`text-2xl sm:text-3xl font-extrabold ${isDark ? 'text-white' : 'text-slate-950'}`}>
                  {settings?.hero_stat_1_val || estYear}
                </p>
                <p className={`text-xs font-bold ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  {settings?.hero_stat_1_label || 'Year Established'}
                </p>
              </div>
            </div>
            <p className={`mt-2 text-xs font-medium ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              {settings?.hero_stat_1_sub || `Founded by ${trustName}`}
            </p>
          </div>

          <div className={`p-5 rounded-2xl border transition-colors backdrop-blur-sm ${
            isDark 
              ? 'bg-slate-900/70 border-slate-800 hover:border-amber-500/40' 
              : 'bg-white border-slate-200 hover:border-amber-500/50 shadow-xs'
          }`}>
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-500">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <p className={`text-2xl sm:text-3xl font-extrabold ${isDark ? 'text-white' : 'text-slate-950'}`}>
                  {settings?.hero_stat_2_val || '3 Streams'}
                </p>
                <p className={`text-xs font-bold ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  {settings?.hero_stat_2_label || 'Secondary & Higher Secondary'}
                </p>
              </div>
            </div>
            <p className={`mt-2 text-xs font-medium ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              {settings?.hero_stat_2_sub || 'Science, General & Vocational'}
            </p>
          </div>

          <div className={`p-5 rounded-2xl border transition-colors backdrop-blur-sm ${
            isDark 
              ? 'bg-slate-900/70 border-slate-800 hover:border-amber-500/40' 
              : 'bg-white border-slate-200 hover:border-amber-500/50 shadow-xs'
          }`}>
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-500">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <p className={`text-2xl sm:text-3xl font-extrabold ${isDark ? 'text-white' : 'text-slate-950'}`}>
                  {settings?.hero_stat_3_val || '80+ PCs'}
                </p>
                <p className={`text-xs font-bold ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  {settings?.hero_stat_3_label || 'A.N. Musa Computer Lab'}
                </p>
              </div>
            </div>
            <p className={`mt-2 text-xs font-medium ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              {settings?.hero_stat_3_sub || 'High-Speed Gigabit LAN Connectivity'}
            </p>
          </div>

          <div className={`p-5 rounded-2xl border transition-colors backdrop-blur-sm ${
            isDark 
              ? 'bg-slate-900/70 border-slate-800 hover:border-amber-500/40' 
              : 'bg-white border-slate-200 hover:border-amber-500/50 shadow-xs'
          }`}>
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-500">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <p className={`text-2xl sm:text-3xl font-extrabold ${isDark ? 'text-white' : 'text-slate-950'}`}>
                  {settings?.hero_stat_4_val || '25k+'}
                </p>
                <p className={`text-xs font-bold ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  {settings?.hero_stat_4_label || 'Global Alumni Network'}
                </p>
              </div>
            </div>
            <p className={`mt-2 text-xs font-medium ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              {settings?.hero_stat_4_sub || 'Leaders in Medicine, Tech & Business'}
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};

