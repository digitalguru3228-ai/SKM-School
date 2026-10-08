import React, { useState } from 'react';
import { IMAGES } from '../assets';

export const SchoolLogo: React.FC<{ className?: string; size?: 'sm' | 'md' | 'lg' | 'xl' }> = ({
  className = '',
  size = 'md'
}) => {
  const [imgError, setImgError] = useState(false);

  const dimensions = {
    sm: 'w-10 h-10',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  }[size];

  return (
    <div className={`relative flex items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 p-0.5 shadow-md shadow-amber-500/20 shrink-0 ${dimensions} ${className}`}>
      <div className="w-full h-full bg-slate-950 rounded-[10px] overflow-hidden flex items-center justify-center border border-amber-400/40 p-0.5">
        {!imgError ? (
          <img
            src={IMAGES.logo}
            alt="SKM High School Kanodar Logo"
            className="w-full h-full object-contain rounded-[8px]"
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900 text-amber-400 font-extrabold text-[10px] uppercase">
            SKM
          </div>
        )}
      </div>
    </div>
  );
};

