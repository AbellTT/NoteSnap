import React, { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import RobotPractice from './RobotPractice'
import Hero from './sections/Hero'
import NavigationBar from './components/Navigation bar'
import GridBackground from './components/GridBackground'
import ProblemPlusSolution from './sections/ProblemPlusSolution'
import HowItWorks from './sections/HowItWorks'
import Benefits from './sections/Benefits'
import CTA from './sections/CTA'
import Footer from './sections/Footer'
import UIMockupLab from './UIMockupLab'


function App() {
  const containerRef = useRef()
  const isLab = new URLSearchParams(window.location.search).get('lab') === 'true';

  if (isLab) return <UIMockupLab />;

  return (
    <main ref={containerRef} className="relative text-brand-text overflow-x-hidden min-h-screen selection:bg-brand-action selection:text-white bg-brand-bg">
      <GridBackground />
      <NavigationBar />
      <Hero />
      <ProblemPlusSolution/>
      <HowItWorks id="how-it-works" />
      <Benefits />
      <CTA />
      <Footer />
    </main>
  )
}

export default App
