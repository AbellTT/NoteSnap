import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const Preloader = ({ onComplete }) => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const barRef = useRef(null);
  const percentRef = useRef(null);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    // 1. Progress Animation (Fake progress for UX, but waits for actual fonts)
    const interval = setInterval(() => {
      setPercent(prev => {
        if (prev < 90) return prev + Math.floor(Math.random() * 10) + 1;
        return prev;
      });
    }, 150);

    // 2. Detection Logic: Wait for fonts to be officially ready
    document.fonts.ready.then(() => {
      setPercent(100);
      clearInterval(interval);
      
      const tl = gsap.timeline({
        onComplete: () => {
          if (onComplete) onComplete();
        }
      });

      // Exit Animation
      tl.to([textRef.current, barRef.current, percentRef.current], {
        y: -20,
        opacity: 0,
        duration: 0.6,
        ease: "power3.inOut",
        stagger: 0.1
      })
      .to(containerRef.current, {
        yPercent: -100,
        duration: 0.8,
        ease: "power4.inOut"
      });
    });

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-brand-text text-brand-bg pointer-events-auto"
    >
      <div className="relative flex flex-col items-center max-w-xs w-full px-6">
        <h1 
          ref={textRef} 
          className="text-2xl font-bold mb-8 tracking-tighter"
          style={{ fontFamily: 'sans-serif' }} // Use safe system font during load
        >
          NoteSnap
        </h1>
        
        <div ref={percentRef} className="w-full flex justify-between items-end mb-2">
          <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">System Loading</span>
          <span className="text-xl font-mono tabular-nums">{percent}%</span>
        </div>

        {/* Progress Bar Container */}
        <div className="w-full h-[1px] bg-brand-bg/10 relative overflow-hidden">
          <div 
            ref={barRef}
            className="absolute top-0 left-0 h-full bg-brand-action transition-all duration-300 ease-out"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default Preloader;
