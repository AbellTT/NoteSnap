import React from 'react';
import logo from '../assets/notesnap-logo.svg';
import Button from './Button';

const NavigationBar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-brand-bg/80 backdrop-blur-md border-b border-black/5">
      <div className="max-w-[1440px] mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-3 group cursor-pointer"
        >
          <img src={logo} alt="NoteSnap Logo" className="h-10 w-auto transition-transform group-hover:scale-105" />
          <span className="text-2xl font-dela tracking-tight text-brand-text">NoteSnap</span>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-10">
          {[
            ['Features', '#features'],
            ['How it Works', '#process'],
            ['About', '#about'],
          ].map(([label, href]) => (
            <a 
              key={label}
              href={href}
              className="relative text-base font-sk font-bold text-gray-500 hover:text-brand-text transition-colors tracking-wide py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-brand-text after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-300"
            >
              {label}
            </a>
          ))}
        </div>

        {/* Action Button */}
        <Button variant="primary" className="text-base px-2.5 py-1">
          Try Free
        </Button>
      </div>
    </nav>
  );
};

export default NavigationBar;
