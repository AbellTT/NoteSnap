import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Robot from '../components/Robot';

gsap.registerPlugin(ScrollTrigger);

const CTA = () => {
  const sectionRef = useRef(null);
  const robotRef = useRef(null);
  const upperPillsRef = useRef(null);
  const lowerPillsRef = useRef(null);
  const staticContentRef = useRef(null);
  const buttonRef = useRef(null);

  const chaosWords = "Tame the into every Turn note chaos. clarity.".split(" ");
  const cleanWords = "Tame the chaos. Turn every note into clarity.".split(" ");

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=400%",
          pin: true,
          scrub: 1,
        }
      });

      // --- 1. INITIAL SETUP ---
      gsap.set(buttonRef.current, { opacity: 0, scale: 0.9, y: 20 });
      gsap.set(lowerPillsRef.current, { x: -200, opacity: 0 }); // Hidden start for bottom
      gsap.set('.clean-pill', { opacity: 0, scale: 0.8 });
      
      // Starting position: Robot at top-left of center
      gsap.set(robotRef.current, { x: -400, y: -150 }); 
      gsap.set(upperPillsRef.current, { x: -250, y: -150 });

      // --- 2. THE TOP PUSH (Chaos) ---
      // Robot leans in and pushes
      tl.to(robotRef.current, {
        rotation: 15,
        scale: 0.95,
        duration: 0.2
      }, 0);

      tl.to(['#robot-eye-left', '#robot-eye-right'], {
        scaleY: 0.6,
        duration: 0.2
      }, 0);

      // Pushing across top
      tl.to([robotRef.current, upperPillsRef.current], {
        x: 800,
        duration: 3,
        ease: "none"
      }, 0.2);

      // Fade out at end of top track
      tl.to([robotRef.current, upperPillsRef.current], {
        opacity: 0,
        duration: 0.5
      }, 2.7);

      // --- 3. THE RESET & BOTTOM REVEAL (Clarity) ---
      // Move robot to bottom track (instant while hidden)
      tl.set(robotRef.current, { x: -600, y: 180, rotation: 0, opacity: 0 });
      tl.set(['#robot-eye-left', '#robot-eye-right'], { scaleY: 1.1 }); // Happy eyes

      // Re-appear and bring in clean text
      tl.to(robotRef.current, {
        opacity: 1,
        x: -400,
        duration: 1
      });

      tl.to(lowerPillsRef.current, {
        opacity: 1,
        x: -250,
        duration: 1
      }, "<");

      // Pull across bottom
      tl.to([robotRef.current, lowerPillsRef.current], {
        x: 100,
        duration: 3,
        ease: "power2.inOut"
      });

      tl.to('.clean-pill', {
        opacity: 1,
        scale: 1,
        stagger: 0.1,
        duration: 1,
        ease: "back.out(1.7)"
      }, "-=2.5");

      // --- 4. FINALE ---
      // Robot stands proud, button emerges
      tl.to(robotRef.current, {
        x: 0,
        y: 200, // Move to final resting spot below button
        scale: 1.1,
        duration: 1,
        ease: "power3.out"
      });

      tl.to(buttonRef.current, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1,
        ease: "back.out(1.7)"
      }, "-=0.5");

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen px-6 flex flex-col items-center justify-center bg-brand-bg overflow-hidden font-sk">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-brand-action/5 rounded-full blur-[140px] -z-10"></div>

      <div className="relative w-full max-w-5xl flex flex-col items-center">
        
        {/* CENTER CONTENT (Static) */}
        <div ref={staticContentRef} className="text-center z-10 space-y-8">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-dela text-brand-text leading-tight">
            Ready for <span className="text-brand-action">Clarity?</span>
          </h2>
          
          <div ref={buttonRef}>
            <button className="btn-anim group px-12 py-6 text-2xl font-bold flex items-center gap-4 mx-auto">
                <span className="text-container">
                    <span className="text">Get Started Now</span>
                </span>
                <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
            </button>
            <p className="mt-4 text-gray-400 font-medium italic">
              Free forever for individual users.
            </p>
          </div>
        </div>

        {/* ROBOT tracks (Absolute positioned relative to center) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          
          {/* THE ROBOT (Moving globally) */}
          <div ref={robotRef} className="w-40 h-40 md:w-56 md:h-56">
            <Robot className="w-full h-full" />
          </div>

          {/* UPPER PILLS (Single Row Chaos) */}
          <div ref={upperPillsRef} className="absolute flex gap-3 whitespace-nowrap">
            {chaosWords.map((word, i) => (
              <div key={`chaos-${i}`} className="px-4 py-2 bg-white border border-black/10 rounded-xl text-lg shadow-sm">
                {word}
              </div>
            ))}
          </div>

          {/* LOWER PILLS (Final Clarity) */}
          <div ref={lowerPillsRef} className="absolute flex gap-4 whitespace-nowrap">
            {cleanWords.map((word, i) => (
              <div key={`clean-${i}`} className="clean-pill px-6 py-4 bg-brand-bg border-2 border-brand-action/30 rounded-2xl font-bold text-2xl shadow-xl text-brand-text">
                {word}
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default CTA;
