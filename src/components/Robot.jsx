import React from 'react';

const Robot = ({ id, className }) => {
  return (
    <svg 
      id={id}
      viewBox="0 0 250 350" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g transform="translate(125, 200)">
        {/* Body */}
        <g id="robot-body">
          <rect x="-45" y="-30" width="90" height="75" rx="30" stroke="#151515" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="white" />
          <circle cx="0" cy="0" r="3" fill="#151515" opacity="0.4" />
          <circle cx="0" cy="15" r="3" fill="#151515" opacity="0.4" />
        </g>

        {/* Head */}
        <g id="robot-head" transform="translate(0, -80)">
          <rect x="-65" y="-60" width="130" height="100" rx="45" stroke="#151515" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="white" />
          
          {/* Antenna */}
          <path id="robot-antenna-stem" d="M0,-60 L0,-75" stroke="#151515" strokeWidth="6" strokeLinecap="round" />
          <circle id="robot-antenna-tip" cx="0" cy="-80" r="5" stroke="#151515" strokeWidth="5" fill="white" />

          {/* Eyes - Target these for blinking */}
          <g id="robot-eye-left" transform="translate(-30, -5)">
            <circle r="14" stroke="#151515" strokeWidth="6" fill="white" />
            <circle id="robot-pupil-left" r="4" cx="0" cy="0" fill="#151515" />
          </g>
          
          <g id="robot-eye-right" transform="translate(30, -5)">
            <circle r="14" stroke="#151515" strokeWidth="6" fill="white" />
            <circle id="robot-pupil-right" r="4" cx="0" cy="0" fill="#151515" />
          </g>

          {/* Mouth */}
          <path id="robot-mouth" d="M-8,22 Q0,30 8,22" stroke="#151515" strokeWidth="4" strokeLinecap="round" fill="none" />
        </g>

        {/* Arms */}
        <g id="robot-arm-left" transform="translate(-45, 0)">
          <path d="M0,0 Q-25,10 -20,45" stroke="#151515" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <circle cx="-20" cy="45" r="8" stroke="#151515" strokeWidth="5" fill="white" />
        </g>

        <g id="robot-arm-right" transform="translate(45, 0)">
          <path d="M0,0 Q25,10 20,45" stroke="#151515" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <circle cx="20" cy="45" r="8" stroke="#151515" strokeWidth="5" fill="white" />
        </g>

        {/* Legs */}
        <g id="robot-leg-left" transform="translate(-20, 45)">
          <line x1="0" y1="0" x2="0" y2="40" stroke="#151515" strokeWidth="6" strokeLinecap="round" />
          <path d="M-12,40 L8,40" stroke="#151515" strokeWidth="6" strokeLinecap="round" />
        </g>

        <g id="robot-leg-right" transform="translate(20, 45)">
          <line x1="0" y1="0" x2="0" y2="40" stroke="#151515" strokeWidth="6" strokeLinecap="round" />
          <path d="M-8,40 L12,40" stroke="#151515" strokeWidth="6" strokeLinecap="round" />
        </g>
      </g>
    </svg>
  );
};

export default Robot;
