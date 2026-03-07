import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Helper component for word-by-word reveal
const RevealText = ({ text, className, revealRef, highlightClass }) => {
  const words = text.split(" ");
  return (
    <div className={`relative ${className}`}>
      {/* Dimmed Background */}
      <p className="absolute inset-0 opacity-20" aria-hidden="true">{text}</p>
      {/* Foreground words */}
      <p ref={revealRef} className={`relative z-10 ${highlightClass}`}>
        {words.map((word, i) => (
          <span key={i} className="opacity-0 reveal-word inline-block">{word}&nbsp;</span>
        ))}
      </p>
    </div>
  );
};

const ProblemPlusSolution = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  
  // Card Refs
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const card3Ref = useRef(null);

  // Focus Point Refs
  const focus1Ref = useRef(null);
  const focus2Ref = useRef(null);
  const focus3Ref = useRef(null);

  // Reveal Refs
  const c1TextLeftReveal = useRef(null);
  const c1TextRightReveal = useRef(null);
  const c2TextLeftReveal = useRef(null);
  const c2TextRightReveal = useRef(null);
  const c3TextLeftReveal = useRef(null);
  const c3TextRightReveal = useRef(null);

  // Full Text Container Refs
  const c1TextContainer = useRef(null);
  const c2TextContainer = useRef(null);
  const c3TextContainer = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=1200%",
          pin: true,
          scrub: 1.5,
          anticipatePin: 1,
        }
      });

      const textHeight = textRef.current.offsetHeight;
      const windowHeight = window.innerHeight;
      const centerOffset = (windowHeight / 2) - (textHeight / 2) - 80;

      tl.from(textRef.current, {
        y: centerOffset,
        duration: 0.5,
        ease: "power2.inOut"
      });

      const topOffset = textRef.current.offsetTop + textHeight + 30;
      const finalHeight = windowHeight - topOffset - 10; 
      
      const revealWords = (ref, durationParam) => {
        return tl.to(ref.current.querySelectorAll('.reveal-word'), {
          opacity: 1,
          duration: 0.1, // baseline length per word
          stagger: durationParam / ref.current.querySelectorAll('.reveal-word').length,
          ease: "none"
        });
      };

      // ==========================================
      // CARD 1 SEQUENCE
      // ==========================================
      tl.to(card1Ref.current, {
        top: topOffset, left: '10px', width: 'calc(100% - 20px)', height: finalHeight, 
        borderRadius: '1.5rem', duration: 2, ease: "power3.inOut"
      });
      
      tl.fromTo(focus1Ref.current, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 1, ease: "power2.out" }, "-=1.5" );
      tl.to(focus1Ref.current, { y: -80, duration: 1, ease: "power2.inOut" });
      tl.fromTo(c1TextContainer.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power2.out" }, "<" );

      revealWords(c1TextLeftReveal, 2);
      revealWords(c1TextRightReveal, 2);
      tl.to({}, { duration: 0.5 });


      // ==========================================
      // CARD 2 SEQUENCE
      // ==========================================
      tl.set(card2Ref.current, { zIndex: 40 });
      tl.to(card2Ref.current, {
        top: topOffset + 40, left: '10px', width: 'calc(100% - 20px)', height: finalHeight - 40,
        borderRadius: '1.5rem', duration: 2, ease: "power3.inOut"
      }); 
      
      tl.fromTo(focus2Ref.current, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 1, ease: "power2.out" }, "-=1.5");
      tl.to(focus2Ref.current, { y: -80, duration: 1, ease: "power2.inOut" });
      tl.fromTo(c2TextContainer.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power2.out" }, "<");

      revealWords(c2TextLeftReveal, 2);
      revealWords(c2TextRightReveal, 2);
      tl.to({}, { duration: 0.5 });


      // ==========================================
      // CARD 3 SEQUENCE
      // ==========================================
      tl.set(card3Ref.current, { zIndex: 50 });
      tl.to(card3Ref.current, {
        top: topOffset + 80, left: '10px', width: 'calc(100% - 20px)', height: finalHeight - 80,
        borderRadius: '1.5rem', duration: 2, ease: "power3.inOut"
      }); 
      
      tl.fromTo(focus3Ref.current, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 1, ease: "power2.out" }, "-=1.5");
      tl.to(focus3Ref.current, { y: -80, duration: 1, ease: "power2.inOut" });
      tl.fromTo(c3TextContainer.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power2.out" }, "<");

      revealWords(c3TextLeftReveal, 2);
      revealWords(c3TextRightReveal, 2);

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

      {/* CARD 1: The Problem (Chaos) */}
      <div ref={card1Ref} className="absolute w-[8rem] h-[8rem] left-6 top-[5rem] bg-[#111] rounded-xl z-30 border border-white/5 overflow-hidden flex flex-col items-center justify-center pointer-events-none will-change-[width,height,top,left]">
        
        {/* Abstract Messy Background (GPU Optimized Radial Gradients instead of DOM blurs) */}
        <div className="absolute w-[150%] h-[150%] animate-[spin_40s_linear_infinite] opacity-30">
            <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 rounded-full" style={{ backgroundImage: 'radial-gradient(circle, rgba(239,68,68,0.2) 0%, transparent 70%)' }}></div>
            <div className="absolute bottom-1/4 right-1/4 w-1/2 h-1/2 rounded-full" style={{ backgroundImage: 'radial-gradient(circle, rgba(249,115,22,0.2) 0%, transparent 70%)' }}></div>
        </div>
          
        {/* Center Title */}
        <div ref={focus1Ref} className="relative z-10 text-center flex flex-col items-center opacity-0 scale-95 mt-[-20px]">
            <div className="w-16 h-16 border-2 border-white/10 rounded-full flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h7" />
              </svg>
            </div>
            <span className="block font-sk font-bold tracking-[0.2em] text-[10px] text-white/40 uppercase mb-3 text-center">Phase 01</span>
            <h3 className="font-dela text-4xl md:text-6xl text-white leading-tight text-center">Fragmented <br/><span className="text-white/30 text-3xl md:text-5xl">Information</span></h3>
        </div>

        {/* Narrative Text Container */}
        <div ref={c1TextContainer} className="absolute bottom-[10%] w-full max-w-5xl px-8 flex justify-between items-start gap-12 z-20">
          <RevealText 
            revealRef={c1TextLeftReveal} 
            className="w-3/4 font-sk text-2xl md:text-3xl leading-relaxed text-white" 
            text="You're capturing ideas everywhere. Voice memos, sticky notes, random tabs. It's a mess."
            highlightClass="text-brand-bg"
          />
          <RevealText 
            revealRef={c1TextRightReveal} 
            className="w-3/4 font-sk text-2xl md:text-3xl leading-relaxed text-white" 
            text="The real friction isn't taking notes. It's finding exactly what you need, exactly when you need it."
            highlightClass="text-brand-action"
          />
        </div>
      </div>

      {/* CARD 2: The Action (Processing) */}
      <div ref={card2Ref} className="absolute w-[8rem] h-[8rem] left-10 top-[6rem] bg-gray-50 rounded-xl z-20 border border-brand-text/5 overflow-hidden flex flex-col items-center justify-center pointer-events-none will-change-[width,height,top,left]">
        
        {/* Abstract Aligning Background */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #000 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
          
        {/* Center Title */}
        <div ref={focus2Ref} className="relative z-10 text-center flex flex-col items-center opacity-0 scale-95 mt-[-20px]">
            <div className="w-16 h-16 bg-brand-action/10 rounded-2xl flex items-center justify-center mb-6 animate-pulse">
              <svg className="w-6 h-6 text-brand-action" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="block font-sk font-bold tracking-[0.2em] text-[10px] text-brand-text/40 uppercase mb-3 text-center">Phase 02</span>
            <h3 className="font-dela text-4xl md:text-6xl text-brand-text leading-tight text-center">Intelligent <br/><span className="text-brand-text/30 text-3xl md:text-5xl">Structuring</span></h3>
        </div>

        {/* Narrative Text Container */}
        <div ref={c2TextContainer} className="absolute bottom-[10%] w-full max-w-5xl px-8 flex justify-between items-start gap-12 z-20">
          <RevealText 
            revealRef={c2TextLeftReveal} 
            className="w-1/2 font-sk text-2xl md:text-3xl leading-relaxed text-brand-text" 
            text="NoteSnap's engine acts as a digital librarian, decoding the chaos behind the scenes."
            highlightClass="text-brand-text"
          />
          <RevealText 
            revealRef={c2TextRightReveal} 
            className="w-1/2 font-sk text-2xl md:text-3xl leading-relaxed text-brand-text" 
            text="Action items pop out. Dates align automatically. Your scattered thoughts are instantly organized."
            highlightClass="text-brand-action"
          />
        </div>
      </div>

      {/* CARD 3: The Result (Clarity) */}
      <div ref={card3Ref} className="absolute w-[8rem] h-[8rem] left-14 top-[7rem] bg-brand-text rounded-xl z-10 border border-white/10 overflow-hidden flex flex-col items-center justify-center pointer-events-none will-change-[width,height,top,left]">
        
        {/* Abstract Structured Background */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <div className="w-[80%] h-[1px] bg-gradient-to-r from-transparent via-brand-action to-transparent shadow-[0_0_15px_rgba(255,51,102,0.8)]"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center opacity-5 rotate-90">
            <div className="w-[50%] h-[1px] bg-gradient-to-r from-transparent via-brand-action to-transparent shadow-[0_0_15px_rgba(255,51,102,0.8)]"></div>
        </div>

        {/* Center Title */}
        <div ref={focus3Ref} className="relative z-10 text-center flex flex-col items-center opacity-0 scale-95 mt-[-20px]">
            <div className="w-16 h-16 bg-brand-bg rounded-2xl flex items-center justify-center mb-3 shadow-[0_0_30px_rgba(255,255,255,0.05)]">
              <svg className="w-6 h-6 text-brand-text" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="block font-sk font-bold tracking-[0.2em] text-[10px] text-white/40 uppercase mb-2 text-center">Phase 03</span>
            <h3 className="font-dela text-4xl md:text-6xl text-brand-bg leading-tight text-center">Absolute <br/><span className="text-brand-bg/40 text-3xl md:text-5xl">Clarity</span></h3>
        </div>

        {/* Narrative Text Container */}
        <div ref={c3TextContainer} className="absolute bottom-[10%] w-full max-w-5xl px-8 flex justify-between items-start gap-12 z-20">
          <RevealText 
            revealRef={c3TextLeftReveal} 
            className="w-1/2 font-sk text-2xl md:text-3xl leading-relaxed text-brand-bg" 
            text="What used to take hours of manual formatting is now ready before you even asked."
            highlightClass="text-brand-bg"
          />
          <RevealText 
            revealRef={c3TextRightReveal} 
            className="w-1/2 font-sk text-2xl md:text-3xl leading-relaxed text-brand-bg" 
            text="Stop managing your notes. Start acting on your ideas with absolute clarity."
            highlightClass="text-brand-action"
          />
        </div>
      </div>
    </section>
  )
}

export default ProblemPlusSolution;
