import React, { useState, useMemo, useEffect } from 'react';
import { 
  Users, 
  Award, 
  Mail, 
  Search, 
  CheckCircle2,
  X,
  Sparkles,
  BookOpen,
  GraduationCap
} from 'lucide-react';
import { TEACHERS_DATA } from '../data/schoolData';
import { Teacher } from '../types';
import { api, ApiStaff } from '../services/api';

interface TeachersSectionProps {
  theme?: 'light' | 'dark';
}

export const TeachersSection: React.FC<TeachersSectionProps> = ({ theme = 'dark' }) => {
  const [selectedDept, setSelectedDept] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);
  const [liveStaff, setLiveStaff] = useState<ApiStaff[] | null>(null);

  useEffect(() => {
    let isMounted = true;
    const fetchStaff = async () => {
      try {
        const data = await api.getPublicStaff();
        if (isMounted) {
          setLiveStaff(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        console.warn('Using static fallback for teachers:', err);
      }
    };
    fetchStaff();

    const handleDataUpdate = () => {
      fetchStaff();
    };
    window.addEventListener('focus', handleDataUpdate);
    window.addEventListener('skm_staff_updated', handleDataUpdate);
    window.addEventListener('storage', handleDataUpdate);

    return () => {
      isMounted = false;
      window.removeEventListener('focus', handleDataUpdate);
      window.removeEventListener('skm_staff_updated', handleDataUpdate);
      window.removeEventListener('storage', handleDataUpdate);
    };
  }, []);

  const deptFilters = [
    { id: 'all', label: 'All Faculty' },
    { id: 'administration', label: 'Leadership & Admin' },
    { id: 'science', label: 'Science & Labs' },
    { id: 'commerce', label: 'Commerce & General' },
    { id: 'secondary', label: 'Secondary Section' },
    { id: 'vocational', label: 'Vocational & IT' },
    { id: 'sports', label: 'Physical Training & Scouts' },
  ];

  const teachersList = useMemo(() => {
    if (liveStaff !== null) {
      return liveStaff.map(s => {
        let parsedSubjects: string[] = [];
        try {
          parsedSubjects = typeof s.subjects === 'string' ? JSON.parse(s.subjects) : (s.subjects || []);
        } catch {
          parsedSubjects = s.subjects ? [s.subjects as any] : [];
        }

        return {
          id: s.id,
          name: s.name,
          role: s.role,
          designation: s.designation,
          department: s.department as any,
          qualifications: s.qualifications,
          experienceYears: s.experience_years,
          subjects: parsedSubjects,
          achievements: s.achievements || undefined,
          email: s.email || undefined,
          phone: s.phone || undefined,
          avatarColor: s.avatar_color || 'from-amber-500 to-amber-700',
          isLead: s.is_lead
        };
      });
    }
    return TEACHERS_DATA;
  }, [liveStaff]);

  const filteredTeachers = useMemo(() => {
    return teachersList.filter((teacher) => {
      const matchesDept = selectedDept === 'all' || teacher.department === selectedDept;
      const matchesQuery = 
        teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        teacher.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        teacher.subjects.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
        teacher.qualifications.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesDept && matchesQuery;
    });
  }, [teachersList, selectedDept, searchQuery]);

  const handleCopyEmail = (email?: string) => {
    if (email && navigator.clipboard) {
      navigator.clipboard.writeText(email);
      setCopiedEmail(email);
      setTimeout(() => setCopiedEmail(null), 2000);
    }
  };

  const isDark = theme === 'dark';

  return (
    <section 
      id="teachers" 
      className={`py-16 sm:py-24 relative transition-colors duration-300 ${
        isDark ? 'bg-slate-950 text-white' : 'bg-slate-100/80 text-slate-900'
      }`}
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Users className="w-3.5 h-3.5" />
            <span>Dedicated Mentors & Academic Leaders</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Teachers & Faculty Directory
          </h2>
          <p className={`mt-3 text-sm sm:text-base leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            Meet our distinguished educators, senior lecturers, laboratory demonstrators, and vocational trainers committed to academic excellence and moral character.
          </p>
        </div>

        {/* Filter Controls & Search */}
        <div className={`p-3.5 sm:p-5 rounded-2xl border mb-8 sm:mb-10 backdrop-blur-md ${
          isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3.5 sm:gap-4">
            
            {/* Department Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 lg:pb-0 scrollbar-none snap-x">
              {deptFilters.map((filter) => {
                const isActive = selectedDept === filter.id;
                return (
                  <button
                    key={filter.id}
                    onClick={() => setSelectedDept(filter.id)}
                    className={`touch-target px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer snap-start active:scale-95 ${
                      isActive
                        ? 'bg-amber-500 text-slate-950 font-extrabold shadow-md shadow-amber-500/20'
                        : isDark
                          ? 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700/60'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                    }`}
                  >
                    {filter.label}
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="relative min-w-[240px] sm:min-w-[280px]">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search teacher, subject, qualification..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-10 pr-9 py-2.5 text-xs rounded-xl border focus:outline-none transition-all ${
                  isDark
                    ? 'bg-slate-950 border-slate-700 text-white placeholder-slate-500 focus:border-amber-400'
                    : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 focus:border-amber-500 focus:bg-white'
                }`}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 p-0.5 cursor-pointer"
                  title="Clear Search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

          </div>

          {/* Active stats bar */}
          <div className="mt-3 pt-3 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>
              Showing <strong className="text-amber-500">{filteredTeachers.length}</strong> of {teachersList.length} Faculty Members
            </span>
            {(selectedDept !== 'all' || searchQuery) && (
              <button
                onClick={() => {
                  setSelectedDept('all');
                  setSearchQuery('');
                }}
                className="text-amber-600 dark:text-amber-400 hover:underline font-semibold cursor-pointer"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* Faculty Grid */}
        {filteredTeachers.length === 0 ? (
          <div className={`text-center py-16 px-4 rounded-3xl border ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'
          }`}>
            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500">
              <Users className="w-7 h-7" />
            </div>
            <h3 className={`text-base font-bold mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              No Faculty Members Found
            </h3>
            <p className={`text-xs max-w-md mx-auto ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              No faculty profiles match the selected department or search filter. Try clearing your search or switching categories.
            </p>
            {(selectedDept !== 'all' || searchQuery) && (
              <button
                onClick={() => {
                  setSelectedDept('all');
                  setSearchQuery('');
                }}
                className="mt-4 px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 text-slate-950 hover:bg-amber-400 transition-all cursor-pointer shadow-md"
              >
                Reset Filters
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {filteredTeachers.map((teacher) => {
              const isPrincipalOrLead = teacher.isLead;
              return (
                <div
                  key={teacher.id}
                  className={`interactive-card flex flex-col justify-between p-5 sm:p-6 rounded-2xl border transition-all duration-300 group ${
                    isDark
                      ? 'bg-slate-900/80 border-slate-800 hover:border-amber-500/50 shadow-xl shadow-slate-950/40'
                      : 'bg-white border-slate-200 hover:border-amber-500/50 shadow-xs hover:shadow-md'
                  }`}
                >
                  <div>
                    {/* Top Profile Header */}
                    <div className="flex items-start gap-3.5 mb-4">
                      
                      {/* Stylized Avatar Pill */}
                      <div className={`w-13 h-13 rounded-2xl bg-gradient-to-br ${teacher.avatarColor || 'from-amber-500 to-amber-700'} flex items-center justify-center text-white font-extrabold text-base shadow-md shrink-0 border border-white/20`}>
                        {teacher.name.split(' ').map(n => n[0]).filter(Boolean).slice(0, 2).join('')}
                      </div>

                      {/* Name & Role */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap mb-1">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                            teacher.department === 'administration' 
                              ? 'bg-amber-500 text-slate-950' 
                              : teacher.department === 'science'
                                ? 'bg-blue-500/20 text-blue-600 dark:text-blue-300 border border-blue-500/30'
                                : teacher.department === 'commerce'
                                  ? 'bg-purple-500/20 text-purple-600 dark:text-purple-300 border border-purple-500/30'
                                  : 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 border border-emerald-500/30'
                          }`}>
                            {teacher.designation}
                          </span>
                          {isPrincipalOrLead && (
                            <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-500/20 text-amber-500 dark:text-amber-300 border border-amber-500/40">
                              HOD / Lead
                            </span>
                          )}
                        </div>
                        <h3 className={`text-base sm:text-lg font-bold leading-tight truncate group-hover:text-amber-500 transition-colors ${
                          isDark ? 'text-white' : 'text-slate-900'
                        }`}>
                          {teacher.name}
                        </h3>
                        <p className={`text-xs font-medium truncate mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                          {teacher.role}
                        </p>
                      </div>

                    </div>

                    {/* Credentials & Experience */}
                    <div className={`p-3 rounded-xl border mb-3.5 space-y-1.5 text-xs ${
                      isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                    }`}>
                      <div className="flex items-center justify-between">
                        <span className={`font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Experience:</span>
                        <span className="font-bold text-amber-500 dark:text-amber-400 tabular-nums">{teacher.experienceYears}</span>
                      </div>
                      <div className="flex items-start justify-between gap-2">
                        <span className={`font-medium shrink-0 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Qualifications:</span>
                        <span className={`font-semibold text-right text-[11px] ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                          {teacher.qualifications}
                        </span>
                      </div>
                    </div>

                    {/* Subjects Taught Chips */}
                    <div className="space-y-1.5 mb-4">
                      <p className={`text-[10px] font-bold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                        Subjects & Specialization:
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {teacher.subjects.map((sub, idx) => (
                          <span 
                            key={idx}
                            className={`px-2 py-0.5 rounded-md text-[11px] font-medium border ${
                              isDark 
                                ? 'bg-slate-800/80 border-slate-700 text-slate-300' 
                                : 'bg-white border-slate-200 text-slate-700 shadow-2xs'
                            }`}
                          >
                            {sub}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Notable Achievement */}
                    {teacher.achievements && (
                      <div className="flex items-start gap-1.5 text-xs text-amber-600 dark:text-amber-300/90 font-medium mb-3">
                        <Award className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                        <span className="line-clamp-2 text-[11px]">{teacher.achievements}</span>
                      </div>
                    )}
                  </div>

                  {/* Footer Action */}
                  <div className={`pt-3.5 border-t flex items-center justify-between gap-2 ${
                    isDark ? 'border-slate-800' : 'border-slate-100'
                  }`}>
                    <span className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      Mon–Sat
                    </span>
                    {teacher.email && (
                      <button
                        onClick={() => handleCopyEmail(teacher.email)}
                        className={`touch-target inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer active:scale-95 ${
                          copiedEmail === teacher.email
                            ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                            : isDark
                              ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                              : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
                        }`}
                        title={teacher.email}
                      >
                        {copiedEmail === teacher.email ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-[11px] font-bold">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Mail className="w-3.5 h-3.5 text-amber-500" />
                            <span className="text-[11px]">Email Faculty</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
