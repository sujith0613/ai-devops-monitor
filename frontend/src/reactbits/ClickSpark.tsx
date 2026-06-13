"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface ClickSparkProps {
  children: React.ReactNode;
  sparkColor?: string;
  sparks?: number;
  sparkSize?: number;
}

const ClickSpark = ({
  children,
  sparkColor = "#00ff99",
  sparks = 10,
  sparkSize = 8,
}: ClickSparkProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sparksPool = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create sparks if they don't exist
    if (sparksPool.current.length === 0) {
      for (let i = 0; i < sparks; i++) {
        const spark = document.createElement("div");
        spark.style.position = "absolute";
        spark.style.width = `${sparkSize}px`;
        spark.style.height = `${sparkSize}px`;
        spark.style.backgroundColor = sparkColor;
        spark.style.borderRadius = "50%";
        spark.style.opacity = "0";
        spark.style.pointerEvents = "none";
        spark.style.zIndex = "9999";
        container.appendChild(spark);
        sparksPool.current.push(spark);
      }
    }

    const handleClick = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { top: T, left: L } = container.getBoundingClientRect();

      sparksPool.current.forEach((spark) => {
        gsap.fromTo(
          spark,
          {
            x: clientX - L,
            y: clientY - T,
            opacity: 1,
            scale: 0.5,
          },
          {
            x: clientX - L + (Math.random() - 0.5) * 80,
            y: clientY - T + (Math.random() - 0.5) * 80,
            opacity: 0,
            scale: 1,
            duration: 0.6,
            ease: "power1.out",
          }
        );
      });
    };

    container.addEventListener("click", handleClick);

    return () => container.removeEventListener("click", handleClick);
  }, [sparkColor, sparks, sparkSize]);

  return (
    <div ref={containerRef} style={{ position: "relative" }}>
      {children}
    </div>
  );
};

export default ClickSpark;
