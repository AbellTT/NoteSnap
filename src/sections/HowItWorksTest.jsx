import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TEST_STEPS = [
  { title: "Step 01", color: "bg-red-500" },
  { title: "Step 02", color: "bg-blue-500" },
  { title: "Step 03", color: "bg-green-500" },
  { title: "Step 04", color: "bg-yellow-500" },
  { title: "Step 05", color: "bg-purple-500" },
  { title: "Step 06", color: "bg-orange-500" },
];

const HowItWorksTest = ({ id }) => {
  const triggerRef = useRef(null);
  const containerRef = useRef(null);
  const panelsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const panels = panelsRef.current.filter(Boolean);
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "+=600%", // Clean 6-viewport runway
          pin: true,
          scrub: 1.5, // Match ProblemPlusSolution
          pinSpacing: true,
          // Removed anticipatePin which often causes jumps
        }
      });

      // Initially set all panels except the first to be off-screen
      panels.forEach((panel, i) => {
        if (i > 0) {
          gsap.set(panel, { y: "100%" });
        }
      });

      // Create the stacking sequence
      panels.forEach((panel, i) => {
        if (i === 0) {
           // Provide a "breath" for the first section
           tl.to({}, { duration: 0.5 });
           return;
        }
        
        tl.to(panel, { 
          y: "0%",
          ease: "none",
          duration: 1,
          immediateRender: false
        });

        // "Deserved space" after each slide
        tl.to({}, { duration: 0.5 });
      });

      // Final buffer to prevent abrupt unpin
      tl.to({}, { duration: 0.5 });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div id={id} ref={triggerRef} className="w-full">
      <div className="relative w-full h-screen overflow-hidden">
        {TEST_STEPS.map((step, i) => (
          <section
            key={i}
            ref={(el) => (panelsRef.current[i] = el)}
            className={`absolute inset-0 w-full h-full flex items-center justify-center ${step.color} border-b border-black/10`}
            style={{ zIndex: i + 10 }}
          >
            <div className="text-center">
              <h2 className="text-9xl font-dela text-white">{step.title}</h2>
              <p className="text-white/50 font-sk font-bold uppercase tracking-widest mt-4">Safe Logic Test</p>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default HowItWorksTest;
