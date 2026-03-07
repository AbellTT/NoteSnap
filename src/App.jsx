import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import Hero from './sections/Hero'
import NavigationBar from './components/Navigation bar'
import GridBackground from './components/GridBackground'
import ProblemPlusSolution from './sections/ProblemPlusSolution'
import HowItWorks from './sections/HowItWorks'
import Benefits from './sections/Benefits'
import CTA from './sections/CTA'
import Footer from './sections/Footer'
import UIMockupLab from './UIMockupLab'
import Preloader from './components/Preloader'
import { useState } from 'react'

gsap.registerPlugin(ScrollTrigger);

function App() {
  const containerRef = useRef()
  const [isLoading, setIsLoading] = useState(true);
  const isLab = new URLSearchParams(window.location.search).get('lab') === 'true';

  useEffect(() => {
    if (isLab || isLoading) return;

    // Initialize Lenis for smooth global scrolling with snappy settings
    const lenis = new Lenis({
      lerp: 0.08, 
      wheelMultiplier: 1.2,
      touchMultiplier: 2,
      infinite: false,
    });

    // Synchronize Lenis scrolling with GSAP's ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);
    const tickerFn = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tickerFn);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(tickerFn);
    };
  }, [isLab, isLoading]);

  if (isLab) return <UIMockupLab />;

  return (
    <>
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      <main 
        ref={containerRef} 
        className={`relative text-brand-text overflow-x-hidden min-h-screen selection:bg-brand-action selection:text-white bg-brand-bg transition-opacity duration-700 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
      >
        <GridBackground />
        <NavigationBar />
        <Hero />
        <ProblemPlusSolution/>
        <HowItWorks id="how-it-works" />
        <Benefits />
        <CTA />
        <Footer />
      </main>
    </>
  )
}

export default App
