"use client";

import { CSSProperties, ReactNode } from "react";

interface ShinyTextProps {
  children: ReactNode;
  className?: string;
  shimmerWidth?: number;
  speed?: number;
}

const ShinyText = ({
  children,
  className = "",
  shimmerWidth = 100,
  speed = 2,
}: ShinyTextProps) => {
  const shimmerStyle: CSSProperties = {
    backgroundImage: `linear-gradient(
      90deg,
      transparent 0%,
      rgba(255, 255, 255, 0) 10%,
      rgba(255, 255, 255, 0.5) 50%,
      rgba(255, 255, 255, 0) 90%,
      transparent 100%
    )`,
    backgroundSize: `${shimmerWidth}% 100%`,
    backgroundRepeat: "no-repeat",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    animation: `shimmer ${speed}s infinite linear`,
  };

  return (
    <>
      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: -${shimmerWidth}% 0;
          }
          100% {
            background-position: ${shimmerWidth + 100}% 0;
          }
        }
      `}</style>
      <span className={`relative inline-block ${className}`}>
        <span className="relative z-10">{children}</span>
        <span
          className="absolute inset-0 z-20 pointer-events-none"
          style={shimmerStyle}
        >
          {children}
        </span>
      </span>
    </>
  );
};

export default ShinyText;
