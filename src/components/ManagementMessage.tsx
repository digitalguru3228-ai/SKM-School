import React, { useState, useEffect } from 'react';
import { Quote, HeartHandshake, Award, ShieldCheck, Sparkles, Building } from 'lucide-react';
import { MANAGEMENT_LEADERSHIP, SCHOOL_INFO } from '../data/schoolData';
import { SchoolLogo } from './SchoolLogo';
import { IMAGES } from '../assets';
import { api, ApiSettings } from '../services/api';

interface ManagementMessageProps {
  theme?: 'light' | 'dark';
}

export const ManagementMessage: React.FC<ManagementMessageProps> = ({ theme = 'dark' }) => {
  const isDark = theme === 'dark';
  const [settings, setSettings] = useState<ApiSettings | null>(null);

  useEffect(() => {
    api.getPublicSettings()
      .then(data => {
        if (data) setSettings(data);
      })
      .catch(() => {});
  }, []);

  const presidentName = settings?.president_name || MANAGEMENT_LEADERSHIP.presidentName;
  const presidentRole = settings?.president_role || MANAGEMENT_LEADERSHIP.presidentRole;
  const quote = settings?.president_quote || MANAGEMENT_LEADERSHIP.quote;
  const message = settings?.president_message || MANAGEMENT_LEADERSHIP.fullMessage;
  const trustName = settings?.trust_name || SCHOOL_INFO.trustName;

  return (
    <section 
      id="management" 
      className={`py-20 relative overflow-hidden transition-colors duration-300 ${
        isDark ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'
      }`}
    >
      {/* Background patterns */}
      <div className={`absolute inset-0 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none ${
        isDark ? 'opacity-10' : 'opacity-15'
      }`} />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-800 dark:text-amber-300 text-xs font-bold uppercase tracking-wider mb-3">
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>Leadership & Vision</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-950 dark:text-white">
            Message from {trustName}
          </h2>
          <p className={`mt-3 text-sm sm:text-base leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            Guiding educational empowerment in Kanodar since {settings?.est_year || '1956'} through selfless community service, philanthropy, and modern values.
          </p>
        </div>

        {/* Management Card */}
        <div className={`border rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl relative overflow-hidden ${
          isDark 
            ? 'bg-slate-950/80 border-amber-500/30 text-white' 
            : 'bg-slate-50 border-slate-200 text-slate-900 shadow-slate-900/5'
        }`}>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left: President & Trust Profile Column */}
            <div className="lg:col-span-4 flex flex-col items-center text-center">
              
              <div className="relative mb-5 group">
                {/* Decorative border rings */}
                <div className="absolute -inset-2 bg-gradient-to-tr from-amber-500 to-amber-300 rounded-2xl opacity-75 blur-sm group-hover:opacity-100 transition-opacity" />
                
                <div className="relative w-48 h-56 sm:w-56 sm:h-64 rounded-2xl overflow-hidden bg-slate-800 border-2 border-amber-400/90 shadow-xl">
                  <img 
                    src={IMAGES.president} 
                    alt={`President ${presidentName}`} 
                    className="w-full h-full object-cover object-top"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent opacity-80" />
                  
                  <div className="absolute bottom-2.5 left-2 right-2 text-center">
                    <span className="text-[11px] uppercase font-bold tracking-wider bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 px-3 py-0.5 rounded-full shadow-md">
                      President &bull; SKM Trust
                    </span>
                  </div>
                </div>
              </div>

              <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-950'}`}>
                {presidentName}
              </h3>
              <p className="text-xs text-amber-700 dark:text-amber-400 font-bold mt-1">
                {presidentRole}
              </p>
              <p className={`text-xs mt-0.5 font-medium ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                {trustName}
              </p>

              {/* Trust Badge */}
              <div className={`mt-4 pt-4 border-t w-full flex items-center justify-center gap-2 text-xs font-semibold ${
                isDark ? 'border-slate-800 text-slate-300' : 'border-slate-200 text-slate-700'
              }`}>
                <ShieldCheck className="w-4 h-4 text-amber-600 dark:text-amber-500" />
                <span>Registered Trust &bull; Est. May 28, {settings?.est_year || '1956'}</span>
              </div>
            </div>

            {/* Right: Message Content */}
            <div className="lg:col-span-8 flex flex-col justify-between space-y-6 text-left">
              
              {/* Highlight Quote Block with Amber Accent Line */}
              <div className="relative pl-6 border-l-4 border-amber-500 py-2">
                <Quote className="w-8 h-8 text-amber-500/40 absolute -top-3 -left-2 -z-10" />
                <p className={`text-lg sm:text-xl md:text-2xl font-bold italic leading-snug ${
                  isDark ? 'text-amber-100' : 'text-amber-950'
                }`}>
                  "{quote}"
                </p>
              </div>

              {/* Body Text */}
              <p className={`text-sm sm:text-base leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                {message}
              </p>

              {/* Benefactors & Historic Patrons Recognition Strip */}
              <div className={`pt-4 border-t ${isDark ? 'border-slate-800/80' : 'border-slate-200'}`}>
                <p className={`text-xs uppercase font-bold tracking-wider mb-3 flex items-center gap-1.5 ${
                  isDark ? 'text-slate-400' : 'text-slate-700'
                }`}>
                  <Award className="w-3.5 h-3.5 text-amber-600 dark:text-amber-500" />
                  Key Benefactors & Community Pillar Memorials
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className={`p-3.5 rounded-xl border ${
                    isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-2xs'
                  }`}>
                    <p className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-950'}`}>Late Mamjibhai A. Mukhi</p>
                    <p className="text-[11px] text-amber-700 dark:text-amber-400/90 font-semibold">First 1956 Class Home</p>
                  </div>
                  <div className={`p-3.5 rounded-xl border ${
                    isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-2xs'
                  }`}>
                    <p className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-950'}`}>Dawoodi Bohra Welfare Trust</p>
                    <p className="text-[11px] text-amber-700 dark:text-amber-400/90 font-semibold">Science Wing & Infrastructure</p>
                  </div>
                  <div className={`p-3.5 rounded-xl border ${
                    isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-2xs'
                  }`}>
                    <p className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-950'}`}>R.K. Palasara Pariwar</p>
                    <p className="text-[11px] text-amber-700 dark:text-amber-400/90 font-semibold">A.N. Musa Computer Centre</p>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

