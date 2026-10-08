import React, { useState, useEffect } from 'react';
import { 
  History, 
  Calendar, 
  ChevronDown, 
  ChevronUp, 
  Building, 
  GraduationCap, 
  Award, 
  Wrench, 
  Cpu, 
  Sparkles, 
  Check, 
  BookOpen, 
  ArrowRight, 
  Filter
} from 'lucide-react';
import { TIMELINE_MILESTONES } from '../data/schoolData';
import { api, ApiMilestone } from '../services/api';

interface LegacyTimelineProps {
  theme?: 'light' | 'dark';
}

export const LegacyTimeline: React.FC<LegacyTimelineProps> = ({ theme = 'dark' }) => {
  const [milestones, setMilestones] = useState<any[]>(TIMELINE_MILESTONES);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>('m1');

  useEffect(() => {
    api.getPublicMilestones()
      .then((data: ApiMilestone[]) => {
        if (data && data.length > 0) {
          setMilestones(data);
        }
      })
      .catch(() => {});
  }, []);

  const filteredMilestones = selectedCategory === 'all' 
    ? milestones 
    : milestones.filter(m => m.category === selectedCategory);

  const getCategoryIcon = (iconName?: string) => {
    switch (iconName) {
      case 'GraduationCap': return <GraduationCap className="w-5 h-5" />;
      case 'Building': return <Building className="w-5 h-5" />;
      case 'Award': return <Award className="w-5 h-5" />;
      case 'Wrench': return <Wrench className="w-5 h-5" />;
      case 'Cpu': return <Cpu className="w-5 h-5" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5" />;
      default: return <Calendar className="w-5 h-5" />;
    }
  };

  const categories = [
    { id: 'all', label: 'Complete 70-Year Journey' },
    { id: 'founding', label: '1956 Founding' },
    { id: 'expansion', label: 'Campus Expansions' },
    { id: 'stream', label: 'Science & Higher Secondary' },
    { id: 'modernization', label: '21st Century Digital' },
  ];

  const isDark = theme === 'dark';

  return (
    <section 
      id="legacy" 
      className={`py-20 relative overflow-hidden transition-colors duration-300 ${
        isDark ? 'bg-slate-950 text-white' : 'bg-slate-100/80 text-slate-900'
      }`}
    >
      {/* Background decoration */}
      <div className={`absolute inset-0 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none ${
        isDark ? 'opacity-10' : 'opacity-15'
      }`} />
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-800 dark:text-amber-300 text-xs font-bold uppercase tracking-wider mb-3">
            <History className="w-3.5 h-3.5" />
            <span>Institutional Heritage & Legacy</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-950 dark:text-white">
            Seven Decades of Educational Transformation
          </h2>
          <p className={`mt-4 text-sm sm:text-base leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            From humble classes in a patron’s home in 1956 to a premier modern multi-stream secondary institution in Kanodar, Gujarat.
          </p>

          {/* Interactive Filter Pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs transition-all duration-200 cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30 scale-105 font-bold'
                    : isDark
                      ? 'bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800'
                      : 'bg-white text-slate-800 hover:bg-slate-200 border border-slate-300 shadow-2xs font-semibold'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Vertical Timeline Container */}
        <div className="relative max-w-4xl mx-auto pt-6">
          
          {/* Vertical Connecting Central Line */}
          <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-1 -translate-x-1/2 bg-gradient-to-b from-amber-500 via-amber-400 to-amber-600 rounded-full shadow-[0_0_12px_rgba(245,158,11,0.5)] z-0" />

          {/* Timeline Milestones Loop */}
          <div className="space-y-10 relative z-10">
            {filteredMilestones.map((milestone, index) => {
              const isEven = index % 2 === 0;
              const isExpanded = expandedId === milestone.id;

              return (
                <div 
                  key={milestone.id} 
                  className={`relative flex flex-col md:flex-row items-start ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  
                  {/* Timeline Central Node (Icon Pin) */}
                  <div className={`absolute left-6 md:left-1/2 -translate-x-1/2 flex items-center justify-center w-12 h-12 rounded-2xl border-2 border-amber-500 text-amber-600 dark:text-amber-400 shadow-xl shadow-amber-500/20 z-20 transition-transform duration-300 hover:scale-110 ${
                    isDark ? 'bg-slate-950' : 'bg-white shadow-md'
                  }`}>
                    {getCategoryIcon(milestone.iconName || milestone.icon)}
                  </div>

                  {/* Spacer for Desktop alternating alignment */}
                  <div className="hidden md:block md:w-1/2" />

                  {/* Timeline Card */}
                  <div className="ml-14 md:ml-0 md:w-1/2 md:px-8 w-[calc(100%-3.5rem)]">
                    <div 
                      className={`p-6 rounded-2xl border transition-all duration-300 text-left ${
                        isExpanded 
                          ? isDark
                            ? 'bg-slate-900/95 border-amber-400/80 shadow-2xl shadow-amber-500/10'
                            : 'bg-white border-amber-600 shadow-lg'
                          : isDark
                            ? 'bg-slate-900/70 border-slate-800 hover:border-slate-700 hover:bg-slate-900/90'
                            : 'bg-white border-slate-200 hover:border-amber-300 shadow-2xs hover:shadow-sm'
                      }`}
                    >
                      {/* Year & Badge Header */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-amber-600 text-white font-mono shadow-xs">
                          {milestone.period}
                        </span>
                        <span className={`text-[11px] font-bold uppercase tracking-wider ${
                          isDark ? 'text-amber-300/80' : 'text-amber-800'
                        }`}>
                          {milestone.category}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className={`text-lg sm:text-xl font-bold leading-snug ${isDark ? 'text-white' : 'text-slate-950'}`}>
                        {milestone.title}
                      </h3>

                      {/* Highlight Subtitle */}
                      <p className="text-xs font-bold text-amber-700 dark:text-amber-400 mt-1">
                        {milestone.highlight}
                      </p>

                      {/* Summary */}
                      <p className={`mt-3 text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        {milestone.description}
                      </p>

                      {/* Expandable Deep Archive Details */}
                      {isExpanded && (
                        <div className={`mt-4 pt-4 border-t space-y-3 animate-in fade-in duration-300 ${
                          isDark ? 'border-slate-800' : 'border-slate-200'
                        }`}>
                          {(milestone.image_url || milestone.image) && (
                            <div className="relative rounded-xl overflow-hidden aspect-[16/9] mb-3 border border-slate-700/50">
                              <img 
                                src={milestone.image_url || milestone.image} 
                                alt={milestone.title} 
                                className="w-full h-full object-cover"
                                referrerPolicy="no-referrer"
                              />
                            </div>
                          )}

                          {milestone.details && milestone.details.length > 0 && (
                            <>
                              <p className={`text-xs font-bold uppercase tracking-wide ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                                Historical Archives & Records:
                              </p>
                              <ul className="space-y-2">
                                {milestone.details.map((detail: string, idx: number) => (
                                  <li key={idx} className={`flex items-start gap-2 text-xs font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                                    <Check className="w-3.5 h-3.5 text-amber-600 dark:text-amber-500 shrink-0 mt-0.5" />
                                    <span>{detail}</span>
                                  </li>
                                ))}
                              </ul>
                            </>
                          )}
                        </div>
                      )}

                      {/* Toggle Expand Button */}
                      <button
                        onClick={() => setExpandedId(isExpanded ? null : milestone.id)}
                        className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 dark:text-amber-400 hover:text-amber-800 transition-colors cursor-pointer"
                      >
                        <span>{isExpanded ? 'Show Less' : 'View Archive Details'}</span>
                        {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </button>

                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>

        {/* Bottom Historic Quote Banner */}
        <div className={`mt-16 max-w-3xl mx-auto p-5 rounded-2xl border text-center ${
          isDark 
            ? 'bg-gradient-to-r from-amber-500/10 via-slate-900 to-amber-500/10 border-amber-500/30' 
            : 'bg-white border-amber-300 shadow-sm'
        }`}>
          <p className={`text-sm sm:text-base font-semibold italic ${isDark ? 'text-amber-200' : 'text-amber-900'}`}>
            "A tree planted on May 28, 1956 with genuine community love today shelters thousands of scholars across the globe."
          </p>
          <p className={`text-xs font-bold mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            — Sarvoday Kelavani Mandal Historical Chronicle
          </p>
        </div>

      </div>
    </section>
  );
};
