import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Stage1, Stage2, Stage3, Stage4, Stage5, Stage6 } from '../UIMockupLab';

gsap.registerPlugin(ScrollTrigger);

const HOW_IT_WORKS_STEPS = [
  {
    title: "Join the Snap",
    description: "Create your account in seconds and unlock your digital memory. Your journey to clarity starts here.",
    Mockup: Stage1,
    bgColor: "bg-brand-bg",
    rightBg: "bg-gray-50",
    textColor: "text-brand-text",
    accentColor: "text-brand-action"
  },
  {
    title: "Capture Chaos",
    description: "Upload photos of your handwritten notes or whiteboards directly. Our system accepts all formats.",
    Mockup: Stage2,
    bgColor: "bg-gray-50",
    rightBg: "bg-brand-bg",
    textColor: "text-brand-text",
    accentColor: "text-brand-action"
  },
  {
    title: "AI Magic",
    description: "Our AI instantly transcribes and structures your messy scribbles into organized digital units.",
    Mockup: Stage3,
    bgColor: "bg-brand-text",
    rightBg: "bg-[#181818]",
    textColor: "text-brand-bg",
    accentColor: "text-brand-action",
    isDark: true
  },
  {
    title: "Instant Clarity",
    description: "Messy notes become clean, professional summaries instantly. Beautifully formatted and ready to read.",
    Mockup: Stage4,
    bgColor: "bg-brand-bg",
    rightBg: "bg-gray-50",
    textColor: "text-brand-text",
    accentColor: "text-brand-action"
  },
  {
    title: "Smart Library",
    description: "Everything is categorized and searchable. Never lose an idea or an action item again.",
    Mockup: Stage5,
    bgColor: "bg-gray-50",
    rightBg: "bg-brand-bg",
    textColor: "text-brand-text",
    accentColor: "text-brand-action"
  },
  {
    title: "Share Anywhere",
    description: "Export insights to Notion, Slack, or Google Docs directly from your browser in one click.",
    Mockup: Stage6,
    bgColor: "bg-brand-text",
    rightBg: "bg-brand-text",
    textColor: "text-brand-bg",
    accentColor: "text-brand-action",
    isDark: true
  }
];

const HowItWorks = ({ id }) => {
  const containerRef = useRef(null);
  const panelsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const panels = panelsRef.current.filter(Boolean);
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${(panels.length - 1) * 105}%`,
          pin: true,
          scrub: 0.5, // "Goldilocks" smoothing (0.5s catch-up)
          anticipatePin: 1.5,
        }
      });

      panels.forEach((panel, i) => {
        if (i === 0) return;
        
        // "Goldilocks" Cinematic Animation (GPU Optimized)
        tl.fromTo(panel, 
          { 
            yPercent: 100,
            opacity: 0.9,
            scale: 0.99
          },
          { 
            yPercent: 0,
            opacity: 1,
            scale: 1,
            ease: "power2.out",
            duration: 1,
            force3D: true
          },
          i - 1 // Overlap for fluidity
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div id={id} ref={containerRef} className="relative w-full h-screen overflow-hidden">
      {HOW_IT_WORKS_STEPS.map((step, i) => (
        <section
          key={i}
          ref={(el) => (panelsRef.current[i] = el)}
          className="absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden shadow-2xl scroll-panel-gpu"
          style={{ zIndex: i + 10 }}
          >
          {/* Background Split Layer (Aligned to 40/60 Split) */}
          <div className="absolute inset-0 flex">
            <div className={`w-full lg:w-[40%] h-full ${step.bgColor}`}></div>
            <div className={`hidden lg:block w-[60%] h-full border-l ${step.isDark ? 'border-brand-bg/10' : 'border-brand-text/10'} ${step.rightBg}`}></div>
          </div>

          {/* Content Layer (Standardized max-w-[1440px] to match Hero) */}
          <div className="relative z-10 max-w-[1440px] mx-auto w-full h-full grid grid-cols-1 lg:grid-cols-[35%_65%] px-6 sm:px-12">
            
            {/* Left Column: Text (Aligned for consistency with Hero) */}
            <div className={`flex flex-col justify-center lg:pr-12 order-2 lg:order-1 transition-all duration-700`}>
              <span className={`text-6xl md:text-8xl font-dela mb-4 opacity-10 ${step.isDark ? 'text-brand-bg' : 'text-brand-text'}`}>
                0{i + 1}
              </span>
              <h2 className={`text-4xl md:text-5xl lg:text-5xl font-dela ${step.textColor} leading-tight mb-8`}>
                {step.title.split(' ')[0]} <br />
                <span className={step.accentColor}>{step.title.split(' ').slice(1).join(' ')}</span>
              </h2>
              <p className={`font-sk text-lg md:text-xl leading-relaxed max-w-md ${step.isDark ? 'text-brand-bg/60' : 'text-gray-500'}`}>
                {step.description}
              </p>
            </div>

            {/* Right Column: Visual (Live React Component) */}
            <div className="flex items-center justify-center order-1 lg:order-2 h-full py-10 lg:py-0 lg:pl-10">
              {/* Size Controller: Hardware accelerated scale */}
              <div className="relative group w-full scale-110 lg:scale-[1.18] origin-center lg:origin-left">
                {/* Premium Browser Frame */}
                <div className="relative rounded-2xl border-4 border-black/5 overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.15)] bg-white max-h-[75vh]">
                  {/* Fake Browser Window Controls */}
                  <div className="h-6 bg-gray-50 border-b border-gray-100 flex items-center px-4 gap-1.5 shrink-0">
                    <div className="w-2 h-2 rounded-full bg-red-400 opacity-30"></div>
                    <div className="w-2 h-2 rounded-full bg-yellow-400 opacity-30"></div>
                    <div className="w-2 h-2 rounded-full bg-green-400 opacity-30"></div>
                  </div>
                  
                  {/* Live Render Area: Shrunk down for mockup feel */}
                  <div className="w-full aspect-video overflow-hidden relative bg-white">
                    {/* 
                        MOCKUP SCALING LOGIC:
                        The stages are designed for a 1280px width (UI Lab standard).
                        We scale them down here to fit the 65% column width perfectly.
                    */}
                    <div className="absolute top-0 left-0 w-[1280px] h-[720px] origin-top-left scale-[0.45] sm:scale-[0.55] md:scale-[0.65] lg:scale-[0.5] xl:scale-[0.65]">
                      <step.Mockup />
                    </div>
                  </div>
                </div>
                
                {/* Depth Decor */}
                <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl ${step.isDark ? 'bg-brand-bg/20' : 'bg-brand-action/20'} -z-10`}></div>
                <div className={`absolute -bottom-20 -left-20 w-48 h-48 rounded-full blur-3xl ${step.isDark ? 'bg-brand-bg/10' : 'bg-brand-action/10'} -z-10`}></div>
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
};

export default HowItWorks;
