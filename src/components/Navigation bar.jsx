import React, { useState, useEffect, useRef } from 'react';
import logo from '../assets/notesnap-logo.svg';
import Button from './Button';
import gsap from 'gsap';

/**
 * NavigationBar Component
 * 
 * Features:
 * 1. Scroll Detection: Changes height/opacity on scroll for a "sticky-glass" effect.
 * 2. Responsive Mobile Menu: GSAP-powered side drawer for mobile users.
 * 3. Custom Hamburger: CSS-transformed bar animation (requested style).
 * 4. Smooth Anchor Links: Handles scrolling to #features, #process, etc.
 */
const NavigationBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const drawerRef = useRef(null);
  const backdropRef = useRef(null);

  // --- LOGIC: Scroll Detection ---
  // We detect if the user has scrolled more than 20px to shrink the navbar
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- GSAP: Mobile Menu Animation ---
  // We use GSAP to slide the drawer in from the right and fade the backdrop
  useEffect(() => {
    if (isOpen) {
      // Open Timeline
      const tl = gsap.timeline();
      tl.to(backdropRef.current, { opacity: 1, pointerEvents: 'auto', duration: 0.3 })
        .to(drawerRef.current, { x: 0, duration: 0.5, ease: "power3.out" }, "-=0.2");
    } else {
      // Close Timeline
      const tl = gsap.timeline();
      tl.to(drawerRef.current, { x: '100%', duration: 0.4, ease: "power3.in" })
        .to(backdropRef.current, { opacity: 0, pointerEvents: 'none', duration: 0.3 }, "-=0.2");
    }
  }, [isOpen]);

  const navLinks = [
    ['Features', '#features'],
    ['How it Works', '#process'],
    ['About', '#about'],
  ];

  return (
    <>
      {/* 
          Main Nav: 
          Uses dynamic height (h-20 default vs h-16 scrolled) and 
          background transparency for a premium feel.
      */}
      <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${
        scrolled 
          ? 'bg-brand-bg/90 backdrop-blur-lg border-b border-black/5 h-16 shadow-sm' 
          : 'bg-transparent h-20'
      }`}>
        <div className="max-w-[1440px] mx-auto px-6 h-full flex items-center justify-between">
          
          {/* LOGO SECTION */}
          <div 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-3 group cursor-pointer z-[110]"
          >
            <img src={logo} alt="NoteSnap Logo" className="h-10 w-auto transition-transform group-hover:scale-110" />
            <span className={`text-2xl font-dela tracking-tight transition-colors ${scrolled ? 'text-brand-text' : 'text-brand-text'}`}>
              NoteSnap
            </span>
          </div>

          {/* DESKTOP NAV LINKS */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map(([label, href]) => (
              <a 
                key={label}
                href={href}
                className="relative text-base font-sk font-bold text-gray-500 hover:text-brand-text transition-colors tracking-wide py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-brand-text after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-300"
              >
                {label}
              </a>
            ))}
          </div>

          {/* HEADER ACTIONS (Desktop CTA + Mobile Hamburger) */}
          <div className="flex items-center gap-6">
            <Button variant="primary" className="hidden sm:flex text-base px-2.5 py-1">
              Try Free
            </Button>

            {/* CUSTOM HAMBURGER TOGGLE */}
            <div 
              className={`nav-toggle flex md:hidden flex-col items-center justify-center gap-2 z-[120] ${isOpen ? 'is-open' : ''}`}
              onClick={() => setIsOpen(!isOpen)}
            >
              <div className="bar" id="bar1" />
              <div className="bar" id="bar2" />
              <div className="bar" id="bar3" />
            </div>
          </div>
        </div>
      </nav>

      {/* MOBILE DRAWER BACKDROP */}
      <div 
        ref={backdropRef}
        onClick={() => setIsOpen(false)}
        className="drawer-backdrop md:hidden"
      />

      {/* MOBILE DRAWER CONTENT */}
      <div ref={drawerRef} className="mobile-drawer md:hidden">
        <ul className="flex flex-col gap-8 mb-12">
          {navLinks.map(([label, href], i) => (
            <li key={label}>
              <a 
                href={href}
                onClick={() => setIsOpen(false)}
                className="text-4xl font-dela text-brand-text hover:text-brand-action transition-colors block"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* DRAWER CTA */}
        <Button 
          variant="primary" 
          onClick={() => setIsOpen(false)}
          className="w-full py-4 text-xl"
        >
          Get Started Free
        </Button>

        {/* DECORATIVE ELEMENT */}
        <div className="mt-auto opacity-20 text-xs font-sk tracking-widest uppercase">
          NoteSnap © 2024
        </div>
      </div>
    </>
  );
};

export default NavigationBar;
