"use client";
import { useRef, ReactNode } from "react";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
}

const SpotlightCard = ({ children, className = "", spotlightColor = "rgba(59, 130, 246, 0.08)" }: SpotlightCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    const glow = glowRef.current;
    if (!el || !glow) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    glow.style.setProperty("--sx", `${x}px`);
    glow.style.setProperty("--sy", `${y}px`);
    glow.style.opacity = "1";
  };

  const handleMouseLeave = () => {
    if (glowRef.current) glowRef.current.style.opacity = "0";
  };

  return (
    <div ref={ref} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} className={`spotlight-wrap ${className}`}>
      <div ref={glowRef} className="spotlight-glow" style={{
        background: `radial-gradient(500px circle at var(--sx, 50%) var(--sy, 50%), ${spotlightColor}, transparent 60%)`,
        opacity: 0,
        transition: "opacity 0.3s"
      }}/>
      {children}
    </div>
  );
};

export default SpotlightCard;
