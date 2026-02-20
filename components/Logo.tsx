'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useTheme } from '@/components/providers/ThemeProvider';

// Use a reliable path relative to basePath for GitHub Pages
const LOGO_SRC = '/GURPC/images/logo.png';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
  showSubtitle?: boolean;
}

const Logo: React.FC<LogoProps> = ({ 
  size = 'medium', 
  className, 
  showSubtitle = true 
}) => {
  const { theme } = useTheme();

  // Size configurations
  const sizes = {
    small: {
      img: 'h-8 w-8',
      text: 'text-lg',
      sub: 'text-[8px]'
    },
    medium: {
      img: 'h-10 w-10 md:h-12 md:w-12',
      text: 'text-xl md:text-2xl',
      sub: 'text-[10px]'
    },
    large: {
      img: 'h-16 w-16',
      text: 'text-3xl',
      sub: 'text-xs'
    }
  };

  const { img, text, sub } = sizes[size];

  return (
    <Link 
      href="/" 
      className={cn(
        "flex items-center gap-3 group select-none hover:opacity-95 transition-opacity", 
        className
      )}
      aria-label="GURPC Home"
    >
      <div className={cn(
        "relative shrink-0 transition-transform duration-300 group-hover:scale-105",
        img
      )}>
        <Image
          src={LOGO_SRC}
          alt="GURPC Logo"
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, 33vw"
          priority
          onError={(e) => {
             e.currentTarget.style.display = 'none';
          }}
          unoptimized
        />
      </div>
      
      <div className="flex flex-col justify-center leading-none">
        <span className={cn(
          "font-bold uppercase tracking-tight text-slate-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors",
          text
        )}>
          Green University
        </span>
        {showSubtitle && (
          <span className={cn(
            "font-semibold text-green-500 uppercase tracking-[0.15em] mt-0.5",
            sub
          )}>
            Research & Publication Community
          </span>
        )}
      </div>
    </Link>
  );
};

export default Logo;
