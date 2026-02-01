'use client';

import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/components/providers/ThemeProvider';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="bg-white dark:bg-gray-900 shadow dark:border-b dark:border-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/">
            <Image 
              src="/images/logo.png" 
              alt="GURPC Logo" 
              width={180} 
              height={50}
              className="h-12 w-auto object-contain"
              priority
            />
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-600 dark:text-gray-300 hover:text-green-700 dark:hover:text-green-500 transition-colors">
              Home
            </Link>
            <Link href="/events" className="text-gray-600 dark:text-gray-300 hover:text-green-700 dark:hover:text-green-500 transition-colors">
              Events
            </Link>
            <Link href="/contests" className="text-gray-600 dark:text-gray-300 hover:text-green-700 dark:hover:text-green-500 transition-colors">
              Contests
            </Link>
            <Link href="/blog" className="text-gray-600 dark:text-gray-300 hover:text-green-700 dark:hover:text-green-500 transition-colors">
              Blog
            </Link>
            <Link href="/executives" className="text-gray-600 dark:text-gray-300 hover:text-green-700 dark:hover:text-green-500 transition-colors">
              Executives
            </Link>
            <Link href="/projects" className="text-gray-600 dark:text-gray-300 hover:text-green-700 dark:hover:text-green-500 transition-colors">
              Projects
            </Link>
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors" 
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
