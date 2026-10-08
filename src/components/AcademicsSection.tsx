import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  BookOpen, 
  Atom, 
  Briefcase, 
  Users, 
  CheckCircle2, 
  ChevronRight, 
  Download, 
  Sparkles, 
  Target,
  Award
} from 'lucide-react';
import { ACADEMIC_STREAMS } from '../data/schoolData';
import { api, ApiProgram } from '../services/api';

interface AcademicsSectionProps {
  theme?: 'light' | 'dark';
  onOpenAdmission: () => void;
}

export const AcademicsSection: React.FC<AcademicsSectionProps> = ({ 
  theme = 'dark',
  onOpenAdmission
}) => {
  const [streams, setStreams] = useState<any[]>(ACADEMIC_STREAMS);
  const [selectedStreamId, setSelectedStreamId] = useState<string>('science');
  const [downloaded, setDownloaded] = useState(false);

  useEffect(() => {
    api.getPublicPrograms()
      .then((data: ApiProgram[]) => {
        if (data && data.length > 0) {
          setStreams(data);
          if (!data.some(d => d.id === selectedStreamId)) {
            setSelectedStreamId(data[0].id);
          }
        }
      })
      .catch(() => {});
  }, []);

  const activeStream = streams.find(s => s.id === selectedStreamId) || streams[0];

  const getStreamIcon = (iconName: string) => {
    switch (iconName) {
      case 'BookOpen': return <BookOpen className="w-6 h-6" />;
      case 'Atom': return <Atom className="w-6 h-6" />;
      case 'Briefcase': return <Briefcase className="w-6 h-6" />;
      case 'Users': return <Users className="w-6 h-6" />;
      default: return <GraduationCap className="w-6 h-6" />;
    }
  };

  const handleDownloadSyllabus = () => {
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2500);
  };

  const isDark = theme === 'dark';

  const keyFeatures = activeStream?.key_features || activeStream?.keyFeatures || [];
  const careerPaths = activeStream?.career_paths || activeStream?.careerPaths || [];

  return (
    <section 
      id="academics" 
      className={`py-20 relative overflow-hidden transition-colors duration-300 ${
        isDark ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-900'
      }`}
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-800 dark:text-amber-300 text-xs font-bold uppercase tracking-wider mb-3">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Curriculum & Streams</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-950 dark:text-white">
            Academic Programs & Streams
          </h2>
          <p className={`mt-3 text-sm sm:text-base leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            State board accredited GSEB curriculum blended with modern laboratory practicals, computer coding, and hands-on vocational workshops.
          </p>
        </div>

        {/* 4 Interactive Program Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {streams.map((stream) => {
            const isSelected = selectedStreamId === stream.id;
            return (
              <div
                key={stream.id}
                onClick={() => setSelectedStreamId(stream.id)}
                className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 relative text-left group ${
                  isSelected
                    ? isDark
                      ? 'bg-slate-950 border-2 border-amber-400 shadow-xl shadow-amber-500/20 -translate-y-1.5'
                      : 'bg-white border-2 border-amber-600 shadow-lg -translate-y-1.5'
                    : isDark
                      ? 'bg-slate-950/60 border border-slate-800 hover:border-slate-700 hover:bg-slate-950/80'
                      : 'bg-white border border-slate-200 hover:border-amber-300 shadow-2xs hover:shadow-sm'
                }`}
              >
                {/* Badge */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                    isSelected 
                      ? 'bg-amber-500 text-slate-950' 
                      : isDark
                        ? 'bg-slate-800 text-amber-400'
                        : 'bg-amber-100 text-amber-900 border border-amber-200'
                  }`}>
                    {stream.grades}
                  </span>
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    {stream.badge}
                  </span>
                </div>

                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${
                  isSelected 
                    ? 'bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 shadow-md' 
                    : isDark
                      ? 'bg-slate-800 text-amber-400 border border-slate-700'
                      : 'bg-slate-100 text-amber-800 border border-slate-200'
                }`}>
                  {getStreamIcon(stream.icon)}
                </div>

                {/* Stream Title */}
                <h3 className={`text-lg font-bold leading-tight mb-1 transition-colors ${
                  isDark 
                    ? 'text-white group-hover:text-amber-300' 
                    : 'text-slate-950 group-hover:text-amber-700'
                }`}>
                  {stream.title}
                </h3>
                <p className={`text-xs font-semibold mb-3 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  {stream.subtitle}
                </p>

                {/* Brief description snippet */}
                <p className={`text-xs line-clamp-2 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  {stream.description}
                </p>

                {/* Action Link */}
                <div className={`mt-4 pt-3 border-t flex items-center justify-between text-xs font-semibold ${
                  isDark ? 'border-slate-800/80' : 'border-slate-200'
                }`}>
                  <span className={isSelected ? 'text-amber-600 dark:text-amber-400 font-bold' : isDark ? 'text-slate-400 group-hover:text-slate-200' : 'text-slate-600 group-hover:text-slate-950'}>
                    {isSelected ? 'Currently Viewing' : 'Explore Curriculum'}
                  </span>
                  <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'translate-x-1 text-amber-600 dark:text-amber-400' : 'text-slate-400 group-hover:translate-x-0.5'}`} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Deep Dive Focused Card on Selected Stream */}
        {activeStream && (
          <div className={`rounded-3xl p-6 sm:p-10 border shadow-2xl backdrop-blur-md ${
            isDark 
              ? 'bg-slate-950 border-amber-500/40 text-white' 
              : 'bg-white border-slate-200 text-slate-900 shadow-slate-900/5'
          }`}>
            
            <div className={`flex flex-wrap items-center justify-between gap-4 pb-6 border-b ${
              isDark ? 'border-slate-800' : 'border-slate-200'
            }`}>
              <div>
                <div className="flex items-center gap-3">
                  <span className="p-2.5 rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                    {getStreamIcon(activeStream.icon)}
                  </span>
                  <div>
                    <h3 className={`text-2xl sm:text-3xl font-extrabold ${isDark ? 'text-white' : 'text-slate-950'}`}>
                      {activeStream.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-amber-700 dark:text-amber-400 font-bold">
                      {activeStream.subtitle} &bull; {activeStream.badge}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={handleDownloadSyllabus}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                    downloaded
                      ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/40'
                      : isDark
                        ? 'text-slate-200 bg-slate-800 hover:bg-slate-700 border-slate-700'
                        : 'text-slate-800 bg-slate-100 hover:bg-slate-200 border-slate-300'
                  }`}
                >
                  <Download className="w-3.5 h-3.5 text-amber-600 dark:text-amber-500" />
                  <span>{downloaded ? 'Syllabus Downloaded' : 'Download Syllabus (PDF)'}</span>
                </button>

                <button
                  onClick={onOpenAdmission}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-md transition-all cursor-pointer"
                >
                  <span>Apply for this Stream</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
              
              {/* Left: Description & Subject List */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <h4 className={`text-sm uppercase font-bold tracking-wider mb-2 ${isDark ? 'text-slate-400' : 'text-slate-700'}`}>
                    Program Overview & Objectives
                  </h4>
                  <p className={`text-sm sm:text-base leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    {activeStream.description}
                  </p>
                </div>

                <div>
                  <h4 className={`text-sm uppercase font-bold tracking-wider mb-3 flex items-center gap-1.5 ${isDark ? 'text-slate-400' : 'text-slate-700'}`}>
                    <BookOpen className="w-4 h-4 text-amber-600 dark:text-amber-500" />
                    Key Subjects & Laboratory Modules
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {activeStream.subjects?.map((sub: string, idx: number) => (
                      <div 
                        key={idx} 
                        className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-semibold ${
                          isDark 
                            ? 'bg-slate-900/90 border-slate-800 text-slate-200' 
                            : 'bg-slate-50 border-slate-200 text-slate-800'
                        }`}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 dark:text-amber-500 shrink-0" />
                        <span>{sub}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: Key Features & Career Outcomes */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Key Institutional Features */}
                <div className={`p-5 rounded-2xl border ${
                  isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}>
                  <h4 className="text-xs uppercase font-bold tracking-wider text-amber-700 dark:text-amber-400 mb-3 flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5" />
                    Pedagogical Highlights
                  </h4>
                  <ul className="space-y-2.5">
                    {keyFeatures.map((feat: string, idx: number) => (
                      <li key={idx} className={`flex items-start gap-2 text-xs leading-normal ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Career & Future Pathways */}
                <div className={`p-5 rounded-2xl border ${
                  isDark 
                    ? 'bg-gradient-to-br from-slate-900 to-amber-950/40 border-amber-500/20' 
                    : 'bg-amber-50/60 border-amber-200'
                }`}>
                  <h4 className={`text-xs uppercase font-bold tracking-wider mb-2 flex items-center gap-1.5 ${
                    isDark ? 'text-white' : 'text-slate-950'
                  }`}>
                    <Target className="w-3.5 h-3.5 text-amber-600 dark:text-amber-500" />
                    Alumni Career Pathways
                  </h4>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {careerPaths.map((career: string, idx: number) => (
                      <span 
                        key={idx} 
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold border ${
                          isDark 
                            ? 'bg-slate-950/80 text-amber-300 border-amber-500/30' 
                            : 'bg-white text-amber-900 border-amber-300 shadow-2xs'
                        }`}
                      >
                        {career}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

            </div>

          </div>
        )}

      </div>
    </section>
  );
};
