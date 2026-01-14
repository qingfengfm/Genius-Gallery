
import React, { useState } from 'react';
import { WireframeArt } from './WireframeArt';
import { Artefact } from '../types';

interface Props {
  artefacts: Artefact[];
  onSelect: (art: Artefact) => void;
}

export const HomeView: React.FC<Props> = ({ artefacts, onSelect }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % artefacts.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + artefacts.length) % artefacts.length);

  const currentArt = artefacts[currentIndex];
  const prevArt = artefacts[(currentIndex - 1 + artefacts.length) % artefacts.length];
  const nextArt = artefacts[(currentIndex + 1) % artefacts.length];

  const renderVisual = (art: Artefact, size: number, isMain: boolean = false) => {
    if (art.imageUrl) {
      return (
        <div className={`relative overflow-hidden ${isMain ? 'p-4' : 'p-2'}`} style={{ width: size, height: size }}>
          <img 
            src={art.imageUrl} 
            alt={art.name} 
            crossOrigin="anonymous"
            className={`w-full h-full object-cover transition-all duration-700 mix-blend-screen ${isMain ? 'opacity-80 group-hover:opacity-100 group-hover:scale-110' : 'opacity-40 group-hover:opacity-80'}`}
            style={{ filter: isMain ? 'contrast(1.1)' : 'grayscale(1) contrast(0.8)' }}
          />
          <div className="absolute inset-0 pointer-events-none opacity-10" style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 4px, rgba(255,255,255,0.1) 5px, transparent 6px)' }}></div>
        </div>
      );
    }
    return <WireframeArt svgPath={art.svgPath} size={size} className={isMain ? 'group-hover:scale-105' : ''} />;
  };

  return (
    <div className="relative w-full min-h-full flex flex-col items-center justify-between py-6">
      {/* Header Info */}
      <div className="text-xs opacity-60 tracking-[0.3em] font-bold mb-8 uppercase">
        第 {currentIndex + 1} / {artefacts.length} 页
      </div>

      {/* Main Display Area */}
      <div className="flex-1 flex flex-col items-center justify-center w-full">
        <div className="flex items-center gap-8 md:gap-16 lg:gap-32 min-h-[400px]">
          <div className="hidden md:flex flex-col items-center opacity-20 scale-75 border border-white/10 p-4 relative group cursor-pointer hover:opacity-50 hover:border-white/30 transition-all duration-500" onClick={prev}>
             <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity bg-black border border-white/20 px-3 py-1 text-[10px] tracking-widest whitespace-nowrap">上一个</div>
             {renderVisual(prevArt, 150)}
          </div>

          <div 
            className="relative border-2 border-white/40 p-6 md:p-10 cursor-pointer hover:border-white hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] transition-all duration-700 group flex items-center justify-center overflow-hidden"
            onClick={() => onSelect(currentArt)}
            style={{ minWidth: '320px', minHeight: '320px' }}
          >
            <div className="absolute -left-1 top-10 w-2 h-10 bg-white/40 group-hover:bg-white transition-colors"></div>
            <div className="absolute -right-1 top-10 w-2 h-10 bg-white/40 group-hover:bg-white transition-colors"></div>
            
            {renderVisual(currentArt, 280, true)}
            
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 whitespace-nowrap text-xs bg-white text-black px-6 py-2 font-bold tracking-[0.2em] transform translate-y-2 group-hover:translate-y-0 z-20">
              查看详情
            </div>
            
            <div className="absolute top-4 left-4 text-[10px] opacity-40 group-hover:opacity-80 transition-opacity tracking-widest z-10 font-mono">
              {currentArt.id}
            </div>
          </div>

          <div className="hidden md:flex flex-col items-center opacity-20 scale-75 border border-white/10 p-4 relative group cursor-pointer hover:opacity-50 hover:border-white/30 transition-all duration-500" onClick={next}>
             <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity bg-black border border-white/20 px-3 py-1 text-[10px] tracking-widest whitespace-nowrap">下一个</div>
             {renderVisual(nextArt, 150)}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="mt-12 flex gap-10">
          <button onClick={prev} className="group relative px-8 py-2 overflow-hidden border border-white/20 hover:border-white/80 transition-all active:scale-95">
            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors"></div>
            <span className="relative text-[10px] tracking-[0.4em] font-bold">上一项</span>
          </button>
          <button onClick={next} className="group relative px-8 py-2 overflow-hidden border border-white/20 hover:border-white/80 transition-all active:scale-95">
            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors"></div>
            <span className="relative text-[10px] tracking-[0.4em] font-bold">下一项</span>
          </button>
        </div>
      </div>

    </div>
  );
};
