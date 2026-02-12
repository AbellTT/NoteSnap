import React, { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import RobotPractice from './RobotPractice'
import Hero from './sections/Hero'
import NavigationBar from './components/Navigation bar'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const containerRef = useRef()

  return (
    <main ref={containerRef} className="bg-brand-bg text-brand-text overflow-x-hidden min-h-screen selection:bg-brand-action selection:text-white">
      <NavigationBar />
      <Hero />
    </main>
  )
}

export default App
