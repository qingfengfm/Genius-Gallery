
import React from 'react';
import { CornerBracket } from './CornerBracket';

interface Props {
  children: React.ReactNode;
  syncStatus?: 'IDLE' | 'SYNCING' | 'SUCCESS' | 'ERROR';
  onSync?: () => void;
}

export const HUD: React.FC<Props> = ({ children, syncStatus = 'IDLE', onSync }) => {
  const getSyncText = () => {
    switch(syncStatus) {
      case 'SYNCING': return 'DATA SYNCING...';
      case 'SUCCESS': return 'SYNC COMPLETE';
      case 'ERROR': return 'SYNC FAILED';
      default: return 'DATA STANDBY';
    }
  };

  const getSyncColor = () => {
    if (syncStatus === 'SUCCESS') return 'text-green-400';
    if (syncStatus === 'ERROR') return 'text-red-400';
    if (syncStatus === 'SYNCING') return 'text-yellow-400 animate-pulse';
    return 'opacity-70';
  };

  return (
    <div className="relative w-screen h-screen grid-bg overflow-hidden crt-flicker flex flex-col">
      {/* Corner Brackets */}
      <CornerBracket className="top-4 left-4 z-50" />
      <CornerBracket className="top-4 right-4 rotate-90 z-50" />
      <CornerBracket className="bottom-4 left-4 -rotate-90 z-50" />
      <CornerBracket className="bottom-4 right-4 rotate-180 z-50" />

      {/* Header Info */}
      <div className="absolute top-8 left-10 text-[10px] space-y-1 opacity-70 tracking-widest z-40 hidden sm:block">
        <div>POS X:4892 Y:88A4 Z:F189</div>
        <div>POS X:4002 Y:1989</div>
      </div>

      <div className="absolute top-8 right-10 text-right text-[10px] space-y-1 tracking-widest z-40">
        <div className="flex items-center justify-end gap-2">
          <span className={getSyncColor()}>{getSyncText()}</span>
          {onSync && syncStatus !== 'SYNCING' && (
            <button 
              onClick={onSync}
              className="hover:text-white transition-colors cursor-pointer border border-white/20 px-1 rounded hover:bg-white/10"
              title="手动同步表格数据"
            >
              ⟳
            </button>
          )}
        </div>
        <div className="opacity-70">SYSTEM STATUS: ACTIVE</div>
      </div>

      {/* Central Content Wrapper */}
      <div className="flex-1 w-full overflow-y-auto scrollbar-hide pt-24 pb-20 px-4 sm:px-10 md:px-20 relative z-10">
        <div className="max-w-7xl mx-auto min-h-full flex flex-col items-center justify-start sm:justify-center">
          {children}
        </div>
      </div>

      {/* Bottom Info Left */}
      <div className="absolute bottom-6 left-10 text-[8px] sm:text-[10px] space-y-1 opacity-50 tracking-widest z-50 pointer-events-none uppercase">
        <div className="font-bold">天才画廊</div>
        <div className="opacity-40 font-light">© 2026 GENIUS GALLERY ARCHIVE</div>
      </div>
      
      {/* Credit Footer Text */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[8px] sm:text-[10px] space-y-1 opacity-50 tracking-widest z-50 pointer-events-none uppercase">
        由青枫与他的天才朋友们共同呈现
      </div>

      {/* Bottom Info Right */}
      <div className="absolute bottom-6 right-10 text-right text-[10px] sm:text-[12px] opacity-80 tracking-widest flex items-center gap-3 z-50 pointer-events-none">
        <span className="font-bold drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">天才画廊 | (Genius Gallery)</span>
        <div className="w-5 h-5 flex items-center justify-center border border-white/40">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
            <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
          </svg>
        </div>
      </div>
    </div>
  );
};
