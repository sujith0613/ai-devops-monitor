"use client";

import { useEffect, useState, useRef } from "react";

interface DecryptedTextProps {
  text: string;
  className?: string;
  speed?: number;
  characters?: string;
  revealDirection?: "start" | "end" | "center" | "random";
}

const DecryptedText = ({
  text,
  className = "",
  speed = 50,
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*",
  revealDirection = "start",
}: DecryptedTextProps) => {
  const [displayText, setDisplayText] = useState("");
  const [isDecrypting, setIsDecrypting] = useState(false);
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;
    
    setIsDecrypting(true);
    let currentIndex = 0;
    const textLength = text.length;
    const revealedChars = new Array(textLength).fill(false);

    const getNextIndex = () => {
      switch (revealDirection) {
        case "end":
          return textLength - 1 - currentIndex;
        case "center":
          const mid = Math.floor(textLength / 2);
          const offset = Math.floor(currentIndex / 2);
          return currentIndex % 2 === 0 ? mid + offset : mid - offset - 1;
        case "random":
          const unrevealed = revealedChars
            .map((r, i) => (!r ? i : -1))
            .filter((i) => i !== -1);
          return unrevealed[Math.floor(Math.random() * unrevealed.length)];
        default:
          return currentIndex;
      }
    };

    const scrambleInterval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (revealedChars[index] || char === " ") return char;
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join("")
      );
    }, speed / 2);

    const revealInterval = setInterval(() => {
      if (currentIndex >= textLength) {
        clearInterval(revealInterval);
        clearInterval(scrambleInterval);
        setDisplayText(text);
        setIsDecrypting(false);
        return;
      }

      const idx = getNextIndex();
      if (idx >= 0 && idx < textLength) {
        revealedChars[idx] = true;
      }
      currentIndex++;
    }, speed);

    return () => {
      clearInterval(scrambleInterval);
      clearInterval(revealInterval);
    };
  }, [text, speed, characters, revealDirection]);

  return (
    <span className={`font-mono ${className}`}>
      {displayText || text.split("").map(() => characters[0]).join("")}
    </span>
  );
};

export default DecryptedText;
