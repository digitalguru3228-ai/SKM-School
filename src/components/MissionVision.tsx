import React from 'react';
import { Globe, Heart, Compass, Sparkles, Check, Target, Users, Shield } from 'lucide-react';

interface MissionVisionProps {
  theme?: 'light' | 'dark';
}

export const MissionVision: React.FC<MissionVisionProps> = ({ theme = 'dark' }) => {
  const pillars = [
    {
      id: 'global-readiness',
      title: 'Global Readiness',
      subtitle: 'Technical & STEM Competence',
      description: 'Equipping Kanodar youth with high-speed digital literacy, Python & IT fundamentals in the A.N. Musa Computer Centre, scientific laboratory proficiency, and English communication to excel in nationwide competitive examinations (NEET, JEE, GUJCET, GPSC).',
      points: [
        'Advanced computer laboratories with Gigabit LAN connectivity.',
        'Early STEM exploration and interactive science fairs.',
        'English speaking, digital literacy, and modern coding exposure.'
      ],
      icon: Globe,
      accentColor: 'from-amber-400 to-amber-600',
      tag: 'Pillar 01'
    },
    {
      id: 'women-empowerment',
      title: 'Women Empowerment',
      subtitle: 'Accessible & Specialized Learning',
      description: 'Pioneering inclusive education with dedicated Home Science laboratories, specialized scholarships from Dawoodi Bohra Welfare Trust & R.K. Palasara Pariwar, and an atmosphere prioritizing female student security, leadership, and higher educational attainment.',
      points: [
        'Dedicated Home Science practical kitchen & textile training lab.',
        'Special merit awards and fee assistance for girl scholars.',
        'Strong participation in Scout-Guide, cultural, and sports programs.'
      ],
      icon: Heart,
      accentColor: 'from-amber-500 to-amber-700',
      tag: 'Pillar 02'
    },
    {
      id: 'self-reliance',
      title: 'Self-Reliance (Sarvoday)',
      subtitle: 'Character, Ethics & Vocational Skills',
      description: 'Rooted in the foundational ethos of Sarvoday Kelavani Mandal since 1956. We foster physical vigor through sports, civic responsibility via NSS, disciplined leadership via Bharat Scouts, and vocational skills through electrical/technical workshops.',
      points: [
        'Hands-on electrical workshop and practical trade fundamentals.',
        'Active Bharat Scouts & Guides and National Service Scheme (NSS).',
        'Ethical character building, debate clubs, and community service.'
      ],
      icon: Compass,
      accentColor: 'from-amber-400 to-amber-500',
      tag: 'Pillar 03'
    }
  ];

  const isDark = theme === 'dark';

  return (
    <section 
      id="mission" 
      className={`py-20 relative overflow-hidden transition-colors duration-300 ${
        isDark ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-900'
      }`}
    >
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-500 dark:text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Target className="w-3.5 h-3.5" />
            <span>Ethos & Three Pillars</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Our Mission & Core Values
          </h2>
          <p className={`mt-3 text-sm sm:text-base leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            Nurturing young minds through balanced intellectual rigor, community service, gender equity, and lifelong self-reliance.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar) => {
            const IconComponent = pillar.icon;
            return (
              <div 
                key={pillar.id}
                className={`rounded-3xl p-8 border flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 group text-left ${
                  isDark 
                    ? 'bg-slate-950/70 border-slate-800 hover:border-amber-500/40 shadow-xl shadow-slate-950/40' 
                    : 'bg-white border-slate-200 hover:border-amber-500/40 shadow-sm hover:shadow-md'
                }`}
              >
                <div>
                  {/* Top Badge & Icon */}
                  <div className="flex items-center justify-between gap-2 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 shadow-md group-hover:scale-110 transition-transform">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-amber-500/15 text-amber-500 dark:text-amber-300 border border-amber-500/30">
                      {pillar.tag}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className={`text-xl font-bold transition-colors ${
                    isDark ? 'text-white group-hover:text-amber-300' : 'text-slate-900 group-hover:text-amber-600'
                  }`}>
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-amber-500 dark:text-amber-400/90 font-semibold mt-0.5 mb-3">
                    {pillar.subtitle}
                  </p>

                  {/* Description */}
                  <p className={`text-xs sm:text-sm leading-relaxed mb-6 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    {pillar.description}
                  </p>
                </div>

                {/* Key Bullet Points */}
                <div className={`pt-4 border-t ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
                  <ul className="space-y-2.5">
                    {pillar.points.map((point, idx) => (
                      <li key={idx} className={`flex items-start gap-2 text-xs leading-normal ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                        <Check className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
