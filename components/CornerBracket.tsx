
import React from 'react';

interface Props {
  className?: string;
}

export const CornerBracket: React.FC<Props> = ({ className = "" }) => (
  <div className={`absolute w-8 h-8 pointer-events-none ${className}`}>
    <div className="absolute top-0 left-0 w-full h-[1px] bg-white opacity-40"></div>
    <div className="absolute top-0 left-0 w-[1px] h-full bg-white opacity-40"></div>
    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white"></div>
  </div>
);
