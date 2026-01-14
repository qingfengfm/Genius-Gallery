
import React from 'react';

interface Props {
  svgPath: string;
  size?: number;
  className?: string;
  dotted?: boolean;
}

export const WireframeArt: React.FC<Props> = ({ svgPath, size = 200, className = "", dotted = true }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
      >
        <path
          d={svgPath}
          fill="none"
          stroke="white"
          strokeWidth="0.8"
          strokeDasharray={dotted ? "1 2" : "none"}
          className="transition-all duration-700"
        />
        {/* Decorative dots at vertices */}
        <circle cx="50" cy="50" r="0.5" fill="white" />
      </svg>
      {/* Glow Overlay */}
      <div className="absolute inset-0 bg-white opacity-5 blur-2xl rounded-full scale-50"></div>
    </div>
  );
};
