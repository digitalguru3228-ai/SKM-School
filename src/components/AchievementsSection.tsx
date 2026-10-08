import React, { useState, useMemo, useEffect } from 'react';
import { 
  Trophy, 
  Award, 
  Star, 
  GraduationCap, 
  Medal, 
  CheckCircle2, 
  Users, 
  TrendingUp,
  Atom,
  Compass
} from 'lucide-react';
import { ACHIEVEMENTS_DATA } from '../data/schoolData';
import { Achievement } from '../types';
import { api, ApiAchievement } from '../services/api';

interface AchievementsSectionProps {
  theme?: 'light' | 'dark';
}

export const AchievementsSection: React.FC<AchievementsSectionProps> = ({ theme = 'dark' }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [liveAchievements, setLiveAchievements] = useState<ApiAchievement[]>([]);

  useEffect(() => {
    let isMounted = true;
    const fetchAchievements = async () => {
      try {
        const data = await api.getPublicAchievements();
        if (isMounted && data && data.length > 0) {
          setLiveAchievements(data);
        }
      } catch (err) {
        console.warn('Using static fallback for achievements:', err);
      }
    };
    fetchAchievements();
    return () => { isMounted = false; };
  }, []);

  const categories = [
    { id: 'all', label: 'All Honors' },
    { id: 'board', label: 'Board Merit & 100% Results' },
    { id: 'science', label: 'Science & Innovation' },
    { id: 'scouts', label: 'Bharat Scouts & Guides' },
    { id: 'sports', label: 'Athletics & Sports' },
    { id: 'alumni', label: 'Alumni Hall of Fame' },
  ];

  const combinedList = useMemo(() => {
    if (liveAchievements.length > 0) {
      return liveAchievements.map(a => ({
        id: a.id,
        title: a.title,
        category: a.category,
        year: a.year,
        badge: a.badge,
        awardee: a.awardee,
        metric: a.metric || undefined,
        description: a.description
      }));
    }
    return ACHIEVEMENTS_DATA;
  }, [liveAchievements]);

  const filteredAchievements = useMemo(() => {
    if (selectedCategory === 'all') return combinedList;
    return combinedList.filter((a) => a.category === selectedCategory);
  }, [combinedList, selectedCategory]);

  const isDark = theme === 'dark';

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'board': return <GraduationCap className="w-5 h-5" />;
      case 'science': return <Atom className="w-5 h-5" />;
      case 'scouts': return <Compass className="w-5 h-5" />;
      case 'sports': return <Trophy className="w-5 h-5" />;
      case 'alumni': return <Users className="w-5 h-5" />;
      default: return <Award className="w-5 h-5" />;
    }
  };

  return (
    <section 
      id="achievements" 
      className={`py-20 relative transition-colors duration-300 ${
        isDark ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'
      }`}
    >
      {/* Background glow effects */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Trophy className="w-3.5 h-3.5" />
            <span>Honors, Accolades & Milestones</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Our Achievements & Distinctions
          </h2>
          <p className={`mt-3 text-sm sm:text-base leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            Celebrating academic toppers, science innovators, national scout awardees, district sports champions, and our inspiring 70-year legacy.
          </p>
        </div>

        {/* Top Highlight Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
          
          <div className={`p-5 rounded-2xl border transition-transform hover:-translate-y-1 ${
            isDark ? 'bg-slate-950/80 border-slate-800' : 'bg-slate-50 border-slate-200 shadow-sm'
          }`}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-500 flex items-center justify-center font-bold">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-amber-500 dark:text-amber-400">98.4%</p>
                <p className={`text-xs font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>HSC Board Pass Rate</p>
              </div>
            </div>
            <p className={`mt-2.5 text-[11px] font-medium ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Top ranking center in Banaskantha District
            </p>
          </div>

          <div className={`p-5 rounded-2xl border transition-transform hover:-translate-y-1 ${
            isDark ? 'bg-slate-950/80 border-slate-800' : 'bg-slate-50 border-slate-200 shadow-sm'
          }`}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-500 flex items-center justify-center font-bold">
                <Star className="w-5 h-5" />
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-blue-500 dark:text-blue-400">99.85 PR</p>
                <p className={`text-xs font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>State Science Rank</p>
              </div>
            </div>
            <p className={`mt-2.5 text-[11px] font-medium ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Multiple 100/100 scores in Physics & Maths
            </p>
          </div>

          <div className={`p-5 rounded-2xl border transition-transform hover:-translate-y-1 ${
            isDark ? 'bg-slate-950/80 border-slate-800' : 'bg-slate-50 border-slate-200 shadow-sm'
          }`}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-500 flex items-center justify-center font-bold">
                <Medal className="w-5 h-5" />
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-emerald-500 dark:text-emerald-400">14 Cadets</p>
                <p className={`text-xs font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Rajya Puraskar Awards</p>
              </div>
            </div>
            <p className={`mt-2.5 text-[11px] font-medium ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Governor felicitated Bharat Scouts & Guides
            </p>
          </div>

          <div className={`p-5 rounded-2xl border transition-transform hover:-translate-y-1 ${
            isDark ? 'bg-slate-950/80 border-slate-800' : 'bg-slate-50 border-slate-200 shadow-sm'
          }`}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-500 flex items-center justify-center font-bold">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-purple-500 dark:text-purple-400">25,000+</p>
                <p className={`text-xs font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Global Alumni</p>
              </div>
            </div>
            <p className={`mt-2.5 text-[11px] font-medium ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Doctors, Engineers & Civil Leaders worldwide
            </p>
          </div>

        </div>

        {/* Filter Pills */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                    : isDark
                      ? 'bg-slate-950/80 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Achievements Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAchievements.map((item) => {
            return (
              <div
                key={item.id}
                className={`flex flex-col justify-between p-6 rounded-2xl border transition-all duration-300 group hover:-translate-y-1 ${
                  isDark
                    ? 'bg-slate-950/80 border-slate-800 hover:border-amber-500/50 shadow-xl shadow-slate-950/40'
                    : 'bg-white border-slate-200 hover:border-amber-500/50 shadow-sm hover:shadow-md'
                }`}
              >
                <div>
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/15 text-amber-500 dark:text-amber-300 border border-amber-500/30">
                      {getCategoryIcon(item.category)}
                      <span>{item.badge}</span>
                    </span>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                      isDark ? 'bg-slate-900 text-slate-400' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {item.year}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className={`text-base sm:text-lg font-bold leading-snug mb-2 group-hover:text-amber-500 transition-colors ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}>
                    {item.title}
                  </h3>

                  {/* Awardee & Metric Pill */}
                  <div className={`p-3 rounded-xl border mb-3 flex items-center justify-between ${
                    isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                  }`}>
                    <div>
                      <p className={`text-[10px] uppercase font-bold tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                        Honoree / Batch:
                      </p>
                      <p className={`text-xs font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                        {item.awardee}
                      </p>
                    </div>
                    {item.metric && (
                      <span className="px-2.5 py-1 rounded-lg text-xs font-extrabold bg-amber-500 text-slate-950 shadow-sm">
                        {item.metric}
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    {item.description}
                  </p>
                </div>

                {/* Card Footer */}
                <div className={`pt-4 mt-4 border-t flex items-center justify-between text-[11px] font-medium ${
                  isDark ? 'border-slate-800 text-slate-400' : 'border-slate-100 text-slate-500'
                }`}>
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Official Record</span>
                  </span>
                  <span>Sarvoday Kelavani Mandal</span>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
