import React, { useState, useEffect } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Search, MessageSquare } from 'lucide-react';
import { FAQS } from '../data/schoolData';
import { api, FaqItem } from '../services/api';

interface FaqSectionProps {
  theme?: 'light' | 'dark';
}

export const FaqSection: React.FC<FaqSectionProps> = ({ theme = 'dark' }) => {
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  useEffect(() => {
    let mounted = true;
    api.getPublicFaqs()
      .then(data => {
        if (mounted && Array.isArray(data) && data.length > 0) {
          setFaqs(data);
        } else if (mounted) {
          setFaqs(FAQS as unknown as FaqItem[]);
        }
      })
      .catch(err => {
        console.error('Failed to load FAQs:', err);
        if (mounted) setFaqs(FAQS as unknown as FaqItem[]);
      });
    return () => { mounted = false; };
  }, []);

  const currentFaqs = faqs.length > 0 ? faqs : (FAQS as unknown as FaqItem[]);

  const filteredFaqs = currentFaqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = categoryFilter === 'all' || faq.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  const categories = [
    { id: 'all', label: 'All Questions' },
    { id: 'admissions', label: 'Admissions & Scholarships' },
    { id: 'academics', label: 'Streams & Curriculum' },
    { id: 'facilities', label: 'Campus & Facilities' },
    { id: 'general', label: 'Timings & Administration' },
  ];

  const isDark = theme === 'dark';

  return (
    <section 
      id="faq"
      className={`py-20 relative overflow-hidden transition-colors duration-300 ${
        isDark ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'
      }`}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Parent & Student Guidance</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className={`mt-3 text-sm sm:text-base leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            Find answers to common questions about admissions, streams, scholarships, and campus facilities. All managed dynamically by our school administration.
          </p>

          {/* Search bar & Category filters */}
          <div className="mt-6 max-w-xl mx-auto space-y-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search FAQs (e.g. Science stream, Scholarships, Timing...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-xs focus:outline-none ${
                  isDark 
                    ? 'bg-slate-950 border-slate-700 focus:border-amber-400 text-white placeholder-slate-500' 
                    : 'bg-slate-50 border-slate-300 focus:border-amber-500 text-slate-900 placeholder-slate-400 focus:bg-white'
                }`}
              />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setCategoryFilter(cat.id)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
                    categoryFilter === cat.id
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                      : isDark
                        ? 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                        : 'bg-slate-100 text-slate-700 hover:text-slate-950 border border-slate-300'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3.5 text-left">
          {filteredFaqs.length === 0 ? (
            <div className={`p-8 text-center rounded-2xl border ${isDark ? 'bg-slate-950/60 border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-600'}`}>
              <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="font-semibold text-sm">No FAQs match your search or filter.</p>
            </div>
          ) : (
            filteredFaqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={faq.id || faq.question}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? isDark 
                        ? 'bg-slate-950 border-amber-500/40 shadow-lg' 
                        : 'bg-amber-50/50 border-amber-500 shadow-sm'
                      : isDark 
                        ? 'bg-slate-950/60 border-slate-800 hover:border-slate-700' 
                        : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span className={`text-sm sm:text-base font-bold ${
                      isOpen ? 'text-amber-800 dark:text-amber-400' : isDark ? 'text-white' : 'text-slate-900'
                    }`}>
                      {faq.question}
                    </span>
                    <div className={`p-1.5 rounded-full shrink-0 ${
                      isOpen 
                        ? 'bg-amber-500/20 text-amber-700 dark:text-amber-400' 
                        : isDark 
                          ? 'bg-slate-900 text-slate-400' 
                          : 'bg-slate-100 text-slate-600'
                    }`}>
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </button>

                  {isOpen && (
                    <div className={`px-5 pb-5 pt-1 text-xs sm:text-sm leading-relaxed border-t animate-in fade-in duration-200 ${
                      isDark ? 'border-slate-800 text-slate-300' : 'border-slate-200 text-slate-700'
                    }`}>
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

      </div>
    </section>
  );
};
