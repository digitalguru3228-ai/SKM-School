import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Monitor, 
  Library, 
  FlaskConical, 
  Utensils, 
  Trophy, 
  ShieldCheck, 
  CheckCircle2, 
  X, 
  Sparkles, 
  ChevronRight,
  ExternalLink,
  Layers
} from 'lucide-react';
import { FACILITIES } from '../data/schoolData';
import { api, ApiFacility } from '../services/api';

interface FacilitiesSectionProps {
  theme?: 'light' | 'dark';
}

export const FacilitiesSection: React.FC<FacilitiesSectionProps> = ({ theme = 'dark' }) => {
  const [facilities, setFacilities] = useState<any[]>(FACILITIES);
  const [activeFacilityModal, setActiveFacilityModal] = useState<any | null>(null);

  useEffect(() => {
    api.getPublicFacilities()
      .then((data: ApiFacility[]) => {
        if (data && data.length > 0) {
          setFacilities(data);
        }
      })
      .catch(() => {});
  }, []);

  const getFacilityIcon = (iconName?: string) => {
    switch (iconName) {
      case 'Monitor': return <Monitor className="w-5 h-5" />;
      case 'Library': return <Library className="w-5 h-5" />;
      case 'FlaskConical': return <FlaskConical className="w-5 h-5" />;
      case 'Utensils': return <Utensils className="w-5 h-5" />;
      case 'Trophy': return <Trophy className="w-5 h-5" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5" />;
      default: return <Building2 className="w-5 h-5" />;
    }
  };

  const isDark = theme === 'dark';

  return (
    <section 
      id="facilities" 
      className={`py-20 relative overflow-hidden transition-colors duration-300 ${
        isDark ? 'bg-slate-950 text-white' : 'bg-slate-100/80 text-slate-900'
      }`}
    >
      {/* Background radial effects */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-800 dark:text-amber-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Building2 className="w-3.5 h-3.5" />
            <span>Infrastructure & Learning Spaces</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-950 dark:text-white">
            World-Class Campus Facilities
          </h2>
          <p className={`mt-3 text-sm sm:text-base leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            Engineered to empower modern learning, experimental curiosity, digital mastery, and holistic student wellness.
          </p>
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {facilities.map((facility) => {
            const imgSrc = facility.image_url || facility.image;
            return (
              <div 
                key={facility.id}
                onClick={() => setActiveFacilityModal(facility)}
                className={`border rounded-2xl overflow-hidden shadow-md transition-all duration-300 hover:-translate-y-1.5 flex flex-col group cursor-pointer text-left ${
                  isDark 
                    ? 'bg-slate-900/80 border-slate-800 hover:border-amber-500/50 shadow-slate-950/40' 
                    : 'bg-white border-slate-200 hover:border-amber-500 shadow-xs hover:shadow-md'
                }`}
              >
                {/* Facility Image with Tag */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                  {imgSrc ? (
                    <img 
                      src={imgSrc} 
                      alt={facility.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-500 bg-slate-800">
                      <Building2 className="w-12 h-12 text-slate-600" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  
                  {/* Top Badge */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-950/85 backdrop-blur-md text-[11px] font-bold text-amber-300 border border-white/10">
                    {getFacilityIcon(facility.icon)}
                    <span>{facility.tag || 'Facility'}</span>
                  </div>

                  {/* Bottom Stats Overlay */}
                  <div className="absolute bottom-2.5 left-3 right-3">
                    <span className="text-[11px] font-bold text-slate-100 bg-slate-950/90 px-2 py-0.5 rounded border border-white/10">
                      {facility.stats}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className={`text-lg font-bold transition-colors leading-snug ${
                      isDark ? 'text-white group-hover:text-amber-400' : 'text-slate-950 group-hover:text-amber-700'
                    }`}>
                      {facility.title}
                    </h3>
                    <p className={`text-xs font-semibold mt-0.5 mb-2 ${isDark ? 'text-amber-400' : 'text-amber-700'}`}>
                      {facility.subtitle || facility.tag}
                    </p>
                    <p className={`text-xs sm:text-sm line-clamp-3 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                      {facility.description}
                    </p>
                  </div>

                  {/* Features List snippet */}
                  <div className={`pt-3 border-t flex items-center justify-between text-xs font-semibold ${
                    isDark ? 'border-slate-800 text-amber-400 group-hover:text-amber-300' : 'border-slate-200 text-amber-800 group-hover:text-amber-900'
                  }`}>
                    <span>Explore Key Specifications</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Deep Facility Detail Modal */}
        {activeFacilityModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
            <div className={`border rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto text-left ${
              isDark 
                ? 'bg-slate-900 border-amber-500/40 text-white' 
                : 'bg-white border-slate-200 text-slate-900'
            }`}>
              
              {/* Close Button */}
              <button 
                onClick={() => setActiveFacilityModal(null)}
                className={`absolute top-5 right-5 p-2 rounded-full transition-colors cursor-pointer ${
                  isDark ? 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700' : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                }`}
                aria-label="Close Facility Modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Image */}
              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-6 border border-slate-700">
                {(activeFacilityModal.image_url || activeFacilityModal.image) ? (
                  <img 
                    src={activeFacilityModal.image_url || activeFacilityModal.image} 
                    alt={activeFacilityModal.title} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-slate-800 text-slate-500">
                    <Building2 className="w-12 h-12" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />
                
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                  <span className="px-3 py-1 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs">
                    {activeFacilityModal.tag}
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-slate-900/90 text-amber-300 font-semibold text-xs border border-amber-500/30">
                    {activeFacilityModal.stats}
                  </span>
                </div>
              </div>

              {/* Title & Subtitle */}
              <h3 className={`text-2xl font-extrabold ${isDark ? 'text-white' : 'text-slate-950'}`}>
                {activeFacilityModal.title}
              </h3>
              <p className="text-sm font-bold text-amber-700 dark:text-amber-400 mt-1 mb-4">
                {activeFacilityModal.subtitle || activeFacilityModal.tag}
              </p>

              {/* Detailed Description */}
              <p className={`text-sm leading-relaxed mb-6 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                {activeFacilityModal.description}
              </p>

              {/* Feature Checklist */}
              {((activeFacilityModal.key_features && activeFacilityModal.key_features.length > 0) || (activeFacilityModal.features && activeFacilityModal.features.length > 0)) && (
                <div className={`p-4 rounded-2xl border ${
                  isDark ? 'bg-slate-950/80 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}>
                  <h4 className={`text-xs uppercase font-bold tracking-wider mb-3 flex items-center gap-1.5 ${
                    isDark ? 'text-slate-400' : 'text-slate-700'
                  }`}>
                    <CheckCircle2 className="w-4 h-4 text-amber-600 dark:text-amber-500" />
                    Key Campus Infrastructure Features
                  </h4>
                  <ul className="space-y-2.5">
                    {(activeFacilityModal.key_features || activeFacilityModal.features || []).map((feat: string, idx: number) => (
                      <li key={idx} className={`flex items-start gap-2.5 text-xs sm:text-sm font-medium ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Modal footer action */}
              <div className="mt-6 flex items-center justify-end">
                <button
                  onClick={() => setActiveFacilityModal(null)}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold text-xs hover:from-amber-300 hover:to-amber-400 transition-all cursor-pointer shadow-md"
                >
                  Close Specification
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
