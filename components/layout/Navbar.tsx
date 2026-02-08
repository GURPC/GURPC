'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { Moon, Sun, Menu, X, ChevronRight } from 'lucide-react';
import { useTheme } from '@/components/providers/ThemeProvider';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Logo from '@/components/Logo';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Team', href: '/team' },
  { name: 'Events', href: '/events' },
  { name: 'Resources', href: '/resources' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
];

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Handle scroll effect for transparency/blur
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  return (
    <>
      <nav
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300 border-b",
          scrolled 
            ? "bg-[#0b1d12]/95 backdrop-blur-md border-green-900/30 shadow-lg py-2" 
            : "bg-[#0b1d12] border-transparent py-4"
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center text-white">
            {/* Logo Section */}
            <Logo size="medium" />
            
            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link 
                    key={link.href}
                    href={link.href} 
                    className={cn(
                      "relative px-3 py-2 text-sm font-medium transition-colors hover:text-green-400",
                      isActive ? "text-green-400" : "text-slate-300"
                    )}
                  >
                    <span>{link.name}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-0 h-[2px] w-full bg-green-500 rounded-full animate-in fade-in zoom-in-50 duration-300" />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Right Actions */}
            <div className="hidden lg:flex items-center gap-4">
               <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="text-slate-300 hover:text-white hover:bg-white/10 rounded-full"
              >
                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              </Button>
              
              <Button asChild className="bg-green-600 hover:bg-green-700 text-white font-semibold rounded-full px-6 shadow-md hover:shadow-lg hover:scale-105 transition-all">
                <Link href="/join">Join Now</Link>
              </Button>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="flex items-center lg:hidden gap-2">
               <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="text-slate-300 hover:text-white hover:bg-white/10"
              >
                 <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                 <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              </Button>
              <Button
                variant="ghost" 
                size="icon"
                onClick={() => setIsOpen(true)}
                className="text-white hover:bg-white/10"
              >
                <Menu className="h-7 w-7" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={cn(
          "fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm transition-opacity duration-300 lg:hidden",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile Sidebar */}
      <div 
        className={cn(
          "fixed inset-y-0 right-0 z-[70] w-[80vw] sm:w-[320px] bg-[#0b1d12] shadow-2xl transition-transform duration-300 ease-out lg:hidden border-l border-green-900/30 flex flex-col",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
         <div className="flex items-center justify-between p-6 border-b border-green-900/30">
            <span className="font-bold text-xl text-white">Menu</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white hover:bg-white/10"
            >
              <X className="h-6 w-6" />
            </Button>
         </div>

         <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center justify-between p-3 rounded-lg text-base font-medium transition-all",
                  pathname === link.href 
                    ? "bg-green-900/40 text-green-400" 
                    : "text-slate-300 hover:bg-white/5 hover:text-white"
                )}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
                {pathname === link.href && <ChevronRight className="h-4 w-4" />}
              </Link>
            ))}
         </div>

         <div className="p-6 border-t border-green-900/30 bg-black/20">
            <Button asChild className="w-full bg-green-600 hover:bg-green-700 text-white h-11 rounded-full font-semibold shadow-lg">
              <Link href="/join" onClick={() => setIsOpen(false)}>Join Now</Link>
            </Button>
         </div>
      </div>
    </>
  );
};

export default Navbar;
