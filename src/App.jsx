import React, { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import RobotPractice from './RobotPractice'
import Hero from './sections/Hero'
import NavigationBar from './components/Navigation bar'
import GridBackground from './components/GridBackground'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const containerRef = useRef()

  return (
    <main ref={containerRef} className="relative text-brand-text overflow-x-hidden min-h-screen selection:bg-brand-action selection:text-white bg-brand-bg">
      <GridBackground />
      <NavigationBar />
      <Hero />
    </main>
  )
}

export default App
