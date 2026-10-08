import React, { useState } from 'react';
import { X, Play, Pause, ChevronLeft, ChevronRight, Sparkles, MapPin, Volume2, VolumeX } from 'lucide-react';
import { IMAGES } from '../assets';

interface VideoTourModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VideoTourModal: React.FC<VideoTourModalProps> = ({ isOpen, onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  if (!isOpen) return null;

  const tourStops = [
    {
      title: "Main Campus Gateway & Administrative Wing",
      subtitle: "Sarvoday Kelavani Mandal Central Campus (Est. 1956)",
      description: "Welcome to SKM High School & Higher Secondary School Kanodar. Sprawling two-story educational complex with green tree-lined avenues, modern facade with Gujarati trust inscriptions, and central assembly courtyard.",
      image: IMAGES.building,
      location: "Main Campus, Kanodar Highway Road"
    },
    {
      title: "A.N. Musa Modern Computer Centre",
      subtitle: "80+ Gigabit LAN Connected Desktop Workstations",
      description: "Inaugurated with patron support from R.K. Palasara Pariwar, offering state-of-the-art computer education, coding fundamentals, and digital literacy.",
      image: IMAGES.computerLab,
      location: "East Wing, 1st Floor"
    },
    {
      title: "Advanced Chemistry & Physics Laboratories",
      subtitle: "Equipped for HSC Science Stream & GUJCET / NEET / JEE",
      description: "Hands-on scientific experimentation benches equipped with safety showers, fume hoods, calibrated apparatus, and optical instruments.",
      image: IMAGES.physicsLab,
      location: "Science Complex, Ground Floor"
    },
    {
      title: "Adarsh Public & School Central Library",
      subtitle: "1,400+ Volumes, Gujarati Literature & Competitive Journals",
      description: "A peaceful sanctuary for young scholars with daily regional periodicals, reference books, and dedicated self-study cubicles.",
      image: IMAGES.library,
      location: "Central Block, Level 2"
    },
    {
      title: "Home Science Lab & Technical Workshop Wing",
      subtitle: "Practical Vocational Training for Girls & Boys",
      description: "Specialized culinary stations, sewing equipment, and electrical appliance testing benches preparing students for practical life and enterprise.",
      image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",
      location: "Vocational Wing"
    },
    {
      title: "Sports Grounds, Tube-Well & Assembly Pavilion",
      subtitle: "Playgrounds for Cricket, Volleyball & Athletics",
      description: "Lush outdoor playfields fostering physical fitness, Bharat Scouts drills, annual sports meets, and fresh RO tube-well drinking water facilities.",
      image: IMAGES.playground,
      location: "Campus Sports Arena"
    }
  ];

  const handleNext = () => {
    setCurrentSlide((prev) => (prev < tourStops.length - 1 ? prev + 1 : 0));
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : tourStops.length - 1));
  };

  const currentStop = tourStops[currentSlide];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative max-w-4xl w-full bg-slate-900 border border-amber-500/40 rounded-3xl overflow-hidden shadow-2xl text-left text-white">
        
        {/* Top Control Bar */}
        <div className="p-4 bg-slate-950 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              SKM Kanodar Virtual Campus Walkthrough ({currentSlide + 1}/{tourStops.length})
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
            aria-label="Close Video Tour"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video / Visual Stage */}
        <div className="relative aspect-[16/9] bg-black overflow-hidden flex items-center justify-center">
          <img
            src={currentStop.image}
            alt={currentStop.title}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

          {/* Left / Right Nav */}
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-950/80 hover:bg-amber-500 hover:text-slate-950 text-white transition-all cursor-pointer"
            aria-label="Previous stop"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-950/80 hover:bg-amber-500 hover:text-slate-950 text-white transition-all cursor-pointer"
            aria-label="Next stop"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Overlay Info at bottom of frame */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-950/80 backdrop-blur-md text-xs font-semibold text-amber-300 border border-white/10">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>{currentStop.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] bg-amber-500 text-slate-950 font-bold px-2 py-0.5 rounded">
                HD 1080p
              </span>
            </div>
          </div>
        </div>

        {/* Tour Details Footer */}
        <div className="p-6 bg-slate-900 space-y-4">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight">
              {currentStop.title}
            </h3>
            <p className="text-xs sm:text-sm font-semibold text-amber-400 mt-1">
              {currentStop.subtitle}
            </p>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
              {currentStop.description}
            </p>
          </div>

          {/* Slide Indicator Bar */}
          <div className="flex items-center gap-2 pt-2">
            {tourStops.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  currentSlide === idx ? 'w-8 bg-amber-400' : 'w-2 bg-slate-700 hover:bg-slate-500'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
