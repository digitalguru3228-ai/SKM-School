import React, { useState, useMemo, useEffect } from 'react';
import { 
  Bell, 
  Search, 
  Download, 
  Calendar, 
  FileText, 
  ChevronRight, 
  AlertCircle, 
  X, 
  CheckCircle2, 
  Share2, 
  Pin,
  RefreshCw
} from 'lucide-react';
import { ANNOUNCEMENTS } from '../data/schoolData';
import { Announcement } from '../types';
import { api, ApiAnnouncement } from '../services/api';

interface AnnouncementsSectionProps {
  theme?: 'light' | 'dark';
}

export const AnnouncementsSection: React.FC<AnnouncementsSectionProps> = ({ theme = 'dark' }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeAnnouncement, setActiveAnnouncement] = useState<any | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [liveAnnouncements, setLiveAnnouncements] = useState<ApiAnnouncement[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch dynamic announcements from backend API with fallback
  useEffect(() => {
    let isMounted = true;
    const fetchNotices = async () => {
      try {
        const data = await api.getPublicAnnouncements();
        if (isMounted && data && data.length > 0) {
          setLiveAnnouncements(data);
        }
      } catch (err) {
        console.warn('Using static fallback for announcements:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchNotices();
    return () => { isMounted = false; };
  }, []);

  const categories = ['All', 'Admissions', 'Exams', 'Scholarships', 'Events', 'Circular', 'Holidays'];

  // Normalize data between API and static
  const combinedList = useMemo(() => {
    if (liveAnnouncements.length > 0) {
      return liveAnnouncements.map(a => ({
        id: a.id,
        title: a.title,
        date: a.published_at,
        category: (a.category as any) || 'Circular',
        isUrgent: a.is_urgent,
        isPinned: a.is_pinned,
        fileSize: a.file_size || 'PDF',
        refNo: a.ref_no,
        summary: a.summary,
        fullContent: a.full_content,
        attachmentName: a.attachment_name
      }));
    }
    return ANNOUNCEMENTS.map(a => ({
      ...a,
      isPinned: false
    }));
  }, [liveAnnouncements]);

  const filteredAnnouncements = useMemo(() => {
    return combinedList.filter((item) => {
      const matchesCategory = selectedCategory === 'All' || item.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchesQuery = 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.refNo && item.refNo.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesQuery;
    });
  }, [combinedList, selectedCategory, searchQuery]);

  const handleDownload = (item: any) => {
    setDownloadSuccess(item.id);
    setTimeout(() => {
      setDownloadSuccess(null);
    }, 3000);
  };

  const handleShare = (item: any) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${item.title} - SKM High School Kanodar Official Circular`);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const isDark = theme === 'dark';

  return (
    <section 
      id="announcements" 
      className={`py-20 relative transition-colors duration-300 ${
        isDark ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-900'
      }`}
    >
      {/* Background ambient lighting */}
      <div className="absolute top-10 left-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Bell className="w-3.5 h-3.5 animate-bounce" />
            <span>Official Circulars & Notice Board</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Announcements & Notifications
          </h2>
          <p className={`mt-3 text-sm sm:text-base leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            Stay updated with verified circulars, GSEB board exam guidelines, scholarship schedules, admission criteria, and academic announcements.
          </p>
        </div>

        {/* Filter Controls & Search Bar */}
        <div className={`p-4 sm:p-5 rounded-2xl border mb-8 backdrop-blur-md ${
          isDark 
            ? 'bg-slate-950/80 border-slate-800' 
            : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            
            {/* Category Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      isActive
                        ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                        : isDark
                          ? 'bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                    }`}
                  >
                    {cat === 'All' ? 'All Bulletins' : cat}
                  </button>
                );
              })}
            </div>

            {/* Search Input Box */}
            <div className="relative min-w-[260px]">
              <Search className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 ${isDark ? 'text-slate-400' : 'text-slate-400'}`} />
              <input
                type="text"
                placeholder="Search circulars, ref numbers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 text-xs rounded-xl border focus:outline-none transition-all ${
                  isDark
                    ? 'bg-slate-900 border-slate-700 text-white placeholder-slate-500 focus:border-amber-400'
                    : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-amber-500 focus:bg-white'
                }`}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

          </div>
        </div>

        {/* Announcements Cards Grid */}
        {filteredAnnouncements.length === 0 ? (
          <div className={`text-center py-16 rounded-2xl border ${
            isDark ? 'bg-slate-950/50 border-slate-800' : 'bg-white border-slate-200'
          }`}>
            <AlertCircle className="w-10 h-10 mx-auto text-amber-400 mb-3 opacity-80" />
            <h3 className="text-base font-bold">No announcements found</h3>
            <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Try clearing your search query or choosing another category filter.
            </p>
            <button
              onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
              className="mt-4 px-4 py-2 rounded-lg bg-amber-500 text-slate-950 font-semibold text-xs"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAnnouncements.map((item) => {
              const isUrgent = item.isUrgent;
              const isPinned = item.isPinned;
              return (
                <div
                  key={item.id}
                  className={`flex flex-col justify-between p-6 rounded-2xl border transition-all duration-300 group hover:-translate-y-1 ${
                    isDark
                      ? 'bg-slate-950/80 border-slate-800/90 hover:border-amber-500/40 shadow-xl shadow-slate-950/40'
                      : 'bg-white border-slate-200/90 hover:border-amber-500/40 shadow-sm hover:shadow-md'
                  }`}
                >
                  {/* Top Metadata */}
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2">
                        <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider ${
                          item.category === 'Admissions' 
                            ? 'bg-emerald-500/15 text-emerald-500 dark:text-emerald-300 border border-emerald-500/30' 
                            : item.category === 'Exams'
                              ? 'bg-blue-500/15 text-blue-600 dark:text-blue-300 border border-blue-500/30'
                              : item.category === 'Scholarships'
                                ? 'bg-amber-500/15 text-amber-600 dark:text-amber-300 border border-amber-500/30'
                                : 'bg-purple-500/15 text-purple-600 dark:text-purple-300 border border-purple-500/30'
                        }`}>
                          {item.category}
                        </span>
                        {isPinned && (
                          <span className="flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                            <Pin className="w-2.5 h-2.5" /> Pinned
                          </span>
                        )}
                        {isUrgent && (
                          <span className="flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-500 dark:text-rose-300 border border-rose-500/30 animate-pulse">
                            Active / Urgent
                          </span>
                        )}
                      </div>
                      <span className={`text-[11px] flex items-center gap-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                        <Calendar className="w-3 h-3" />
                        {item.date}
                      </span>
                    </div>

                    {/* Reference number */}
                    {item.refNo && (
                      <p className={`text-[11px] font-mono mb-2 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                        Ref: {item.refNo}
                      </p>
                    )}

                    {/* Title */}
                    <h3 className={`text-base sm:text-lg font-bold leading-snug mb-2.5 group-hover:text-amber-500 transition-colors ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}>
                      {item.title}
                    </h3>

                    {/* Summary */}
                    <p className={`text-xs leading-relaxed line-clamp-3 mb-4 ${
                      isDark ? 'text-slate-300' : 'text-slate-600'
                    }`}>
                      {item.summary}
                    </p>
                  </div>

                  {/* Card Bottom CTA Actions */}
                  <div className={`pt-4 border-t flex items-center justify-between gap-2 ${
                    isDark ? 'border-slate-800/80' : 'border-slate-100'
                  }`}>
                    <button
                      onClick={() => setActiveAnnouncement(item)}
                      className={`inline-flex items-center gap-1.5 text-xs font-bold transition-colors cursor-pointer ${
                        isDark ? 'text-amber-400 hover:text-amber-300' : 'text-amber-600 hover:text-amber-700'
                      }`}
                    >
                      <span>Read Circular</span>
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </button>

                    <button
                      onClick={() => handleDownload(item)}
                      className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        downloadSuccess === item.id
                          ? 'bg-emerald-500/20 text-emerald-500 dark:text-emerald-300 border border-emerald-500/40'
                          : isDark
                            ? 'bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                      }`}
                      title="Download official PDF copy"
                    >
                      {downloadSuccess === item.id ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-[11px]">Downloaded</span>
                        </>
                      ) : (
                        <>
                          <Download className="w-3.5 h-3.5 text-amber-500" />
                          <span className="text-[11px]">{item.fileSize || 'PDF'}</span>
                        </>
                      )}
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* Full Circular View Modal */}
      {activeAnnouncement && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div 
            className={`w-full max-w-2xl rounded-2xl border shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 ${
              isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            {/* Modal Header */}
            <div className={`p-5 sm:p-6 border-b flex items-start justify-between gap-4 ${
              isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded text-[11px] font-bold uppercase bg-amber-500 text-slate-950">
                    {activeAnnouncement.category}
                  </span>
                  {activeAnnouncement.isUrgent && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-500 border border-rose-500/30">
                      High Priority
                    </span>
                  )}
                  <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    {activeAnnouncement.date}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold leading-snug">
                  {activeAnnouncement.title}
                </h3>
                {activeAnnouncement.refNo && (
                  <p className={`text-xs font-mono mt-1 ${isDark ? 'text-amber-400/90' : 'text-amber-700'}`}>
                    Official Dispatch Ref: {activeAnnouncement.refNo}
                  </p>
                )}
              </div>
              <button
                onClick={() => setActiveAnnouncement(null)}
                className={`p-1.5 rounded-lg transition-colors ${
                  isDark ? 'hover:bg-slate-800 text-slate-400 hover:text-white' : 'hover:bg-slate-200 text-slate-600'
                }`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-6 space-y-4 max-h-[60vh] overflow-y-auto">
              <div className={`p-4 rounded-xl border text-xs sm:text-sm leading-relaxed ${
                isDark ? 'bg-slate-950/50 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-700'
              }`}>
                <p className="font-semibold mb-2">Official Circular Summary:</p>
                <p>{activeAnnouncement.summary}</p>
              </div>

              {activeAnnouncement.fullContent && (
                <div className="space-y-2">
                  <h4 className="text-xs uppercase font-bold tracking-wider text-amber-500">
                    Detailed Notification Text
                  </h4>
                  <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    {activeAnnouncement.fullContent}
                  </p>
                </div>
              )}

              {/* Institution Seal footer */}
              <div className={`p-3.5 rounded-xl border flex items-center justify-between text-xs ${
                isDark ? 'bg-slate-950/80 border-slate-800/80 text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-600'
              }`}>
                <div>
                  <p className="font-semibold text-slate-800 dark:text-slate-200">Sarvoday Kelavani Mandal, Kanodar</p>
                  <p className="text-[11px]">SKM High School Administrative Office</p>
                </div>
                <div className="text-right">
                  <span className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/20 text-emerald-400">
                    Digitally Verified
                  </span>
                </div>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className={`p-4 sm:p-5 border-t flex flex-wrap items-center justify-between gap-3 ${
              isDark ? 'bg-slate-950/80 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleShare(activeAnnouncement)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold border transition-colors ${
                    copiedLink
                      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                      : isDark
                        ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                        : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300'
                  }`}
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{copiedLink ? 'Copied Details' : 'Share Notice'}</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDownload(activeAnnouncement)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Circular ({activeAnnouncement.fileSize || 'PDF'})</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
