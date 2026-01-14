
import React from 'react';
import { WireframeArt } from './WireframeArt';
import { Artefact } from '../types';

interface Props {
  artefacts: Artefact[];
  onSelect: (art: Artefact) => void;
}

export const CatalogView: React.FC<Props> = ({ artefacts, onSelect }) => {
  return (
    <div className="w-full h-full max-w-6xl mx-auto overflow-y-auto scrollbar-hide py-10 px-4">
      <div className="text-center mb-14 space-y-2">
        <div className="text-sm opacity-50 tracking-[0.8em] font-bold">展品总览</div>
        <div className="text-[10px] tracking-[0.3em] opacity-30">第 1 / 1 页</div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8">
        {artefacts.map((art) => (
          <div 
            key={art.id}
            className="group cursor-pointer flex flex-col h-full"
            onClick={() => onSelect(art)}
          >
            <div className="border border-white/10 bg-white/5 aspect-square flex items-center justify-center mb-4 group-hover:border-white/60 group-hover:bg-white/10 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] transition-all duration-500 relative overflow-hidden">
              {art.imageUrl ? (
                <div className="w-full h-full p-2 relative">
                  <img 
                    src={art.imageUrl} 
                    alt={art.name} 
                    crossOrigin="anonymous"
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 mix-blend-screen"
                    style={{ filter: 'grayscale(0.5) contrast(1.2)' }}
                  />
                  <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none"></div>
                </div>
              ) : (
                <WireframeArt svgPath={art.svgPath} size={100} className="group-hover:scale-110 transition-transform duration-700" />
              )}
              
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent h-20 -top-20 group-hover:animate-[scan_2s_linear_infinite] pointer-events-none opacity-0 group-hover:opacity-100"></div>
              <div className="absolute top-4 -left-[1px] w-[2px] h-4 bg-white/20 group-hover:bg-white/60 transition-colors"></div>
              <div className="absolute top-4 -right-[1px] w-[2px] h-4 bg-white/20 group-hover:bg-white/60 transition-colors"></div>
            </div>
            
            <div className="space-y-2 px-1">
              <div className="flex justify-between items-baseline gap-2">
                <div className="text-[10px] font-bold tracking-widest truncate group-hover:text-white transition-colors">{art.name}</div>
                
              </div>
              <div className="text-[8px] opacity-30 leading-tight h-8 overflow-hidden line-clamp-2 font-light group-hover:opacity-50 transition-opacity">
                {art.description}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-20 text-[10px] opacity-20 tracking-[1em] mb-10">
        END OF CATALOGUE
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scan {
          0% { top: -100%; }
          100% { top: 100%; }
        }
      `}} />
    </div>
  );
};
