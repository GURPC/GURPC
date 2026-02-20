'use client';

import React from 'react';

const GlowingOrb: React.FC<{
  color?: string;
  size?: string;
  position?: string;
  blur?: string;
  opacity?: string;
  animate?: boolean;
}> = ({
  color = 'bg-green-500',
  size = 'w-[400px] h-[400px]',
  position = 'top-0 left-1/2 -translate-x-1/2',
  blur = 'blur-[120px]',
  opacity = 'opacity-20',
  animate = true,
}) => {
  return (
    <div
      className={`absolute ${position} ${size} ${color} rounded-full ${blur} ${opacity} pointer-events-none ${
        animate ? 'animate-pulse-glow' : ''
      }`}
    />
  );
};

export default GlowingOrb;
