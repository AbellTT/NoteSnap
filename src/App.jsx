import React, { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import RobotPractice from './RobotPractice'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const containerRef = useRef(null)

  return (
    <main ref={containerRef} className="bg-brand-bg text-brand-text overflow-x-hidden min-h-screen">
      <RobotPractice />
    </main>
  )
}

export default App
