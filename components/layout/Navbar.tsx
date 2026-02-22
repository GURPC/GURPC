'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState, useEffect, useRef } from 'react';
import { Moon, Sun, Menu, X, ChevronRight, ChevronDown, User, LogOut, LayoutDashboard, Settings, Newspaper } from 'lucide-react';
import { useTheme } from '@/components/providers/ThemeProvider';
import { useAuth } from '@/components/providers/AuthProvider';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Logo from '@/components/Logo';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  {
    name: 'Community',
    children: [
      { name: 'Team', href: '/team' },
      { name: 'Members', href: '/members' },
      { name: 'Events', href: '/events' },
      { name: 'Stories', href: '/stories' },
      { name: 'Calendar', href: '/calendar' },
    ],
  },
  {
    name: 'Research',
    children: [
      { name: 'Publications', href: '/publications' },
      { name: 'Resources', href: '/resources' },
      { name: 'Training', href: '/training' },
      { name: 'Conferences', href: '/conferences' },
    ],
  },
  { name: 'Contact', href: '/contact' },
];

// Auth-only nav links visible after login
const authNavLinks = [
  { name: 'Newsfeed', href: '/newsfeed' },
  { name: 'Groups', href: '/groups' },
  { name: 'Decisions', href: '/initiatives' },
];

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, profile, loading: authLoading, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

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

  // Close user menu and dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    setUserMenuOpen(false);
    router.push('/');
    router.refresh();
  };

  return (
    <>
      <nav
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300 border-b",
          scrolled 
            ? "bg-white/90 dark:bg-[#020a04]/90 backdrop-blur-xl border-green-200 dark:border-green-500/10 shadow-sm dark:shadow-[0_4px_30px_rgba(0,255,100,0.05)] py-2" 
            : "bg-white/70 dark:bg-[#020a04]/70 backdrop-blur-md border-transparent py-4"
        )}
      >
        {/* Top scanline accent */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-green-500/40 to-transparent" />
        
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center text-slate-900 dark:text-white">
            {/* Logo Section */}
            <Logo size="medium" />
            
            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-1" ref={dropdownRef}>
              {[...navLinks, ...(user ? authNavLinks.map(l => ({ ...l })) : [])].map((link) => {
                // Check if it's a dropdown
                if ('children' in link && link.children) {
                  const isChildActive = link.children.some((child: { href: string }) => pathname === child.href);
                  const isDropdownOpen = openDropdown === link.name;
                  return (
                    <div key={link.name} className="relative">
                      <button
                        onClick={() => setOpenDropdown(isDropdownOpen ? null : link.name)}
                        className={cn(
                          "relative px-3 py-2 text-sm font-mono tracking-wide transition-all hover:text-green-600 dark:hover:text-green-400 group flex items-center gap-1",
                          isChildActive ? "text-green-600 dark:text-green-400" : "text-slate-500 dark:text-slate-400"
                        )}
                      >
                        <span className="relative z-10">{link.name}</span>
                        <ChevronDown className={cn("w-3 h-3 transition-transform", isDropdownOpen && "rotate-180")} />
                        {isChildActive && (
                          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-4/5 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                        )}
                        <span className="absolute inset-0 rounded-md bg-green-500/0 group-hover:bg-green-500/5 transition-colors" />
                      </button>
                      {isDropdownOpen && (
                        <div className="absolute top-full left-0 mt-1 w-48 bg-white dark:bg-[#0a1a0f] rounded-xl shadow-xl border border-slate-200 dark:border-green-500/15 py-1.5 z-50">
                          {link.children.map((child: { name: string; href: string }) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              onClick={() => setOpenDropdown(null)}
                              className={cn(
                                "block px-4 py-2 text-sm font-mono transition-colors",
                                pathname === child.href
                                  ? "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-500/10"
                                  : "text-slate-600 dark:text-slate-400 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-500/5"
                              )}
                            >
                              {child.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                // Regular link
                const isActive = pathname === (link as { href: string }).href;
                return (
                  <Link 
                    key={(link as { href: string }).href}
                    href={(link as { href: string }).href} 
                    className={cn(
                      "relative px-3 py-2 text-sm font-mono tracking-wide transition-all hover:text-green-600 dark:hover:text-green-400 group",
                      isActive ? "text-green-600 dark:text-green-400" : "text-slate-500 dark:text-slate-400 hover:text-green-600 dark:hover:text-green-300"
                    )}
                  >
                    <span className="relative z-10">{link.name}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-4/5 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                    )}
                    <span className="absolute inset-0 rounded-md bg-green-500/0 group-hover:bg-green-500/5 transition-colors" />
                  </Link>
                );
              })}
            </div>

            {/* Right Actions */}
            <div className="hidden lg:flex items-center gap-3">
               <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="text-slate-500 dark:text-slate-400 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-500/10 rounded-lg border border-transparent hover:border-green-200 dark:hover:border-green-500/20 transition-all"
              >
                <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              </Button>

              {authLoading ? (
                <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
              ) : user ? (
                /* Authenticated User Menu */
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-green-200 dark:border-green-500/20 hover:border-green-400 dark:hover:border-green-500/40 bg-green-50/50 dark:bg-green-500/5 transition-all"
                  >
                    <div className="w-7 h-7 rounded-full bg-green-600 flex items-center justify-center text-white text-xs font-bold overflow-hidden">
                      {profile?.photo_url ? (
                        <img src={profile.photo_url} alt="" className="w-full h-full object-cover" />
                      ) : (
                        profile?.name?.charAt(0)?.toUpperCase() || <User className="w-4 h-4" />
                      )}
                    </div>
                    <span className="text-sm font-mono text-slate-700 dark:text-slate-300 max-w-[100px] truncate">
                      {profile?.name?.split(' ')[0] || 'User'}
                    </span>
                  </button>

                  {/* Dropdown */}
                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-200 dark:border-gray-800 py-2 z-50">
                      <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-800">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{profile?.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{profile?.email}</p>
                      </div>
                      <Link href="/dashboard" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-500/10 transition-colors">
                        <LayoutDashboard className="w-4 h-4" /> Dashboard
                      </Link>
                      <Link href="/profile" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-500/10 transition-colors">
                        <Settings className="w-4 h-4" /> Edit Profile
                      </Link>
                      <div className="border-t border-gray-100 dark:border-gray-800 mt-1 pt-1">
                        <button onClick={handleSignOut} className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors w-full">
                          <LogOut className="w-4 h-4" /> Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* Guest: Login + Join */
                <>
                  <Button asChild variant="ghost" className="text-slate-500 dark:text-slate-400 hover:text-green-600 dark:hover:text-green-400 font-mono text-sm">
                    <Link href="/auth/login">Sign In</Link>
                  </Button>
                  <Button asChild className="bg-green-600/90 hover:bg-green-500 text-white font-mono text-sm rounded-lg px-5 shadow-lg shadow-green-900/20 hover:shadow-green-500/20 border border-green-500/20 hover:border-green-400/40 transition-all group">
                    <Link href="/auth/signup">
                      <span className="mr-1 text-green-300/60">&gt;</span>
                      Join Now
                      <ChevronRight className="ml-1 h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </Button>
                </>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <div className="flex items-center lg:hidden gap-2">
               <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="text-slate-500 dark:text-slate-300 hover:text-green-700 dark:hover:text-white hover:bg-green-50 dark:hover:bg-white/10"
              >
                 <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                 <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              </Button>
              <Button
                variant="ghost" 
                size="icon"
                onClick={() => setIsOpen(true)}
                className="text-slate-700 dark:text-white hover:bg-green-50 dark:hover:bg-white/10"
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
          "fixed inset-y-0 right-0 z-[70] w-[80vw] sm:w-[320px] bg-white dark:bg-[#020a04] shadow-2xl transition-transform duration-300 ease-out lg:hidden border-l border-green-200 dark:border-green-500/10 flex flex-col",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
         {/* Sidebar glow */}
         <div className="absolute top-0 left-0 w-[1px] h-full bg-gradient-to-b from-green-500/30 via-green-500/10 to-transparent" />
         
         <div className="flex items-center justify-between p-6 border-b border-green-200 dark:border-green-500/10">
            <span className="font-mono text-sm text-green-600 dark:text-green-400 tracking-wider">// NAVIGATION</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-slate-500 hover:text-green-400 hover:bg-green-500/10 rounded-lg"
            >
              <X className="h-5 w-5" />
            </Button>
         </div>

         <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
            {[...navLinks, ...(user ? authNavLinks.map(l => ({ ...l })) : [])].map((link) => {
              if ('children' in link && link.children) {
                const isChildActive = link.children.some((child: { href: string }) => pathname === child.href);
                const isExpanded = mobileExpanded === link.name;
                return (
                  <div key={link.name}>
                    <button
                      onClick={() => setMobileExpanded(isExpanded ? null : link.name)}
                      className={cn(
                        "flex items-center justify-between w-full p-3 rounded-lg text-sm font-mono transition-all",
                        isChildActive
                          ? "bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 border border-green-200 dark:border-green-500/20"
                          : "text-slate-600 dark:text-slate-400 hover:bg-green-50 dark:hover:bg-green-500/5 hover:text-green-600 dark:hover:text-green-300 border border-transparent"
                      )}
                    >
                      <span className="flex items-center gap-2">
                        <span className="text-green-500/40 text-xs">&gt;</span>
                        {link.name}
                      </span>
                      <ChevronDown className={cn("w-3 h-3 transition-transform", isExpanded && "rotate-180")} />
                    </button>
                    {isExpanded && (
                      <div className="ml-6 mt-1 space-y-0.5">
                        {link.children.map((child: { name: string; href: string }) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={cn(
                              "block p-2.5 rounded-lg text-sm font-mono transition-all",
                              pathname === child.href
                                ? "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-500/10"
                                : "text-slate-500 dark:text-slate-500 hover:text-green-600 dark:hover:text-green-300"
                            )}
                            onClick={() => setIsOpen(false)}
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              const href = (link as { href: string }).href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "flex items-center justify-between p-3 rounded-lg text-sm font-mono transition-all",
                    pathname === href
                      ? "bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 border border-green-200 dark:border-green-500/20"
                      : "text-slate-600 dark:text-slate-400 hover:bg-green-50 dark:hover:bg-green-500/5 hover:text-green-600 dark:hover:text-green-300 border border-transparent"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-green-500/40 text-xs">&gt;</span>
                    {link.name}
                  </span>
                  {pathname === href && <ChevronRight className="h-3 w-3" />}
                </Link>
              );
            })}
         </div>

         <div className="p-6 border-t border-green-500/10 space-y-2">
            {user ? (
              <>
                <Button asChild variant="outline" className="w-full h-11 rounded-lg font-mono text-sm border-green-200 dark:border-green-500/20 text-green-700 dark:text-green-400">
                  <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                    <LayoutDashboard className="w-4 h-4 mr-2" /> Dashboard
                  </Link>
                </Button>
                <button
                  onClick={() => { handleSignOut(); setIsOpen(false); }}
                  className="w-full h-11 rounded-lg font-mono text-sm text-red-600 dark:text-red-400 border border-red-200 dark:border-red-500/20 hover:bg-red-50 dark:hover:bg-red-500/10 flex items-center justify-center gap-2 transition-colors"
                >
                  <LogOut className="w-4 h-4" /> Sign Out
                </button>
              </>
            ) : (
              <>
                <Button asChild variant="outline" className="w-full h-11 rounded-lg font-mono text-sm border-green-200 dark:border-green-500/20">
                  <Link href="/auth/login" onClick={() => setIsOpen(false)}>
                    Sign In
                  </Link>
                </Button>
                <Button asChild className="w-full bg-green-600/90 hover:bg-green-500 text-white h-11 rounded-lg font-mono text-sm shadow-lg shadow-green-900/20 border border-green-500/20">
                  <Link href="/auth/signup" onClick={() => setIsOpen(false)}>
                    <span className="text-green-300/60 mr-1">&gt;</span>
                    Join Now
                  </Link>
                </Button>
              </>
            )}
         </div>
      </div>
    </>
  );
};

export default Navbar;
