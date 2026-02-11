import React, { useEffect } from 'react';
import gsap from 'gsap';
import Robot from './components/Robot';

const RobotPractice = () => {
  const sentence = "Tame the chaos. Turn every note into clarity.".split(" ");

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

    // --- ANIMATION 4: FLOATING WORDS (Right Side) ---
    gsap.to('.floating-word', {
      y: -30,
      z: 0.1,                          // Anti-jitter hint
      x: () => Math.random() * 40 - 20,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      force3D: true, 
      autoRound: false,                // Sub-pixel precision
      stagger: {
        amount: 1,
        from: "start" 
      }
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-brand-bg p-10 md:grid md:grid-cols-2 gap-10">
      <div className="order-1 flex flex-col items-center md:items-start text-center md:text-left">
        <h1 className="text-3xl font-black mb-10 text-brand-text">Animation Practice</h1>
        <p className="text-gray-500 font-medium italic">
          The robot is now reading multiple words! Watch him switch focus.
        </p>
        <div className="mt-6 text-sm text-gray-400 space-y-2">
          <p>💡 Tip: Every 3 seconds, he'll "blink" and look at the other word.</p>
        </div>

        {/* Isolated Test Word */}
        <div className="test-word-float mt-12 bg-white border-2 border-brand-action/20 px-6 py-2 rounded-2xl shadow-sm text-xl font-bold text-brand-action will-change-transform">
          Pure Motion Test
        </div>
      </div>
      
      <div className="order-2 w-full aspect-square bg-white rounded-[3rem] p-12 border border-black/5 shadow-sm flex flex-col items-center justify-center relative">
        {/* Floating Sentence Words - Clustered above the head */}
        {sentence.map((word, index) => (
          <div 
            key={index}
            className="floating-word absolute bg-white/90 border border-black/10 px-4 py-1.5 rounded-xl shadow-sm text-lg font-bold z-10 will-change-transform"
            style={{
              // Positioned relatively above the head (which is near the center)
              top: `${5 + (index * 4) % 15}%`, 
              left: `${15 + (index * 12) % 70}%`,
            }}
          >
            {word}
          </div>
        ))}

        <Robot id="practice-robot" className="w-full h-full max-h-[440px] max-w-[300px]" />
      </div>
    </div>
  );
};

export default RobotPractice;
