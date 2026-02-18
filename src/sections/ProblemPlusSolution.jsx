import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ProblemPlusSolution = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const card3Ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=500%", // Longer scroll distance for more phases
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        }
      });

      // Phase 1: Text starts centered (we animate FROM center TO top)
      // We assume the CSS positions it at the top (final state).
      // So we animate 'from' a centered position.
      const textHeight = textRef.current.offsetHeight;
      const windowHeight = window.innerHeight;
      const centerOffset = (windowHeight / 2) - (textHeight / 2) - 80; // Approximate centering considering padding

      tl.from(textRef.current, {
        y: centerOffset,
        duration: 0.5,
        ease: "power2.inOut"
      });

      // Phase 2: Card 1 Expansion (Start with the TOP card of the deck)
      const topOffset = textRef.current.offsetTop + textHeight + 30;
      const finalHeight = windowHeight - topOffset - 10; // Subtract 10 for bottom space
      
      tl.to(card1Ref.current, {
        top: topOffset, 
        left: '10px', 
        width: 'calc(100% - 20px)',
        height: finalHeight, 
        borderRadius: '1.5rem', 
        duration: 1.5,
        ease: "power3.inOut"
      }, "<"); // Start with phase 2

      // Phase 3: Card 2 Expansion (Slides up to cover Card 1)
      tl.set(card2Ref.current, { zIndex: 40 }, ">"); // Elevate to top of pile
      tl.to(card2Ref.current, {
        top: topOffset + 40, 
        left: '10px',
        width: 'calc(100% - 20px)',
        height: finalHeight - 40,
        borderRadius: '1.5rem', 
        duration: 1.5,
        ease: "power3.inOut",
      }, "<"); 

      // Phase 4: Card 3 Expansion (Slides up to cover Card 2)
      tl.set(card3Ref.current, { zIndex: 50 }, ">"); // Elevate to top of pile
      tl.to(card3Ref.current, {
        top: topOffset + 80, 
        left: '10px',
        width: 'calc(100% - 20px)',
        height: finalHeight - 80,
        borderRadius: '1.5rem', 
        duration: 1.5,
        ease: "power3.inOut"
      }, "<"); 

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen pt-20 flex flex-col overflow-hidden px-6">
      <div ref={textRef} className="relative flex flex-col items-center justify-center z-40">
        <h1 className="text-4xl md:text-5xl lg:text-6xl min-[1150px]:text-[5rem] xl:text-7xl font-dela leading-[1.1] mb-7 tracking-tight text-center text-brand-text">
          From chaos to clarity
        </h1>
        <p className="max-w-2xl text-gray-500 font-sk text-lg md:text-xl lg:text-2xl leading-relaxed mb-10 text-center">
          Turn messy, scattered notes into clean, structured insights in seconds. NoteSnap helps you focus on what matters — without the clutter.
        </p>
      </div>

      {/* Stacked cards effect - bottom to top */}
      {/* We set card3 at the bottom (z-10) and card1 at the top (z-30) */}
      {/* Since they expand in 3 -> 2 -> 1 order, they naturally stack upwards without flickering */}
      <div ref={card1Ref} className="absolute w-[8rem] h-[8rem] left-6 top-[5rem] bg-brand-text rounded-xl z-30 border border-white/10 shadow-lg"></div>
      <div ref={card2Ref} className="absolute w-[8rem] h-[8rem] left-10 top-[6rem] bg-brand-bg rounded-xl z-20 border border-brand-text/15 shadow-md"></div>
      <div ref={card3Ref} className="absolute w-[8rem] h-[8rem] left-14 top-[7rem] bg-brand-text rounded-xl z-10 shadow-2xl border border-white/10"></div>
    </section>
  )
}

export default ProblemPlusSolution;
