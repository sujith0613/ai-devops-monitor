"use client";

import { useRef, useEffect } from "react";

interface GridPulseProps {
  color?: string;
  backgroundColor?: string;
  gridSize?: number;
  speed?: number;
  pulseRadius?: number;
  className?: string;
}

const GridPulse = ({
  color = "rgba(0, 255, 153, 0.3)",
  backgroundColor = "transparent",
  gridSize = 40,
  speed = 2,
  pulseRadius = 200,
  className = "",
}: GridPulseProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;
    let mouseX = -1000;
    let mouseY = -1000;

    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        const rect = parent.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
      }
    };

    resize();
    window.addEventListener("resize", resize);

    const animate = () => {
      time += 0.02 * speed;
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw grid with pulse effect
      for (let x = 0; x < canvas.width + gridSize; x += gridSize) {
        for (let y = 0; y < canvas.height + gridSize; y += gridSize) {
          // Calculate distance from mouse for interactive pulse
          const distFromMouse = Math.hypot(x - mouseX, y - mouseY);
          const mouseInfluence = Math.max(0, 1 - distFromMouse / pulseRadius);
          
          // Wave animation emanating from center
          const centerX = canvas.width / 2;
          const centerY = canvas.height / 2;
          const distFromCenter = Math.hypot(x - centerX, y - centerY);
          const wave = Math.sin(distFromCenter * 0.02 - time) * 0.5 + 0.5;
          
          // Combine effects
          const intensity = Math.min(1, wave * 0.3 + mouseInfluence * 0.7);
          
          // Parse color and apply intensity
          const dotSize = 2 + intensity * 4;
          
          ctx.beginPath();
          ctx.arc(x, y, dotSize, 0, Math.PI * 2);
          ctx.fillStyle = color.replace(/[\d.]+\)$/, `${0.1 + intensity * 0.6})`);
          ctx.fill();

          // Draw connecting lines with low opacity
          if (x + gridSize < canvas.width) {
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x + gridSize, y);
            ctx.strokeStyle = color.replace(/[\d.]+\)$/, `${0.05 + intensity * 0.15})`);
            ctx.lineWidth = 1;
            ctx.stroke();
          }
          if (y + gridSize < canvas.height) {
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x, y + gridSize);
            ctx.strokeStyle = color.replace(/[\d.]+\)$/, `${0.05 + intensity * 0.15})`);
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationId);
    };
  }, [color, backgroundColor, gridSize, speed, pulseRadius]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
      }}
    />
  );
};

export default GridPulse;
