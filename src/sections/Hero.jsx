import React, { useEffect } from 'react';
import Button from '../components/Button';
import Robot from '../components/Robot';
import gsap from 'gsap';

const Hero = () => {
  const sentence = "Tame the into every Turn note chaos. clarity.".split(" ");
  //actual sentence : Tame the chaos. Turn every note into clarity.
  useEffect(() => {
    // --- ANIMATION 1: BLINKING ---
    const blinkTimeline = gsap.timeline({
      repeat: -1, 
      repeatDelay: 3 + Math.random() * 2 
    });

    blinkTimeline
      .to(['#robot-eye-left', '#robot-eye-right'], {
        scaleY: 0.1,
        duration: 0.1,
        transformOrigin: "center center",
        ease: "power2.inOut"
      })
      .to(['#robot-eye-left', '#robot-eye-right'], {
        scaleY: 1,
        duration: 0.1,
        ease: "power2.inOut"
      });

    // --- ANIMATION 2: MOUSE TRACKING ---
    const handleMouseMove = (e) => {
      // Calculate cursor position relative to screen center (-0.5 to 0.5)
      let xPos = (e.clientX / window.innerWidth) - 0.5;
      let yPos = (e.clientY / window.innerHeight) - 0.5;

      // Range for pupil movement (smaller range of 7 to stay inside)
      let pupilX = xPos * 7;
      let pupilY = yPos * 7;

      // Range for head movement (slightly larger)
      let headX = xPos * 20;
      let headY = yPos * 10;
      let headRotate = xPos * 10;

      // Update Pupils
      gsap.to(['#robot-pupil-left', '#robot-pupil-right'], {
        x: pupilX,
        y: pupilY,
        duration: 0.4,
        ease: "power2.out"
      });

      // Update Head (Relative to its initial -90 position)
      gsap.to('#robot-head', {
        x: headX,
        y: -80 + headY, // Start at -80 and move slightly from there
        rotate: headRotate,
        duration: 0.6,
        ease: "power2.out",
        transformOrigin: "center bottom"
      });
    };

    // window.addEventListener('mousemove', handleMouseMove);

    // --- ANIMATION 3: AUTO-TRACKING SYSTEM ---
    let currentFocusIndex = 0;
    const words = document.getElementsByClassName('floating-word');

    const updateTracking = () => {
      const activeWord = words[currentFocusIndex];
      const robot = document.querySelector('#practice-robot');
      
      if (activeWord && robot) {
        const wordRect = activeWord.getBoundingClientRect();
        const robotRect = robot.getBoundingClientRect();

        const wordCenter = {
          x: wordRect.left + wordRect.width / 2,
          y: wordRect.top + wordRect.height / 2
        };
        const robotCenter = {
          x: robotRect.left + robotRect.width / 2,
          y: robotRect.top + robotRect.height / 2
        };

        const deltaX = wordCenter.x - robotCenter.x;
        const deltaY = wordCenter.y - robotCenter.y;

        const pupilX = gsap.utils.clamp(-7, 7, deltaX * 0.02);
        const pupilY = gsap.utils.clamp(-7, 7, deltaY * 0.02);
        
        const headX = gsap.utils.clamp(-12, 12, deltaX * 0.015);
        const headY = gsap.utils.clamp(-8, 8, deltaY * 0.015);
        const headRotate = gsap.utils.clamp(-8, 8, deltaX * 0.01);

        gsap.to(['#robot-pupil-left', '#robot-pupil-right'], {
          x: pupilX,
          y: pupilY,
          duration: 0.1,
          overwrite: true
        });

        gsap.to('#robot-head', {
          x: headX,
          y: -80 + headY,
          rotate: headRotate,
          duration: 0.2,
          overwrite: true,
          transformOrigin: "center bottom"
        });
      }
    };

    gsap.ticker.add(updateTracking);

    // --- FOCUS SWITCHER: Change target word every 4 seconds ---
    const switchFocus = setInterval(() => {
      const isDoubleBlink = Math.random() > 0.7; // 30% chance of double blink
      
      const focusBlink = gsap.timeline();
      const isSquint = Math.random() > 0.5; // 50% chance of a subtle squint after the blink
      
      if (isDoubleBlink) {
        focusBlink
          .to(['#robot-eye-left', '#robot-eye-right'], { scaleY: 0.1, duration: 0.05, overwrite: true })
          .to(['#robot-eye-left', '#robot-eye-right'], { scaleY: 1, duration: 0.05 })
          .to(['#robot-eye-left', '#robot-eye-right'], { scaleY: 0.1, duration: 0.05 })
          .to(['#robot-eye-left', '#robot-eye-right'], { scaleY: 1, duration: 0.05 });
      } else {
        focusBlink
          .to(['#robot-eye-left', '#robot-eye-right'], { scaleY: 0.1, duration: 0.1, overwrite: true })
          .to(['#robot-eye-left', '#robot-eye-right'], { scaleY: 1, duration: 0.1 });
        
        // If it was a squint, add it as a separate visible step AFTER opening
        if (isSquint) {
          focusBlink
            .to(['#robot-eye-left', '#robot-eye-right'], { 
              scaleY: 0.8, 
              duration: 0.4, // Slower narrowing to make it visible
              ease: "power2.inOut"
            }, "+=0.1") // Small pause after opening before squinting
            .to(['#robot-eye-left', '#robot-eye-right'], { 
              scaleY: 1, 
              duration: 1.2, 
              delay: 1,
              ease: "sine.inOut" 
            });
        }
      }

      // Change focus slightly after the blink starts
      gsap.delayedCall(0.1, () => {
        currentFocusIndex = (currentFocusIndex + 1) % words.length;
      });

    }, 4000);

    // --- ANIMATION 4: FLOATING WORDS (Randomized) ---
    const floatingWords = document.querySelectorAll('.floating-word');
    floatingWords.forEach((word) => {
      // Randomize duration between 2 and 4 seconds
      const duration = 2 + Math.random() * 2;
      // Randomize delay so they don't all start at once
      const delay = Math.random() * 2;
      // Randomize movement range
      const yMove = -20 - Math.random() * 20; // Move up between 20px and 40px
      const xMove = Math.random() * 40 - 20;  // Move sideways between -20px and 20px

      gsap.to(word, {
        y: yMove,
        x: xMove,
        z: 0.1,                          // Anti-jitter hint
        duration: duration,
        delay: delay,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        force3D: true, 
        autoRound: false
      });
    });

    // --- ANIMATION 5: HAND-TO-CHIN ---
    const wavehand = gsap.timeline();
    wavehand.to('#robot-arm-right', {
      rotate: 150, 
      duration: 1.2,
      transformOrigin: "0% 0%",
      ease: "power2.out"
    })
    .to('#robot-arm-right', {
      rotate: 153,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // --- ANIMATION 6: THINKING EXPRESSION (Now with Antenna Pulse) ---
    const thinkingExpression = gsap.timeline({
      repeat: -1,
      yoyo: true,
      repeatDelay: 2
    });

    thinkingExpression
      // The Mouth stays flat to show focus
      .to('#robot-mouth', {
        attr: { d: "M-8,24 Q0,24 8,24" },
        duration: 1,
        ease: "power2.inOut"
      })
      // The Antenna pulses with the brand blue
      .to('#robot-antenna-tip', {
        fill: "#3B82F6",
        scale: 1.3,
        transformOrigin: "center center",
        duration: 0.8,
        repeat: 3,
        yoyo: true,
        ease: "sine.inOut"
      }, "<")
      // Subtle antenna wiggle
      .to('#robot-antenna-stem', {
        rotate: 5,
        transformOrigin: "bottom center",
        duration: 0.4,
        repeat: 6,
        yoyo: true,
        ease: "sine.inOut"
      }, "<");

    gsap.to('#robot-arm-left', {
      rotate: 3,
      repeat: -1,
      yoyo: true,
      duration: 2
    });

    // Cleanup
    return () => {
      blinkTimeline.kill();
      wavehand.kill();
      thinkingExpression.kill();
      gsap.ticker.remove(updateTracking);
      clearInterval(switchFocus);
    };
  }, []);

  return (
    <section className="relative min-h-screen pt-20 flex items-center justify-center overflow-hidden bg-brand-bg">
      <div className="max-w-[1440px] mx-auto px-6 w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center min-h-[calc(100vh-5rem)] py-20">
        
        {/* Left Side: Content */}
        <div className="order-2 md:order-1 flex flex-col items-center md:items-start text-center md:text-left z-10">
          <h1 className="text-5xl md:text-8xl font-dela leading-[1.1] mb-6 flex flex-col tracking-tight">
            <span className="text-brand-text">Your notes.</span>
            <span className="text-brand-action">Clean.</span>
            <span className="text-brand-text">Instantly.</span>
          </h1>
          
          <p className="max-w-md text-gray-500 font-sk text-lg md:text-xl leading-relaxed mb-10 transition-all">
            Turn messy hand-written scribbles into clear, structured, and actionable summaries in seconds.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto transition-all">
            <Button 
              variant="primary" 
              className="px-3 py-2 text-lg"
              icon={<span> →</span>}
            >
              Get Started
            </Button>
            <Button 
              variant="outline" 
              className="px-6 py-3 text-base"
            >
              View Demo
            </Button>
          </div>
        </div>

        {/* Right Side: Robot Animation */}
        <div className="order-2 w-full aspect-square bg-white rounded-[3rem] p-12 pb-0 border border-black/5 shadow-sm flex flex-col items-center justify-end relative">
        {/* Floating Sentence Words - Clustered above the head */}
        {sentence.map((word, index) => (
          <div 
            key={index}
            className="floating-word absolute bg-white/90 border border-black/10 px-4 py-1.5 rounded-xl shadow-sm text-lg font-bold z-10 will-change-transform"
            style={{
              // Spreading them out more:
              // top: increased range (5-30%) and spread
              // left: increased distribution (10-90%)
              top: `${8 + (index * 8) % 25}%`,       
              left: `${10 + (index * 17) % 85}%`,
            }}
          >
            {word}
          </div>
        ))}

        <Robot id="practice-robot" className="w-full h-full max-h-[440px] max-w-[300px]" />
      </div>
      </div>
    </section>
  )
}

export default Hero;

