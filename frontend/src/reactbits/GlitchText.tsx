"use client";

import { useEffect, useState } from "react";

interface GlitchTextProps {
  text: string;
  className?: string;
  speed?: number;
  glitchColors?: [string, string];
}

const GlitchText = ({
  text,
  className = "",
  speed = 1,
  glitchColors = ["#00ff99", "#ff0099"],
}: GlitchTextProps) => {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 200 / speed);
    }, 3000 / speed);

    return () => clearInterval(interval);
  }, [speed]);

  return (
    <span
      className={`relative inline-block ${className}`}
      style={{
        animation: isGlitching ? `glitch ${0.3 / speed}s ease-in-out` : "none",
      }}
    >
      <style jsx>{`
        @keyframes glitch {
          0%, 100% {
            transform: translate(0);
            text-shadow: none;
          }
          20% {
            transform: translate(-2px, 2px);
            text-shadow: 2px -2px 0 ${glitchColors[0]}, -2px 2px 0 ${glitchColors[1]};
          }
          40% {
            transform: translate(2px, -2px);
            text-shadow: -2px 2px 0 ${glitchColors[0]}, 2px -2px 0 ${glitchColors[1]};
          }
          60% {
            transform: translate(-1px, 1px);
            text-shadow: 1px -1px 0 ${glitchColors[0]}, -1px 1px 0 ${glitchColors[1]};
          }
          80% {
            transform: translate(1px, -1px);
            text-shadow: -1px 1px 0 ${glitchColors[0]}, 1px -1px 0 ${glitchColors[1]};
          }
        }
      `}</style>
      {/* Main text */}
      <span className="relative z-10">{text}</span>
      
      {/* Glitch layers */}
      {isGlitching && (
        <>
          <span
            className="absolute top-0 left-0 z-0 opacity-80"
            style={{
              color: glitchColors[0],
              transform: "translate(-2px, -2px)",
              clipPath: "polygon(0 33%, 100% 33%, 100% 66%, 0 66%)",
            }}
          >
            {text}
          </span>
          <span
            className="absolute top-0 left-0 z-0 opacity-80"
            style={{
              color: glitchColors[1],
              transform: "translate(2px, 2px)",
              clipPath: "polygon(0 0, 100% 0, 100% 33%, 0 33%)",
            }}
          >
            {text}
          </span>
        </>
      )}
    </span>
  );
};

export default GlitchText;
