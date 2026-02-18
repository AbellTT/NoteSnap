import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CardSwap, { Card } from '../components/CardSwap';

gsap.registerPlugin(ScrollTrigger);

const Benefits = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const swapContainerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade in text and swap container on scroll
      gsap.from(textRef.current, {
        opacity: 0,
        x: -50,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        }
      });

      gsap.from(swapContainerRef.current, {
        opacity: 0,
        x: 50,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const features = [
    {
      title: "Fast Summaries",
      description: "Turn any notes into concise summaries instantly.",
      icon: (color) => (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      title: "Organized by Topic",
      description: "Automatically categorized notes.",
      icon: (color) => (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 19V9C22 7.89543 21.1046 7 20 7H12L10 4H4C2.89543 4 2 4.89543 2 6V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      title: "Searchable Notes",
      description: "Find anything in seconds.",
      icon: (color) => (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="11" cy="11" r="8" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M21 21L16.65 16.65" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      title: "Easy Sharing",
      description: "Send clean notes anywhere.",
      icon: (color) => (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 2L11 13" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    }
  ];

  const [cardDimensions, setCardDimensions] = React.useState({ width: 340, height: 420 });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 480) {
        setCardDimensions({ width: 260, height: 320 });
      } else if (window.innerWidth < 768) {
        setCardDimensions({ width: 300, height: 380 });
      } else {
        setCardDimensions({ width: 340, height: 420 });
      }
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-[80vh] flex items-center justify-center py-20 px-6 sm:px-12 md:px-20 overflow-hidden">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        
        {/* Left Column: Text Content */}
        <div ref={textRef} className="z-10 text-center lg:text-left">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-dela text-brand-text leading-tight mb-8">
            Effortless Clarity <br />
            <span className="text-brand-action">at your fingertips.</span>
          </h2>
          <p className="text-gray-500 font-sk text-lg md:text-xl leading-relaxed max-w-xl mx-auto lg:mx-0">
            NoteSnap is designed to give your brain a break. We handle the heavy lifting of organizing and summarizing so you can focus on the big ideas.
          </p>
          
          <div className="mb-12 mt-12 flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start">
             <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-brand-action/10 flex items-center justify-center text-brand-action text-xl font-bold">
                    1
                </div>
                <p className="font-sk text-brand-text font-medium">Capture everything</p>
             </div>
             <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-brand-action/10 flex items-center justify-center text-brand-action text-xl font-bold">
                    2
                </div>
                <p className="font-sk text-brand-text font-medium">Automate organization</p>
             </div>
          </div>
        </div>

        {/* Right Column: CardSwap Animation */}
        <div ref={swapContainerRef} className="relative flex mt-15 justify-start md:items-center md:justify-center h-[400px] sm:h-[450px] lg:h-auto min-h-[350px]">
          <CardSwap 
            width={cardDimensions.width} 
            height={cardDimensions.height} 
            cardDistance={40} 
            verticalDistance={40}
            className="translate-x-0 translate-y-0"
          >
            {features.map((f, i) => {
              const isDark = i % 2 !== 0; // Alternate: 0 light, 1 dark, 2 light, 3 dark
              const bgColor = isDark ? "bg-brand-text" : "bg-brand-bg";
              const textColor = isDark ? "text-brand-bg" : "text-brand-text";
              const descColor = isDark ? "text-brand-bg/60" : "text-gray-500";
              const strokeColor = isDark ? "#fdfdfd" : "#151515";

              return (
                <Card key={i} className={`group ${bgColor}`}>
                  <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                    {f.icon(strokeColor)}
                  </div>
                  <h3 className={`text-2xl font-dela ${textColor} mb-4`}>
                    {f.title}
                  </h3>
                  <p className={`${descColor} font-sk text-lg leading-relaxed`}>
                    {f.description}
                  </p>
                  <div className={`absolute bottom-6 left-1/2 -translate-x-1/2 w-12 h-1 ${isDark ? "bg-brand-bg/20" : "bg-brand-action/20"} rounded-full overflow-hidden`}>
                      <div 
                        className={`h-full ${isDark ? "bg-brand-bg" : "bg-brand-action"} animate-[pulse_2s_infinite]`}
                        style={{ width: `${((i + 1) / features.length) * 100}%` }}
                      ></div>
                  </div>
                </Card>
              );
            })}
          </CardSwap>
        </div>

      </div>
      
      {/* Background Decor */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-action/5 rounded-full blur-[100px] -z-10"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-brand-action/5 rounded-full blur-[100px] -z-10"></div>
    </section>
  );
};

export default Benefits;
