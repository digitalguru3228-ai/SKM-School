import React, { useState, useEffect } from 'react';
import { Camera, Eye, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/schoolData';
import { GalleryItem } from '../types';
import { api, ApiGallery } from '../services/api';

interface CampusLifeGalleryProps {
  theme?: 'light' | 'dark';
}

export const CampusLifeGallery: React.FC<CampusLifeGalleryProps> = ({ theme = 'dark' }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);
  const [liveGallery, setLiveGallery] = useState<ApiGallery[]>([]);

  useEffect(() => {
    let isMounted = true;
    const fetchGallery = async () => {
      try {
        const data = await api.getPublicGallery();
        if (isMounted && data && data.length > 0) {
          setLiveGallery(data);
        }
      } catch (err) {
        console.warn('Using static fallback for gallery:', err);
      }
    };
    fetchGallery();
    return () => { isMounted = false; };
  }, []);

  const items = liveGallery.length > 0
    ? liveGallery.map(g => ({
        id: g.id,
        title: g.title,
        caption: g.caption,
        category: g.category as any,
        image: g.image_url
      }))
    : GALLERY_ITEMS;

  const filteredItems = selectedCategory === 'all'
    ? items
    : items.filter(item => item.category === selectedCategory);

  const categories = [
    { id: 'all', label: 'All Moments' },
    { id: 'labs', label: 'Laboratories & IT' },
    { id: 'sports', label: 'Athletics & Games' },
    { id: 'scouts', label: 'Scout & Guides' },
    { id: 'cultural', label: 'Ceremonies & Awards' },
    { id: 'campus', label: 'Library & Campus' },
  ];

  const handleOpenLightbox = (index: number) => {
    setActiveLightboxIndex(index);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((prev) => (prev! > 0 ? prev! - 1 : filteredItems.length - 1));
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((prev) => (prev! < filteredItems.length - 1 ? prev! + 1 : 0));
    }
  };

  const isDark = theme === 'dark';

  return (
    <section 
      id="gallery" 
      className={`py-20 relative overflow-hidden transition-colors duration-300 ${
        isDark ? 'bg-slate-950 text-white' : 'bg-slate-100/80 text-slate-900'
      }`}
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Camera className="w-3.5 h-3.5" />
            <span>Campus Life & Activities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Vibrant Moments at SKM Kanodar
          </h2>
          <p className={`mt-3 text-sm sm:text-base leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            Witness our students in action—from high-energy sports competitions to state science exhibitions and Scout-Guide parades.
          </p>

          {/* Filter Pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-bold scale-105'
                    : isDark
                      ? 'bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800'
                      : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200 shadow-2xs'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <div 
              key={item.id}
              onClick={() => handleOpenLightbox(index)}
              className={`group relative rounded-2xl overflow-hidden border cursor-pointer transition-all duration-300 hover:-translate-y-1 ${
                isDark 
                  ? 'border-slate-800 bg-slate-900 hover:border-amber-500/50 shadow-xl shadow-slate-950/40' 
                  : 'border-slate-200 bg-white hover:border-amber-500/50 shadow-sm hover:shadow-md'
              }`}
            >
              {/* Image Frame */}
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-950">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                
                {/* Hover Eye Icon Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="p-3 rounded-full bg-amber-500/90 text-slate-950 shadow-xl transform scale-75 group-hover:scale-100 transition-transform">
                    <Eye className="w-5 h-5" />
                  </div>
                </div>

                {/* Category Tag */}
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-0.5 rounded-md bg-slate-950/80 backdrop-blur-md text-[10px] uppercase font-bold text-amber-400 border border-white/10">
                    {item.category}
                  </span>
                </div>

                {/* Caption on Image */}
                <div className="absolute bottom-3 left-3 right-3 text-left">
                  <h3 className="text-sm sm:text-base font-bold text-white leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-slate-300 line-clamp-1 mt-0.5">
                    {item.caption}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {activeLightboxIndex !== null && (
          <div 
            onClick={() => setActiveLightboxIndex(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-md animate-in fade-in duration-200"
          >
            <div 
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-slate-900 border border-amber-500/30 rounded-3xl overflow-hidden shadow-2xl"
            >
              {/* Close Button */}
              <button 
                onClick={() => setActiveLightboxIndex(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-950/80 text-white hover:bg-amber-500 hover:text-slate-950 transition-colors cursor-pointer"
                aria-label="Close Lightbox"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Prev / Next navigation buttons */}
              <button 
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-slate-950/80 text-white hover:bg-amber-500 hover:text-slate-950 transition-colors cursor-pointer"
                aria-label="Previous photo"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button 
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-slate-950/80 text-white hover:bg-amber-500 hover:text-slate-950 transition-colors cursor-pointer"
                aria-label="Next photo"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Lightbox Image */}
              <div className="relative aspect-[16/10] bg-black">
                <img 
                  src={filteredItems[activeLightboxIndex].image} 
                  alt={filteredItems[activeLightboxIndex].title} 
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Caption footer */}
              <div className="p-6 bg-slate-950 text-left border-t border-slate-800 flex items-center justify-between gap-4">
                <div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-500 text-slate-950">
                    {filteredItems[activeLightboxIndex].category}
                  </span>
                  <h3 className="text-lg font-bold text-white mt-1">
                    {filteredItems[activeLightboxIndex].title}
                  </h3>
                  <p className="text-xs text-slate-300 mt-0.5">
                    {filteredItems[activeLightboxIndex].caption}
                  </p>
                </div>

                <span className="text-xs font-semibold text-slate-400">
                  {activeLightboxIndex + 1} of {filteredItems.length}
                </span>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
