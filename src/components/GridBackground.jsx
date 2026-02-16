import React, { useState, useEffect } from "react";

const GridBackground = () => {
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0
  });

  useEffect(() => {
    const handleMouseMove = (event) => {
      const { clientX, clientY } = event;
      const x = clientX - window.innerWidth / 2;
      const y = clientY - window.innerHeight / 2;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 w-full h-full overflow-hidden transition-transform duration-300 ease-out pointer-events-none"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(21, 21, 21, 0.03) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(21, 21, 21, 0.03) 1px, transparent 1px)
        `,
        backgroundSize: "50px 50px",
        animation: "moveGrid 20s linear infinite",
        transform: `translate(${mousePosition.x / 30}px, ${mousePosition.y / 30}px)`,
      }}
    >
      {/* Subtle radial glow for depth */}
      <div className="absolute top-1/3 left-1/2 w-[60vmin] h-[60vmin] rounded-full blur-[150px] -translate-x-1/2 -translate-y-1/2" 
           style={{ backgroundColor: 'rgba(59, 130, 246, 0.005)' }} />

      {/* Keyframe animation for grid movement */}
      <style>
        {`
          @keyframes moveGrid {
            0% { background-position: 0 0; }
            100% { background-position: 100px 100px; }
          }
        `}
      </style>
    </div>
  );
};

export default GridBackground;
