"use client";

import React from 'react';
import { Menu } from 'lucide-react';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-white flex items-center justify-between px-6 py-4 md:px-12 md:py-6 border-b border-transparent transition-all duration-300">
        {/* Logo Section */}
          <a 
            href="/" 
            aria-label="Go to homepage" 
            className="flex items-center"
          >
            <span className="text-2xl font-normal tracking-tighter text-black">
              EXECUTE
            </span>
          </a>

        {/* Mobile Menu Button - Visible on mobile Only */}
        <button 
          aria-label="Toggle navigation menu" 
          className="md:hidden p-2 text-google-gray focus:outline-none"
        >
          <Menu size={24} />
        </button>

        {/* Navigation Links */}
        <nav aria-label="Main navigation" className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-8 list-none m-0 p-0">
            <li>
              <a 
                href="#features" 
                className="text-sm font-normal text-black/60 hover:text-black transition-colors"
              >
                Features
              </a>
            </li>
            <li>
              <a 
                href="#showcase" 
                className="text-sm font-normal text-black/60 hover:text-black transition-colors"
              >
                Showcase
              </a>
            </li>
            <li>
              <a 
                href="#faq" 
                className="text-sm font-normal text-black/60 hover:text-black transition-colors"
              >
                FAQ
              </a>
            </li>
            
            {/* CTA Button */}
            <li>
              <a 
                href="mailto:abhinav@execute.agency" 
                className="inline-block px-6 py-2.5 text-sm font-normal text-white bg-black border border-black rounded-full hover:bg-white hover:text-black transition-all duration-200"
              >
                Contact Abhinav
              </a>
            </li>
          </ul>
        </nav>

      {/* Inline styles to match specific Google Sans variants if font-family in globals is overridden */}
      <style jsx global>{`
        header {
          font-family: 'Inter', sans-serif;
        }
      `}</style>
    </header>
  );
};

export default Header;
