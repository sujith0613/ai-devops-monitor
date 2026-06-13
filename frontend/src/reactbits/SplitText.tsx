"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

interface SplitTextProps {
  text: string;
  className?: string;
  stagger?: number;
  delay?: number;
  onComplete?: () => void;
}

const SplitText = ({
  text,
  className = "",
  stagger = 0.05,
  delay = 0,
  onComplete,
}: SplitTextProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const [hasAnimated, setHasAnimated] = useState(false);

  useGSAP(
    () => {
      if (hasAnimated) return;
      
      gsap.from(lettersRef.current.filter(Boolean), {
        y: "100%",
        opacity: 0,
        duration: 0.5,
        stagger,
        delay,
        ease: "power2.out",
        onComplete: () => {
          setHasAnimated(true);
          onComplete?.();
        },
      });
    },
    { scope: containerRef, dependencies: [text, delay] }
  );

  return (
    <div ref={containerRef} style={{ overflow: "hidden" }} className={className}>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {text.split("").map((letter, index) => (
          <span
            key={index}
            ref={(el) => {
              lettersRef.current[index] = el;
            }}
            style={{
              display: "inline-block",
              whiteSpace: letter === " " ? "pre" : "normal",
            }}
          >
            {letter}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SplitText;
