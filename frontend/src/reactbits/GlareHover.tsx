"use client";

import { useEffect, useRef, ReactNode } from "react";

interface GlareHoverProps {
  children: ReactNode;
  className?: string;
  glareColor?: string;
  borderRadius?: string;
}

const GlareHover = ({
  children,
  className = "",
  glareColor = "rgba(255, 255, 255, 0.4)",
  borderRadius = "8px",
}: GlareHoverProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;

      container.style.setProperty("--glare-x", `${50 + x * 30}%`);
      container.style.setProperty("--glare-y", `${50}%`);
    };

    container.addEventListener("mousemove", handleMouseMove);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div ref={containerRef} className={className} style={{ position: "relative", overflow: "hidden", borderRadius }}>
      {children}
      <div
        style={{
          position: "absolute",
          top: 0, left: 0, width: "100%", height: "100%",
          background: `radial-gradient(circle at var(--glare-x, 50%) var(--glare-y, 50%), ${glareColor} 0%, transparent 60%)`,
          pointerEvents: "none",
          opacity: 0.6,
          zIndex: 2,
        }}
      />
    </div>
  );
};

export default GlareHover;
