import { useEffect, useState } from "react";

export function getColor(v, w = 60, c = 85) {
  if (v >= c) return "var(--red)";
  if (v >= w) return "var(--amber)";
  return "var(--green)";
}
export function getColorClass(v, w = 60, c = 85) {
  if (v >= c) return "text-crit";
  if (v >= w) return "text-warn";
  return "text-ok";
}
export function getPillClass(v, w = 60, c = 85) {
  if (v >= c) return "pill-crit";
  if (v >= w) return "pill-warn";
  return "pill-ok";
}

export function useNow() {
  const [t, setT] = useState(new Date());
  useEffect(() => { const id = setInterval(() => setT(new Date()), 1000); return () => clearInterval(id); }, []);
  return t;
}
