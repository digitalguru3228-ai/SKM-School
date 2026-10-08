import React from 'react';
import { 
  ArrowUp, 
  ShieldCheck, 
  Phone, 
  Mail, 
  MapPin, 
  Globe, 
  Award, 
  ChevronRight,
  GraduationCap,
  Bell,
  Users,
  Trophy
} from 'lucide-react';
import { SchoolLogo } from './SchoolLogo';
import { SCHOOL_INFO } from '../data/schoolData';

interface FooterProps {
  theme?: 'light' | 'dark';
  onOpenAdmission: () => void;
}

export const Footer: React.FC<FooterProps> = ({ 
  theme = 'dark',
  onOpenAdmission 
}) => {
  const isDark = theme === 'dark';

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, href: string) => {
    e.preventDefault();
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
    <footer className={`border-t relative overflow-hidden transition-colors duration-300 ${
      isDark ? 'bg-slate-950 text-white border-slate-800/80' : 'bg-slate-900 text-slate-100 border-slate-800'
    }`}>
      
      {/* Top Gold Accent Line */}
      <div className="h-1 w-full bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative z-10">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 text-left pb-12 border-b border-slate-800">
          
          {/* Col 1: Brand & Trust Details (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <SchoolLogo size="lg" />
              <div>
                <h3 className="text-lg sm:text-xl font-extrabold text-white leading-tight">
                  SKM High School & Higher Secondary School
                </h3>
                <p className="text-xs font-semibold text-amber-400">
                  Kanodar, Gujarat &bull; Est. 1956
                </p>
                <p className="text-[11px] text-slate-400">
                  Managed by Sarvoday Kelavani Mandal, Kanodar
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed max-w-md pt-2">
              Empowering generations of students with academic distinction, moral integrity, scientific mindset, and vocational self-reliance for over 70 continuous years in Kanodar.
            </p>

            <div className="pt-2 flex flex-wrap gap-2 text-[11px]">
              <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                GSEB Board Affiliated (02.045 / 52.012)
              </span>
              <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-amber-300 font-semibold">
                70+ Years Legacy
              </span>
            </div>
          </div>

          {/* Col 2: Quick Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase font-bold tracking-wider text-amber-400">
              Institutional Sections
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <a href="#home" onClick={(e) => scrollToSection(e, '#home')} className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-amber-500" /> Home Overview
                </a>
              </li>
              <li>
                <a href="#announcements" onClick={(e) => scrollToSection(e, '#announcements')} className="hover:text-amber-400 transition-colors flex items-center gap-1.5 font-semibold text-amber-300">
                  <ChevronRight className="w-3 h-3 text-amber-500" /> Circulars & Announcements
                </a>
              </li>
              <li>
                <a href="#teachers" onClick={(e) => scrollToSection(e, '#teachers')} className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-amber-500" /> Teachers & Faculty Directory
                </a>
              </li>
              <li>
                <a href="#achievements" onClick={(e) => scrollToSection(e, '#achievements')} className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-amber-500" /> Awards & Achievements
                </a>
              </li>
              <li>
                <a href="#academics" onClick={(e) => scrollToSection(e, '#academics')} className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-amber-500" /> Academics & Streams
                </a>
              </li>
              <li>
                <a href="#facilities" onClick={(e) => scrollToSection(e, '#facilities')} className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-amber-500" /> Laboratories & Facilities
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Admissions & Campus Life (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs uppercase font-bold tracking-wider text-amber-400">
              Admissions & Life
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <button
                  onClick={() => onOpenAdmission()}
                  className="hover:text-amber-300 transition-colors cursor-pointer text-left font-bold text-amber-400 flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-amber-400" /> Apply for 2026–27
                </button>
              </li>
              <li>
                <a href="#legacy" onClick={(e) => scrollToSection(e, '#legacy')} className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-amber-500" /> History & Timeline
                </a>
              </li>
              <li>
                <a href="#management" onClick={(e) => scrollToSection(e, '#management')} className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-amber-500" /> Leadership Message
                </a>
              </li>
              <li>
                <a href="#gallery" onClick={(e) => scrollToSection(e, '#gallery')} className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-amber-500" /> Campus Life Gallery
                </a>
              </li>
              <li>
                <a href="#faq" onClick={(e) => scrollToSection(e, '#faq')} className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-amber-500" /> Frequent Questions
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Coordinates (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs uppercase font-bold tracking-wider text-amber-400">
              School Office
            </h4>
            
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>{SCHOOL_INFO.plusCode}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <a href={`tel:${SCHOOL_INFO.phone.replace(/\s+/g, '')}`} className="hover:text-white font-semibold">
                  {SCHOOL_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="text-amber-300/90 truncate">{SCHOOL_INFO.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>{SCHOOL_INFO.website}</span>
              </div>
            </div>

            <div className="pt-2">
              <p className="text-[11px] text-slate-400">
                Managed with pride by <span className="text-white font-medium">Sarvoday Kelavani Mandal</span>.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p className="text-center sm:text-left">
            Copyright &copy; 2026 Sarvoday Kelavani Mandal | SKM High School & Higher Secondary School, Kanodar. All Rights Reserved.
          </p>

          <div className="flex items-center gap-4">
            <a
              href="#admin"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/20 transition-colors font-medium text-xs cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Staff / CMS Portal</span>
            </a>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors cursor-pointer"
            >
              <ArrowUp className="w-3.5 h-3.5 text-amber-400" />
              <span>Back to top</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
