import React, { ReactNode, CSSProperties } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export function GlassCard({ children, className = '', style }: GlassCardProps) {
  return (
    <div 
      className={`bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-2xl ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}

