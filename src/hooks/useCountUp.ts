"use client";

import { useEffect, useState } from "react";

function parseStatValue(value: string): { num: number; suffix: string } {
  const match = value.match(/^(\d+(?:\.\d+)?)(.*)$/);
  if (!match) return { num: 0, suffix: value };
  return { num: parseFloat(match[1]), suffix: match[2] };
}

export function useCountUp(
  value: string,
  isActive: boolean,
  duration = 2000
): string {
  const { num, suffix } = parseStatValue(value);
  const [display, setDisplay] = useState(isActive ? value : `0${suffix}`);

  useEffect(() => {
    if (!isActive) return;

    let start: number | null = null;
    let frame: number;

    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(num * eased);
      setDisplay(`${current}${suffix}`);
      if (progress < 1) frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [isActive, num, suffix, duration]);

  return display;
}
