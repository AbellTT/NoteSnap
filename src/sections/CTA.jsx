import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Robot from '../components/Robot';

gsap.registerPlugin(ScrollTrigger);

const CTA = () => {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const robotRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Headline reveal
      gsap.from(headlineRef.current, {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        }
      });

      // Robot waving animation (Looping)
      const waveTl = gsap.timeline({ repeat: -1 });
      const leftArm = robotRef.current?.querySelector('#robot-arm-left');
      
      if (leftArm) {
        waveTl.to(leftArm, {
          rotation: 20,
          transformOrigin: "top right",
          duration: 0.6,
          ease: "power1.inOut"
        }).to(leftArm, {
          rotation: -10,
          transformOrigin: "top right",
          duration: 0.6,
          ease: "power1.inOut"
        });
      }

      // Robot entrance
      gsap.from(robotRef.current, {
        x: 100,
        opacity: 0,
        rotate: 10,
        duration: 1.2,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 px-6 flex flex-col items-center justify-center text-center overflow-hidden">
      
      {/* Dynamic Background Blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-action/5 rounded-full blur-[120px] -z-10 animate-pulse"></div>

      <div className="max-w-4xl w-full z-10 flex flex-col items-center">
        <h2 ref={headlineRef} className="text-5xl md:text-6xl lg:text-7xl font-dela text-brand-text mb-12 leading-tight">
          Ready to turn <br />
          <span className="text-brand-action">chaos into clarity?</span>
        </h2>

        <div className="flex flex-col sm:flex-row items-center gap-8">
            {/* Waving Robot */}
            <div ref={robotRef} className="w-48 h-48 sm:w-64 sm:h-64 flex items-center justify-center">
                <Robot className="w-full h-full" />
            </div>

            <div className="flex flex-col items-center sm:items-start gap-4">
                <button className="btn-anim group px-10 py-5 text-xl font-bold flex items-center gap-3">
                    <span className="text-container">
                        <span className="text">Start Using NoteSnap</span>
                    </span>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                </button>
                <p className="text-gray-400 font-sk font-medium italic">
                    Free forever for single users.
                </p>
            </div>
        </div>
      </div>

      {/* Decorative Floating Elements */}
      <div className="absolute top-20 left-10 w-12 h-12 bg-gray-100 rounded-lg -rotate-12 border border-black/5 animate-bounce"></div>
      <div className="absolute bottom-20 right-10 w-16 h-16 bg-gray-100 rounded-lg rotate-12 border border-black/5 animate-bounce [animation-delay:1s]"></div>
    </section>
  );
};

export default CTA;
