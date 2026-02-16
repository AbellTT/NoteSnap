import React, { useState, useEffect, useRef } from 'react';
import logo from '../assets/notesnap-logo.svg';
import Button from './Button';
import gsap from 'gsap';

/**
 * NavigationBar Component
 * 
 * Features:
 * 1. Scroll Detection: Changes height/opacity on scroll for a "sticky-glass" effect.
 * 2. Responsive Mobile Menu: GSAP-powered side drawer for mobile use+56y778yrs.
 * 3. Custom Hamburger: CSS-transformed bar animation (requested style).
 * 4. Smooth Anchor Links: Handles scrolling to #features, #process, etc.
 */
const NavigationBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const drawerRef = useRef(null);
  const backdropRef = useRef(null);
  const NavBarRef= useRef(null);
  const toggleContainerRef = useRef(null);
  // --- LOGIC: Scroll Detection ---s
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- GSAP: Cinematic Entry Animation (Runs once on mount) ---
  useEffect(() => {
    // 1. Create a GSAP Context for clean-up (avoids double-animation in Dev mode)
    let ctx = gsap.context(() => {
      // Synchronize Entrance: Both Navbar and Toggle arrive together
      gsap.fromTo([NavBarRef.current, toggleContainerRef.current], 
        { yPercent: -100, opacity: 0 }, 
        { 
          yPercent: 0, 
          opacity: 1, 
          duration: 1.2, 
          ease: "power4.out", 
          delay: 0.2,
          force3D: true // GPU acceleration
        }
      );
    });
    
    return () => ctx.revert(); // Clean up animation when component unmounts
  }, []); // Empty dependency array ensures this ONLY runs once on page load

  // --- GSAP: Mobile Menu Animation ---
  useEffect(() => {
    if (isOpen) {
      const tl = gsap.timeline();
      tl.to(backdropRef.current, { opacity: 1, pointerEvents: 'auto', duration: 0.3 })
        .to(drawerRef.current, { x: 0, duration: 0.5, ease: "power3.out" }, "-=0.2");
    } else {
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
    <div className="relative">
      {/* 
          1. MAIN NAVIGATION LAYER (Lower Z-Index)
          - z-50 ensures it is occluded (covered) by the backdrop and drawer.
          - Contains all visual branding and desktop interaction.
      */}
      <nav 
        ref={NavBarRef}
        className={`fixed top-0 left-0 w-full z-[50] transition-[height,background-color,backdrop-filter,border-color,box-shadow] duration-300 ${
          scrolled 
            ? 'bg-brand-bg/50 backdrop-blur-lg border-b border-black/5 h-16 shadow-sm' 
            : 'bg-transparent h-20'
          }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 h-full flex items-center justify-between">
          
          {/* LOGO SECTION */}
          <div 
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setIsOpen(false);
            }}
            className="flex items-center gap-3 group cursor-pointer"
          >
            <img src={logo} alt="NoteSnap Logo" className="h-10 w-auto transition-transform group-hover:scale-110" />
            <span className="text-2xl font-dela tracking-tight transition-colors text-brand-text">
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

          {/* HEADER ACTIONS */}
          <div className="flex items-center gap-6">
            <Button variant="primary" className="hidden sm:flex text-base px-2.5 py-1">
              Try Free
            </Button>
            
            {/* 
                LAYOUT SPACER
                - Invisible on desktop, maintains symmetry on mobile since 
                  the actual toggle is positioned in the secondary layer.
            */}
            <div className="w-[40px] md:hidden" aria-hidden="true" />
          </div>
        </div>
      </nav>

      {/* 
          2. INVISIBLE INTERACTION LAYER (Highest Z-Index)
          - Fixed at z-210 so the toggle stays on top of the drawer (z-150).
          - Uses 'pointer-events-none' to let clicks pass through to the nav links below.
          - But the toggle itself has 'pointer-events-auto' so you can open/close the menu.
          - Replicates the h-20/h-16 height for perfect alignment during scroll.
      */}
      <div 
        ref={toggleContainerRef}
        className={`fixed top-0 left-0 w-full z-[210] pointer-events-none transition-[height] duration-300 ${
        scrolled ? 'h-16' : 'h-20'
        }`}>
        <div className="max-w-[1440px] mx-auto px-6 h-full flex items-center justify-end">
          <div 
            className={`nav-toggle md:hidden pointer-events-auto ${isOpen ? 'is-open' : ''}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="bar" id="bar1" />
            <div className="bar" id="bar2" />
            <div className="bar" id="bar3" />
          </div>
        </div>
      </div>

      {/* 3. MOBILE DRAWER COMPONENTS (Layered in between) */}
      <div 
        ref={backdropRef}
        onClick={() => setIsOpen(false)}
        className="drawer-backdrop md:hidden"
      />

      <div ref={drawerRef} className="mobile-drawer md:hidden">
        <div className="flex-1 overflow-y-auto no-scrollbar">
          <ul className="flex flex-col gap-6 mb-8">
            {navLinks.map(([label, href]) => (
              <li key={label}>
                <a 
                  href={href}
                  onClick={() => setIsOpen(false)}
                  className="text-2xl font-dela text-brand-text hover:text-brand-action transition-colors block"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          <Button 
            variant="primary" 
            onClick={() => setIsOpen(false)}
            className="w-full py-3 text-xl mb-8"
          >
            Get Started Free
          </Button>
        </div>

        {/* Branding placeholder */}
        <div className="mt-auto pt-6 opacity-20 text-xs font-sk tracking-widest uppercase border-t border-black/5">
          NoteSnap © 2024
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
