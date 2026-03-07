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
          pin: containerRef.current,
          start: "top top",
          end: `+=${panels.length * 100}%`, // Each panel gets 100vh of scroll
          scrub: 1,
          anticipatePin: 1,
        }
      });

      // Panel 01 is static. Others slide over it.
      panels.forEach((panel, i) => {
        if (i === 0) return;
        
        tl.fromTo(panel, 
          { yPercent: 100 },
          { 
            yPercent: 0,
            ease: "none",
            duration: 1
          }
        );
        // Small pause between slides
        tl.to({}, { duration: 0.2 });
      });

      // Final buffer
      tl.to({}, { duration: 0.5 });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div id={id} ref={triggerRef} className="relative w-full">
      <div ref={containerRef} className="relative w-full h-screen overflow-hidden">
        {TEST_STEPS.map((step, i) => (
          <section
            key={i}
            ref={(el) => (panelsRef.current[i] = el)}
            className={`absolute inset-0 w-full h-full flex items-center justify-center ${step.color}`}
            style={{ zIndex: i + 10 }}
          >
            <h2 className="text-9xl font-dela text-white">{step.title}</h2>
          </section>
        ))}
      </div>
    </div>
  );
};

export default HowItWorksTest;
